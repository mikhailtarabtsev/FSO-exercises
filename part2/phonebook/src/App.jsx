import { useState } from 'react'

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

  const submitHandler = (event) => {
    event.preventDefault();
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
    setNewNumber("")
  }

  const nameHandler = (event) => {
    setNewName(event.target.value)
  }
  const numberHandler = (event) => {
    setNewNumber(event.target.value)
  }
  const searchHandler = (event) => {
    const searchValue = event.target.value
    setSearch(searchValue)

    setFound(persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase())))
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with
        <input type="text"
              value={search}
              onChange={searchHandler} />
      </div>
      
      <form>
        <div>
          name: <input 
                value={newName}
                onChange={nameHandler} />
        </div>
        <div>
          number: <input 
                  value={newNumber}
                  onChange={numberHandler} />
        </div>
        <div>
          <button 
          onClick={submitHandler}
          type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {found.length > 0 ? (
      found.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))
    ) : (
      persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))
    )}
    </div>
  )
}

export default App