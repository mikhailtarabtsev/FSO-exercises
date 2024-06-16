const { test, expect, beforeEach, describe } = require('@playwright/test')
const loginHelper = require("../helper/loginHelper")
const userDb = require("../helper/testUsers")

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post("api/test/reset")
    await loginHelper.createWithUserIndex(request, 1)
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByTestId("loginForm")
    await expect(locator).toBeVisible()
  })

  test('Login with correct credentials works', async ({ page })=>{
    await loginHelper.loginWithUserIndex(page, 1)
    const notification = page.getByText("Invalid credentials")
    await expect(notification).not.toBeVisible()
    const greeter = page.getByText(`${userDb[1].name} logged in`)
    await expect(greeter).toBeVisible()

  })

  test('Login with wrong credentials doesnt work', async ({ page })=>{
    await loginHelper.loginWithUserIndex(page, 0)
    const notification = page.getByText("Invalid credentials")
    await expect(notification).toBeVisible()
  })
})