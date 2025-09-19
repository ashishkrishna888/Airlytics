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
    <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl group hover:shadow-3xl transition-all duration-500">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
      <CardContent className="p-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30">
                <Activity className="h-6 w-6 text-blue-300" />
              </div>
              <span className="text-lg font-medium text-blue-200">Air Quality Index</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-baseline space-x-3">
                <span 
                  className={cn(
                    "text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent",
                    isLoading && "animate-pulse"
                  )}
                >
                  {Math.round(aqi)}
                </span>
                <span className="text-2xl text-blue-200/70 font-medium">AQI</span>
              </div>
              
              <Badge 
                variant="outline" 
                className="text-lg px-6 py-3 font-semibold bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                {aqiLevel}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-blue-200/70">AQI Scale</span>
                <span className="font-semibold text-white">{Math.round(percentage)}%</span>
              </div>
              <div className="relative">
                <Progress 
                  value={percentage} 
                  className="h-3 bg-white/10 border border-white/20"
                />
                <div className="absolute inset-0 h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full opacity-20"></div>
              </div>
              <div className="flex justify-between text-xs text-blue-200/60">
                <span>0</span>
                <span>50</span>
                <span>100</span>
                <span>150</span>
                <span>200</span>
                <span>300+</span>
              </div>
            </div>
          </div>

          {/* Animated decorative elements */}
          <div className="relative animate-float">
            <div className="h-40 w-40 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse-slow"></div>
            <div className="absolute inset-4 h-32 w-32 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute inset-8 h-24 w-24 rounded-full bg-gradient-to-r from-blue-300/40 to-purple-300/40 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
            <div className="absolute inset-12 h-16 w-16 rounded-full bg-gradient-to-r from-white/20 to-blue-200/20 animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}