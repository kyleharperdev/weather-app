import Card from './Card'
import {  useSuspenseQuery } from '@tanstack/react-query'
import { getWeather } from '../../api'
import WeatherIcon from '../WeatherIcon'

type Props = {
  lat: number
  lon: number
}

export default function HourlyForecast({lat, lon}: Props) {
    const {data} = useSuspenseQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => getWeather({lat, lon})
    })
  
  return (
    <Card 
    title='Hourly Forecast (48 Hours)' 
    ChildrenClassName='flex gap-6 overflow-x-scroll'
    >
        {data.hourly.map(hour => (
            <div key={hour.dt} className='flex flex-col 2xl:justify-between gap-2 items-center p-2 uppercase'>
                <p className='whitespace-nowrap 2xl:scale-110'>{new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                })}</p>
                <WeatherIcon ClassName='2xl:size-10' src={hour.weather[0].icon} />
                <p className='2xl:scale-110'>{Math.round(hour.temp)}°C</p>
            </div>
        ))}
    </Card>
  )
}