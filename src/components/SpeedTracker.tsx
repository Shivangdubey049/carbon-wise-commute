import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Gauge, MapPin } from 'lucide-react';

const SpeedTracker = () => {
  const [speed, setSpeed] = useState<number>(0);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string>('');
  const [lastPosition, setLastPosition] = useState<GeolocationPosition | null>(null);
  const [lastTimestamp, setLastTimestamp] = useState<number | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const currentTime = Date.now();
        
        // Update location
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });

        // Calculate speed from position change
        if (lastPosition && lastTimestamp) {
          const timeDiff = (currentTime - lastTimestamp) / 1000; // seconds
          
          if (timeDiff > 0) {
            // Calculate distance using Haversine formula
            const R = 6371e3; // Earth's radius in meters
            const φ1 = (lastPosition.coords.latitude * Math.PI) / 180;
            const φ2 = (position.coords.latitude * Math.PI) / 180;
            const Δφ = ((position.coords.latitude - lastPosition.coords.latitude) * Math.PI) / 180;
            const Δλ = ((position.coords.longitude - lastPosition.coords.longitude) * Math.PI) / 180;

            const a =
              Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // meters

            // Calculate speed in km/h
            const calculatedSpeed = (distance / timeDiff) * 3.6;
            
            // Use the browser's speed if available, otherwise use calculated
            const finalSpeed = position.coords.speed !== null 
              ? position.coords.speed * 3.6 // Convert m/s to km/h
              : calculatedSpeed;

            setSpeed(Math.max(0, finalSpeed)); // Ensure non-negative
          }
        }

        setLastPosition(position);
        setLastTimestamp(currentTime);
        setError('');
      },
      (err) => {
        setError(`Location error: ${err.message}`);
        console.error('Geolocation error:', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [lastPosition, lastTimestamp]);

  return (
    <Card className="bg-gradient-to-br from-eco-primary/10 to-eco-secondary/10 border-eco-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-eco-primary/20 flex items-center justify-center">
            <Gauge className="h-5 w-5 text-eco-primary" />
          </div>
          <h3 className="text-lg font-semibold">Real-Time Speed</h3>
        </div>

        {error ? (
          <div className="text-sm text-destructive">{error}</div>
        ) : (
          <>
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-eco-primary mb-1">
                {speed.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">km/h</div>
            </div>

            {location && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background/50 rounded-lg p-2">
                <MapPin className="h-3 w-3" />
                <span>
                  {location.lat.toFixed(6)}, {location.lon.toFixed(6)}
                </span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SpeedTracker;
