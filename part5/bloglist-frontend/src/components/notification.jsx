const Notification = (props) =>{

const [notification, setNotification] = useState(null)

return (  <div style ={{
    padding : "20px",
    fontSize: "16px",
    fontFamily: "tahoma",
    border: notification.error? "3px solid red" : "3px solid green",
    backgroundColor : "gray"
}}>{ notification? notification.text : null}</div>
)
}

export default Notification