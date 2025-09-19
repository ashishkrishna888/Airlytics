import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PollutantCardProps {
  name: string;
  value: number;
  unit: string;
  level: string;
  trend?: "up" | "down" | "stable";
}

const getLevelColor = (level: string): string => {
  switch (level) {
    case "excellent": return "aqi-excellent";
    case "good": return "aqi-good";
    case "moderate": return "aqi-moderate";
    case "poor": return "aqi-poor";
    case "very-poor": return "aqi-very-poor";
    case "hazardous": return "aqi-hazardous";
    default: return "aqi-good";
  }
};

const getPollutantIcon = (name: string) => {
  // You could add specific icons for different pollutants here
  return null;
};

const getTrendIcon = (trend?: string) => {
  switch (trend) {
    case "up": return TrendingUp;
    case "down": return TrendingDown;
    case "stable": return Minus;
    default: return null;
  }
};

export function PollutantCard({ name, value, unit, level, trend }: PollutantCardProps) {
  const levelColor = getLevelColor(level);
  const TrendIcon = getTrendIcon(trend);

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-200">{name}</span>
          {TrendIcon && (
            <div className="p-1 rounded-full bg-white/10 border border-white/20">
              <TrendIcon 
                className={cn(
                  "h-3 w-3",
                  trend === "up" && "text-red-400",
                  trend === "down" && "text-green-400",
                  trend === "stable" && "text-blue-300"
                )}
              />
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-white">
            {value.toFixed(1)}
          </span>
          <span className="text-sm text-blue-200/70 font-medium">{unit}</span>
        </div>
        
        <Badge 
          variant="outline"
          className="text-xs capitalize bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        >
          {level.replace("-", " ")}
        </Badge>
        
        {/* Enhanced visual indicator bar */}
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-white/10 border border-white/20 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 transition-all duration-700 ease-out"
              style={{ 
                width: `${Math.min((value / getMaxValueForPollutant(name)) * 100, 100)}%` 
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-blue-200/60">
            <span>0</span>
            <span>{getMaxValueForPollutant(name)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to get max values for different pollutants for the progress bar
function getMaxValueForPollutant(name: string): number {
  switch (name.toLowerCase()) {
    case "pm25": return 50;
    case "pm10": return 100;
    case "o3": return 150;
    case "no2": return 100;
    case "so2": return 50;
    case "co": return 10;
    default: return 100;
  }
}