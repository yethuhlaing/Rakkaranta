import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"


interface VisibilityFactorsProps {
  cloudCover: number
}

export default function VisibilityFactors({ cloudCover }: VisibilityFactorsProps) {
  // Get current hour to determine light pollution (simplified)
  const currentHour = new Date().getHours()
  const isDarkHours = currentHour >= 20 || currentHour <= 5

  // Calculate moon phase (simplified - in a real app would use astronomical calculations)
  // 0 = new moon (good for aurora), 100 = full moon (bad for aurora)
  const moonPhase = 30

  // Data for visibility factors (0-100 scale)
  const data = [
    { factor: "Cloud Cover", current: cloudCover, ideal: 0 },
    { factor: "Light Pollution", current: isDarkHours ? 20 : 80, ideal: 0 },
    { factor: "Moon Phase", current: moonPhase, ideal: 0 },
    { factor: "Solar Activity", current: 80, ideal: 100 }, // High solar activity is good for aurora
    { factor: "Viewing Angle", current: 70, ideal: 100 }, // Northern Finland has good viewing angles
  ]

  // Calculate overall visibility score
  const factors = data.map((item) => {
    const score =
      item.factor === "Solar Activity" || item.factor === "Viewing Angle" ? item.current : 100 - item.current
    return score
  })

  const visibilityScore = Math.round(factors.reduce((sum, score) => sum + score, 0) / factors.length)

  return (
    <div className="h-full w-full flex flex-col">
      <div className="text-center mb-2">
        <span className="text-sm text-muted-foreground">Visibility Score</span>
        <div className="text-2xl font-bold">{visibilityScore}%</div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="100%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="factor" tick={{ fontSize: 10 }} />
            <PolarRadiusAxis angle={190} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Current"
              dataKey="current"
              stroke="hsl(213,58%,80%)"
              fill="hsl(213,58%,80%)"
              fillOpacity={0.5}
            />
            <Radar name="Ideal" dataKey="ideal" stroke="#93c5fd" fill="#93c5fd" fillOpacity={0.3} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

