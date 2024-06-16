const testUsers = require("./testUsers")

const loginWithUserIndex = async (page, userIndex ) =>{
    const user = testUsers[userIndex]

    await page.getByTestId('username').fill(user.username)
    await page.getByTestId("password").fill(user.password)
    await page.getByTestId("loginButton").click()
}


const createWithUserIndex = async (req, userIndex) =>{
    const user = testUsers[userIndex]
    await req.post("/api/users", {
        data: user
    })
}


module.exports = {loginWithUserIndex, createWithUserIndex}