import { WeatherSchema } from "./schemas/weatherSchema"
import { AirPollutionSchema } from "./schemas/AirPollutionSchema"

const API_KEY = import.meta.env.VITE_API_KEY

export async function getWeather({lat, lon}: {lat: number, lon: number}) {
    const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&lang=en&appid=${API_KEY}`)
    
const data = await res.json()
return WeatherSchema.parse(data)
}

export async function getAirPollution({lat, lon}: {lat: number, lon: number}) {
    const res = await fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
    const data = await res.json()
    return AirPollutionSchema.parse(data)
}



