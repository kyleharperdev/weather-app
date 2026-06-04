import clsx from 'clsx'
import React from 'react'

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