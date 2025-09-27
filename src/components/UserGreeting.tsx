import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Footprints, Timer, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useActivities } from '@/hooks/useActivities';

const UserGreeting = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { todayStats } = useActivities();

  if (!user) return null;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const userName = profile?.full_name || user.email?.split('@')[0] || 'Eco Warrior';

  return (
    <Card className="bg-gradient-to-r from-eco-primary/20 via-eco-secondary/20 to-eco-accent/20 border-eco-primary/30 mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {getGreeting()}, {userName}! 🌱
            </h2>
            <p className="text-muted-foreground">Ready to make a positive impact today?</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
            <Leaf className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-eco-primary/20 flex items-center justify-center">
              <Zap className="h-4 w-4 text-eco-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Calories Burned</p>
              <p className="font-semibold">{todayStats.calories}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-eco-secondary/20 flex items-center justify-center">
              <Footprints className="h-4 w-4 text-eco-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Distance (km)</p>
              <p className="font-semibold">{todayStats.distance.toFixed(1)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-eco-accent/20 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-eco-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CO₂ Saved (kg)</p>
              <p className="font-semibold">{todayStats.co2Saved.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Timer className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Walking Time</p>
              <p className="font-semibold">{todayStats.walkingTime}m</p>
            </div>
          </div>
        </div>

        {todayStats.calories > 0 && (
          <div className="mt-4 p-3 bg-eco-primary/10 rounded-lg border border-eco-primary/20">
            <p className="text-sm text-eco-primary font-medium">
              🎉 Great job! You've burned {todayStats.calories} calories walking today and saved {todayStats.co2Saved.toFixed(2)}kg of CO₂!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserGreeting;