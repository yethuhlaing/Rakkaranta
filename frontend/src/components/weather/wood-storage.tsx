import { Progress } from "@/components/ui/progress"

export default function WoodStorage() {
  // Sample wood storage data
  const woodLevel = 70 // percentage
  const dailyConsumption = 10 // percentage per day

  return (
    <div>
      <div className="flex justify-between items-center text-xs mb-1">
        <span>{woodLevel}% remaining</span>
        <span>~{Math.floor(woodLevel / dailyConsumption)} days left</span>
      </div>
      <div className="relative">
        <Progress value={woodLevel} className="h-2" />
        {/* Restock threshold line */}
        <div className="absolute top-0 bottom-0 left-[20%] w-0.5 bg-red-400"></div>
      </div>
      <div className="flex justify-between items-center mt-1">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-red-400"></div>
          <span className="text-xs text-muted-foreground">Restock threshold</span>
        </div>
        <span className="text-xs text-muted-foreground">Daily usage: {dailyConsumption}%</span>
      </div>
    </div>
  )
}

