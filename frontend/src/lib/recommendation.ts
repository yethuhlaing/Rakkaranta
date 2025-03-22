import type { WeatherData } from "./open-weather"

// Types for activity data
export interface Activity {
  id: number
  name: string
  icon: string
  suitability: number
  reason: string
  timeframe: string
  location: string
  conditions: {
    minTemp?: number
    maxTemp?: number
    maxWindSpeed?: number
    maxPrecipitation?: number
    maxCloudCover?: number
    timeOfDay?: string[]
    requiresDaylight?: boolean
    requiresDarkness?: boolean
  }
}

// Available activities at the resort
const availableActivities: Activity[] = [
  {
    id: 1,
    name: "Cross-Country Skiing",
    icon: "Snowflake",
    suitability: 0,
    reason: "",
    timeframe: "9:00 - 16:00",
    location: "Northern Trails",
    conditions: {
      minTemp: -20,
      maxTemp: 5,
      maxWindSpeed: 20,
      maxPrecipitation: 50,
      requiresDaylight: true,
    },
  },
  {
    id: 2,
    name: "Sauna Experience",
    icon: "Flame",
    suitability: 0,
    reason: "",
    timeframe: "All day",
    location: "Main Lodge",
    conditions: {
      // Sauna is always good in Finland!
    },
  },
  {
    id: 3,
    name: "Aurora Photography",
    icon: "Camera",
    suitability: 0,
    reason: "",
    timeframe: "22:00 - 01:00",
    location: "Lakeside Viewpoint",
    conditions: {
      maxCloudCover: 30,
      requiresDarkness: true,
    },
  },
  {
    id: 4,
    name: "Nature Hiking",
    icon: "Footprints",
    suitability: 0,
    reason: "",
    timeframe: "10:00 - 15:00",
    location: "Forest Trails",
    conditions: {
      minTemp: -10,
      maxTemp: 25,
      maxWindSpeed: 25,
      maxPrecipitation: 30,
      requiresDaylight: true,
    },
  },
  {
    id: 5,
    name: "Night Snowshoeing",
    icon: "Moon",
    suitability: 0,
    reason: "",
    timeframe: "20:00 - 22:00",
    location: "Moonlight Trail",
    conditions: {
      minTemp: -15,
      maxTemp: 0,
      maxWindSpeed: 15,
      maxPrecipitation: 20,
      requiresDarkness: true,
    },
  },
  {
    id: 6,
    name: "Ice Fishing",
    icon: "Fish",
    suitability: 0,
    reason: "",
    timeframe: "8:00 - 16:00",
    location: "Frozen Lake",
    conditions: {
      minTemp: -20,
      maxTemp: 0,
      maxWindSpeed: 15,
      requiresDaylight: true,
    },
  },
  {
    id: 7,
    name: "Snowmobile Safari",
    icon: "Snowflake",
    suitability: 0,
    reason: "",
    timeframe: "10:00 - 15:00",
    location: "Adventure Center",
    conditions: {
      minTemp: -25,
      maxTemp: 0,
      maxWindSpeed: 20,
      maxPrecipitation: 30,
      requiresDaylight: true,
    },
  },
  {
    id: 8,
    name: "Indoor Crafts Workshop",
    icon: "Scissors",
    suitability: 0,
    reason: "",
    timeframe: "14:00 - 16:00",
    location: "Activity Center",
    conditions: {
      // Indoor activities are good in bad weather
    },
  },
]

// Function to determine if it's currently daytime
function isDaytime(timestamp: number): boolean {
  const date = new Date(timestamp * 1000)
  const hours = date.getHours()
  return hours >= 8 && hours <= 16 // Simplified for demo
}

// Function to determine if it's currently nighttime
function isNighttime(timestamp: number): boolean {
  const date = new Date(timestamp * 1000)
  const hours = date.getHours()
  return hours >= 20 || hours <= 4 // Simplified for demo
}

