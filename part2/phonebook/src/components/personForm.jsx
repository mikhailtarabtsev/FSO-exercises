const Form = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber})=>{

    const nameHandler = (event) => {
        setNewName(event.target.value)
         }
    const numberHandler = (event) => {
        setNewNumber(event.target.value)
        }

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
    

    return(
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

    )
}
export default Form