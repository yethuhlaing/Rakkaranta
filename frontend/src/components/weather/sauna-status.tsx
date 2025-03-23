import { Progress } from "@/components/ui/progress"

export default function SaunaStatus() {
  // Sample sauna data
  const saunas = [
    { name: "Main Lodge Sauna", temp: 85, status: "available", occupancy: 2, maxOccupancy: 8 },
    { name: "Lakeside Sauna", temp: 90, status: "available", occupancy: 0, maxOccupancy: 6 },
    { name: "Forest Cabin Sauna", temp: 75, status: "heating", occupancy: 0, maxOccupancy: 4 },
    { name: "Private Villa Sauna", temp: 0, status: "maintenance", occupancy: 0, maxOccupancy: 4 },
  ]

  // Function to get temperature color
  const getTempColor = (temp) => {
    if (temp < 60) return "bg-blue-400"
    if (temp < 80) return "bg-yellow-400"
    return "bg-red-500"
  }

  // Function to get status text and color
  const getStatusInfo = (status) => {
    switch (status) {
      case "available":
        return { text: "Available", color: "text-green-600" }
      case "heating":
        return { text: "Heating", color: "text-yellow-600" }
      case "maintenance":
        return { text: "Maintenance", color: "text-red-600" }
      default:
        return { text: status, color: "text-gray-600" }
    }
  }

  return (
    <div className="space-y-2">
      {saunas.map((sauna, index) => {
        const statusInfo = getStatusInfo(sauna.status)

        return (
          <div key={index} className="p-2 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{sauna.name}</span>
              <span className={`text-xs ${statusInfo.color}`}>{statusInfo.text}</span>
            </div>

            {sauna.status !== "maintenance" && (
              <div className="mt-1">
                <div className="flex justify-between items-center text-xs">
                  <span>{sauna.temp}°C</span>
                  <span>
                    {sauna.occupancy}/{sauna.maxOccupancy} people
                  </span>
                </div>
                <Progress value={sauna.temp} max={100} className={`h-1.5 mt-1 ${getTempColor(sauna.temp)}`} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

