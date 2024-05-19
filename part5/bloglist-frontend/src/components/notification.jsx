import { forwardRef, useImperativeHandle, useState } from "react"

const Notification = forwardRef((props, ref) =>{

const [notification, setNotification] = useState(null)


const notificationUpdate = (obj)=>{
    setNotification(obj)
}

useImperativeHandle(ref, ()=> {
    return{
        notificationUpdate,
        notificationText : notification? notification.text :null,
    }
})

return (   notification? <div style ={{
    padding : "20px",
    fontSize: "16px",
    fontFamily: "tahoma",
    border: notification.error? "3px solid red" : "3px solid green",
    backgroundColor : "gray"
}}>{ notification? notification.text : null}</div> :null
)
})

export default Notification