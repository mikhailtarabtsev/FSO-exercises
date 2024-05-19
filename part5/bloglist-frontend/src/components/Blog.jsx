import { useState } from "react"

const Blog = ({ blog }) => {

  const[extendedView, setExtendedView] = useState(false)
  const viewToggler = () =>{
    setExtendedView(!extendedView)
  }
  const blogStyle = {
    border: "1px solid",
    padding : "10px 0 0 2px",
    marginBottom : 5
  }



  return ( extendedView 
  ? <div style = {blogStyle }>
    <p>{blog.title}{blog.author} <button onClick={viewToggler}>Hide</button></p>
    <p>{blog.url}</p>
    <p>{blog.likes}<button>Like</button></p>
    <p><b>{blog.user.name}</b></p>

   </div> 
  : <div style = {blogStyle}>
      {blog.title} {blog.author}
      <button onClick={viewToggler}>View</button>
    </div>  
  )


}
  


export default Blog