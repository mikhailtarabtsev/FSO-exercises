import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const loginHandler = async (event) =>{
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    }catch(err){
      setErrorMessage('Invalid credentials')
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
    }
    

  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  const loginForm = () =>(
    <form onSubmit={loginHandler}>
      
      <h1>Log in to application</h1>

      <div>
        <h3>Username</h3>
        <input 
          type="text"
          value={username}
          onChange={({target})=>setUsername(target.value)} 
        />
      </div>
      <div>
        <h3>Password </h3> 
        <input 
          type="password"
          value={password}
          onChange={({target})=>setPassword(target.value)} 
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  )

  const blogList = () =>(
    <div>
    <h2>Blogs</h2>
    <p><strong>{user.name}</strong> logged in</p>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
  )

  return (
    <>
    <div>{errorMessage}</div>
    <div>
      {
      user === null
      ? loginForm()
      : blogList()
      }
    </div>
    </>
  )
 
}

export default App