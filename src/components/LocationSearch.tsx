import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, MapPin, Loader2, Check, ChevronsUpDown } from "lucide-react";
import { useLocationSearch, useCurrentLocation } from "@/hooks/useWeatherData";
import { LocationData } from "@/types/weather";
import { cn } from "@/lib/utils";

interface LocationSearchProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

export function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  // Search for locations
  const { data: searchResults, isLoading: isSearching } = useLocationSearch(
    searchTerm,
    searchTerm.length > 2
  );

  // Get current location
  const currentLocationMutation = useCurrentLocation();

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    setOpen(false);
    onLocationSelect(location.lat, location.lon);
  };

  const handleGetCurrentLocation = async () => {
    try {
      const coords = await currentLocationMutation.mutateAsync();
      // Create a temporary location object for display
      const currentLocation: LocationData = {
        name: "Current Location",
        lat: coords.lat,
        lon: coords.lon,
        country: ""
      };
      setSelectedLocation(currentLocation);
      onLocationSelect(coords.lat, coords.lon);
    } catch (error) {
      console.error("Failed to get current location:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between md:w-[300px]"
          >
            {selectedLocation ? (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="truncate">
                  {selectedLocation.name}
                  {selectedLocation.country && `, ${selectedLocation.country}`}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>Search location...</span>
              </div>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 md:w-[300px]">
          <Command>
            <CommandInput
              placeholder="Search for a city..."
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandList>
              {isSearching && (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
              {!isSearching && (!searchResults || searchResults.length === 0) && searchTerm.length > 2 && (
                <CommandEmpty>No locations found.</CommandEmpty>
              )}
              {searchResults && searchResults.length > 0 && (
                <CommandGroup>
                  {searchResults.map((location) => (
                    <CommandItem
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.name}, ${location.country}`}
                      onSelect={() => handleLocationSelect(location)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedLocation?.lat === location.lat && selectedLocation?.lon === location.lon
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{location.name}</div>
                          {location.state && (
                            <div className="text-sm text-muted-foreground">
                              {location.state}, {location.country}
                            </div>
                          )}
                          {!location.state && (
                            <div className="text-sm text-muted-foreground">{location.country}</div>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      <Button
        variant="outline"
        onClick={handleGetCurrentLocation}
        disabled={currentLocationMutation.isPending}
        className="flex-1 md:flex-none"
      >
        {currentLocationMutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <MapPin className="h-4 w-4" />
        )}
        <span className="ml-2 md:hidden">Current</span>
      </Button>
    </div>
  );
}