import { expect, Locator, Page } from "@playwright/test"

export class PaymentPage {
    readonly page: Page
    readonly payee: Locator
    readonly getPayeeDetails: Locator
    readonly payeeDetails: Locator
    readonly account: Locator
    readonly amount: Locator
    readonly date: Locator
    readonly description: Locator
    readonly submitPayment: Locator
    readonly message: Locator

    constructor(page: Page) {
        this.page = page
        this.payee = page.locator('#sp_payee')
        this.getPayeeDetails = page.locator('#sp_get_payee_details')
        this.payeeDetails = page.locator('#sp_payee_details')
        this.account = page.locator('#sp_account')
        this.amount = page.locator('#sp_amount')
        this.date = page.locator('#sp_date')
        this.description = page.locator('#sp_description')
        this.submitPayment = page.locator('#pay_saved_payees')
        this.message = page.locator('#alert_content > span')
    }

    async sendNewPayment(payeeName: string, account: string, amount: string, date: string, description: string) {
        await this.payee.selectOption(payeeName)
        await this.getPayeeDetails.click()
        await this.payeeDetails.waitFor({state: 'visible'})
        await this.account.selectOption(account)
        await this.amount.type(amount)
        await this.date.type(date)
        await this.description.type(description)
        await this.submitPayment.click()
    }

    async assertMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('The payment was successfully submitted')
    }
}