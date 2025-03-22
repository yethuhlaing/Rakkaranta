import { MapPin, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import type { WeatherData } from "@/lib/open-weather"

interface TrailMapProps {
  weatherData?: WeatherData
}

export default function TrailMap({ weatherData }: TrailMapProps) {
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  
  // Sample trail data
  const baseTrails = [
    { id: 1, name: "Northern Loop", difficulty: "easy", estimatedTime: "1h", x: 30, y: 20, length: "2.3 km", elevation: "45m" },
    { id: 2, name: "Forest Path", difficulty: "moderate", estimatedTime: "2h", x: 50, y: 40, length: "4.1 km", elevation: "120m" },
    { id: 3, name: "Lakeside Trail", difficulty: "easy", estimatedTime: "45m", x: 70, y: 60, length: "1.5 km", elevation: "20m" },
    { id: 4, name: "Mountain View", difficulty: "difficult", estimatedTime: "3h", x: 20, y: 70, length: "7.2 km", elevation: "350m" },
    { id: 5, name: "Aurora Viewpoint", difficulty: "moderate", estimatedTime: "1.5h", x: 80, y: 30, length: "3.8 km", elevation: "180m" },
  ]

  // Determine trail conditions based on weather data
  const trails = baseTrails.map((trail) => {
    let condition = "good" // Default condition
    let warningMessage = "";

    if (weatherData) {
      const current = weatherData.current

      if (!current) {
        return null
      }
      
      // Determine condition based on weather
      if (current.weather[0].main === "Snow" && current.wind_speed > 15) {
        condition = "closed" // Heavy snow and wind
        warningMessage = "Closed due to heavy snow and high winds"
      } else if (current.weather[0].main === "Snow") {
        condition = "fair" // Snow but manageable
        warningMessage = "Snow present - proper footwear required"
      } else if (current.weather[0].main === "Rain") {
        condition = "fair" // Rain makes trails wet
        warningMessage = "Trail may be slippery due to rain"
      } else if (current.temp < -20) {
        condition = "fair" // Very cold
        warningMessage = "Extreme cold - dress appropriately"
      } else if (current.weather[0].main === "Clear" && current.temp > -10) {
        condition = "excellent" // Perfect conditions
      }

      // Mountain View trail is more susceptible to closure
      if (trail.id === 4 && (current.wind_speed > 10 || current.weather[0].main === "Snow")) {
        condition = "closed"
        warningMessage = "Closed due to dangerous conditions at higher elevations"
      }
    }

    return { ...trail, condition, warningMessage }
  })

  // Function to get condition color
  const getConditionColor = (condition) => {
    switch (condition) {
      case "excellent":
        return "bg-green-500"
      case "good":
        return "bg-blue-500"
      case "fair":
        return "bg-yellow-500"
      case "closed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Function to get difficulty badge
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Easy
          </Badge>
        )
      case "moderate":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Moderate
          </Badge>
        )
      case "difficult":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Difficult
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handlePointClick = (trail) => {
    setSelectedTrail(trail === selectedTrail ? null : trail);
    setShowMobileInfo(true);
  };

  const closeMobileInfo = () => {
    setShowMobileInfo(false);
    setSelectedTrail(null);
  };
  
  // Get currently selected trail data
  const activeTrail = trails.find(trail => trail && trail.id === selectedTrail);

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden border border-gray-200 ">
      {/* Improved map background with terrain features */}
      <svg viewBox="0 0 1000 800" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Background terrain */}
        <defs>
          {/* Pattern for forest areas */}
          <pattern
            id="forestPattern"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            patternTransform="rotate(45)"
          >
            <rect width="20" height="20" fill="rgb(220, 252, 231)" />
            <circle cx="10" cy="10" r="1.5" fill="rgb(134, 239, 172)" />
          </pattern>

          {/* Pattern for water */}
          <pattern id="waterPattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <rect width="20" height="20" fill="rgb(224, 242, 254)" />
            <path d="M0 10 Q 5 5, 10 10 T 20 10" stroke="rgb(186, 230, 253)" strokeWidth="1" fill="none" />
            <path d="M0 15 Q 5 10, 10 15 T 20 15" stroke="rgb(186, 230, 253)" strokeWidth="1" fill="none" />
          </pattern>
        </defs>

        {/* Base terrain */}
        <rect x="0" y="0" width="1000" height="800" fill="#f3f4f6" />

        {/* Elevation contours */}
        <ellipse
          cx="200"
          cy="150"
          rx="150"
          ry="120"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <ellipse
          cx="200"
          cy="150"
          rx="200"
          ry="160"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <ellipse
          cx="200"
          cy="150"
          rx="250"
          ry="200"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Forest areas */}
        <ellipse cx="200" cy="200" rx="180" ry="150" fill="url(#forestPattern)" opacity="0.8" />
        <ellipse cx="750" cy="500" rx="150" ry="120" fill="url(#forestPattern)" opacity="0.8" />
        <ellipse cx="400" cy="650" rx="120" ry="100" fill="url(#forestPattern)" opacity="0.8" />

        {/* Lake */}
        <rect x="550" y="350" width="300" height="250" rx="20" ry="20" fill="url(#waterPattern)" />

        {/* Trails */}
        <path
          d="M100,300 C150,250 300,200 450,250 S650,350 800,300"
          stroke="#9ca3af"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M150,550 C250,500 350,520 450,500 S600,450 700,500"
          stroke="#9ca3af"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M600,200 C650,250 680,300 650,400"
          stroke="#9ca3af"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Main hiking trail */}
        <path
          d="M50,400 C150,380 250,420 350,400 S500,350 600,380 S750,450 850,400"
          stroke="#ef4444"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="0"
          fill="none"
        />

        {/* Points of interest */}
        <g className="point-of-interest" onClick={() => handlePointClick("trailhead")}>
          <circle
            cx="100"
            cy="400"
            r="15"
            fill={selectedTrail === "trailhead" ? "#f97316" : "#f59e0b"}
            stroke="#fff"
            strokeWidth="2"
            className="cursor-pointer hover:fill-orange-500 transition-colors"
          />
          <text x="100" y="440" textAnchor="middle" fill="#374151" fontWeight="bold" fontSize="16">
            Trailhead
          </text>
        </g>

        <g className="point-of-interest" onClick={() => handlePointClick("viewpoint")}>
          <circle
            cx="350"
            cy="250"
            r="15"
            fill={selectedTrail === "viewpoint" ? "#f97316" : "#f59e0b"}
            stroke="#fff"
            strokeWidth="2"
            className="cursor-pointer hover:fill-orange-500 transition-colors"
          />
          <text x="350" y="290" textAnchor="middle" fill="#374151" fontWeight="bold" fontSize="16">
            Viewpoint
          </text>
        </g>

        <g className="point-of-interest" onClick={() => handlePointClick("waterfall")}>
          <circle
            cx="650"
            cy="380"
            r="15"
            fill={selectedTrail === "waterfall" ? "#f97316" : "#f59e0b"}
            stroke="#fff"
            strokeWidth="2"
            className="cursor-pointer hover:fill-orange-500 transition-colors"
          />
          <text x="650" y="420" textAnchor="middle" fill="#374151" fontWeight="bold" fontSize="16">
            Waterfall
          </text>
        </g>

        <g className="point-of-interest" onClick={() => handlePointClick("campsite")}>
          <circle
            cx="800"
            cy="500"
            r="15"
            fill={selectedTrail === "campsite" ? "#f97316" : "#f59e0b"}
            stroke="#fff"
            strokeWidth="2"
            className="cursor-pointer hover:fill-orange-500 transition-colors"
          />
          <text x="800" y="540" textAnchor="middle" fill="#374151" fontWeight="bold" fontSize="16">
            Campsite
          </text>
        </g>

        {/* Legend */}
        <rect x="50" y="650" rx="10" fill="none" ry="10" stroke="#d1d5db" strokeWidth="1" />
        <text x="150" y="680" textAnchor="left" fill="#374151" fontWeight="bold" fontSize="18">
          Legend
        </text>

        <line x1="70" y1="700" x2="100" y2="700" stroke="#ef4444" strokeWidth="4" />
        <text x="160" y="705" fill="#374151" fontSize="14">
          Main Trail
        </text>

        <line x1="70" y1="730" x2="100" y2="730" stroke="#9ca3af" strokeWidth="4" />
        <text x="160" y="735" fill="#374151" fontSize="14">
          Secondary Path
        </text>

        <circle cx="85" cy="760" r="8" fill="#f59e0b" />
        <text x="160" y="765" fill="#374151" fontSize="14">
          Point of Interest
        </text>
      </svg>

      {/* Trail markers */}
      {trails && trails.filter(trail => trail !== null).map((trail) => (
        <div
          key={trail.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: `${trail.x}%`, top: `${trail.y}%` }}
        >
          <button 
            onClick={() => handlePointClick(trail)}
            className={`relative group p-2 rounded-full transition-all ${selectedTrail === trail.id ? 'bg-gray-200/70 dark:bg-transparent' : 'hover:bg-gray-200/40'}`}
            aria-label={`View ${trail.name} trail info`}
          >
            <MapPin
              className={`h-7 w-7 ${trail.condition === "closed" ? "text-red-500" : "text-gray-800"} 
                ${selectedTrail === trail.id ? 'scale-125' : ''} transition-transform`}
            />
            <div
              className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full ${getConditionColor(trail.condition)}
                ${selectedTrail === trail.id ? 'animate-pulse' : ''}`}
            ></div>

            {/* Desktop tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 bg-white dark:bg-black rounded-md shadow-lg p-3 
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20
                hidden md:block">
              <div className="font-medium text-base">{trail.name}</div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs capitalize">
                  Condition: <span className="font-medium">{trail.condition}</span>
                </span>
                {getDifficultyBadge(trail.difficulty)}
              </div>
              <div className="text-xs mt-1">Length: {trail.length} • Est. time: {trail.estimatedTime}</div>
              <div className="text-xs mt-1">Elevation gain: {trail.elevation}</div>
              {trail.warningMessage && (
                <div className="text-xs text-red-500 mt-1 font-medium">{trail.warningMessage}</div>
              )}
            </div>
          </button>
        </div>
      ))}

      {/* Mobile info panel */}
      {showMobileInfo && activeTrail && (
        <div className="absolute bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-lg p-4 z-30 
            transform transition-transform md:hidden">
          <button 
            onClick={closeMobileInfo}
            className="absolute top-3 right-3 text-gray-500"
            aria-label="Close trail info"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="flex items-start gap-3">
            <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${getConditionColor(activeTrail.condition)}`}></div>
            <div className="flex-1">
              <div className="font-medium text-lg">{activeTrail.name}</div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm capitalize">
                  Status: <span className="font-medium">{activeTrail.condition}</span>
                </span>
                {getDifficultyBadge(activeTrail.difficulty)}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-sm">Length: <span className="font-medium">{activeTrail.length}</span></div>
                <div className="text-sm">Time: <span className="font-medium">{activeTrail.estimatedTime}</span></div>
                <div className="text-sm">Elevation: <span className="font-medium">{activeTrail.elevation}</span></div>
              </div>
              {activeTrail.warningMessage && (
                <div className="flex items-center gap-1 text-sm text-red-500 mt-2">
                  <Info className="h-4 w-4" />
                  <span>{activeTrail.warningMessage}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


    </div>
  )
}