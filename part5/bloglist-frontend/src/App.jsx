import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/loginForm'
import LoggedInUi from './components/LoggedInUi'
import Notification from './components/notification'


const App = () => {

  const [user, setUser] = useState(null)
  const notificationRef = useRef()

  const setNotification = (obj) => {
    notificationRef.current.notificationUpdate(obj)
  }
  useEffect(() => {
    const loggedInUserJson = localStorage.getItem('loggedInUser')
    if(loggedInUserJson){
      const appUser = JSON.parse(loggedInUserJson)
      setUser(appUser)
    }
  },[])


  return (
    <>
      <div>
        <Notification ref={notificationRef} />
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