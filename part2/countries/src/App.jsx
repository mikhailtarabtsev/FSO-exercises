import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Display from './components/display'


const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [searchResult, setSearchResult] = useState([])


const changeHandler = (event=>{
  setSearch(event.target.value)
  setSearchResult(countries.filter(country =>country.name.common.toLowerCase().includes(search.toLowerCase())))
  
})

useEffect(()=>{
  countryService.getAll()
  .then(res=>setCountries(res))
}
  ,[])

return (
  <>
  <input type="text" onChange={changeHandler} />
  <Display result= {searchResult} />

  </>
)

}
export default App
