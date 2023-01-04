import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { PaymentPage } from '../../page-objects/PaymentPage'

test.describe.parallel('New payment', () => {
    let homePage : HomePage
    let loginPage : LoginPage
    let navbar : Navbar
    let paymentPage : PaymentPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navbar = new Navbar(page)
        paymentPage = new PaymentPage(page)
        
        // refactored by using POM
        // await page.goto('http://zero.webappsecurity.com/')
        // await page.click('#signin_button')
        // await page.type('#user_login', 'username')
        // await page.type('#user_password', 'password')
        // await page.click('text=Sign in')

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    })

    test('Send new payment', async ({ page }) => {
        await navbar.clickOnTab('Pay Bills')

        // refactored by using
        // await page.selectOption('#sp_payee', 'apple')
        // await page.click('#sp_get_payee_details')
        // await page.waitForSelector('#sp_payee_details')
        // await page.selectOption('#sp_account', '6')
        // await page.type('#sp_amount', '5000')
        // await page.type('#sp_date', '2021-11-09')
        // await page.type('#sp_description', 'Test message')
        // await page.click('#pay_saved_payees')
        // const message = await page.locator('#alert_content > span')
        // await expect(message).toBeVisible()
        // await expect(message).toContainText('The payment was successfully submitted')

        await paymentPage.sendNewPayment('apple', '6', '5000', '2021-11-09', 'Test message')
        await paymentPage.assertMessage()
    })
})