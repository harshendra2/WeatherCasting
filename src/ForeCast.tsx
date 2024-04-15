import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import getFormattedWeatherData from './Services/WeatherService'
import Forecast from './components/Forecast'
import Inputs from './components/Inputs'
import TemperatureAndDetails from './components/TemperatureAndDetails'
import TimeAndLocation from './components/TimeAndLocation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { City } from './types'

const ForeCast = ({ cities, setCities }: any): JSX.Element => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  useEffect(() => {
    const lat = parseFloat(searchParams.get('lat') || '0')
    const lon = parseFloat(searchParams.get('lon') || '0')
    setQuery({ lat, lon })
  }, [searchParams.get('lat'), searchParams.get('lon')])

  const lat = parseFloat(searchParams.get('lat') || '0')
  const lon = parseFloat(searchParams.get('lon') || '0')
  const [query, setQuery] = useState<Record<string, any>>({ lat, lon })
  const [units, setUnits] = useState<string>('metric')
  const [weather, setWeather] = useState<any | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'

      toast.info('Fetching weather for ' + message)

      try {
        const data = await getFormattedWeatherData({ ...query, units })
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        )

        setWeather(data)
      } catch (error) {
        console.error('Error fetching weather:', error)
      }
    }

    fetchWeather()
  }, [query, units])

  const formatBackground = () => {
    if (!weather)
      return 'https://media.gettyimages.com/id/1330405373/photo/extreme-weather-on-earth-background.jpg?s=1024x1024&w=gi&k=20&c=TvJDjOedDyEYm_mcj7cgC4puAZhdRkXmNIii6UxMdqE='
    if (weather.details) {
      let imageString = weather.details
      if (imageString.toLowerCase().includes('clear')) {
        return 'https://th.bing.com/th/id/OIP.Go5ZjCZQVa8L80aLPbx7QgHaE7?rs=1&pid=ImgDetMain'
      } else if (imageString.toLowerCase().includes('clouds')) {
        return 'https://www.pixelstalk.net/wp-content/uploads/2016/12/Cloudy-Sky-Background-Widecsreen.jpg'
      } else if (
        imageString.toLowerCase().includes('rain') ||
        imageString.toLowerCase().includes('shower')
      ) {
        return 'https://th.bing.com/th/id/OIP.Isn9M4juvi07m9d6s-tMyAHaE8?rs=1&pid=ImgDetMain'
      } else if (imageString.toLowerCase().includes('snow')) {
        return 'https://th.bing.com/th/id/OIP.Wzuc1XrC-iEHJVdXWUjY8AHaEK?rs=1&pid=ImgDetMain'
      } else if (imageString.toLowerCase().includes('fog')) {
        return 'https://free4kwallpapers.com/uploads/originals/2019/07/01/forest-fog-trees-wallpaper.jpg'
      } else if (
        imageString.toLowerCase().includes('thunder') ||
        imageString.toLowerCase().includes('storm')
      ) {
        return 'https://images3.alphacoders.com/102/thumb-1920-1020065.jpg'
      } else if (imageString.toLowerCase().includes('smok')) {
        return 'https://th.bing.com/th/id/OIP._3yER1EStMV3oF4yEVeM-AAAAA?rs=1&pid=ImgDetMain'
      }
    }
  }

  useEffect(() => {
    if (weather) {
      let updatedData = cities.map((store: City) => {
        if (store.lat === query.lat) {
          return {
            ...store,
            temp: weather.temp_max,
            humidity: weather.humidity,
            wind: weather.speed,
          }
        } else {
          return store
        }
      })

      setCities([...updatedData])
    }
  }, [cities, query, weather, setCities])

  return (
    <div
      className="bg-cover bg-center h-screen bg-fixed bg-opacity-100"
      style={{
        backgroundImage: `url(${formatBackground()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}
        <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  )
}

export default ForeCast;
