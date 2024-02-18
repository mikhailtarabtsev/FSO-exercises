import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY



const getWeather = (lat, lon) => {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    const request =  axios.get(baseUrl)
    return request.then(res => res.data)

}

export default {
    getWeather
}