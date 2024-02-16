const Contact = ({person, deleteHandler}) => {

    const deleter = () =>{
        if( window.confirm(`Are you sure you want to delete ${person.name} from your contact list`)){
            deleteHandler(person.id)
        }
        
    }
    return (
        <div key={person.id}>{person.name} : {person.number} <button onClick={deleter}>delete</button></div>
       
    )
}

export default Contact