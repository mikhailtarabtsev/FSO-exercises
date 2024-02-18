import { useEffect } from "react";
import weatherService from "../services/weather"

const Country = ({result, weather, setWeather}) =>{
    
    useEffect(() =>
    
    {
        weatherService.getWeather(result.latlng[0],result.latlng[1])
            .then(res => setWeather(res))
            .catch(err=> console.log("something broken", err))}
        ,[]) 
    
    const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` 
        return (
            <>
                <h2>{result.name.common}</h2>
                    <p>Capital: {result.capital[0]}</p>              
                    <p>Total area: {result.area}</p>
                <h3>Languages</h3>
                    <ul>
                    {Object.entries(result.languages).map(([key, value]) => (<li key = {key}>{value}</li>))}
                    </ul>
                <img style={{width: 500}} src={result.flags.svg} alt={result.flags.alt} />

                <h3>Weather in {result.capital[0]}</h3>
                    <p>Temperature : {Math.floor(weather.main.temp-273)}°</p>
                    <img src={weatherIcon} alt={weather.weather[0].description} />
                    <p>Wind: {weather.wind.speed} m/s</p>

                
            </>
        )

   
}
export default Country