import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ setUser, setNotification }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(err){
      setNotification({ text :'Invalid credentials', error: true })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <form data-testid = "login" onSubmit={loginHandler}>

      <h1>Log in to application</h1>

      <div>
        <h3>Username</h3>
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <h3>Password </h3>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  )
}

export default LoginForm