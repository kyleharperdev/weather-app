import { useSuspenseQuery } from '@tanstack/react-query'
import Card from './Card'
import { getWeather } from '../../api'
import Sunrise from '/src/assets/sunrise.svg?react'
import Sunset from '/src/assets/sunset.svg?react'
import Cloud from '/src/assets/cloud.svg?react'
import Pressure from '/src/assets/pressure.svg?react'
import Uv from '/src/assets/uv-index.svg?react'
import Wind from '/src/assets/wind.svg?react'
import UpArrow from "/src/assets/up-arrow.svg?react"

type Props = {
  lat: number
  lon: number
}

export default function AdditionalInfo({lat, lon}: Props) {
    const {data} = useSuspenseQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => getWeather({lat, lon})
    })
  return (
    <Card title='Additional Weather Info' ChildrenClassName='flex flex-col gap-8'>
        {rows.map(({label, value, Icon }) => (
            <div className='flex justify-between' key={value}>
                <div className='flex gap-4'>
                    <span className='text-gray-500'>{label}</span>
                    <Icon className="size-8 invert"/>
                </div>
                <span className='uppercase'>
                    <FormatComponent value={value} number={data.current[value]} />
                </span>
            </div>
        ))}
    </Card>
  )
}

function FormatComponent({value, number}: {value: string, number: number}) {
    if (value === 'sunrise' || value === 'sunset') return new Date(number * 1000).toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: "2-digit",
        hour12: true,
    })
    
    if (value === "wind_deg") return <UpArrow className="size-8 invert" style={{transform: `rotate(${number}deg)`}}/> 

    return number
}

const rows = [
    {
        label: "Cloudiness (%)",
        value: 'clouds',
        Icon: Cloud
    },
    {
        label: "UV Index",
        value: 'uvi',
        Icon: Uv
    },
    {
        label: "Sunrise",
        value: 'sunrise',
        Icon: Sunrise
    },
    {
        label: "Sunset",
        value: 'sunset',
        Icon: Sunset
    },
    {
        label: "Wind Direction (°)",
        value: 'wind_deg',
        Icon: Wind
    },
    {
        label: "Pressure (hPa)",
        value: 'pressure',
        Icon: Pressure
    },
] as const