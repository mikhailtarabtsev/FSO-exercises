const blogHelper = async ({page}) =>{

    const testData = {
        title: "test title",
        author: "test author",
        url : "test url"
      }
      const blogButton = page.getByText("Post a new blog")
      await blogButton.click()
      const formTitle = page.getByTestId("title")
      const formAuthor = page.getByTestId("author")
      const formUrl = page.getByTestId("url")
      await formTitle.fill(testData.title)
      await formAuthor.fill(testData.author)
      await formUrl.fill(testData.url)
      const submitButton = page.getByTestId("submit")
      await submitButton.click()

}

module.exports = blogHelper