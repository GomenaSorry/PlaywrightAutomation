import { test, expect } from '@playwright/test'
import { getRandomNumber, getRandomString } from '../../utils/data-helpers'

test.describe.only('Tips and tricks for testing', () => {
    test('TestInfo object', async ({ page }, testInfo) => {
        await page.goto('https://www.example.com')
        // console.log(testInfo)
        // console.log(testInfo.title)
    })

    test('Test skip browser', async ({ page, browserName }) => {
        test.skip(browserName === "chromium", "Feature not ready in Chromium")
        await page.goto('https://www.example.com')
    })

    test('Fixme annotation', async ({ page, browserName }) => {
        test.fixme(browserName === "chromium", "Test not stable")
        await page.goto('https://www.example.com')
    })

    const people = ["Mike", "Judy", "Peter", "Elon", "Alice"]
    for (const name of people) {
        test(`Parametrized tests, running test for ${name}`, async ({ page }) => {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.type('#searchTerm', `${name}`)
            await page.waitForTimeout(3000)
        }) 
    }

    test('Mouse movement simulation', async ({ page }) => {
        await page.goto('https://www.example.com')
        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0,100)
        await page.mouse.up()
    })

    test('Multiple browser tab inside a browser', async ({ browser }) => {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()
        await page1.goto('https://www.example.com')
        await page2.goto('https://www.google.com')
        await page3.goto('https://www.youtube.com')
        await page1.waitForTimeout(5000)
    })

    test.only('Generate random numbers and strings', async ({ page }) => {
        let randNumber = await getRandomNumber()
        let randString = await getRandomString()
        console.log(randNumber)
        console.log(randString)
    })
})