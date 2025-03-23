import { Progress } from "@/components/ui/progress"

interface AuroraForecastProps {
  cloudCover: number
}

export default function AuroraForecast({ cloudCover }: AuroraForecastProps) {
  // Current Kp-index value (0-9 scale)
  // In a real app, this would come from a space weather API
  const kpIndex = 5.7

  // Calculate progress percentage
  const progressPercentage = (kpIndex / 9) * 100

  // Determine color based on Kp-index value
  const getKpColor = (value) => {
    if (value < 3) return "bg-yellow-500"
    if (value < 5) return "bg-green-500"
    if (value < 7) return "bg-blue-500"
    return "bg-purple-500"
  }

  // Calculate visibility based on cloud cover and Kp-index
  const getVisibilityText = () => {
    if (cloudCover > 70) return "Poor (Heavy Cloud Cover)"
    if (cloudCover > 30) return "Moderate (Some Clouds)"
    if (kpIndex < 3) return "Low (Weak Aurora Activity)"
    if (kpIndex < 5) return "Good"
    return "Excellent"
  }

  return (
    <div className="space-y-4">
      <div className="relative pt-1">
        <Progress value={progressPercentage} className={`h-3 ${getKpColor(kpIndex)}`} />

        {/* Kp-index scale markers */}
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">0</span>
          <span className="text-xs text-muted-foreground">3</span>
          <span className="text-xs text-muted-foreground">6</span>
          <span className="text-xs text-muted-foreground">9</span>
        </div>

        {/* Visibility threshold indicator */}
        <div className="absolute top-0 left-[33%] h-5 border-l border-dashed border-gray-400">
          <span className="absolute top-6 left-0 transform -translate-x-1/2 text-xs text-muted-foreground">
            Visibility Threshold
          </span>
        </div>
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Low</span>
        <span>Moderate</span>
        <span>Strong</span>
        <span>Extreme</span>
      </div>

      <div className="text-xs mt-1">
        <span className="font-medium">Current Visibility:</span> {getVisibilityText()}
      </div>
    </div>
  )
}

