require ('dotenv').config()
const mongoUrl = process.env.MONGODB_URL
const port = process.env.PORT || 3003
module.exports = {
    mongoUrl,
    port
}