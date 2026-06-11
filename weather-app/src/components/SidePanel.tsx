import { getAirPollution } from '@/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import React, { Suspense, type Dispatch, type SetStateAction } from 'react'
import Card from './cards/Card'
import { Slider } from './ui/slider'
import { object, type maxLength } from 'zod'
import clsx from 'clsx'
import { Tooltip, TooltipProvider } from './ui/tooltip'
import { TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Button } from './ui/button'
import Icon from '/src/assets/infoicon.svg?react'
import { InfoIcon } from 'lucide-react'
import ChevronLeft from '/src/assets/chevron-left.svg?react'
import SidePanelSkeleton from './skeletons/SidePanelSkeleton'

type Props = {
    lat: number
    lon: number
    isSidePanelOpen: boolean
    setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>
}

export default function SidePanel({lat, lon, setIsSidePanelOpen, isSidePanelOpen,}: Props) {
  return (
    <div className={clsx('fixed top-0 right-0 h-screen w-(--sidebar-width) shadow-md bg-sidebar z-1001 py-8 px-4 overflow-y-scroll transition-transform duration-300 lg:translate-x-0!', isSidePanelOpen ? 'translate-x-0' : 'translate-x-full')}>
        <button onClick={() => setIsSidePanelOpen(false)}>
            <ChevronLeft className='size-8  -ml-2 lg:hidden' />
        </button>
        <Suspense fallback={<SidePanelSkeleton/>}>
            <AirPollution lat={lat} lon={lon} />
        </Suspense>
    </div>
  )
}

function AirPollution({lat, lon}: {lat: number, lon: number}) {
    const {data} = useSuspenseQuery({
        queryKey: ['pollution', lat, lon],
        queryFn: () => getAirPollution({lat, lon})
    })

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-2xl font-semibold'>Air Pollution</h1>
            <h1 className='text-5xl font-semibold'>{data.list[0].main.aqi}</h1>
            <div className='flex items-center gap-2'>
                <h1 className='text-2xl font-semibold'>AQI</h1>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <InfoIcon className='size-4 col-white' />
                        </TooltipTrigger>
                        <TooltipContent className='z-2000'>
                            <p className='max-w-xs'>
                                {" "}
                                Air Quality Index. Possible values: 1, 2, 3, 4, 5. 
                                Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 
                                5 = Very Poor.y
                                </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            {Object.entries(data.list[0].components).map(([key, value]) => {
                const pollutant = pollutionRanges[key as keyof typeof pollutionRanges]
                if (!pollutant) return null

                const max = Math.max(pollutant["Very Poor"].min, value)

                const currentlevel = (() => {
                    for (const [level, range] of Object.entries(pollutant)) {
                    if (value >= range.min && value <= range.max) return level
                    }
                    return 'Very Poor'
                })()

                const qualityColor = (() => {
                    switch(currentlevel) {
                        case "Good":
                            return 'bg-green-500'
                        case "Fair":
                            return 'bg-yellow-500'
                        case "Moderate":
                            return 'bg-orange-500'
                        case "Poor":
                            return 'bg-red-500'
                        case "Very Poor":
                            return 'bg-purple-500'
                        default:
                            return 'bg-zinc-500'
                    }
                })()


                return (
                    <Card 
                    key={key} 
                    className='hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!'
                    ChildrenClassName='flex flex-col gap-3'
                    >
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <span className='text-lg font-bold capitalize'>{key}</span>
                            <TooltipProvider>
                                <Tooltip>
                                <TooltipTrigger>
                                    <InfoIcon className='size-4 col-white' />
                                </TooltipTrigger>
                        <TooltipContent className='z-2000'>
                            <p className='max-w-xs'>
                                {" "}
                                Concentration of {pollutantNames[key as Pollutant]}
                                </p>
                        </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            </div>
                            <span className='text-lg font-semibold'>{value}</span>
                        </div>
                        <Slider min={0} max={max} value={[value]} disabled />
                        <div className='flex justify-between text-xs'>
                            <p>0</p>
                            <p>{max}</p>
                        </div>
                        <div className='flex justify-between'>
                            {Object.keys(pollutant).map(quality => (
                                <span key={quality} className={clsx('px-2 py-1 rounded-md text-xs font-medium', quality === currentlevel ? qualityColor : 'bg-muted text-muted-foreground')}>
                                    {quality}
                                </span>
                            ))}
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export const pollutantNames: Record<Pollutant, string> = {
  so2: "Sulfur Dioxide",
  no2: "Nitrogen Dioxide",
  pm10: "Coarse Particulate Matter",
  pm2_5: "Fine Particulate Matter",
  o3: "Ozone",
  co: "Carbon Monoxide",
  nh3: "Ammonia",
  no: "Nitric Oxide",
}

type AQILevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor"
type Pollutant = "so2" | "no2" | "pm10" | "pm2_5" | "o3" | "co" | "nh3" | "no"
type Range = { min: number, max: number }

export const pollutionRanges: Record<Pollutant, Record<AQILevel, Range>> = {
  so2: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 80 },
    Moderate: { min: 80, max: 250 },
    Poor: { min: 250, max: 350 },
    "Very Poor": { min: 350, max: Infinity },
  },
  no2: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: Infinity },
  },
  pm10: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 50 },
    Moderate: { min: 50, max: 100 },
    Poor: { min: 100, max: 200 },
    "Very Poor": { min: 200, max: Infinity },
  },
  pm2_5: {
    Good: { min: 0, max: 10 },
    Fair: { min: 10, max: 25 },
    Moderate: { min: 25, max: 50 },
    Poor: { min: 50, max: 75 },
    "Very Poor": { min: 75, max: Infinity },
  },
  o3: {
    Good: { min: 0, max: 60 },
    Fair: { min: 60, max: 100 },
    Moderate: { min: 100, max: 140 },
    Poor: { min: 140, max: 180 },
    "Very Poor": { min: 180, max: Infinity },
  },
  co: {
    Good: { min: 0, max: 4400 },
    Fair: { min: 4400, max: 9400 },
    Moderate: { min: 9400, max: 12400 },
    Poor: { min: 12400, max: 15400 },
    "Very Poor": { min: 15400, max: Infinity },
  },
  nh3: {
    Good: { min: 0, max: 50 },
    Fair: { min: 50, max: 100 },
    Moderate: { min: 100, max: 200 },
    Poor: { min: 200, max: 400 },
    "Very Poor": { min: 400, max: Infinity },
  },
  no: {
    Good: { min: 0, max: 30 },
    Fair: { min: 30, max: 60 },
    Moderate: { min: 60, max: 120 },
    Poor: { min: 120, max: 200 },
    "Very Poor": { min: 200, max: Infinity },
  },
}

export type { AQILevel, Pollutant, Range }