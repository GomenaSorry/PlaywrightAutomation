import { test, expect } from '@playwright/test'
import { loadHomePage, assertTitle } from '../helpers'

test('Simple test', async ({ page }) => {
    await page.goto('https://www.example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})

test('Clicking on element', async ({ page }) => {
    // navigate to page and click the sign in button
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.click('text=Sign in')
    // assert error message
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.skip('Selectors', async ({ page }) => {
    // text
    await page.click('text=some text')
    // css
    await page.click('button')
    // id
    await page.click('#elementId')
    // class
    await page.click('.elementClass')
    // visible css selector
    await page.click('.submit-button:visible')
    // combination
    await page.click('#username .first')
    // xpath
    await page.click('//elementXpath')
})

test.describe('My first test suite', () => {
    test('Working with inputs', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#signin_button')
        // filling the form
        await page.type('#user_login', 'some username')
        await page.type('#user_password', 'some password')
        await page.click('text=Sign in')
        // assert error message
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
    
    test('Assertions @myTag', async ({ page }) => {
        await page.goto('https://www.example.com')
        await expect(page).toHaveURL('https://www.example.com')
        await expect(page).toHaveTitle('Example Domain')
        const element = await page.locator('h1')
        await expect(element).toBeVisible()
        await expect(element).toHaveText('Example Domain')
        await expect(element).toHaveCount(1)
        // non existing element
        const nonExistingElement = await page.locator('h5')
        await expect(nonExistingElement).not.toBeVisible()
    })
})

test.describe.parallel('Hooks', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.example.com')
    })

    test('Screenshots', async ({ page}) => {
        await page.screenshot({
            path: 'screenshot.png',
            fullPage: true
        })
    })
    
    test('Single element screenshot', async ({ page}) => {
        const element = await page.$('h1')
        await element!.screenshot({
            path: 'single_element_screenshot.png'
        })
    }) 
})

test('Custom helpers', async ({ page }) => {
    await loadHomePage(page)
    // pause for debugging
    // await page.pause()
    await assertTitle(page)
})

