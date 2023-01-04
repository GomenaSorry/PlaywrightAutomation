import { expect, Locator, Page } from '@playwright/test'

export class FeedbackPage {
    readonly page: Page
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly subjectInput: Locator
    readonly commentInput: Locator
    readonly clearButton: Locator
    readonly submitButton: Locator
    readonly feadbackTitle: Locator

    constructor(page : Page) {
        this.page = page
        this.nameInput = page.locator('#name')
        this.emailInput = page.locator('#email')
        this.subjectInput = page.locator('#subject')
        this.commentInput = page.locator('#comment')
        this.clearButton = page.locator("input[name='clear']")
        this.submitButton = page.locator("input[type='submit']")
        this.feadbackTitle = page.locator('#feedback-title')
    }

    async fillUpForm(name: string, email: string, subject: string, comment: string) {
        await this.nameInput.type(name)
        await this.emailInput.type(email)
        await this.subjectInput.type(subject)
        await this.commentInput.type(comment)
    }

    async resetFeedbackForm() {
        await this.clearButton.click()
    }

    async submitFeedbackForm() {
        await this.submitButton.click()
    }

    async assertReset() {
        await expect(this.nameInput).toBeEmpty()
        await expect(this.emailInput).toBeEmpty()
        await expect(this.subjectInput).toBeEmpty()
        await expect(this.commentInput).toBeEmpty()
    }

    async assertSubmit() {
        await expect(this.feadbackTitle).toBeVisible()
    }
}