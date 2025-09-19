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
    <Card className="shadow-card bg-gradient-card border-0 transition-all hover:shadow-elevated">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{name}</span>
          {TrendIcon && (
            <TrendIcon 
              className={cn(
                "h-4 w-4",
                trend === "up" && "text-aqi-poor",
                trend === "down" && "text-aqi-good",
                trend === "stable" && "text-muted-foreground"
              )}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-foreground">
            {value.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        
        <Badge 
          variant="outline"
          className={cn(
            "text-xs capitalize",
            `border-${levelColor} text-${levelColor} bg-${levelColor}/10`
          )}
        >
          {level.replace("-", " ")}
        </Badge>
        
        {/* Visual indicator bar */}
        <div className="h-1 w-full rounded-full bg-muted">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-500",
              `bg-${levelColor}`
            )}
            style={{ 
              width: `${Math.min((value / getMaxValueForPollutant(name)) * 100, 100)}%` 
            }}
          />
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