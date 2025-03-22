// Weather API utility functions

import { DEFAULT_LAT, DEFAULT_LON } from "@/config/weather";

const API_KEY = process.env.OPENWEATHER_API_KEY || '';
// OpenWeatherMap API key - in production, this should be an environment variable


// Types for weather data
export interface CurrentWeather {
  temp: number
  feels_like: number
  humidity: number
  wind_speed: number
  wind_deg: number
  clouds: number
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  dt: number
}

export interface HourlyForecast {
  dt: number
  temp: number
  feels_like: number
  humidity: number
  wind_speed: number
  wind_deg: number
  clouds: number
  pop: number // Probability of precipitation
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
}

export interface WeatherData {
  current: CurrentWeather
  hourly: HourlyForecast[]
  daily: any[] // We'll expand this if needed
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
}

// Function to fetch weather data from OpenWeatherMap API
export async function fetchWeatherData(lat = DEFAULT_LAT, lon = DEFAULT_LON): Promise<WeatherData> {
    try {
        const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${API_KEY}`,
        )
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Failed to fetch weather data:", error)
        throw error
    }
}

// Function to get weather icon URL from OpenWeatherMap
export function getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

// Function to convert weather condition to our internal condition type
export function mapWeatherCondition(weatherId: number): string {
    // Weather condition codes: https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 300) return "thunderstorm"
    if (weatherId >= 300 && weatherId < 400) return "drizzle"
    if (weatherId >= 500 && weatherId < 600) return "rain"
    if (weatherId >= 600 && weatherId < 700) return "snow"
    if (weatherId >= 700 && weatherId < 800) return "fog"
    if (weatherId === 800) return "sunny"
    if (weatherId > 800) return "partlyCloudy"
    return "cloudy"
}

// Function to convert wind degrees to direction
export function getWindDirection(degrees: number): string {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    const index = Math.round(degrees / 45) % 8
    return directions[index]
}

// Function to format time from timestamp
export function formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

// Function to format date from timestamp
export function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })
}

