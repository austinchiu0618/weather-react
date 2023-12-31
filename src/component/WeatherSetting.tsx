import React, { useState } from 'react'
import styled from '@emotion/styled'
import { availableLocations } from '../utils/weatherCityName'
import type { ThemeStyle } from '../types/index'

const WeatherSettingWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme } : ThemeStyle) => theme.boxShadow};
  background-color: ${({ theme } : ThemeStyle) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 20px;
`

const Title = styled.div`
  font-size: 28px;
  color: ${({ theme } : ThemeStyle) => theme.titleColor};
  margin-bottom: 30px;
`

const StyledLabel = styled.label`
  display: block;
  font-size: 16px;
  color: ${({ theme } : ThemeStyle) => theme.textColor};
  margin-bottom: 15px;
`

const StyledInputList = styled.input`
  display: block;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid ${({ theme } : ThemeStyle) => theme.textColor};
  outline: none;
  width: 100%;
  max-width: 100%;
  color: ${({ theme } : ThemeStyle) => theme.textColor};
  font-size: 16px;
  padding: 7px 10px;
`

const ErrorMsg = styled.div`
color: red;
font-size: 16px;
margin-top: 10px;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    margin: 0;
    letter-spacing: 0.3px;
    line-height: 1;
    cursor: pointer;
    overflow: visible;
    text-transform: none;
    border: 1px solid transparent;
    background-color: transparent;
    height: 35px;
    width: 80px;
    border-radius: 5px;

    &:focus,
    &.focus {
      outline: 0;
      box-shadow: none;
    }

    &::-moz-focus-inner {
      padding: 0;
      border-style: none;
    }
  }
`

const Back = styled.button`
  && {
    color: ${({ theme } : ThemeStyle) => theme.textColor};
    border-color: ${({ theme } : ThemeStyle) => theme.textColor};
  }
`

const Save = styled.button`
  && {
    color: white;
    background-color: #40a9f3;
  }
`

const locations = availableLocations.map((location) => location.cityName)

interface WeatherSettingProps {
  cityName:string,
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>,
  setCurrentCity: React.Dispatch<React.SetStateAction<string>>,
  // setCurrentPage: (currentPage: string) => void;
}

function WeatherSetting({ setCurrentPage, setCurrentCity, cityName }:WeatherSettingProps) {
  const [locationName, setLocationName] = useState(cityName)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationName(e.target.value)
  }

  const handleSave = () => {
    if (locations.includes(locationName)) {
      setCurrentCity(locationName)
      setCurrentPage('WeatherCard')
    } else {
      setErrorMessage(`儲存失敗：您輸入的 ${locationName} 並非有效的地區`) // 顯示錯誤提示
    }
  }

  return (
    <WeatherSettingWrapper>
      <Title>設定</Title>
      <StyledLabel htmlFor="location">地區</StyledLabel>
      <StyledInputList
        list="location-list"
        id="location"
        name="location"
        onChange={handleChange}
        value={locationName}
      />
      <datalist id="location-list">
        {locations.map((location) => (<option value={location} key={location} aria-label="location option" />)) }
      </datalist>
      {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg> }
      <ButtonGroup>
        <Back onClick={() => setCurrentPage('WeatherCard')}>返回</Back>
        <Save onClick={handleSave}>儲存</Save>
      </ButtonGroup>
    </WeatherSettingWrapper>
  )
}

export default WeatherSetting
