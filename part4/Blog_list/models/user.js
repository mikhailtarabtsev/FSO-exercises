const mongoose = require('mongoose')
const Blog = require('./blog')

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
    name : String,
    blogs: [
        {   type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
})

userSchema.set('toJSON', {
    transform:(document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
        delete returnedObject.blogs
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User