import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Activity } from "@/lib/recommendation"

interface ActivityCardsProps {
  activities: Activity[]
  iconMap: Record<string, React.ComponentType<any>>
}

export default function ActivityCards({ activities, iconMap }: ActivityCardsProps) {
  // Function to render suitability stars
  const renderSuitabilityStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`text-sm ${i < rating ? "text-yellow-500" : "text-gray-300"}`}>
          ★
        </span>
      ))
  }

  // Display only the top 6 activities
  const topActivities = activities.slice(0, 6)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {topActivities.map((activity) => {
        const IconComponent = iconMap[activity.icon]

        return (
          <Card key={activity.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-[hsl(213,58%,95%)] dark:bg-transparent">
                    {IconComponent && <IconComponent className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-medium">{activity.name}</h3>
                    <div className="flex mt-1">{renderSuitabilityStars(activity.suitability)}</div>
                  </div>
                </div>
                <Badge
                  variant={activity.suitability >= 4 ? "default" : "outline"}
                  className={activity.suitability >= 4 ? "bg-green-600" : ""}
                >
                  {activity.suitability >= 4 ? "Recommended" : "Good"}
                </Badge>
              </div>

              <div className="mt-3 text-sm text-muted-foreground">{activity.reason}</div>

              <div className="mt-3 flex justify-between text-xs">
                <div className="flex items-center gap-1">
                  <span className="font-medium">When:</span> {activity.timeframe}
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Where:</span> {activity.location}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

