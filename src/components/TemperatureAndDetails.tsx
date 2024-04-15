import Feels from './Icons/Feels'
import Humidity from './Icons/Humidity'
import Sunrise from './Icons/Sunrise'
import Sunset from './Icons/Sunset'
import Wind from './Icons/Wind'
import { formatToLocalTime, iconUrlFromCode } from '../Services/WeatherService'
import { Weather } from '../types/index'

const TemperatureAndDetails = ({
  weather,
}: {
  weather: Weather
}): JSX.Element => {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{weather.details}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(weather.icon)} alt="" className="w-20" />
        <p className="text-5xl">{`${weather.temp.toFixed()}°`}</p>

        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <Feels />
            Real Fell:
            <span className="font-semibold ml-1">{`${weather.feels_like}°`}</span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <Humidity />
            Humidity:
            <span className="font-semibold ml-1">{`${weather.humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <Wind />
            Wind:
            <span className="font-semibold ml-1">{`${weather.speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <Sunrise />
        <p className="font-light">
          Rise:{' '}
          <span className="font-medium mt-1">
            {formatToLocalTime(weather.sunrise, weather.timezone, 'hh:mm a')}
          </span>
        </p>
        <p className="font-light">|</p>

        <Sunset />
        <p className="font-light">
          Set:{' '}
          <span className="font-medium mt-1">
            {' '}
            {formatToLocalTime(weather.sunset, weather.timezone, 'hh:mm a')}
          </span>
        </p>
        <p className="font-light">|</p>

        <p className="font-light">
          High:{' '}
          <span className="font-medium mt-1">{`${weather.temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>
        <p className="font-light">
          Low:{' '}
          <span className="font-medium mt-1">{`${weather.temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  )
}

export default TemperatureAndDetails
