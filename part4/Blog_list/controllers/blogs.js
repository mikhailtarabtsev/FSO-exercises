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
  
blogsRouter.post('/', async (req, res, next) => {
   try {
    const body = req.body  
    if(!req.user){
      return res.status(401).json({error: "You need to be logged in"})
    }
    const user = req.user
    const blog = new Blog({
      title: body.title,
      author: body.author,
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
        
    catch(err){ next(err)}
  })

blogsRouter.delete('/:id', async (req, res, next) =>{
  const id = req.params.id
  const blog = await Blog.findById(id)
  const userId = blog.user.toString()

  if(req.user.id === userId){
    try{
      await Blog.findByIdAndDelete(id)
      res.status(204).end()
    }
    catch(err){
      next(err)
    } 
  }
  else{
    res.status(401).json({error:"unauthorized user"})
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
    let likes = likingUser.likes
    let likedBy = likedBlog.likedBy

    if(likes.includes(id)){
      
      const index = likes.indexOf(id)
      likes.splice(index, 1)
      await likingUser.save()
      

      const userIndex = likedBy.indexOf(likingUser._id.toString())
      likedBy.splice(userIndex, 1)
      await likedBlog.save()

     return res.status(200).json({message : "Unliked"})

    }
    else if(!likes.includes(id)){
      likes.push(id)
      await likingUser.save()

      likedBy.push(likingUser._id.toString())
      await likedBlog.save()

    return  res.status(200).json({message : "Liked"})

    }


  }catch (err){next(err)}

} )
  

module.exports = blogsRouter