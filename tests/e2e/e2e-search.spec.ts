import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Search results', () => {
    let homePage : HomePage

    // before each hook
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
    })
    
    test('Find search results',async ({ page }) => {
        // refactored by using POM
        // await page.goto('http://zero.webappsecurity.com/index.html')
        // await page.type('#searchTerm', 'bank')
        // await page.keyboard.press('Enter')

        await homePage.visit()
        await homePage.searchFor('bank')

        const numberOfLinks = await page.locator('li > a')
        await expect(numberOfLinks).toHaveCount(2)
    })
})