// Function to generate reasons based on weather conditions
function generateReason(activity: Activity, weather: WeatherData): string {
  const current = weather.current

  // Default reasons
  const goodReasons = ["Perfect conditions right now", "Ideal weather for this activity", "Highly recommended today"]

  const badReasons = [
    "Weather conditions not ideal",
    "Limited visibility may affect experience",
    "Consider alternative activities",
  ]

  // Activity-specific reasons
  if (activity.name === "Cross-Country Skiing") {
    if (current.weather[0].main === "Snow") return "Fresh snow provides excellent skiing conditions"
    if (current.temp < -5) return "Cold temperatures keeping snow in great condition"
    if (current.temp > 0) return "Snow may be soft due to warmer temperatures"
  }

  if (activity.name === "Aurora Photography") {
    if (current.clouds < 20) return "Clear skies perfect for aurora viewing"
    if (current.clouds > 70) return "Cloud cover may obstruct aurora visibility"
  }

  if (activity.name === "Sauna Experience") {
    if (current.temp < -10) return "Perfect day to warm up in the sauna"
    return "Traditional Finnish relaxation experience"
  }

  // Generic good/bad reasons based on suitability
  return activity.suitability >= 4
    ? goodReasons[Math.floor(Math.random() * goodReasons.length)]
    : badReasons[Math.floor(Math.random() * badReasons.length)]
}

// Function to calculate activity suitability based on weather conditions
function calculateSuitability(activity: Activity, weather: WeatherData): number {
  const current = weather.current
  let suitability = 5 // Start with maximum suitability

  // Check temperature conditions
  if (activity.conditions.minTemp !== undefined && current.temp < activity.conditions.minTemp) {
    suitability -= Math.min(3, Math.ceil((activity.conditions.minTemp - current.temp) / 2))
  }

  if (activity.conditions.maxTemp !== undefined && current.temp > activity.conditions.maxTemp) {
    suitability -= Math.min(3, Math.ceil((current.temp - activity.conditions.maxTemp) / 5))
  }

  // Check wind conditions
  if (activity.conditions.maxWindSpeed !== undefined && current.wind_speed > activity.conditions.maxWindSpeed) {
    suitability -= Math.min(3, Math.ceil((current.wind_speed - activity.conditions.maxWindSpeed) / 5))
  }

  // Check precipitation conditions
  const precipitation = weather.hourly[0].pop * 100 // Convert to percentage
  if (activity.conditions.maxPrecipitation !== undefined && precipitation > activity.conditions.maxPrecipitation) {
    suitability -= Math.min(3, Math.ceil((precipitation - activity.conditions.maxPrecipitation) / 20))
  }

  // Check cloud cover conditions
  if (activity.conditions.maxCloudCover !== undefined && current.clouds > activity.conditions.maxCloudCover) {
    suitability -= Math.min(3, Math.ceil((current.clouds - activity.conditions.maxCloudCover) / 20))
  }

  // Check daylight/darkness requirements
  if (activity.conditions.requiresDaylight && !isDaytime(current.dt)) {
    suitability -= 3
  }

  if (activity.conditions.requiresDarkness && !isNighttime(current.dt)) {
    suitability -= 3
  }

  // Special case for indoor activities - they're better when weather is bad
  if (activity.name === "Indoor Crafts Workshop" || activity.name === "Sauna Experience") {
    if (current.weather[0].main === "Rain" || current.weather[0].main === "Snow" || current.temp < -15) {
      suitability = Math.min(5, suitability + 2)
    }
  }

  // Ensure suitability is between 1 and 5
  return Math.max(1, Math.min(5, suitability))
}

// Main function to get recommended activities based on weather data
export function getRecommendedActivities(weather: WeatherData): Activity[] {
  // Calculate suitability for each activity
  const activitiesWithSuitability = availableActivities.map((activity) => {
    const suitability = calculateSuitability(activity, weather)
    const reason = generateReason({ ...activity, suitability }, weather)

    return {
      ...activity,
      suitability,
      reason,
    }
  })

  // Sort by suitability (highest first)
  return activitiesWithSuitability.sort((a, b) => b.suitability - a.suitability)
}

