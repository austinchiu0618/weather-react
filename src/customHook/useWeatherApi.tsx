import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import type { WeatherNowLocationData, WeatherTodayLocationData, TodayWeatherElement } from '../types/index'
import { CityLocation } from '../utils/weatherCityName'

interface LocationWeatherElm {
  [key:string]:string
}
interface TodayWeatherElm {
  [key:string]:{
    parameterName: string,
    parameterValue: string,
  }
}

async function fetchCurrentWeather(location = '臺中') {
  const apiUrl = 'v1/rest/datastore/O-A0003-001/'
  const { data } = await axios.get<WeatherNowLocationData>(`https://opendata.cwb.gov.tw/api/${apiUrl}`, {
    params: {
      Authorization: 'CWB-7DB8E4CA-0EF2-4543-8E2B-E6DA0464C0E3',
      locationName: location // 臺北 新竹
    }
  })
  const locationData = data.records.location[0]

  const weatherElements = locationData.weatherElement.reduce(
    (neededElements:LocationWeatherElm, item:{ elementName: string; elementValue: string }) => {
      if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
        // eslint-disable-next-line no-param-reassign
        neededElements[item.elementName] = item.elementValue
      }
      return neededElements
    },
    {}
  )
  return {
    observationTime: locationData.time.obsTime,
    locationName: locationData.locationName,
    temperature: weatherElements.TEMP,
    windSpeed: weatherElements.WDSD,
    humid: weatherElements.HUMD
  }
}

async function fetchTodayWeather(location = '臺中市') {
  const apiUrl = 'v1/rest/datastore/F-C0032-001'
  const { data } = await axios.get<WeatherTodayLocationData>(`https://opendata.cwb.gov.tw/api/${apiUrl}`, {
    params: {
      Authorization: 'CWB-7DB8E4CA-0EF2-4543-8E2B-E6DA0464C0E3',
      locationName: location
    }
  })
  const locationData = data.records.location[0]
  const weatherElements = locationData.weatherElement.reduce(
    (neededElements:TodayWeatherElm, item:TodayWeatherElement) => {
      if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
        // eslint-disable-next-line no-param-reassign
        neededElements[item.elementName] = item.time[0].parameter
      }
      return neededElements
    },
    {}
  )
  return {
    description: weatherElements.Wx.parameterName,
    weatherCode: weatherElements.Wx.parameterValue,
    rainPossibility: weatherElements.PoP.parameterName,
    comfortability: weatherElements.CI.parameterName
  }
}

// function timeout(delay:number) {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(true), delay)
//   })
// }

const useWeatherApi = (currentLocation:CityLocation) => {
  const [weatherElement, setWeatherElement] = useState({
    observationTime: '',
    locationName: '',
    humid: '',
    temperature: '',
    windSpeed: '',
    description: '',
    weatherCode: '',
    rainPossibility: '',
    comfortability: '',
    isLoading: true
  })

  const { locationName, cityName } = currentLocation

  const fetchData = useCallback(() => {
    const fetchingData = (async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(locationName),
        fetchTodayWeather(cityName)
        // timeout(1000) // 至少loadingIcon轉1000ms
      ])
      setWeatherElement({ ...currentWeather, ...weatherForecast, isLoading: false })
    })
    setWeatherElement((prev) => ({ ...prev, isLoading: true }))
    fetchingData()
  }, [locationName, cityName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [weatherElement, fetchData]
}

export default useWeatherApi
