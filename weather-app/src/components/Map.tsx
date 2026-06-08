import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// API key from .env.local
const API_KEY = import.meta.env.VITE_API_KEY

type Props = {
  setLocation: (location: { lat: number, lon: number }) => void
  location: { lat: number, lon: number }
  mapType: string // e.g. 'clouds_new', 'wind_new' etc.
  setSelectedCity: (city: string) => void
}

// Fix for broken default Leaflet marker icons in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

export default function Map({ setLocation, location, mapType, setSelectedCity }: Props) {
  // mapRef — points to the DOM div that Leaflet renders into
  const mapRef = useRef<HTMLDivElement>(null)
  // mapInstanceRef — stores the Leaflet map instance so other useEffects can access it
  const mapInstanceRef = useRef<L.Map | null>(null)
  // markerRef — stores the marker so we can move it when location changes
  const markerRef = useRef<L.Marker | null>(null)
  // weatherLayerRef — stores the weather overlay so we can swap it when mapType changes
  const weatherLayerRef = useRef<L.TileLayer | null>(null)

  // EFFECT 1: Runs once on mount — sets up the map, tiles, marker and click handler
  useEffect(() => {
    // Guard: don't run if the div isn't ready, or if the map already exists
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialise the map centred on the starting location
    const map = L.map(mapRef.current).setView([location.lat, location.lon], 5)
    mapInstanceRef.current = map


  // Base dark tiles
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
  attribution: '© Stadia Maps © OpenMapTiles © OpenStreetMap'
}).addTo(map)

    // Weather overlay layer from OpenWeatherMap
    weatherLayerRef.current = L.tileLayer(
      `https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`,
      { attribution: '© OpenWeatherMap', opacity: 0.6 }
    ).addTo(map)

    // Place the marker at the starting location
    markerRef.current = L.marker([location.lat, location.lon]).addTo(map)

    // Click handler — pans the map and updates location state in App.tsx
    map.on('click', (e) => {
      const { lat, lng } = e.latlng
      map.panTo([lat, lng])
      setSelectedCity('Custom')
      setLocation({ lat, lon: lng })
    })

    // Cleanup: runs when the component unmounts
    return () => {
      map.remove()
      mapInstanceRef.current = null
      markerRef.current = null
      weatherLayerRef.current = null
    }
  }, [setLocation])

  // EFFECT 2: Runs when location changes (map click or dropdown selection)
  useEffect(() => {
    if (!mapInstanceRef.current || !markerRef.current) return
    try {
      mapInstanceRef.current.panTo([location.lat, location.lon])
      markerRef.current.setLatLng([location.lat, location.lon])
    } catch (e) {
      // panTo can throw if the map was destroyed between renders, safe to ignore
    }
  }, [location])

  // EFFECT 3: Runs when mapType changes (weather layer dropdown)
  useEffect(() => {
    if (!mapInstanceRef.current || !weatherLayerRef.current) return
    mapInstanceRef.current.removeLayer(weatherLayerRef.current)
    weatherLayerRef.current = L.tileLayer(
      `https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`,
      { attribution: '© OpenWeatherMap', opacity: 0.6 }
    ).addTo(mapInstanceRef.current)
  }, [mapType])

  return <div ref={mapRef} style={{ width: '100%', height: '500px', cursor: 'crosshair' }} />
}