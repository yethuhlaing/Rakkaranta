"use client"

import { useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts"

interface TemperatureGaugeProps {
  currentTemp: number
}

export default function TemperatureGauge({ currentTemp }: TemperatureGaugeProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Calculate daily and historical averages based on current temperature
  // In a real app, these would come from historical data
  const dailyAvg = Math.round((currentTemp - 2) * 10) / 10
  const historicalAvg = Math.round((currentTemp - 5) * 10) / 10

  // Data for the gauge
  const data = [
    { name: "Current", value: 1, temp: Math.round(currentTemp * 10) / 10 },
    { name: "Daily Avg", value: 1, temp: dailyAvg },
    { name: "Historical Avg", value: 1, temp: historicalAvg },
  ]

  // Colors for the gauge segments
  const COLORS = ["#3b82f6", "#93c5fd", "#dbeafe"]

  // Function to render the active shape with temperature value
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, index } = props

    return (
      <g>
        <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill="#888">
          {payload.name}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="24" fontWeight="bold" fill="#888">
          {payload.temp}°C
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  // Temperature range for the scale - dynamically calculated based on current temp
  const minTemp = Math.min(historicalAvg, currentTemp, dailyAvg) - 10
  const maxTemp = Math.max(historicalAvg, currentTemp, dailyAvg) + 10
  const tempRange = [minTemp, maxTemp]
  const tempScale = Array.from(
    { length: 5 },
    (_, i) => Math.round((tempRange[0] + i * ((tempRange[1] - tempRange[0]) / 4)) * 10) / 10,
  )

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              startAngle={270}
              endAngle={0}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Temperature scale */}
      <div className="flex justify-between px-8">
        {tempScale.map((temp, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="h-2 w-1 bg-gray-300 mb-1"></div>
            <span className="text-xs text-gray-500">{temp}°</span>
          </div>
        ))}
      </div>
    </div>
  )
}

