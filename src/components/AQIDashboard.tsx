import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wind, MapPin, Clock, Thermometer, Droplets, Eye, AlertCircle, RefreshCw } from "lucide-react";
import { AQICard } from "./AQICard";
import { PollutantCard } from "./PollutantCard";
import { LocationSearch } from "./LocationSearch";
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
  }, []);

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
    <div className="min-h-screen bg-gradient-dashboard p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Air Quality Monitor</h1>
            <p className="text-muted-foreground">Real-time air quality data for your location</p>
          </div>
          <div className="flex items-center space-x-2">
            <LocationSearch onLocationSelect={handleLocationSelect} />
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        {displayError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{displayError}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && !aqiData && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Loading air quality data...</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        {aqiData && (
          <>
            {/* Current Location & Time */}
            <Card className="shadow-card bg-gradient-card border-0">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-lg font-medium">{aqiData.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Last updated: {aqiData.timestamp.toLocaleTimeString()}</span>
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
            <Card className="shadow-card bg-gradient-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wind className="h-5 w-5 text-primary" />
                  <span>Weather Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="flex items-center space-x-3">
                    <Thermometer className="h-8 w-8 text-aqi-good" />
                    <div>
                      <p className="text-2xl font-semibold">{aqiData.weather.temperature}°C</p>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Droplets className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-semibold">{aqiData.weather.humidity}%</p>
                      <p className="text-sm text-muted-foreground">Humidity</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Wind className="h-8 w-8 text-aqi-moderate" />
                    <div>
                      <p className="text-2xl font-semibold">{aqiData.weather.windSpeed} km/h</p>
                      <p className="text-sm text-muted-foreground">Wind Speed</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Eye className="h-8 w-8 text-aqi-excellent" />
                    <div>
                      <p className="text-2xl font-semibold">{aqiData.weather.visibility} km</p>
                      <p className="text-sm text-muted-foreground">Visibility</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Recommendations */}
            <Card className="shadow-card bg-gradient-card border-0">
              <CardHeader>
                <CardTitle>Health Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aqiData.aqi <= 50 && (
                    <div className="rounded-lg bg-aqi-excellent/10 p-4">
                      <Badge variant="outline" className="mb-2 border-aqi-excellent text-aqi-excellent">
                        Excellent Air Quality
                      </Badge>
                      <p className="text-sm">Perfect for outdoor activities. Enjoy the fresh air!</p>
                    </div>
                  )}
                  {aqiData.aqi > 50 && aqiData.aqi <= 100 && (
                    <div className="rounded-lg bg-aqi-moderate/10 p-4">
                      <Badge variant="outline" className="mb-2 border-aqi-moderate text-aqi-moderate">
                        Moderate Air Quality
                      </Badge>
                      <p className="text-sm">Air quality is acceptable. Sensitive individuals should consider limiting prolonged outdoor exertion.</p>
                    </div>
                  )}
                  {aqiData.aqi > 100 && (
                    <div className="rounded-lg bg-aqi-poor/10 p-4">
                      <Badge variant="outline" className="mb-2 border-aqi-poor text-aqi-poor">
                        Unhealthy Air Quality
                      </Badge>
                      <p className="text-sm">Everyone may begin to experience health effects. Limit outdoor activities.</p>
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