const express = require('express')
const app = express()
const cors = require('cors')
const {mongoUrl} = require('./utils/config')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const requestLogger = require('./middleware/requestLogger')
const corrector = require('./middleware/errorhandler')



mongoose.connect(mongoUrl)
app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(corrector.unknownEndpoint)
app.use(corrector.errorHandler)

module.exports = app
