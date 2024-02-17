import { useState, useEffect } from 'react'
import axios from "axios"
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
  console.log("effect")
  axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(res => setCountries(res.data) )},[])

return (
  <>
  <input type="text" onChange={changeHandler} />
  <Display result= {searchResult} />

  </>
)

}
export default App
