import React from 'react'
import Card from './Card'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { getWeather } from '../../api'
import { date } from 'zod'
import WeatherIcon from '../WeatherIcon'

type Props = {}

export default function HourlyForecast({}: Props) {
    const {data} = useSuspenseQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({lat: 20, lon: 50})
  })
  
  return (
    <Card 
    title='Hourly Forecast (48 Hours)' 
    ChildrenClassName='flex gap-6 overflow-x-scroll'
    >
        {data.hourly.map(hour => (
            <div className='flex flex-col gap-2 items-center p-2 uppercase'>
                <p className='whitespace-nowrap'>{new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                })}</p>
                <WeatherIcon src={hour.weather[0].icon} />
                <p>{Math.round(hour.temp)}°C</p>
            </div>
        ))}
    </Card>
  )
}