import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CountryTable from './CountryTable'
import ForeCast from './ForeCast'
import { City } from './types'
import useChannel from './hooks/useChannel'

const App = () => {
  const [cities, setCities] = useState<City[]>([])

  const { broadcast } = useChannel<City[]>({
    channelName: 'count-channel',
    messageHandler: (message: MessageEvent<City[]>) => {
      setCities(message.data)
      localStorage.setItem('cities', JSON.stringify(message.data))
    },
  })

  const updateCities = (newCities: City[]) => {
    setCities(newCities)
    broadcast(newCities)
    localStorage.setItem('cities', JSON.stringify(newCities))
  }

  useEffect(() => {
    const storedCities = localStorage.getItem('cities')
    if (storedCities) {
      setCities(JSON.parse(storedCities))
    }
  }, [])

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<CountryTable cities={cities} setCities={updateCities} />}
          />
          <Route
            path="/weather/:cityName"
            element={<ForeCast cities={cities} setCities={updateCities} />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
