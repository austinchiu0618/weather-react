import { useState, useEffect, useMemo } from 'react'
import styled from '@emotion/styled'

import { ReactComponent as DayThunderstorm } from '../images/day-thunderstorm.svg'
import { ReactComponent as DayClear } from '../images/day-clear.svg'
import { ReactComponent as DayCloudyFog } from '../images/day-cloudy-fog.svg'
import { ReactComponent as DayCloudy } from '../images/day-cloudy.svg'
import { ReactComponent as DayFog } from '../images/day-fog.svg'
import { ReactComponent as DayPartiallyClearWithRain } from '../images/day-partially-clear-with-rain.svg'
import { ReactComponent as DaySnowing } from '../images/day-snowing.svg'

import { ReactComponent as NightThunderstorm } from '../images/night-thunderstorm.svg'
import { ReactComponent as NightClear } from '../images/night-clear.svg'
import { ReactComponent as NightCloudyFog } from '../images/night-cloudy-fog.svg'
import { ReactComponent as NightCloudy } from '../images/night-cloudy.svg'
import { ReactComponent as NightFog } from '../images/night-fog.svg'
import { ReactComponent as NightPartiallyClearWithRain } from '../images/night-partially-clear-with-rain.svg'
import { ReactComponent as NightSnowing } from '../images/night-snowing.svg'

const IconContaier = styled.div`
  flex-basis: 30%;

  svg {
    max-height:110px
  }
`
const weatherTypes = {
  isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isClear: [1],
  isCloudyFog: [25, 26, 27, 28],
  isCloudy: [2, 3, 4, 5, 6, 7],
  isFog: [24],
  isPartiallyClearWithRain: [
    8, 9, 10, 11, 12,
    13, 14, 19, 20, 29, 30,
    31, 32, 38, 39
  ],
  isSnowing: [23, 37, 42]
}

const weatherIcons:{[key:string]:{[key:string]: any}} = {
  day: {
    isThunderstorm: <DayThunderstorm />,
    isClear: <DayClear />,
    isCloudyFog: <DayCloudyFog />,
    isCloudy: <DayCloudy />,
    isFog: <DayFog />,
    isPartiallyClearWithRain: <DayPartiallyClearWithRain />,
    isSnowing: <DaySnowing />
  },
  night: {
    isThunderstorm: <NightThunderstorm />,
    isClear: <NightClear />,
    isCloudyFog: <NightCloudyFog />,
    isCloudy: <NightCloudy />,
    isFog: <NightFog />,
    isPartiallyClearWithRain: <NightPartiallyClearWithRain />,
    isSnowing: <NightSnowing />
  }
}

const weatherCode2Type = (weatherCode:string) => {
  const [weatherType] = Object.entries(weatherTypes).find(
    // eslint-disable-next-line no-unused-vars
    ([key, value]) => value.includes(Number(weatherCode))
  ) ?? ['']

  return weatherType
}

function WeatherIcon({ currentWeatherCode, moment }:{currentWeatherCode:string, moment:string}) {
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState('isSnowing')

  const theWeatherIcon = useMemo(() => weatherCode2Type(currentWeatherCode), [currentWeatherCode])

  useEffect(() => {
    setCurrentWeatherIcon(theWeatherIcon)
  }, [theWeatherIcon])

  // 方法一
  // useEffect(() => {
  //   const weatherCode2Type = (weatherCode:string) => {
  //     const [weatherType] = Object.entries(weatherTypes).find(
  //       ([key, value]) => value.includes(Number(weatherCode))
  //     ) ?? ['']

  //     return weatherType
  //   }
  //   setCurrentWeatherIcon(weatherCode2Type(currentWeatherCode))
  // }, [currentWeatherCode])

  return (
    <IconContaier>
      {weatherIcons[moment][currentWeatherIcon]}
    </IconContaier>
  )
}

export default WeatherIcon
