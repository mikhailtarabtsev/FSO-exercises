import { useState, useEffect } from 'react'
import Filter from "./components/filter"
import Form from "./components/personForm"
import Contacts from './components/persons'
import contactService from './services/contact'
import Message from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [found, setFound] = useState([])
  const [message, setMessage] = useState({
    text:null,
    error:false,
    isRendered:false
  })

  

  useEffect(()=> {
    contactService
      .getAll()
      .then(res =>{
        setPersons(res)
      })
  },[])

  const deleteHandler = (id) =>{
    contactService
      .remove(id)
      .then(res => {
        setPersons((prevPersons) => prevPersons.filter(person => person.id !== id))
        setMessage({
          text:`Contact has been deleted succesfully!`,
          error: false,
          isRendered:true
      })
        setTimeout(()=>setMessage({...message, isRendered : false}), 5000)
      })
      .catch(err => console.log(err.data))
  }


 const formSubmit = (event) =>{ 
  event.preventDefault();
  const personObject = {
        name: newName,
        number: newNumber
        }
  const duplicate = persons.find(person => person.name === newName)

  if (duplicate){
     if (window.confirm(`${duplicate.name} is already in your contact list. Would you like to update their number?`))
      {
      contactService
          .update(duplicate.id, personObject)
          .then(res => {
            setPersons((prevPersons) => prevPersons.map( person => person.id !== duplicate.id ? person : res ))
            setNewName("")
            setNewNumber("")
            setMessage({
              text:`"${duplicate.name}" contact has been updated successfully!`,
              error: false,
              isRendered:true
          })
            setTimeout(()=>setMessage({...message, isRendered : false}), 5000)
            })
          .catch(err => {
            setMessage({
            text: err.response.data.error,
            error: true,
            isRendered:true})
            setTimeout(()=>setMessage({...message, isRendered : false}), 5000) })
          }
     }
  
  else
    {
    contactService 
        .create(personObject)
        .then(res=> {
          setMessage({
            text:`"${personObject.name}" contact has been created!`,
            error: false,
            isRendered:true
        })
          setPersons(persons.concat(res))
          setNewName("")
          setNewNumber("")
          setTimeout(()=>setMessage({...message, isRendered : false}), 5000)
        })
        .catch(err =>{
          setMessage({
            text: err.response.data.error,
            error:true,
            isRendered: true
          })
          setTimeout(()=>setMessage({...message, isRendered : false}), 5000)
        })
    
    }
    
 }
  
  const changeHandler = (action, event)=> {
    const inputValue = event.target.value
    switch (action){
      case "phone" : 
        setNewNumber(inputValue);
        break;
      case "name":
        setNewName(inputValue);
        break;
      case "filter":  const searchValue = inputValue
        setSearch(searchValue)
        setFound(persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase())));
        break;
      default: console.log("This isn't supposed to happen")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={search}
              handler={changeHandler}
             />
      
      <h3>Add a new contact</h3>
      <Message message={message} />

      <Form persons ={persons}
            newName = {newName}
            newNumber={newNumber}
            setPersons = {setPersons}
            handler = {changeHandler}
            submit = {formSubmit}/>

      <h3>Numbers</h3>

      <Contacts found={found}
                persons={persons}
                deleteHandler = {deleteHandler}/>
   
    </div>
  )
}

export default App