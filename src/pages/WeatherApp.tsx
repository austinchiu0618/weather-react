import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { ThemeProvider } from '@emotion/react'
import type { ThemeStyle, WeatherElement } from '../types/index'
import { findLocation, CityLocation } from '../utils/weatherCityName'

import WeatherCard from '../component/WeatherCard'
import WeatherSetting from '../component/WeatherSetting'
import useWeatherApi from '../customHook/useWeatherApi'

const themeStyle:{[key:string]:{[key:string]: string}} = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282'
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc'
  }
}

const Container = styled.div`
  background-color: ${({ theme }:ThemeStyle) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

function sunRiseSet() {
  const nowDate = new Date()
  return nowDate.getHours() < 6 || nowDate.getHours() > 17 ? 'night' : 'day'
}

function WeatherApp() {
  const storageCity = localStorage.getItem('cityName')
  const [currentCity, setCurrentCity] = useState(storageCity || '臺中市')
  const currentLocation = findLocation(currentCity) || {} as CityLocation

  const [weatherElement, fetchData] = useWeatherApi(currentLocation)
  const [currentTheme, setCurrentTheme] = useState('light')
  const [currentPage, setCurrentPage] = useState('WeatherCard')

  useEffect(() => {
    localStorage.setItem('cityName', currentCity)
  }, [currentCity])

  useEffect(() => {
    setCurrentTheme(sunRiseSet() === 'night' ? 'light' : 'dark')
  }, [sunRiseSet()])

  return (
    <ThemeProvider theme={themeStyle[currentTheme]}>
      <Container>
        {currentPage === 'WeatherCard' && (
          <WeatherCard
            weatherElement={weatherElement as WeatherElement}
            moment={sunRiseSet()}
            fetchData={fetchData as ()=>void}
            cityName={currentLocation.cityName}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'WeatherSetting' && (
        <WeatherSetting
          setCurrentCity={setCurrentCity}
          setCurrentPage={setCurrentPage}
          cityName={currentLocation.cityName}
        />
        )}
      </Container>
    </ThemeProvider>
  )
}

export default WeatherApp
