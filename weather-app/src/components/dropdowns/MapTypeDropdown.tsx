import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  mapType: string
  setMapType: (type: string) => void
}

const types = [
  { label: "Clouds", value: "clouds_new" },
  { label: "Precipitation", value: "precipitation_new" },
  { label: "Pressure", value: "pressure_new" },
  { label: "Wind", value: "wind_new" },
  { label: "Temperature", value: "temp_new" },
]

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Map Layer" />
      </SelectTrigger>
      <SelectContent className='z-1001'>
        <SelectGroup>
          {types.map(type => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}