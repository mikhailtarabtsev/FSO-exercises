import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Display from './components/display'



const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [weather, setWeather] = useState(null)


const changeHandler = (event=>{
  const inputValue = event.target.value
  setSearch((prev) => {
    const searchValue = inputValue
    setSearchResult(countries.filter(country =>country.name.common.toLowerCase().includes(searchValue.toLowerCase())))
  
  })
  
  
})

useEffect(()=>{
  countryService.getAll()
    .then(res=>setCountries(res))
  },[])

const clickHandler = (id) => {
   countryService.getOne(id)
   .then(res =>{  
    setSearchResult([res])
    })
    
   
} 

return (
  <>
  <input type="text" onChange={changeHandler} />
  <Display
   result= {searchResult}
   handler = {clickHandler}
   weather= {weather}
   setWeather={setWeather} />

  </>
)

}
export default App
