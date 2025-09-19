// OpenWeatherMap API response types
export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface AirPollutionData {
  coord: {
    lon: number;
    lat: number;
  };
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  }>;
}

// Transformed data types for our application
export interface AQIData {
  location: string;
  aqi: number;
  level: string;
  color: string;
  timestamp: Date;
  pollutants: {
    pm25: { value: number; unit: string; level: string };
    pm10: { value: number; unit: string; level: string };
    o3: { value: number; unit: string; level: string };
    no2: { value: number; unit: string; level: string };
    so2: { value: number; unit: string; level: string };
    co: { value: number; unit: string; level: string };
  };
  weather: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    visibility: number;
  };
  coordinates: {
    lat: number;
    lon: number;
  };
}

export interface LocationData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
