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
import MobileHeader from "./components/MobileHeader"


function App() {

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [location, setLocation] = useState({ lat: 51.5074, lon: -0.1278 })
  const [mapType, setMapType] = useState('clouds_new')
  const [selectedCity, setSelectedCity] = useState('London')
  
  const {data} = useQuery({
    queryKey: ['weather', location.lat, location.lon],
    queryFn: () => getWeather({lat: location.lat, lon: location.lon})
  })

  return (
    <>
      <MobileHeader setIsSidePanelOpen={setIsSidePanelOpen}/>
      <div className="flex flex-col gap-8 pt-4 p-8 xs:pt-8 lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen 2xl:min-h-[1120px]">
        <div className="flex flex-col gap-4 xs:flex-row xs:gap-8" >
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <h1 className="text-2xl font-semibold">Location: </h1>
              <LocationDropdown
              setLocation={setLocation}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity} />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <h1 className="text-2xl font-semibold whitespace-nowrap">Map Type:</h1>
              <MapTypeDropdown
              mapType={mapType}
              setMapType={setMapType}/>
          </div>
            <button onClick={() => setIsSidePanelOpen(true)} className="hidden xs:block" >
            <Hamburger className='size-6 invert ml-auto lg:hidden' />
            </button>
        </div>
        <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">
          <div className="relative h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1">
            <Map setLocation={setLocation} location={location} mapType={mapType} setSelectedCity={setSelectedCity} />
            <MapLegend mapType={mapType}/>
          </div>

          <div className="col-span-1 2xl:row-span-2 order-2">
            <Suspense fallback={<CurrentSkeleton/>}>
            <CurrentWeather lat={location.lat} lon={location.lon} />
            </Suspense>
          </div>

          <div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2">
            <Suspense fallback={<DailySkeleton/>}>
              <DailyForecast lat={location.lat} lon={location.lon} />
            </Suspense>
          </div>

          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
            <Suspense fallback={<HourlySkeleton/>}>
              <HourlyForecast lat={location.lat} lon={location.lon} />
            </Suspense>
          </div>


          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-5">
            <Suspense fallback={<AdditionalSkeleton/>}>
              <AdditionalInfo lat={location.lat} lon={location.lon} />
            </Suspense>
          </div>

        </div>
      </div>
      <SidePanel lat={location.lat} lon={location.lon} isSidePanelOpen={isSidePanelOpen} setIsSidePanelOpen={setIsSidePanelOpen} />
    </>
  )
}

export default App
