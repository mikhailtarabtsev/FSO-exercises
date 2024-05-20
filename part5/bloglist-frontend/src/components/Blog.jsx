import { useEffect, useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, user, setBlogs }) => {

  const[extendedView, setExtendedView] = useState(false)
  const [liked, setLiked] = useState(null)

  useEffect(()=>{
    likeSetter()
  }, [])

  const likeSetter = () => {
    if (blog.likedBy.includes(user.id)){
      setLiked(true)
    }
    else if(!blog.likedBy.includes(user.id)){
      setLiked(false)
    }
  }

  const likeToggler = () =>{
    setLiked(!liked)
  }
  const viewToggler = () =>{
    setExtendedView(!extendedView)
  }

  const likeHandler = async (id) =>{
    blogService.setToken(user.token)
    await blogService.updateLikes(id)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
    likeToggler()
  

  }
  const blogStyle = {
    border: "1px solid",
    padding : "10px 0 0 2px",
    marginBottom : 5
  }

  

  return ( extendedView 
  ? <div style = {blogStyle }>
    <p>{blog.title}<em> by </em>{blog.author} <button onClick={viewToggler}>Hide</button></p>
    <p>{blog.url}</p>
    <p> {blog.likedBy.length} likes<button onClick={()=>likeHandler(blog.id.toString())}>{liked === false? "Like": "Unlike" }</button></p>
    <p><b>{blog.user.name}</b></p>

   </div> 
  : <div style = {blogStyle}>
      {blog.title} <em> by </em> {blog.author}
      <button onClick={viewToggler}>View</button>
    </div>  
  )


}
  


export default Blog