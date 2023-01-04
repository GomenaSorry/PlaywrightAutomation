import { test, expect } from '@playwright/test'
import { FeedbackPage } from '../../page-objects/FeedbackPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel('Feedback Form', () => {
    let homePage : HomePage
    let feedbackPage : FeedbackPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        // refactored by using POM
        // await page.goto('http://zero.webappsecurity.com/index.html')
        // await page.click('#feedback')

        await homePage.clickOnFeedbackLink()
        await feedbackPage.fillUpForm('Some Name', 'SomeEmail@email.com', 'Some Subject', 'Some comment')
    })

    // Reset feedback form
    test('Reset feedback form', async ({ page}) => {
        // refactored by using POM
        // await page.type('#name', 'Some Name')
        // await page.type('#email', 'SomeEmail@email.com')
        // await page.type('#subject', 'Some Subject')
        // await page.type('#comment', 'Some comment')
        // await page.click("input[name='clear']")
        // const nameInput = await page.locator('#name')
        // const emailInput = await page.locator('#email')
        // const commentInput = await page.locator('#comment')
        // await expect(nameInput).toBeEmpty()
        // await expect(emailInput).toBeEmpty()
        // await expect(commentInput).toBeEmpty()

        await feedbackPage.resetFeedbackForm()
        await feedbackPage.assertReset()
    })

    test('Submit feedback form', async ({ page}) => {
        // refactored by using POM
        // await page.type('#name', 'Some Name')
        // await page.type('#email', 'SomeEmail@email.com')
        // await page.type('#subject', 'Some Subject')
        // await page.type('#comment', 'Some comment')
        // await page.click("input[type='submit']")
        // await page.waitForSelector('#feedback-title')

        await feedbackPage.submitFeedbackForm
        await feedbackPage.assertSubmit()
    })
})