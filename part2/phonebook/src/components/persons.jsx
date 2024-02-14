const Contacts = ({found, persons}) => {
return(
    <>
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
      </>
      )
}
export default Contacts