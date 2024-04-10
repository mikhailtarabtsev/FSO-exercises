require ('dotenv').config()
const mongoUrl =process.env.NODE_ENV ==='test' 
? process.env.MONGODB_TEST_URI
: process.env.MONGODB_URI
const port = process.env.PORT || 3003
module.exports = {
    mongoUrl,
    port
}