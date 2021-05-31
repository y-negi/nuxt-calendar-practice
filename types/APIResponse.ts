export type WeatherShowResponse = {
  title: string
  location_type: string
  latt_long: string
  time: string
  sun_rise: string
  sun_set: string
  timezone_name: string
  parent: {
    title: string
    location_type: string
    latt_long: string
    woeid: number
  }
  consolidated_weather: {
    id: number
    applicable_date: string
    weather_state_name: string
    weather_state_abbr: string
    wind_speed: number
    wind_direction: number
    wind_direction_compass: string
    min_temp: number
    max_temp: number
    the_temp: number
    air_pressure: number
    humidity: number
    visibility: number
    predictability: number
  }[]
  sources: {
    title: string
    url: string
  }[]
}