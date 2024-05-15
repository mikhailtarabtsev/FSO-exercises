const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcryptjs')

usersRouter.post('/', async (req,res,next) =>{
        try {
        const {username, name, password} = req.body
        if(password.length < 4) {
            res.status(400).json({error : 'Minimum required password length is 3 characters'})
        } 
        else{
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)
            const user = new User({
                username,
                passwordHash,
                name
            })
            const savedUser = await user.save()
            res.status(201).json(savedUser)
        }
    }
    catch(err){
        next(err)
    }
})

usersRouter.get('/', async (req,res)=>{
    const usersInDb = await User.find({}).populate('blogs')
    const usersToSend = usersInDb.map(u => u.toJSON())
    res.status(200).json(usersToSend)
})
module.exports = usersRouter


