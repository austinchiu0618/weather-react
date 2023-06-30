export type ThemeStyle = {
  theme:{
    [key:string]:string
  }
}

export interface WeatherNowLocationData {
  records: {
    location: [
      {
        lat: string,
        locationName: string,
        lon: string,
        parameter: [],
        stationId: string,
        time: { obsTime: string },
        weatherElement: { elementName: string, elementValue: string }[],
      }
    ],
  },
  result: {},
  success: string,
}

export interface TodayWeatherElement {
  elementName: string,
  time: {
    startTime: string,
    endTime: string,
    parameter: {
      parameterName: string,
      parameterValue: string,
    },
  }[],
}

export interface WeatherTodayLocationData {
  records: {
    datasetDescription: string,
    location: {
      locationName: string,
      weatherElement: TodayWeatherElement[],
    }[],
  },
  result: {},
  success: string,
}

export interface WeatherElement {
  observationTime: string,
  locationName: string,
  humid: string,
  temperature: string,
  windSpeed: string,
  description: string,
  weatherCode: string,
  rainPossibility: string,
  comfortability: string,
  isLoading: boolean
}
