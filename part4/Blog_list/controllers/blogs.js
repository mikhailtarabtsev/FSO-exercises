const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {

  try {
    const blogs = await Blog.find({}).populate('user')
    res.json(blogs)
  
  }
  catch{res.status(500)}
})
  
blogsRouter.post('/', async (req, res) => {
   try {
    const body = req.body
    const user = await User.findById(body.userId)
    const blog = new Blog({
      title: body.title,
      author: body.name,
      url: body.url,
      user : user.id

    })
        if(!req.body.title){
          res.status(400).end()
        }
        else if (!req.body.url){
          res.status(400).end()
        }
        else{
          const result = await blog.save()
          user.blogs = user.blogs.concat(result._id)
          await user.save()
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