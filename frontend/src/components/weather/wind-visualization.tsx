import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Wind, Droplets } from "lucide-react"
import { type WeatherData, formatTime, getWindDirection } from "@/lib/open-weather"
import { TooltipProvider } from "../ui/tooltip"

interface WindVisualizationProps {
  weatherData: WeatherData
}

export default function WindVisualization({ weatherData }: WindVisualizationProps) {
  // Process hourly forecast data for wind and precipitation
  const data = weatherData.hourly?.slice(0, 12).map((hour, index) => ({
    time: index === 0 ? "Now" : formatTime(hour.dt),
    wind: Math.round(hour.wind_speed),
    precipitation: Math.round(hour.pop * 100), // Convert to percentage
    direction: getWindDirection(hour.wind_deg),
  }))
  if (!data) {
    return null
  }
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <div className="flex items-center gap-1 mt-1">
            <Wind className="h-4 w-4 text-blue-500" />
            <span>{`${payload[0].value} km/h ${payload[0].payload.direction}`}</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Droplets className="h-4 w-4 text-blue-300" />
            <span>{`${payload[1].value}% chance`}</span>
          </div>
        </div>
      )
    }
    return null
  }

  // Find max values for y-axis domains
  const maxWind = Math.max(...data.map((d) => d.wind)) + 5
  const maxPrecip = 100 // Precipitation is a percentage

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="left"
            orientation="left"
            domain={[0, maxWind]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}`}
            label={{
              value: "Wind (km/h)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fontSize: 12, fill: "#888" },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, maxPrecip]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
            label={{
              value: "Precipitation",
              angle: 90,
              position: "insideRight",
              style: { textAnchor: "middle", fontSize: 12, fill: "#888" },
            }}
          />
          <TooltipProvider>
            <Tooltip content={<CustomTooltip />} />
          </TooltipProvider>
          <Legend />
          <Bar yAxisId="left" dataKey="wind" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Wind Speed" />
          <Bar yAxisId="right" dataKey="precipitation" fill="#60a5fa" radius={[4, 4, 0, 0]} name="Precipitation" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

