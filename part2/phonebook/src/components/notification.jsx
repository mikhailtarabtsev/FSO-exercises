const Message = ({message}) => {

    const messageSuccessStyle = {
        backgroundColor: "grey",
        color : "green",
        fontSize: "2em",
        fontStyle: "italic",
        borderStyle: "solid",
        borderWidth: 4,
        borderRadius : 10,
        borderColor: "green",
        textAlign: "center",
        width: "10em",
        margin: 20
    }

    if(!message){
        return null
    }
    return(
    <div style={messageSuccessStyle}>{message}</div>
        )

}
export default Message