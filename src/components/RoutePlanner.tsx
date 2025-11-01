import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Navigation, 
  MapPin, 
  Loader2, 
  Route as RouteIcon,
  Clock,
  Leaf,
  TrendingUp
} from "lucide-react";

interface Location {
  name: string;
  lat: number;
  lon: number;
}

interface RouteResult {
  distance: number;
  duration: number;
  carbon: number;
}

const RoutePlanner = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [currentQuery, setCurrentQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [currentSuggestions, setCurrentSuggestions] = useState<any[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const { toast } = useToast();

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocode to get address
          const { data, error } = await supabase.functions.invoke('geocode', {
            body: { lat: latitude, lon: longitude }
          });

          if (error) {
            console.error('Geocode error:', error);
            toast({
              title: "Location Error",
              description: "Could not fetch your current location",
              variant: "destructive"
            });
          } else if (data?.features?.[0]) {
            const place = data.features[0];
            const location = {
              name: place.properties.label || 'Current Location',
              lat: latitude,
              lon: longitude
            };
            setCurrentLocation(location);
            setCurrentQuery(location.name);
          }
          setLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: "Location Access Denied",
            description: "Please enable location access to use this feature",
            variant: "destructive"
          });
          setLoading(false);
        }
      );
    } else {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const searchLocation = async (query: string, isDestination: boolean) => {
    if (query.length < 3) {
      if (isDestination) setDestinationSuggestions([]);
      else setCurrentSuggestions([]);
      return;
    }

    const { data, error } = await supabase.functions.invoke('geocode', {
      body: { query }
    });

    if (error) {
      console.error('Search error:', error);
    } else if (data?.features) {
      if (isDestination) {
        setDestinationSuggestions(data.features);
      } else {
        setCurrentSuggestions(data.features);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentQuery && !currentLocation) {
        searchLocation(currentQuery, false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [currentQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (destinationQuery && !destination) {
        searchLocation(destinationQuery, true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [destinationQuery]);

  const selectLocation = (feature: any, isDestination: boolean) => {
    const location = {
      name: feature.properties.label,
      lat: feature.geometry.coordinates[1],
      lon: feature.geometry.coordinates[0]
    };

    if (isDestination) {
      setDestination(location);
      setDestinationQuery(location.name);
      setDestinationSuggestions([]);
    } else {
      setCurrentLocation(location);
      setCurrentQuery(location.name);
      setCurrentSuggestions([]);
    }
  };

  const calculateRoute = async () => {
    if (!currentLocation || !destination) {
      toast({
        title: "Missing Information",
        description: "Please select both start and destination",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.functions.invoke('calculate-route', {
      body: {
        start: { lat: currentLocation.lat, lon: currentLocation.lon },
        end: { lat: destination.lat, lon: destination.lon },
        profile: 'foot-walking'
      }
    });

    if (error) {
      console.error('Route error:', error);
      toast({
        title: "Route Error",
        description: "Could not calculate route",
        variant: "destructive"
      });
    } else if (data?.routes?.[0]) {
      const route = data.routes[0];
      const distanceKm = route.summary.distance / 1000;
      const durationMin = route.summary.duration / 60;
      // Estimate: Car emits ~120g CO2/km, walking saves that
      const carbonSaved = distanceKm * 0.12;
      
      setRouteResult({
        distance: distanceKm,
        duration: durationMin,
        carbon: carbonSaved
      });
      
      toast({
        title: "Route Calculated!",
        description: `${distanceKm.toFixed(2)} km, ${Math.round(durationMin)} minutes`,
      });
    }
    setLoading(false);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-eco-blue/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
            Smart Routing
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Plan Your <span className="text-eco-green">Eco-Friendly</span> Route
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover the best sustainable routes for your journey
          </p>
        </div>

        <Card className="p-8 bg-gradient-card shadow-eco">
          <div className="space-y-6">
            {/* Current Location */}
            <div className="relative">
              <label className="block text-sm font-medium mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Starting Point
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Search or use current location..."
                  value={currentQuery}
                  onChange={(e) => {
                    setCurrentQuery(e.target.value);
                    setCurrentLocation(null);
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={getCurrentLocation}
                  variant="eco-outline"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                </Button>
              </div>
              {currentSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-background border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {currentSuggestions.map((feature, idx) => (
                    <div
                      key={idx}
                      onClick={() => selectLocation(feature, false)}
                      className="p-3 hover:bg-eco-mint/20 cursor-pointer transition-colors border-b border-border/50 last:border-0"
                    >
                      <p className="font-medium text-sm">{feature.properties.name}</p>
                      <p className="text-xs text-muted-foreground">{feature.properties.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Destination */}
            <div className="relative">
              <label className="block text-sm font-medium mb-2">
                <RouteIcon className="w-4 h-4 inline mr-2" />
                Destination
              </label>
              <Input
                placeholder="Where do you want to go?"
                value={destinationQuery}
                onChange={(e) => {
                  setDestinationQuery(e.target.value);
                  setDestination(null);
                }}
              />
              {destinationSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-background border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {destinationSuggestions.map((feature, idx) => (
                    <div
                      key={idx}
                      onClick={() => selectLocation(feature, true)}
                      className="p-3 hover:bg-eco-mint/20 cursor-pointer transition-colors border-b border-border/50 last:border-0"
                    >
                      <p className="font-medium text-sm">{feature.properties.name}</p>
                      <p className="text-xs text-muted-foreground">{feature.properties.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Calculate Button */}
            <Button
              onClick={calculateRoute}
              disabled={!currentLocation || !destination || loading}
              variant="hero"
              size="lg"
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Calculating Route...
                </>
              ) : (
                <>
                  <Navigation className="w-5 h-5 mr-2" />
                  Calculate Eco Route
                </>
              )}
            </Button>

            {/* Route Result */}
            {routeResult && (
              <div className="mt-6 p-6 bg-eco-mint/20 rounded-lg border border-eco-green/20">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-eco-green" />
                  Your Eco Route
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <RouteIcon className="w-6 h-6 mx-auto mb-2 text-eco-blue" />
                    <p className="text-2xl font-bold text-foreground">{routeResult.distance.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">km</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-eco-blue" />
                    <p className="text-2xl font-bold text-foreground">{Math.round(routeResult.duration)}</p>
                    <p className="text-sm text-muted-foreground">minutes</p>
                  </div>
                  <div className="text-center">
                    <Leaf className="w-6 h-6 mx-auto mb-2 text-eco-green" />
                    <p className="text-2xl font-bold text-eco-green">{routeResult.carbon.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">kg CO₂ saved</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default RoutePlanner;
