import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"
import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { useState } from "react"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"
import MapLegend from "./components/MapLegend"


function App() {

  const [location, setLocation] = useState({ lat: 51.5074, lon: -0.1278 })
  const [mapType, setMapType] = useState('clouds_new')
  const [selectedCity, setSelectedCity] = useState('London')
  
  const {data} = useQuery({
    queryKey: ['weather', location.lat, location.lon],
    queryFn: () => getWeather({lat: location.lat, lon: location.lon})
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold">Location: </h1>
          <LocationDropdown 
          setLocation={setLocation} 
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity} />
        </div>
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold">Map Type:</h1>
          <MapTypeDropdown 
          mapType={mapType} 
          setMapType={setMapType}/>
        </div>
      </div>
      <div className="relative">
        <Map setLocation={setLocation} location={location} mapType={mapType} setSelectedCity={setSelectedCity} />
        <MapLegend mapType={mapType}/>
      </div>
      <CurrentWeather lat={location.lat} lon={location.lon} />
      <HourlyForecast lat={location.lat} lon={location.lon} />
      <DailyForecast lat={location.lat} lon={location.lon} />
      <AdditionalInfo lat={location.lat} lon={location.lon} />
    </div>
  )
}

export default App
