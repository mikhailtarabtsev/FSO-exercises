import { useState, useEffect, useRef } from 'react'
import Switch from './switch'
import Blog from './Blog'
import BlogForm from './blogForm'
import blogService from '../services/blogs'

const LoggedInUi = ({ user, setUser, setNotification }) => {
  const [blogs, setBlogs] = useState([])
  const blogsSorted = blogs.sort((a,b) =>  b.likedBy.length - a.likedBy.length)
  const blogFormRef = useRef()

  const logOutHandler = () => {
    localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  const toggler = () => {blogFormRef.current.toggleVisibility()}

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <p><b>{user.name}</b> logged in</p>
        <button data-testid = "logout" onClick = {logOutHandler}>Log out</button>
      </div>
      <div>
        <Switch
          data-testid = "post"
          label = "Post a new blog"
          ref = {blogFormRef}
        >
          <BlogForm setNotification = {setNotification}
            setBlogs = {setBlogs}
            user = {user}
            toggler = {toggler} />
        </Switch>
        <div>
          <h3>Blogs submitted</h3>
          {blogsSorted.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} setBlogs = {setBlogs} />
          )}
        </div>
      </div>
    </div>
  )
}
export default LoggedInUi