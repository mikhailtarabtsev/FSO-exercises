const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        minLength : [3, 'Username needs to be at least 3 characters long'],
        required : [true, 'Username is required to proceed'],
        
    },
    passwordHash : {
        type: String,
        required : true
    },
    name : String
})

userSchema.set('toJSON', {
    transform:(document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User