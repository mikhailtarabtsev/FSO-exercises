const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  
  }
  catch{response.status(500)}
})
  
blogsRouter.post('/', async (request, response) => {
   try {const blog = new Blog(request.body)
        if(!request.body.title){
          response.status(400).end()
        }
        else if (!request.body.url){
          response.status(400).end()
        }
        else{
          const result = await blog.save()
          response.status(201).json(result)}
        }
        
    catch(err){next(err)}
  })

  

module.exports = blogsRouter