import { test, expect } from '@playwright/test'

test.describe('Feedback Form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#feedback')
    })

    // Reset feedback form
    test('Reset feedback form', async ({ page}) => {
        await page.type('#name', 'Some Name')
        await page.type('#email', 'SomeEmail@email.com')
        await page.type('#subject', 'Some Subject')
        await page.type('#comment', 'Some comment')
        await page.click("input[name='clear']")
        
        const nameInput = await page.locator('#name')
        const emailInput = await page.locator('#email')
        const commentInput = await page.locator('#comment')
        
        await expect(nameInput).toBeEmpty()
        await expect(emailInput).toBeEmpty()
        await expect(commentInput).toBeEmpty()
    })

    test('Submit feedback form', async ({ page}) => {
        await page.type('#name', 'Some Name')
        await page.type('#email', 'SomeEmail@email.com')
        await page.type('#subject', 'Some Subject')
        await page.type('#comment', 'Some comment')
        await page.click("input[type='submit']")
        await page.waitForSelector('#feedback-title')
    })
})