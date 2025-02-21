const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require("mongoose")

blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user')
    res.json(blogs)
  }

  catch{res.status(500)}
})
  
blogsRouter.post('/', async (req, res, next) => {
   try {
    const body = req.body  
    if(!req.user){
      return res.status(401).json({error: "You need to be logged in"})
    }
    const user = req.user


    let likedBy = []

    if(process.env.NODE_ENV === "test" && body.likedBy && body.likedBy.length !==0){
      likedBy = body.likedBy.map(username=>username)
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user : user.id,
      likedBy: likedBy
      
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
        
    catch(err){ next(err)}
  })

blogsRouter.delete('/:id', async (req, res, next) =>{
  const id = req.params.id
  
  if(!req.user){
   return res.status(401).json({error: "unauthorised user"})
  }
 
  const blog = await Blog.findById(id)
  const userId = blog.user.toString()
  const user = await User.findById(userId)
  if(req.user.id === userId){
    try{
      await Blog.findByIdAndDelete(id)
      const index = user.blogs.indexOf(id)
      user.blogs.splice(index, 1)
      await user.save()
      
     return res.status(204).end()
    }
    catch(err){
      next(err)
    } 
  }
  else{
   return res.status(401).json({error:"unauthorized user"})
  }
  
})

blogsRouter.put('/:id', async (req,res, next) =>{
  try{
    const body = req.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likedBy.length

    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    res.status(200).json(updatedBlog)
  }
  catch(err){
    next(err)
  }
})

blogsRouter.put('/:id/like', async (req,res,next) =>{
  try{
    const id = req.params.id.toString()
    const user = req.user

    if(!user){
     return res.status(401).json({error: "unauthorised user"})
    }


    const likedBlog = await Blog.findById(id).populate("user")
    const likingUser = await User.findById(user.id).populate('blogs')

    let username = likingUser.username
    let likes = likingUser.likes
    let likedBy = likedBlog.likedBy

    if(likedBy.includes(username)){
      
      const userIndex = likedBy.indexOf(username)
      likedBy.splice(userIndex,1 )
      await likedBlog.save()

      const blogIndex = likes.indexOf(id)
      likes.splice(blogIndex, 1)
      await likingUser.save()


     return res.status(200).json({message : "Unliked"})

    }
    else if(!likes.includes(id)){
      likes.push(id)
      await likingUser.save()

      likedBy.push(username)
      await likedBlog.save()

    return  res.status(200).json({message : "Liked"})

    }


  }catch (err){next(err)}

} )
  

module.exports = blogsRouter