const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const url = process.env.MONGODB_URL
console.log("connecting to", url)

mongoose.connect(url)
    .then(result => {
        console.log("connected to the db")
    })
    .catch( err => {
        console.log("error connecting:", err.message)
    })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

contactSchema.set("toJSON", {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Contact", contactSchema)