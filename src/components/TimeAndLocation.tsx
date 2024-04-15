import { formatToLocalTime } from '../Services/WeatherService'

interface Weather {
  dt: number
  timezone: string
  name: string
  country: string
}

const TimeAndLocation = ({ weather }: { weather: Weather }): JSX.Element => {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(weather.dt, weather.timezone)}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${weather.name},${weather.country}`}</p>
      </div>
    </div>
  )
}
export default TimeAndLocation
