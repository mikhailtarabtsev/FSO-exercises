const axios = require("axios")

const singleBlogHelper = async ({page}) =>{

    const testData = {
        title: "test title",
        author: "test author",
        url : "test url"
      }
      const blogButton = await page.getByText("Post a new blog")
      await blogButton.click()
      const formTitle = await page.getByTestId("title")
      const formAuthor = await page.getByTestId("author")
      const formUrl = await page.getByTestId("url")
      await formTitle.fill(testData.title)
      await formAuthor.fill(testData.author)
      await formUrl.fill(testData.url)
      const submitButton = await page.getByTestId("submit")
      await submitButton.click()
      await page.getByText(testData.title).waitFor()

}

const tripleBlogHelper = async (userToken) => {
  const randomIds = [
    "661c2c7620c19a047f620611",
    "677b907baf20bacc735e9542",
    "677b90936f44c7ef999b73ba",
    "677b90a1214a64c7f4b225bc",
    "677b911592804d10640e8ccc",
    "677b911eb8bd8f8988c949e6"
  ]

  const testData = [
    {
      title: "first blogpost",
      author: "first author",
      url: "first url",
      likedBy: [randomIds[0], randomIds[1]]
    },
    {
      title: "second blogpost",
      author: "second author",
      url: "second url",
      likedBy: [randomIds[0], randomIds[1], randomIds[3], randomIds[5]]
    },
    {
      title: "third blogpost",
      author: "third author",
      url: "third url",
      likedBy: randomIds
    }
  ]


  for (let i = 0; i < testData.length; i++) {    
      try {
        const baseUrl = 'http://localhost:3000/api/blogs'
        const token = `Bearer ${userToken}`
        const config = {
          headers: { Authorization: token }
        }
        const res = await axios.post(baseUrl, testData[i], config)
      
        
      } catch (err) {
        
        console.log(`Error creating blog number ${i + 1}`)
        }
    await new Promise(resolve => setTimeout(resolve, 500))
  }
}

module.exports = {singleBlogHelper,tripleBlogHelper}