import React from 'react'
import styled from '@emotion/styled'
import { formatDate } from '../utils/index'
import type { ThemeStyle, WeatherElement } from '../types/index'

import WeatherIcon from './WeatherIcon'
import { ReactComponent as CogIcon } from '../images/cog.svg'
import { ReactComponent as AirFlowIcon } from '../images/airFlow.svg'
import { ReactComponent as RainIcon } from '../images/rain.svg'
import { ReactComponent as HumidIcon } from '../images/humid.svg'
import { ReactComponent as RefreshIcon } from '../images/refresh.svg'
import { ReactComponent as LoadingIcon } from '../images/loading.svg'

const WeatherCardWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }:ThemeStyle) => theme.boxShadow};
  box-sizing: border-box;
  background-color: ${({ theme }:ThemeStyle) => theme.foregroundColor};
  padding: 30px 15px;
`

const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }:ThemeStyle) => theme.titleColor};
  margin-bottom: 20px;
`

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }:ThemeStyle) => theme.textColor};
  margin-bottom: 30px;
`

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const Temperature = styled.div`
  display: flex;
  color: ${({ theme }:ThemeStyle) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
`

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }:ThemeStyle) => theme.textColor};
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 20px;
  }
`

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }:ThemeStyle) => theme.textColor};
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 20px;
  }
`

const Humid = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }:ThemeStyle) => theme.textColor};
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 20px;
  }
`
type RefreshProps = {
  isLoading: boolean
}

const Refresh = styled.div<RefreshProps>`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }:ThemeStyle) => theme.textColor};
  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate 1 1s linear;
    animation-duration: ${({ isLoading }:RefreshProps) => (isLoading ? '1s' : '0s')};
  }
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`
//
interface WeatherCardProps {
  weatherElement:WeatherElement
  moment:string,
  cityName:string,
  fetchData:()=>void,
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>,
  // setCurrentPage: (currentPage: string) => void,
}

export default function WeatherCard(props:WeatherCardProps) {
  const {
    weatherElement, moment, fetchData, setCurrentPage, cityName
  } = props
  const {
    observationTime,
    humid,
    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    isLoading
  } = weatherElement

  return (
    <WeatherCardWrapper>
      <Cog onClick={() => setCurrentPage('WeatherSetting')} />
      <Location>{cityName}</Location>
      <Description>{description}</Description>
      <CurrentWeather>
        <Temperature>
          {temperature}
          <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon currentWeatherCode={weatherCode} moment={moment} />
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon />
        {windSpeed}
        {' '}
        m/h
      </AirFlow>
      <Rain>
        <RainIcon />
        {rainPossibility}
        {' '}
        %
      </Rain>
      <Humid>
        <HumidIcon />
        {Math.round(Number(humid) * 100)}
        {' '}
        %
      </Humid>
      <Refresh onClick={() => { fetchData() }} isLoading={isLoading}>
        最後觀測時間:
        { formatDate(observationTime.replace(' ', 'T'))}
        {' '}
        {isLoading ? <LoadingIcon /> : <RefreshIcon /> }
      </Refresh>
    </WeatherCardWrapper>

  )
}
