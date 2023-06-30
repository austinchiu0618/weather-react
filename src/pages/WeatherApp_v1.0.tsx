import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import { WeatherNowLocationData } from '../types/index'

import { ReactComponent as CloudyIcon } from '../images/day-cloudy.svg'
import { ReactComponent as AirFlowIcon } from '../images/airFlow.svg'
import { ReactComponent as RainIcon } from '../images/rain.svg'
import { ReactComponent as RefreshIcon } from '../images/refresh.svg'

interface WeatherElement {
  [key:string]:string
}

const Container = styled.div`
  background-color: #ededed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WeatherCard = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: 0 1px 3px 0 #999999;
  box-sizing: border-box;
  background-color: #f9f9f9;
  padding: 30px 15px;
`

const Location = styled.div`
  font-size: 28px;
  color: ${(props: any) => (props.theme === 'dark' ? '#dadada' : '#212121')};
  margin-bottom: 20px;
`

const Description = styled.div`
  font-size: 16px;
  color: #828282;
  margin-bottom: 30px;
`

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const Temperature = styled.div`
  display: flex;
  color: #757575;
  font-size: 96px;
  font-weight: 300;
`

const Cloudy = styled(CloudyIcon)`
  flex-basis: 30%;
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
  color: #828282;
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
  color: #828282;
  svg {
    width: 25px;
    height: auto;
    margin-right: 20px;
  }
`

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: #828282;
  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`

function WeatherApp() {
  const [currentWeather, setCurrentWeather] = useState({
    observationTime: '2022-01-01T00:00:00',
    locationName: '臺中市',
    description: '',
    temperature: '0',
    windSpeed: '0',
    humid: '0'
  })
  async function fetchCurrentWeather() {
    const { data } = await axios.get<WeatherNowLocationData>('https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001/', {
      params: {
        Authorization: 'CWB-7DB8E4CA-0EF2-4543-8E2B-E6DA0464C0E3',
        locationName: '臺中'
      }
    })
    const locationData = data.records.location[0]
    const weatherElements = locationData.weatherElement.reduce(
      (neededElements:WeatherElement, item:{ elementName: string; elementValue: string }) => {
        if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
          // eslint-disable-next-line no-param-reassign
          neededElements[item.elementName] = item.elementValue
        }
        return neededElements
      },
      {}
    )
    setCurrentWeather({
      observationTime: locationData.time.obsTime.replace(' ', 'T'),
      locationName: locationData.locationName,
      description: '多雲時晴',
      temperature: weatherElements.TEMP,
      windSpeed: weatherElements.WDSD,
      humid: weatherElements.HUMD
    })
  }
  useEffect(() => {
    fetchCurrentWeather()
  }, [])
  return (
    <Container>
      <WeatherCard>
        <Location theme="white">{currentWeather.locationName}</Location>
        <Description>{currentWeather.description}</Description>
        <CurrentWeather>
          <Temperature>
            {currentWeather.temperature}
            <Celsius>°C</Celsius>
          </Temperature>
          <Cloudy />
        </CurrentWeather>
        <AirFlow>
          <AirFlowIcon />
          {currentWeather.windSpeed}
          {' '}
          m/h
        </AirFlow>
        <Rain>
          <RainIcon />
          {Math.round(Number(currentWeather.humid) * 100)}
          {' '}
          %
        </Rain>
        <Refresh onClick={() => { fetchCurrentWeather() }}>
          最後觀測時間:
          {new Intl.DateTimeFormat('zh-TW', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          }).format(new Date(currentWeather.observationTime))}
          {' '}
          <RefreshIcon />
        </Refresh>
      </WeatherCard>
    </Container>

  )
}

export default WeatherApp
