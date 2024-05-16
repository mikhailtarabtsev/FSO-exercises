import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  useEffect(()=>{
    const loggedInUserJson = localStorage.getItem("loggedInUser")
    if(loggedInUserJson){
      const appUser = JSON.parse(loggedInUserJson)
      setUser(appUser)
    }
  },[])


  const loginHandler = async (event) =>{
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})
      localStorage.setItem("loggedInUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(err){
      setNotification({text :'Invalid credentials', error: true})
      setTimeout(()=>{
        setNotification(null)
      }, 5000)
    }
  }

  const logOutHandler = () =>{
    localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const blogHandler = async (event) =>{
    event.preventDefault()
    try{
      blogService.setToken(user.token)
      await blogService.create({title, author, url})
      setTitle("")
      setAuthor("")
      setUrl("")
      const newBlogs =  await blogService.getAll()
      setBlogs(newBlogs)
      setNotification({text: "Blog has successfully been posted", error : false})
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    }catch(err){
      setNotification({text:"Something went wrong", error : true})
      setTimeout(() => {
        setNotification(null)
      }, 5000);
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

  const loggedInUI = () =>(
    <div>
    <h2>Blogs</h2>
      <div>
        <p><strong>{user.name}</strong> logged in</p>
        <button onClick = {logOutHandler}>Log out</button>
      </div>
    <div>
      <div>
        <form onSubmit={blogHandler}>
          <h3>Make an new blog</h3>
          <div>
            <b>Title:  </b>
            <input 
              type="text"
              value={title}
              onChange={({target})=>setTitle(target.value)}
            />
          </div>
          
          <div>
          <b>Author:  </b>
           <input
            type="text"
            value={author}
            onChange={({target})=>setAuthor(target.value)}
            />
          </div>

          <div>
            <b>Url:  </b>
           <input 
            type="text"
            value={url}
            onChange={({target})=>setUrl(target.value)} />
          </div>
          <button style={{margin:"15px 20px"}} type='submit'>Create</button>
        </form>

      </div>
      <div>
        <h3>Blogs submitted</h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  </div>
  )

  const notificationComponent = () => {
   return (  <div style ={{
                  padding : "20px",
                  fontSize: "16px",
                  fontFamily: "tahoma",
                  border: notification.error? "3px solid red" : "3px solid green",
                  backgroundColor : "gray"
          }}>{ notification? notification.text : null}</div>
)}
  
  
  
  return (
    <>
    <div>
    {notification ? notificationComponent() : null }
    </div>
    <div>
      {
      user === null
      ? loginForm()
      : loggedInUI()
      }
    </div>
    </>
  )
 
}

export default App