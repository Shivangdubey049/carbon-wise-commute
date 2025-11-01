import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

const WeatherDisplay = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchWeather = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { data, error: functionError } = await supabase.functions.invoke('get-weather', {
              body: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            });

            if (functionError) {
              console.error('Weather function error:', functionError);
              setError('Failed to fetch weather data');
            } else {
              setWeather(data);
              setError('');
            }
          } catch (err) {
            console.error('Weather fetch error:', err);
            setError('Failed to fetch weather data');
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError(`Location error: ${err.message}`);
          setLoading(false);
        }
      );
    };

    fetchWeather();
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-eco-accent/10 to-eco-primary/10 border-eco-accent/20">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Loading weather...</div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="bg-gradient-to-br from-eco-accent/10 to-eco-primary/10 border-eco-accent/20">
        <CardContent className="p-6">
          <div className="text-center text-destructive text-sm">{error || 'No weather data'}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-eco-accent/10 to-eco-primary/10 border-eco-accent/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-eco-accent/20 flex items-center justify-center">
            <Cloud className="h-5 w-5 text-eco-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Weather</h3>
            <p className="text-xs text-muted-foreground">{weather.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-eco-accent mb-1">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="text-xs text-muted-foreground capitalize">
              {weather.weather[0].description}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Thermometer className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Feels like:</span>
              <span className="font-semibold">{Math.round(weather.main.feels_like)}°C</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Droplets className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Humidity:</span>
              <span className="font-semibold">{weather.main.humidity}%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wind className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Wind:</span>
              <span className="font-semibold">{weather.wind.speed} m/s</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
