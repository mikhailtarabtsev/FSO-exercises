const { test, expect, beforeEach, describe } = require('@playwright/test')
const loginHelper = require("../helper/loginHelper")
const userDb = require("../helper/testUsers")
const blogHelper = require("../helper/blogHelper")

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

  describe("login", () =>{
    test('with correct credentials works', async ({ page })=>{
      await loginHelper.loginWithUserIndex(page, 1)
      const notification = page.getByText("Invalid credentials")
      await expect(notification).not.toBeVisible()
      const greeter = page.getByText(`${userDb[1].name} logged in`)
      await expect(greeter).toBeVisible()
  
    })
  
    test('with wrong credentials doesnt work', async ({ page })=>{
      await loginHelper.loginWithUserIndex(page, 0)
      const notification = page.getByText("Invalid credentials")
      await expect(notification).toBeVisible()
    })

  })
 

  describe("When logged in", ()=>{
    beforeEach( async ({page}) =>{
      await loginHelper.loginWithUserIndex(page, 1)
    })

    test("a new blog can be created", async ({page})=>{
      const testData = {
        title: "test title",
        author: "test author",
        url : "test url"
      }
      const blogButton = page.getByText("Post a new blog")
      await expect(blogButton).toBeVisible()
      await blogButton.click()

      const blogForm = page.getByTestId("blogForm")
      await expect(blogForm).toBeVisible()


      const formTitle = page.getByTestId("title")
      const formAuthor = page.getByTestId("author")
      const formUrl = page.getByTestId("url")
      await formTitle.fill(testData.title)
      await formAuthor.fill(testData.author)
      await formUrl.fill(testData.url)
      const submitButton = page.getByTestId("submit")
      await submitButton.click()


      const blog = page.getByText(testData.title)
      const notification = page.getByText("Blog has successfully been posted")
      await expect(blog).toBeVisible()
      await expect(notification).toBeVisible()
    })

    test('Blogs can be liked', async ({page})=>{
      blogHelper({page})
      const viewButton = page.getByText("View")
      await viewButton.click()
      await expect(page.getByText("0 likes")).toBeVisible()
      const likeButton = page.getByTestId("like")
      await likeButton.click()
      await expect(page.getByText("1 likes")).toBeVisible()
      await likeButton.click()
      await expect(page.getByText("0 likes")).toBeVisible()
    })

    test('Blog can be deleted by the author', async ({page})=>{
      blogHelper({page})
      const viewButton = page.getByText("View")
      await viewButton.click()
      const deleteButton = page.getByTestId("delete")
      page.on('dialog',  dialog => dialog.accept() )
      await deleteButton.click()
      await expect(page.getByText("test title")).not.toBeVisible()

    })

    test('Only blog author can see the delete button', async ({page, request})=>{
      await loginHelper.createWithUserIndex(request, 0)
      await blogHelper({page})
      const logoutButton = page.getByTestId('logout')
      await logoutButton.click()    
      await loginHelper.loginWithUserIndex(page, 0)
      await expect(page.getByText("Mikhail Tarabtsev")).toBeVisible()
      const viewButton = page.getByText("View")
      await viewButton.click()
      await expect(page.getByTestId("delete")).not.toBeVisible()

    })
  })
})