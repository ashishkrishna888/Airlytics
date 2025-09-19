import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface AQICardProps {
  aqi: number;
  level: string;
  color: string;
  isLoading?: boolean;
}

const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return "aqi-excellent";
  if (aqi <= 100) return "aqi-good";
  if (aqi <= 150) return "aqi-moderate";
  if (aqi <= 200) return "aqi-poor";
  if (aqi <= 300) return "aqi-very-poor";
  return "aqi-hazardous";
};

const getAQILevel = (aqi: number): string => {
  if (aqi <= 50) return "Excellent";
  if (aqi <= 100) return "Good";
  if (aqi <= 150) return "Moderate";
  if (aqi <= 200) return "Poor";
  if (aqi <= 300) return "Very Poor";
  return "Hazardous";
};

export function AQICard({ aqi, level, color, isLoading }: AQICardProps) {
  const aqiColor = getAQIColor(aqi);
  const aqiLevel = getAQILevel(aqi);
  const percentage = Math.min((aqi / 300) * 100, 100);

  return (
    <Card className="relative overflow-hidden shadow-elevated bg-gradient-card border-0">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-lg font-medium text-muted-foreground">Air Quality Index</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span 
                  className={cn(
                    "text-6xl font-bold",
                    isLoading && "animate-pulse",
                    `text-${aqiColor}`
                  )}
                >
                  {Math.round(aqi)}
                </span>
                <span className="text-2xl text-muted-foreground">AQI</span>
              </div>
              
              <Badge 
                variant="outline" 
                className={cn(
                  "text-lg px-4 py-2 font-medium",
                  `border-${aqiColor} text-${aqiColor} bg-${aqiColor}/10`
                )}
              >
                {aqiLevel}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">AQI Scale</span>
                <span className={`font-medium text-${aqiColor}`}>{Math.round(percentage)}%</span>
              </div>
              <Progress 
                value={percentage} 
                className="h-2 bg-muted"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>50</span>
                <span>100</span>
                <span>150</span>
                <span>200</span>
                <span>300+</span>
              </div>
            </div>
          </div>

          {/* Decorative circle */}
          <div 
            className={cn(
              "relative h-32 w-32 rounded-full opacity-20",
              `bg-${aqiColor}`
            )}
          >
            <div 
              className={cn(
                "absolute inset-4 rounded-full opacity-60",
                `bg-${aqiColor}`
              )}
            />
            <div 
              className={cn(
                "absolute inset-8 rounded-full",
                `bg-${aqiColor}`
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}