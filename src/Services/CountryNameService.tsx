import { DateTime } from 'luxon'

const fetchLocationData = async () => {
  const apiUrl =
    'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100'

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching location data:', error)
    return []
  }
}

const formatedCity = (data: any) => {
  const formattedCities = data.results.map((result: any) => {
    const {
      name,
      ascii_name,
      population,
      timezone,
      coordinates: { lon, lat },
      cou_name_en,
    } = result
    return {
      name,
      ascii_name,
      population,
      timezone,
      lon,
      lat,
      cou_name_en,
    }
  })
  return formattedCities
}

const getFormattedCityData = async () => {
  const formattedCurrentWeather = await fetchLocationData().then(formatedCity)

  return [...formattedCurrentWeather]
}

const formatToLocalTime = (
  zone: string,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => {
  return DateTime.now().setZone(zone).toFormat(format)
}

export { formatToLocalTime }

export default getFormattedCityData
