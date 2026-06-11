import clsx from 'clsx'

type Props = {
    src: string
    ClassName?: string
}

export default function WeatherIcon({src, ClassName}: Props) {
  return (
              <img 
                className={clsx("size-8", ClassName)}
                src={`https://openweathermap.org/payload/api/media/file/${src}.png`} 
                alt='Weather Icon'
              />
  )
}