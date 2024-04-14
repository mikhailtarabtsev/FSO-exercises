const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {

  try {
    const blogs = await Blog.find({})
    res.json(blogs)
  
  }
  catch{res.status(500)}
})
  
blogsRouter.post('/', async (req, res) => {
   try {const blog = new Blog(req.body)
        if(!req.body.title){
          res.status(400).end()
        }
        else if (!req.body.url){
          res.status(400).end()
        }
        else{
          const result = await blog.save()
          res.status(201).json(result)}
        }
        
    catch(err){next(err)}
  })

blogsRouter.delete('/:id', async (req, res, next) =>{
  try{
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }
  catch(err){
    next(err)
  }  
})

blogsRouter.put('/:id', async (req,res, next) =>{
  try{
    const body = req.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes

    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    res.status(200).json(updatedBlog)
  }
  catch(err){
    next(err)
  }
})
  

module.exports = blogsRouter