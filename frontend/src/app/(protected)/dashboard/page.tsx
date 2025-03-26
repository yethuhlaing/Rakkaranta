"use client"

import { useState, useEffect } from "react"
import {
  Cloud,
  Snowflake,
  Sun,
  Wind,
  Droplets,
  Moon,
  Flame,
  TreePine,
  Waves,
  Timer,
  ChevronRight,
  Info,
  Camera,
  Footprints,
  Fish,
  CloudRain, CloudSnow, CloudFog, CloudLightning, CloudSun,
  Scissors,
  MapPin,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"

import WeatherTimeline from "@/components/weather/weather-timeline"
import TemperatureGauge from "@/components/weather/temperature-gauge"
import WindVisualization from "@/components/weather/wind-visualization"
import AuroraForecast from "@/components/weather/aurora-forecast"
import VisibilityFactors from "@/components/weather/visibility-factors"
import ActivityCards from "@/components/weather/activity-cards"
import TrailMap from "@/components/weather/trail-map"
import SaunaStatus from "@/components/weather/sauna-status"
import WoodStorage from "@/components/weather/wood-storage"
import WaterSystem from "@/components/weather/water-system"

import { type WeatherData, mapWeatherCondition } from "@/lib/open-weather"
import { getRecommendedActivities, type Activity } from "@/lib/recommendation"
import { DashboardHeader } from "@/components/dashboard/header"
import { toast } from "sonner"
import { fetchCachedWeatherData } from "@/actions/fetch-weather-data"

// Map of icon names to Lucide components
const iconMap = {
  Snowflake: Snowflake,
  Flame: Flame,
  Camera: Camera,
  Footprints: Footprints,
  Moon: Moon,
  Fish: Fish,
  Scissors: Scissors,
}

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState("today")
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined)
  const [recommendedActivities, setRecommendedActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch weather data on component mount
  useEffect(() => {
    async function loadWeatherData() {
      try {
        setLoading(true)
        const data = await fetchCachedWeatherData()
        console.log("Open Weather : ", data)
        setWeatherData(data)

        // Generate activity recommendations based on weather
        const activities = getRecommendedActivities(data)
        setRecommendedActivities(activities)
      } catch (err) {
        console.error("Error loading weather data:", err)
        toast.error("Failed to load weather data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadWeatherData()

    // Refresh data every 30 minutes
    const intervalId = setInterval(loadWeatherData, 30 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "thunderstorm":
        return <CloudLightning className="h-10 w-10 text-purple-500" />
      case "drizzle":
        return <CloudRain className="h-10 w-10 text-blue-400" />
      case "rain":
        return <CloudRain className="h-10 w-10 text-blue-600" />
      case "snow":
        return <CloudSnow className="h-10 w-10 text-sky-300" />
      case "fog":
        return <CloudFog className="h-10 w-10 text-gray-400" />
      case "sunny":
        return <Sun className="h-10 w-10 text-amber-400" />
      case "partlyCloudy":
        return <CloudSun className="h-10 w-10 text-gray-500" />
      default:
        return <Cloud className="h-10 w-10 text-gray-500" />
    }
  }

  return (
    <>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
            <DashboardHeader
                heading="Dashboard"
                text="Welcome to your personalized resort experience"
            />
            <div className="flex items-center gap-2">
                {weatherData && (
                  <Badge variant="outline" className="ml-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <div>
                      Hyrynsalmi, Finland
                    </div>
                    <div className="text-xs ml-1 opacity-70">
                      ({weatherData.lat.toFixed(2)}°N, {weatherData.lon.toFixed(2)}°E)
                    </div>
                  </Badge>
                )}
                <Tabs defaultValue="today" className="w-[300px]" onValueChange={setSelectedDate}>
                <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                </TabsList>
                </Tabs>

            </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Current Conditions Card */}
        <Card
          className={`col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br shadow-md hover:shadow-xl transition-all duration-300`}
        >

          <CardHeader className="pb-2 space-y-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold ">Current Conditions</CardTitle>
              {loading ? (
                <Skeleton className="h-10 w-20 rounded-md" />
              ) : (
                <div className="text-4xl font-bold tabular-nums">
                  {weatherData ? `${Math.round(weatherData.current?.temp)}°` : "N/A"}
                </div>
              )}
            </div>
            <CardDescription className=" font-medium">
              {loading ? (
                <Skeleton className="h-5 w-32 rounded-md" />
              ) : weatherData ? (
                `Feels like ${Math.round(weatherData.current?.feels_like)}°C`
              ) : (
                "Loading weather data..."
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              {loading ? (
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-6 w-32 rounded-md" />
                </div>
              ) : (
                weatherData && (
                  <div className="flex items-center gap-3">
                    {getWeatherIcon(mapWeatherCondition(weatherData.current?.weather[0].id))}
                    <span className="text-lg font-medium capitalize">
                      {weatherData.current?.weather[0].description}
                    </span>
                  </div>
                )
              )}
              <Badge variant="outline" className=" font-medium">
                {loading ? "Loading..." : "Updated just now"}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="flex flex-col items-center p-2 rounded-lg  backdrop-blur-sm">
                <Wind className="h-6 w-6 mb-1 text-blue-600" />
                {loading ? (
                  <Skeleton className="h-5 w-16 rounded-md mt-1" />
                ) : (
                  <span className="text-sm font-semibold  mt-1">
                    {weatherData ? `${Math.round(weatherData.current?.wind_speed)} km/h` : "N/A"}
                  </span>
                )}
                <span className="text-xs  mt-1">Wind</span>
              </div>

              <div className="flex flex-col items-center p-2 rounded-lg backdrop-blur-sm">
                <Droplets className="h-6 w-6 mb-1 text-blue-500" />
                {loading ? (
                  <Skeleton className="h-5 w-16 rounded-md mt-1" />
                ) : (
                  <span className="text-sm font-semibold  mt-1">
                    {weatherData ? `${weatherData.current?.humidity}%` : "N/A"}
                  </span>
                )}
                <span className="text-xs mt-1">Humidity</span>
              </div>

              <div className="flex flex-col items-center p-2 rounded-lg backdrop-blur-sm">
                <Cloud className="h-6 w-6 mb-1 text-blue-500" />
                {loading ? (
                  <Skeleton className="h-5 w-16 rounded-md mt-1" />
                ) : (
                  <span className="text-sm font-semibold mt-1">
                    {weatherData ? `${weatherData.current?.clouds}%` : "N/A"}
                  </span>
                )}
                <span className="text-xs mt-1">Cloud Cover</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visibility Factors */}
        <Card className="col-span-1 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Aurora Visibility Factors</CardTitle>
            <CardDescription>Current conditions for aurora viewing</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              weatherData && <VisibilityFactors cloudCover={weatherData.current?.clouds} />
            )}
          </CardContent>
        </Card>

        {/* Northern Lights Prediction */}
        <Card className="col-span-1 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span>Aurora Forecast</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>
                      Kp-index indicates geomagnetic activity.
                      <br />
                      Values of 4+ are good for aurora viewing.
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>
              <div>Tonight&apos;s viewing probability:{" "}</div>
              {loading ? (
                <Skeleton className="inline-block h-4 w-16" />
              ) : (
                <span className="font-medium text-green-600">
                  {weatherData && weatherData.current?.clouds < 30 ? "High" : "Moderate"}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading? (
                <Skeleton className="h-full w-full" />
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Kp-index</span>
                        <div> {/* Ensures consistent structure */}
                            <span className="text-2xl font-bold">5.7</span>
                        </div>
                    </div>
                  
                  <Badge className="bg-green-600">
                    {weatherData && weatherData.current?.clouds < 30 ? "Excellent" : "Good"}
                  </Badge>
                </div>

                <div className="mb-4">
                  <AuroraForecast cloudCover={weatherData?.current?.clouds || 0} />
                </div>

                <div className="p-3 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Best Viewing Time</h4>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Moon className="h-4 w-4" />
                      <span className="text-sm">22:00 - 01:00</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <span>Set Reminder</span>
                      <Timer className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </>
            )
              
            }

          </CardContent>
        </Card>

        {/* Weather Timeline Card */}
        <Card className="col-span-1 md:col-span-3 lg:col-span-3 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>24-Hour Forecast</CardTitle>
            <CardDescription>Hourly temperature and conditions</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Skeleton className="h-[280px] w-full" />
              </div>
            ) : (
              weatherData && <WeatherTimeline weatherData={weatherData} />
            )}
          </CardContent>
        </Card>

        {/* Wind & Precipitation */}
        <Card className="col-span-1 md:col-span-2 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Wind & Precipitation</CardTitle>
            <CardDescription>Current and forecasted conditions</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Skeleton className="h-[280px] w-full" />
              </div>
            ) : (
              weatherData && <WindVisualization weatherData={weatherData} />
            )}
          </CardContent>
        </Card>

        {/* Temperature Gauge */}
        <Card className="col-span-1 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Temperature Trends</CardTitle>
            <CardDescription>Current vs. historical average</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Skeleton className="h-[280px] w-full" />
              </div>
            ) : (
              weatherData && <TemperatureGauge currentTemp={weatherData.current?.temp} />
            )}
          </CardContent>
        </Card>

        {/* Activity Recommendations */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recommended Activities</CardTitle>
                <CardDescription>Based on current and forecasted conditions</CardDescription>
              </div>
              <Button variant="outline" className="gap-1">
                <span>View All</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : (
              <ActivityCards activities={recommendedActivities} iconMap={iconMap} />
            )}
          </CardContent>
        </Card>

        {/* Trail Conditions */}
        <Card className="col-span-1 md:col-span-2 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Trail Conditions</CardTitle>
            <CardDescription>Updated status of resort trails</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <TrailMap weatherData={weatherData} />
            )}
          </CardContent>
        </Card>

        {/* Resource Status */}
        <Card className="col-span-1 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Resort Resources</CardTitle>
            <CardDescription>Current status of amenities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <h4 className="text-sm font-medium flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span>Sauna Temperatures</span>
                  </h4>
                  <Badge variant="outline">3/4 Available</Badge>
                </div>
                <SaunaStatus />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <h4 className="text-sm font-medium flex items-center gap-1">
                    <TreePine className="h-4 w-4 text-emerald-700" />
                    <span>Firewood Storage</span>
                  </h4>
                  <span className="text-xs text-muted-foreground">7 days remaining</span>
                </div>
                <WoodStorage />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <h4 className="text-sm font-medium flex items-center gap-1">
                    <Waves className="h-4 w-4 text-blue-600" />
                    <span>Hot Tub Status</span>
                  </h4>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Ready
                  </Badge>
                </div>
                <WaterSystem />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

