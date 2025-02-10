const testUsers = require("./testUsers")
const axios = require("axios")

const loginWithUserIndex = async (page, userIndex ) =>{
    const user = testUsers[userIndex]

    await page.getByTestId('username').fill(user.username)
    await page.getByTestId("password").fill(user.password)
    await page.getByTestId('loginButton').waitFor();
    await page.getByTestId("loginButton").click({force:true})
}


const createWithUserIndex = async (req, userIndex, res) =>{
    const user = testUsers[userIndex]
    await axios.post("http://localhost:3000/api/users", {
        username: user.username,
        name: user.name,
        password: user.password
    })
}

const loginWithApi = async (req, res) =>{
   const user = testUsers[1]
   const response = await axios.post("http://localhost:3000/api/login/",{
        username: user.username,
        name: user.name,
        password: user.password
   })
   return response.data.token
}

module.exports = {loginWithUserIndex, createWithUserIndex, loginWithApi}