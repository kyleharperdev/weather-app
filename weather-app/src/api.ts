import { WeatherSchema } from "./schemas/weatherSchema"

const API_KEY = import.meta.env.VITE_API_KEY

export async function getWeather({lat, lon}: {lat: number, lon: number}) {
       console.log('fetching weather', lat, lon, API_KEY)
    const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&lang=en&appid=${API_KEY}`)
    
const data = await res.json()
console.log('raw response', data)
return WeatherSchema.parse(data)
}

