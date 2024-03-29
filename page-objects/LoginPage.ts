import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'  

export class LoginPage extends AbstractPage{
    // readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator
    readonly loginForm: Locator

    constructor(page:Page) {
        // this.page = page
        super(page)
        this.usernameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.submitButton = page.locator('text=Sign in')
        this.errorMessage = page.locator('.alert-error')
        this.loginForm = page.locator('#login_form')
    }

    async login(username: string, password: string) {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.submitButton.click()
    }

    async assertError() {
        await expect(this.errorMessage).toContainText('Login and/or password are wrong.')
    }

    async snapShotLoginForm() {
        expect(await this.loginForm.screenshot()).toMatchSnapshot('login-form.png')
    }

    async snapShotErrorMessage() {
        expect(await this.errorMessage.screenshot()).toMatchSnapshot('login-error.png')
    }
}