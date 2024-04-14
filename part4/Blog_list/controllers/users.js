const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.post('/', async (req,res) =>{
    const {username, name, password} = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        passwordHash,
        name
    })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

usersRouter.get('/', async (req,res)=>{
    const usersInDb = await User.find({})
    const usersToSend = usersInDb.map(u => u.toJSON())
    res.status(200).json(usersToSend)
})
module.exports = usersRouter


