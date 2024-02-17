const Message = ({message}) => {

    const messageSuccessStyle = {
        backgroundColor: "grey",
        fontSize: "2em",
        fontStyle: "italic",
        borderStyle: "solid",
        borderWidth: 4,
        borderRadius : 10,
        textAlign: "center",
        width: "10em",
        margin: 20,
        color : "green",
        borderColor: "green"
    }

    const messageFailStyle = {
        ...messageSuccessStyle,
        color:"red",
        borderColor:"red"
    }

    if(!message.isRendered){
        return null
    }
    if(message.error){
            return(
                <div style={messageFailStyle}>{message.text}</div>
            )
        }
        return(
            <div style={messageSuccessStyle}>{message.text}</div>
            )
    
    
    

    
}
export default Message