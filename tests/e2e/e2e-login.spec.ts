import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel('Login and Logout flow',() => {
    let loginPage : LoginPage
    let homePage : HomePage

    // before each hook
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)

        // await page.goto('http://zero.webappsecurity.com/')
        await homePage.visit()
    })
    // negative scenario
    test('Negative scenario for login', async ({ page }) => {

        // refactored by using POM
        // await page.click('#signin_button')
        // await page.type('#user_login', 'invalid username')
        // await page.type('#user_password', 'invalid password')
        // await page.click('text=Sign in')
        // const errorMessage = await page.locator('.alert-error')
        // await expect(errorMessage).toContainText('Login and/or password are wrong.')

        await homePage.clickOnSignIn()
        await loginPage.login('invalid username', 'invalid password')
        // abstract page wait function example
        await loginPage.wait(3000)
        await loginPage.assertError()
    })

    // positive scenario
    test('Positive scenario for login and logout', async ({ page }) => {
        // refactored by using POM
        // await page.click('#signin_button')
        // await page.type('#user_login', 'username')
        // await page.type('#user_password', 'password')
        // await page.click('text=Sign in')

        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()
        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})