import Contact from "./contact"

const Contacts = ({found, persons, deleteHandler}) => {
return(
    <>
    {found.length > 0 ? (
        found.map((person) => (
          <Contact key={person.id}
                   person = {person}
                   deleteHandler = {deleteHandler}
          />
        ))
      ) : (
        persons.map((person) => (
          <Contact key={person.id}
                   person = {person}
                   deleteHandler = {deleteHandler}
          />
           
          
        ))
      )}
      </>
      )
}
export default Contacts