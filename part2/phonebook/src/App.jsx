import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const submitHandler = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      id: persons.length+1
    }
    setPersons(persons.concat(personObject))
    setNewName("")

  }
  const changeHandler = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input 
                value={newName}
                onChange={changeHandler} />
        </div>
        <div>
          <button 
          onClick={submitHandler}
          type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( person => (
        <div key={person.id}>{person.name}</div>
      ))}
    </div>
  )
}

export default App