import { Sun, Cloud, CloudRain, Snowflake, CloudFog } from "lucide-react"
import { type WeatherData, formatTime, mapWeatherCondition } from "@/lib/open-weather"
import {  Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Tooltip, TooltipProvider } from "../ui/tooltip"

interface WeatherTimelineProps {
  weatherData: WeatherData
}

export default function WeatherTimeline({ weatherData }: WeatherTimelineProps) {
  // Process hourly forecast data for the chart
  const data = weatherData.hourly?.slice(0, 24).map((hour) => ({
    time: formatTime(hour.dt),
    temp: Math.round(hour.temp),
    condition: mapWeatherCondition(hour.weather[0].id),
    description: hour.weather[0].description,
    humidity: hour.humidity,
    windSpeed: hour.wind_speed,
  }))

  if (!data) {
    return null
  }
  // Function to render the weather condition icon
  const renderWeatherIcon = (condition) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "partlyCloudy":
        return <Cloud className="h-5 w-5 text-gray-400" />
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-600" />
      case "rain":
      case "drizzle":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      case "snow":
        return <Snowflake className="h-5 w-5 text-blue-300" />
      case "fog":
        return <CloudFog className="h-5 w-5 text-gray-400" />
      case "thunderstorm":
        return <CloudRain className="h-5 w-5 text-purple-500" />
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />
    }
  }

  // Custom tooltip component
  interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-[hsl(213,58%,80%)]">{`Temperature: ${payload[0].value}°C`}</p>
          <div className="flex items-center gap-1 mt-1">
            <span>Condition:</span>
            {renderWeatherIcon(payload[0].payload.condition)}
            <span>{payload[0].payload.description}</span>
          </div>
          <p className="text-xs mt-1">{`Humidity: ${payload[0].payload.humidity}%`}</p>
          <p className="text-xs">{`Wind: ${payload[0].payload.windSpeed} km/h`}</p>
        </div>
      )
    }
    return null
  }

  // Find min and max temperatures for the y-axis domain
  const minTemp = Math.min(...data?.map((d) => d.temp)) - 2
  const maxTemp = Math.max(...data?.map((d) => d.temp)) + 2

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 30, right: 10, left: -20, bottom: 0 }}> 

          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis
            domain={[minTemp, maxTemp]}
            axisLine={false}
            tickLine={true}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}°`}
          />
          <TooltipProvider>
            <Tooltip>
              <CustomTooltip />
            </Tooltip>
          </TooltipProvider>
          <Area 
            type="basisOpen" 
            dataKey="temp" 
            stroke="hsl(213,58%,80%)" 
            strokeWidth={2} 
            fill="url(#tempGradient)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

