import Contact from "./contact"

const Contacts = ({found, persons}) => {
return(
    <>
    {found.length > 0 ? (
        found.map((person) => (
          <Contact key={person.id}
                   person = {person}
          />
        ))
      ) : (
        persons.map((person) => (
          <Contact key={person.id}
                   person = {person}
          />
           
          
        ))
      )}
      </>
      )
}
export default Contacts