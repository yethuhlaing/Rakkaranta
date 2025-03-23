import { Progress } from "@/components/ui/progress"

export default function WaterSystem() {
  // Sample hot tub data
  const temperature = 38 // Celsius
  const targetTemp = 39 // Celsius
  const waterLevel = 95 // percentage

  return (
    <div className="space-y-2">
      <div>
        <div className="flex justify-between items-center text-xs mb-1">
          <span>Temperature</span>
          <span>
            {temperature}°C / {targetTemp}°C
          </span>
        </div>
        <Progress value={(temperature / targetTemp) * 100} className="h-2 bg-blue-100" />
      </div>

      <div>
        <div className="flex justify-between items-center text-xs mb-1">
          <span>Water Level</span>
          <span>{waterLevel}%</span>
        </div>
        <Progress value={waterLevel} className="h-2 bg-blue-100" />
      </div>

      <div className="flex justify-between items-center text-xs pt-1">
        <span className="text-green-600 font-medium">Ready for use</span>
        <span>Last cleaned: Today</span>
      </div>
    </div>
  )
}

