import Card from './Card'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { getWeather } from '../../api'
import WeatherIcon from '../WeatherIcon'

type Props = {
  lat: number
  lon: number
}


export default function DailyForecast({ lat, lon }: Props) {
  const {data} = useSuspenseQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => getWeather({lat, lon})
  })

  return (
      <Card title="Daily Forecast" ChildrenClassName='flex flex-col gap-4 2xl:justify-between'>
          {data?.daily.map(day => (
            <div key={day.dt} className='flex justify-between'>
              <p className='w-9'>{new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: "short"
              })}</p>
              <WeatherIcon src={day.weather[0].icon} />
              <p>{Math.round(day.temp.day)}°C</p>
              <p className='text-gray-500/75'>{Math.round(day.temp.min)}°C</p>
              <p className='text-gray-500/75'>{Math.round(day.temp.max)}°C</p>
            </div>
          ))}
      </Card>
  )
}