import { test, expect } from '@playwright/test'

test.describe.parallel('API testing', () => {
    const baseUrl = 'https://reqres.in/api'

    test('Assert response status', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)
    })

    test('Assert invalid endpoint', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/non-existing`)
        expect(response.status()).toBe(404)
    })

    test('Assert response body parameter value from GET', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)
        // store response in data variable and use the variable to parse
        // let responseBody = await response.body().then(b => {
        //     let data = JSON.parse(b.toString())
        //     return data
        // })

        // directly parse the responseBody variable
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.data.first_name).toEqual('Janet')
        expect(responseBody.data.email).toBeTruthy()
    })

    test('POST request to create new user', async ({ request}) => {
        const response = await request.post(`${baseUrl}/user`, {
            data : {
                id: 12345
            }
        })
        expect(response.status()).toBe(201)
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.id).toEqual(12345)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test('POST request to login success', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data : {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            }
        })
        expect(response.status()).toBe(200)
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.token).toBeTruthy()
    })

    test('POST request to login failed', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data : {
                email: 'eve.holt@reqres.in',
            }
        })
        expect(response.status()).toBe(400)
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.error).toEqual('Missing password')
    })

    test('PUT request to update user', async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/2`, {
            data : {
                name: 'Bryan Danielson',
                job: 'Professional Wrestler'
            }
        })
        expect(response.status()).toBe(200)
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.name).toEqual('Bryan Danielson')
        expect(responseBody.job).toEqual('Professional Wrestler')
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test('DELETE request to delete user', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/2`)
        expect(response.status()).toBe(204)
    })
}) 