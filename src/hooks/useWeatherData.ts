import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { weatherApi } from '@/services/weatherApi';
import { AQIData, LocationData } from '@/types/weather';

// Query keys
export const weatherKeys = {
  all: ['weather'] as const,
  aqi: (lat: number, lon: number) => [...weatherKeys.all, 'aqi', lat, lon] as const,
  location: (query: string) => [...weatherKeys.all, 'location', query] as const,
  reverseGeocode: (lat: number, lon: number) => [...weatherKeys.all, 'reverse', lat, lon] as const,
};

// Hook for fetching AQI data
export function useAQIData(lat: number, lon: number, enabled: boolean = true) {
  return useQuery({
    queryKey: weatherKeys.aqi(lat, lon),
    queryFn: () => weatherApi.getAQIData(lat, lon),
    enabled: enabled && !isNaN(lat) && !isNaN(lon),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook for searching locations
export function useLocationSearch(query: string, enabled: boolean = true) {
  return useQuery({
    queryKey: weatherKeys.location(query),
    queryFn: () => weatherApi.searchLocation(query),
    enabled: enabled && query.length > 2,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

// Hook for reverse geocoding
export function useReverseGeocode(lat: number, lon: number, enabled: boolean = true) {
  return useQuery({
    queryKey: weatherKeys.reverseGeocode(lat, lon),
    queryFn: () => weatherApi.getLocationByCoords(lat, lon),
    enabled: enabled && !isNaN(lat) && !isNaN(lon),
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });
}

// Hook for manual location updates
export function useLocationUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lat, lon }: { lat: number; lon: number }) => 
      weatherApi.getAQIData(lat, lon),
    onSuccess: (data, variables) => {
      // Update the cache with new data
      queryClient.setQueryData(
        weatherKeys.aqi(variables.lat, variables.lon),
        data
      );
    },
    onError: (error) => {
      console.error('Failed to update location:', error);
    },
  });
}

// Hook for getting user's current location
export function useCurrentLocation() {
  return useMutation({
    mutationFn: (): Promise<{ lat: number; lon: number }> => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by this browser.'));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            reject(new Error(`Geolocation error: ${error.message}`));
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000, // 5 minutes
          }
        );
      });
    },
  });
}
