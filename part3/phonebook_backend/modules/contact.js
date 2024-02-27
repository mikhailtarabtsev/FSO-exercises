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
    name:{
        type: String,
        minLength: 3,
        required: [true, "User name is required"]
    },
    number:{
        type: String,
        required: [true, "Phone number required"],
        validate: {
            validator: (v) => {
                return /^\d{2,3}-\d+$/.test(v)
                },
            message: "Incorrect phone number format"
        }
    }
})

contactSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Contact", contactSchema)