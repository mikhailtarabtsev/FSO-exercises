import { useState, useEffect } from 'react'
import LoginForm from './components/loginForm'
import LoggedInUi from './components/LoggedInUi'


const App = () => {
  
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  
  useEffect(()=>{
    const loggedInUserJson = localStorage.getItem("loggedInUser")
    if(loggedInUserJson){
      const appUser = JSON.parse(loggedInUserJson)
      setUser(appUser)
    }
  },[])


  return (
    <>
    <div>
   {/*notification ? notificationComponent() : null*/ }
    </div>
    <div>
      {
      user === null
      ? <LoginForm 
          setUser={setUser}
          setNotification={setNotification} />
      : <LoggedInUi
          user = {user}
          setUser = {setUser}
          setNotification = {setNotification}
           />
      }
    </div>
    </>
  )
 
}

export default App