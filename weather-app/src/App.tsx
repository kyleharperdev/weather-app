import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"
import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { Suspense, useState } from "react"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"
import MapLegend from "./components/MapLegend"
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton"
import DailySkeleton from "./components/skeletons/DailySkeleton"
import HourlySkeleton from "./components/skeletons/HourlySkeleton"
import AdditionalSkeleton from "./components/skeletons/AdditionalSkeleton"
import SidePanel from "./components/SidePanel"
import Hamburger from '/src/assets/hamburger.svg?react'


function App() {

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true)
  const [location, setLocation] = useState({ lat: 51.5074, lon: -0.1278 })
  const [mapType, setMapType] = useState('clouds_new')
  const [selectedCity, setSelectedCity] = useState('London')
  
  const {data} = useQuery({
    queryKey: ['weather', location.lat, location.lon],
    queryFn: () => getWeather({lat: location.lat, lon: location.lon})
  })

  return (
    <>
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
            <button onClick={() => setIsSidePanelOpen(true)}>
            <Hamburger className='size-8 invert ml-auto' />
            </button>
        </div>
        <div className="relative">
          <Map setLocation={setLocation} location={location} mapType={mapType} setSelectedCity={setSelectedCity} />
          <MapLegend mapType={mapType}/>
        </div>
        <Suspense fallback={<CurrentSkeleton/>}>
        <CurrentWeather lat={location.lat} lon={location.lon} />
        </Suspense>
        <Suspense fallback={<HourlySkeleton/>}>
          <HourlyForecast lat={location.lat} lon={location.lon} />
        </Suspense>
        <Suspense fallback={<DailySkeleton/>}>
          <DailyForecast lat={location.lat} lon={location.lon} />
        </Suspense>
        <Suspense fallback={<AdditionalSkeleton/>}>
          <AdditionalInfo lat={location.lat} lon={location.lon} />
        </Suspense>
      </div>
      <SidePanel lat={location.lat} lon={location.lon} isSidePanelOpen={isSidePanelOpen} setIsSidePanelOpen={setIsSidePanelOpen} />
    </>
  )
}

export default App
