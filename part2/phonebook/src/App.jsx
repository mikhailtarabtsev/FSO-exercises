import { useState, useEffect } from 'react'
import axios from "axios"
import Filter from "./components/filter"
import Form from "./components/personForm"
import Contacts from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [found, setFound] = useState([])

  

  useEffect(()=> {
    axios
      .get("http://localhost:3001/persons")
      .then(res =>{
        setPersons(res.data)
      })
  },[])
  
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
      case "submit" : event.preventDefault();
        if (persons.find(person => person.name === newName)){
            alert(`${newName} already exists in your contacts`)
        }
        else if (persons.find(person => person.number === newNumber)){

            alert(`${newNumber} is already registered in your contacts`)
        }
        else
        {const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length+1
            }
        setPersons(persons.concat(personObject))
        }
        setNewName("")
        setNewNumber("");
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

      <Form persons ={persons}
            newName = {newName}
            newNumber={newNumber}
            handler = {changeHandler}/>

      <h3>Numbers</h3>

      <Contacts found={found}
                persons={persons}/>
   
    </div>
  )
}

export default App