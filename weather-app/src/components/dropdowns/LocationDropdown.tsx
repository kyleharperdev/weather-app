
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
    setLocation: (location: {lat: number, lon: number }) => void
    selectedCity: string
    setSelectedCity: (city: string) => void
}

export default function LocationDropdown({ setLocation, selectedCity, setSelectedCity }: Props) {
  return (
    <Select value={selectedCity} onValueChange={(value) => {
        const city = cities.find(c => c.name === value)
        if (city) {
          setLocation({ lat: city.lat, lon: city.lon})
          setSelectedCity(value)
    }}}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Location" />
  </SelectTrigger>
  <SelectContent className='z-1001'>
    <SelectGroup>
      <SelectItem value='Custom' disabled>
          Custom
      </SelectItem>
    {cities.map(city => (
        <SelectItem key={city.name} value={city.name}>
            {city.name}
        </SelectItem>
    ))}
    </SelectGroup>
  </SelectContent>
</Select>
  )
}

const cities = [
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "New York", lat: 40.7128, lon: -74.0060 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Dubai", lat: 25.2048, lon: 55.2708 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Rome", lat: 41.9028, lon: 12.4964 },
  { name: "Barcelona", lat: 41.3851, lon: 2.1734 },
  { name: "Amsterdam", lat: 52.3676, lon: 4.9041 },
  { name: "Toronto", lat: 43.6532, lon: -79.3832 },
  { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
  { name: "Cairo", lat: 30.0444, lon: 31.2357 },
  { name: "Mexico City", lat: 19.4326, lon: -99.1332 },
  { name: "Berlin", lat: 52.5200, lon: 13.4050 },
  { name: "Seoul", lat: 37.5665, lon: 126.9780 },
  { name: "Bangkok", lat: 13.7563, lon: 100.5018 },
]