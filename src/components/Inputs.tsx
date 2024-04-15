import { useState, Dispatch, SetStateAction } from 'react'
import LocationIcon from './Icons/Location'
import SearchIcon from './Icons/Search'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface InputsProps {
  setQuery: React.Dispatch<React.SetStateAction<Record<string, any>>>
  units: string
  setUnits: Dispatch<SetStateAction<string>>
}

const Inputs = ({
  setQuery,
  units,
  setUnits,
}: InputsProps): JSX.Element => {
  const [city, setCity] = useState('')

  const handleUnitsChange = (e: any) => {
    const selectedUnit = e.currentTarget.name
    if (units !== selectedUnit) setUnits(selectedUnit)
  }

  const handleSearchClick = () => {
    if (city !== '') setQuery({ q: city })
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info('Fetching users location.')
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('Location fetched!')
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({
          lat,
          lon,
        })
      })
    }
  }

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          placeholder="Search ..."
          className="text-xl font-light p-2 w-max shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
        <SearchIcon onClicks={handleSearchClick} />
        <LocationIcon onClicks={handleLocationClick} />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          onClick={handleUnitsChange}
          className="text-xl text-white font-light transition ease-out hover:scale-125 border border-white rounded-md px-3 py-1"
        >
          °C
        </button>
        <p className="text-xl text-white my-3 mx-3"></p>
        <button
          name="imperial"
          onClick={handleUnitsChange}
          className="text-xl text-white font-light transition ease-out hover:scale-125 border border-white rounded-md px-3 py-1"
        >
          °F
        </button>
      </div>
    </div>
  )
}

export default Inputs
