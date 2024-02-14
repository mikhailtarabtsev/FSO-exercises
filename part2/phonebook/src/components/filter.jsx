const Filter =({search, setSearch, persons, setFound})=> {
    const searchHandler = (event) => {
        const searchValue = event.target.value
        setSearch(searchValue)
        setFound(persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase())))
        
      }
    return(
    <div>filter shown with: <input value={search}
                                   onChange={searchHandler} />
    </div>
    )
}

export default Filter
