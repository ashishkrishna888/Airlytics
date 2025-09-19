import { WeatherData, AirPollutionData, AQIData, LocationData } from '@/types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '78833526b74a530cfac0dc594e8211bb';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Helper function to get AQI level and color
const getAQILevel = (aqi: number): { level: string; color: string } => {
  if (aqi === 1) return { level: 'Excellent', color: 'aqi-excellent' };
  if (aqi === 2) return { level: 'Good', color: 'aqi-good' };
  if (aqi === 3) return { level: 'Moderate', color: 'aqi-moderate' };
  if (aqi === 4) return { level: 'Poor', color: 'aqi-poor' };
  if (aqi === 5) return { level: 'Very Poor', color: 'aqi-very-poor' };
  return { level: 'Unknown', color: 'aqi-good' };
};

// Helper function to get pollutant level
const getPollutantLevel = (value: number, pollutant: string): string => {
  const thresholds = {
    pm25: { excellent: 0, good: 12, moderate: 35, poor: 55, veryPoor: 150 },
    pm10: { excellent: 0, good: 20, moderate: 50, poor: 100, veryPoor: 200 },
    o3: { excellent: 0, good: 50, moderate: 100, poor: 168, veryPoor: 208 },
    no2: { excellent: 0, good: 40, moderate: 100, poor: 200, veryPoor: 400 },
    so2: { excellent: 0, good: 20, moderate: 80, poor: 250, veryPoor: 350 },
    co: { excellent: 0, good: 2, moderate: 10, poor: 17, veryPoor: 34 }
  };

  const threshold = thresholds[pollutant as keyof typeof thresholds];
  if (!threshold) return 'good';

  if (value <= threshold.excellent) return 'excellent';
  if (value <= threshold.good) return 'good';
  if (value <= threshold.moderate) return 'moderate';
  if (value <= threshold.poor) return 'poor';
  if (value <= threshold.veryPoor) return 'very-poor';
  return 'hazardous';
};

// Transform OpenWeatherMap data to our AQI format
const transformToAQIData = (
  weatherData: WeatherData,
  pollutionData: AirPollutionData
): AQIData => {
  const pollution = pollutionData.list[0];
  const { level, color } = getAQILevel(pollution.main.aqi);

  return {
    location: `${weatherData.name}, ${weatherData.sys.country}`,
    aqi: pollution.main.aqi * 20, // Convert 1-5 scale to approximate 0-100 scale
    level,
    color,
    timestamp: new Date(pollution.dt * 1000),
    pollutants: {
      pm25: {
        value: pollution.components.pm2_5,
        unit: 'μg/m³',
        level: getPollutantLevel(pollution.components.pm2_5, 'pm25')
      },
      pm10: {
        value: pollution.components.pm10,
        unit: 'μg/m³',
        level: getPollutantLevel(pollution.components.pm10, 'pm10')
      },
      o3: {
        value: pollution.components.o3,
        unit: 'μg/m³',
        level: getPollutantLevel(pollution.components.o3, 'o3')
      },
      no2: {
        value: pollution.components.no2,
        unit: 'μg/m³',
        level: getPollutantLevel(pollution.components.no2, 'no2')
      },
      so2: {
        value: pollution.components.so2,
        unit: 'μg/m³',
        level: getPollutantLevel(pollution.components.so2, 'so2')
      },
      co: {
        value: pollution.components.co,
        unit: 'mg/m³',
        level: getPollutantLevel(pollution.components.co, 'co')
      }
    },
    weather: {
      temperature: Math.round(weatherData.main.temp - 273.15), // Convert Kelvin to Celsius
      humidity: weatherData.main.humidity,
      windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
      visibility: Math.round(weatherData.visibility / 1000) // Convert m to km
    },
    coordinates: {
      lat: weatherData.coord.lat,
      lon: weatherData.coord.lon
    }
  };
};

// API functions
export const weatherApi = {
  // Get current weather data
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.cod && data.cod !== 200) {
        throw new Error(`Weather API error: ${data.message || 'Unknown error'}`);
      }
      
      return data;
    } catch (error) {
      console.error('Weather API error:', error);
      throw error;
    }
  },

  // Get air pollution data
  async getAirPollution(lat: number, lon: number): Promise<AirPollutionData> {
    try {
      const response = await fetch(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`Air pollution API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Air pollution API error:', error);
      throw error;
    }
  },

  // Get combined AQI data (weather + air pollution)
  async getAQIData(lat: number, lon: number): Promise<AQIData> {
    try {
      const [weatherData, pollutionData] = await Promise.all([
        this.getCurrentWeather(lat, lon),
        this.getAirPollution(lat, lon)
      ]);

      return transformToAQIData(weatherData, pollutionData);
    } catch (error) {
      console.error('Error fetching AQI data:', error);
      throw error;
    }
  },

  // Search for locations by name using Geocoding API
  async searchLocation(query: string): Promise<LocationData[]> {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=10&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`Location search API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return data.map((item: any) => ({
        name: item.name,
        lat: item.lat,
        lon: item.lon,
        country: item.country,
        state: item.state
      }));
    } catch (error) {
      console.error('Location search error:', error);
      throw error;
    }
  },

  // Get location by coordinates (reverse geocoding)
  async getLocationByCoords(lat: number, lon: number): Promise<LocationData> {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Reverse geocoding API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      name: data.name,
      lat: data.coord.lat,
      lon: data.coord.lon,
      country: data.sys.country
    };
  }
};
