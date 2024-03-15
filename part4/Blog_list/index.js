const express = require('express')
const app = express()
const cors = require('cors')
const {mongoUrl, port} = require('./utils/config')
const mongoose = require('mongoose')


const Blog = require('./models/blog')

mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})