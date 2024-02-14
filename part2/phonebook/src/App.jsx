import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "0441102252",
      id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map( person => (
        <div key={person.id}>{person.name} {person.number}</div>
      ))}
    </div>
  )
}

export default App