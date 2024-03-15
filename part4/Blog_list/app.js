const express = require('express')
const app = express()
const cors = require('cors')
const {mongoUrl} = require('./utils/config')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')



mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
