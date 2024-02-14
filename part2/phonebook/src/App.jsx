import { useState } from 'react'
import Filter from "./components/filter"
import Form from "./components/personForm"
import Contacts from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [found, setFound] = useState([])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={search}
              setSearch={setSearch}
              persons={persons}
              setFound={setFound} />
      
      <h3>Add a new contact</h3>

      <Form persons ={persons}
            setPersons={setPersons}
            newName={newName}
            setNewName={setNewName}
            newNumber={newNumber}
            setNewNumber={setNewNumber}/>

      <h3>Numbers</h3>

      <Contacts found={found}
                persons={persons}/>
   
    </div>
  )
}

export default App