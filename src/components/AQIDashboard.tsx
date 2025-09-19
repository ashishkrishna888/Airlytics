import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wind, MapPin, Clock, Thermometer, Droplets, Eye, AlertCircle, RefreshCw, Activity } from "lucide-react";
import { AQICard } from "./AQICard";
import { PollutantCard } from "./PollutantCard";
import { LocationSearch } from "./LocationSearch";
import { UserProfile } from "./UserProfile";
import { useAQIData, useCurrentLocation, useLocationUpdate } from "@/hooks/useWeatherData";
import { AQIData } from "@/types/weather";

export function AQIDashboard() {
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get current location on component mount
  const currentLocationMutation = useCurrentLocation();
  const locationUpdateMutation = useLocationUpdate();
  
  // Fetch AQI data
  const { 
    data: aqiData, 
    isLoading, 
    error: aqiError, 
    refetch 
  } = useAQIData(
    coordinates?.lat || 0, 
    coordinates?.lon || 0, 
    !!coordinates
  );


  // Get current location on mount
  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const coords = await currentLocationMutation.mutateAsync();
        setCoordinates(coords);
        setError(null);
      } catch (err) {
        console.error('Failed to get current location:', err);
        setError('Unable to get your current location. Please search for a location manually.');
        // Set default location (San Francisco) as fallback
        setCoordinates({ lat: 37.7749, lon: -122.4194 });
      }
    };

    getCurrentLocation();
  }, []); // Remove currentLocationMutation from dependencies to prevent infinite loop

  const handleLocationChange = async (location: string) => {
    try {
      // This will be handled by the LocationSearch component
      // which should provide coordinates
      setError(null);
    } catch (err) {
      setError('Failed to update location. Please try again.');
    }
  };

  const handleLocationSelect = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
    setError(null);
  };

  const handleRefresh = () => {
    refetch();
  };

  // Show error if there's an API error
  const displayError = error || aqiError?.message;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10"></div>
      
      <div className="mx-auto max-w-7xl space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                <Wind className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  Air Quality Monitor
                </h1>
                <p className="text-blue-200/80 text-lg">Real-time environmental insights for your location</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <LocationSearch onLocationSelect={handleLocationSelect} />
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isLoading}
              className="border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-200 hover:text-white transition-all duration-300"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <UserProfile />
          </div>
        </div>

        {/* Error Alert */}
        {displayError && (
          <Alert variant="destructive" className="border-red-500/30 bg-red-500/10 backdrop-blur-sm">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200">{displayError}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && !aqiData && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              </div>
              <div className="space-y-2">
                <p className="text-xl font-medium text-white">Loading air quality data...</p>
                <p className="text-blue-200/70">Fetching real-time environmental insights</p>
              </div>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!isLoading && !aqiData && !displayError && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-6">
              <div className="p-4 rounded-full bg-blue-500/20 border border-blue-400/30">
                <Wind className="h-12 w-12 text-blue-300" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-medium text-white">Welcome to Air Quality Monitor</p>
                <p className="text-blue-200/70">Search for a location or use your current location to get started</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {aqiData && (
          <>
            {/* Current Location & Time */}
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30">
                    <MapPin className="h-5 w-5 text-blue-300" />
                  </div>
                  <div>
                    <span className="text-xl font-semibold text-white">{aqiData.location}</span>
                    <p className="text-blue-200/70 text-sm">Current monitoring location</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Clock className="h-4 w-4 text-blue-300" />
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">Last updated</p>
                    <p className="text-blue-200/70">{aqiData.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main AQI Display */}
            <AQICard 
              aqi={aqiData.aqi} 
              level={aqiData.level} 
              color={aqiData.color}
              isLoading={isLoading}
            />

            {/* Pollutants Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(aqiData.pollutants).map(([key, pollutant]) => (
                <PollutantCard
                  key={key}
                  name={key.toUpperCase()}
                  value={pollutant.value}
                  unit={pollutant.unit}
                  level={pollutant.level}
                />
              ))}
            </div>

            {/* Weather Conditions */}
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30">
                    <Wind className="h-5 w-5 text-blue-300" />
                  </div>
                  <span className="text-xl font-semibold text-white">Weather Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-4">
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="p-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30">
                      <Thermometer className="h-6 w-6 text-orange-300" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{aqiData.weather.temperature}°C</p>
                      <p className="text-sm text-blue-200/70">Temperature</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                      <Droplets className="h-6 w-6 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{aqiData.weather.humidity}%</p>
                      <p className="text-sm text-blue-200/70">Humidity</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="p-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30">
                      <Wind className="h-6 w-6 text-green-300" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{aqiData.weather.windSpeed} km/h</p>
                      <p className="text-sm text-blue-200/70">Wind Speed</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                      <Eye className="h-6 w-6 text-purple-300" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{aqiData.weather.visibility} km</p>
                      <p className="text-sm text-blue-200/70">Visibility</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Recommendations */}
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30">
                    <Activity className="h-5 w-5 text-green-300" />
                  </div>
                  <span className="text-xl font-semibold text-white">Health Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aqiData.aqi <= 50 && (
                    <div className="rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 border border-green-400/20 backdrop-blur-sm">
                      <Badge variant="outline" className="mb-3 bg-green-500/20 border-green-400/30 text-green-300 hover:bg-green-500/30">
                        Excellent Air Quality
                      </Badge>
                      <p className="text-white/90 leading-relaxed">Perfect for outdoor activities. Enjoy the fresh air and consider spending time outside!</p>
                    </div>
                  )}
                  {aqiData.aqi > 50 && aqiData.aqi <= 100 && (
                    <div className="rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 border border-yellow-400/20 backdrop-blur-sm">
                      <Badge variant="outline" className="mb-3 bg-yellow-500/20 border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/30">
                        Moderate Air Quality
                      </Badge>
                      <p className="text-white/90 leading-relaxed">Air quality is acceptable. Sensitive individuals should consider limiting prolonged outdoor exertion.</p>
                    </div>
                  )}
                  {aqiData.aqi > 100 && (
                    <div className="rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 p-6 border border-red-400/20 backdrop-blur-sm">
                      <Badge variant="outline" className="mb-3 bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30">
                        Unhealthy Air Quality
                      </Badge>
                      <p className="text-white/90 leading-relaxed">Everyone may begin to experience health effects. Limit outdoor activities and consider wearing a mask.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}