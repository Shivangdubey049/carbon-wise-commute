import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Activity {
  id: string;
  user_id: string;
  activity_type: string;
  distance_km: number | null;
  duration_minutes: number | null;
  calories_burned: number | null;
  co2_saved_kg: number | null;
  start_location: string | null;
  end_location: string | null;
  route_data: any;
  created_at: string;
}

export const useActivities = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [todayStats, setTodayStats] = useState({
    calories: 0,
    distance: 0,
    co2Saved: 0,
    walkingTime: 0
  });

  useEffect(() => {
    if (user) {
      fetchActivities();
    }
  }, [user]);

  const fetchActivities = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching activities:', error);
      } else {
        setActivities(data || []);
        calculateTodayStats(data || []);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTodayStats = (activitiesData: Activity[]) => {
    const today = new Date().toDateString();
    const todayActivities = activitiesData.filter(activity => 
      new Date(activity.created_at).toDateString() === today
    );

    const stats = todayActivities.reduce((acc, activity) => {
      return {
        calories: acc.calories + (activity.calories_burned || 0),
        distance: acc.distance + (activity.distance_km || 0),
        co2Saved: acc.co2Saved + (activity.co2_saved_kg || 0),
        walkingTime: acc.walkingTime + (activity.activity_type === 'walking' ? (activity.duration_minutes || 0) : 0)
      };
    }, { calories: 0, distance: 0, co2Saved: 0, walkingTime: 0 });

    setTodayStats(stats);
  };

  const addActivity = async (activityData: Omit<Activity, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('activities')
        .insert([{ ...activityData, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error('Error adding activity:', error);
        return { error };
      } else {
        await fetchActivities(); // Refresh the list
        return { data };
      }
    } catch (error) {
      console.error('Error adding activity:', error);
      return { error };
    }
  };

  return { 
    activities, 
    loading, 
    todayStats, 
    addActivity, 
    refetch: fetchActivities 
  };
};