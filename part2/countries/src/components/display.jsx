import Country from "./country"

const Display = ({result, handler, weather, setWeather}) => {

    if (result.length===1){
        return(
            <Country result={result[0]} weather= {weather} setWeather = {setWeather}/>
        )
    }
    else if(result.length <= 10){
        return(
            <ul>{result.map(
                (country) => <li key={country.name.common}>{country.name.common} <button onClick={() => handler(country.name.common)}>Show</button></li>
                
                )}</ul>)
    }

    return (
        <>
        <p>Too many results, please make query more specific</p>
        </>
    )




   
}
export default Display