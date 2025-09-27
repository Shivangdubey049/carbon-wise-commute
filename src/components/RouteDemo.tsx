import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Navigation, 
  Leaf, 
  Clock, 
  DollarSign, 
  Heart,
  Car,
  Bike,
  Bus,
  Footprints
} from "lucide-react";

const RouteDemo = () => {
  const routes = [
    {
      mode: "Walking",
      icon: Footprints,
      time: "25 min",
      carbon: "0 kg CO₂",
      calories: "120 cal",
      cost: "$0",
      health: "High",
      eco: "Perfect",
      color: "eco-green",
      gradient: "from-eco-green to-eco-green-light"
    },
    {
      mode: "Cycling",
      icon: Bike,
      time: "12 min",
      carbon: "0 kg CO₂",
      calories: "85 cal",
      cost: "$0",
      health: "High",
      eco: "Perfect",
      color: "eco-green",
      gradient: "from-eco-green to-eco-green-light"
    },
    {
      mode: "Public Transport",
      icon: Bus,
      time: "18 min",
      carbon: "0.8 kg CO₂",
      calories: "25 cal",
      cost: "$3.50",
      health: "Medium",
      eco: "Good",
      color: "eco-blue",
      gradient: "from-eco-blue to-eco-blue-light"
    },
    {
      mode: "Private Car",
      icon: Car,
      time: "15 min",
      carbon: "3.2 kg CO₂",
      calories: "5 cal",
      cost: "$8.50",
      health: "Low",
      eco: "Poor",
      color: "destructive",
      gradient: "from-red-500 to-red-400"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
            Route Comparison
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Compare Your 
            <span className="text-eco-blue block">Travel Options</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            See real-time comparisons of time, cost, carbon emissions, and health benefits 
            for your daily commute from Central Park to Times Square.
          </p>
        </div>

        {/* Route Selection Header */}
        <div className="bg-gradient-card rounded-2xl p-8 mb-8 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-eco-green flex items-center justify-center">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Route Planning</h3>
                <p className="text-muted-foreground">Central Park → Times Square</p>
              </div>
            </div>
            <Button variant="eco-outline">
              Change Route
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-eco-green">2.1 mi</div>
              <p className="text-sm text-muted-foreground">Distance</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-eco-blue">4</div>
              <p className="text-sm text-muted-foreground">Route Options</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-eco-green">68°F</div>
              <p className="text-sm text-muted-foreground">Perfect Weather</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-eco-blue">Moderate</div>
              <p className="text-sm text-muted-foreground">Traffic</p>
            </div>
          </div>
        </div>

        {/* Route Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, index) => {
            const Icon = route.icon;
            return (
              <Card 
                key={index}
                className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-eco transform hover:-translate-y-2 ${
                  index === 0 ? 'border-eco-green ring-2 ring-eco-green/20' : 'border-border'
                }`}
              >
                {index === 0 && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-eco-green text-white">Recommended</Badge>
                  </div>
                )}
                
                <div className={`h-2 bg-gradient-to-r ${route.gradient}`} />
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full bg-${route.color}/20 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 text-${route.color}`} />
                    </div>
                    <h3 className="font-semibold text-foreground">{route.mode}</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Time</span>
                      </div>
                      <span className="font-medium text-foreground">{route.time}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Carbon</span>
                      </div>
                      <span className="font-medium text-foreground">{route.carbon}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Calories</span>
                      </div>
                      <span className="font-medium text-foreground">{route.calories}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Cost</span>
                      </div>
                      <span className="font-medium text-foreground">{route.cost}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Eco Rating</span>
                      <Badge 
                        variant={route.eco === 'Perfect' ? 'default' : route.eco === 'Good' ? 'secondary' : 'destructive'}
                        className={
                          route.eco === 'Perfect' ? 'bg-eco-green text-white' :
                          route.eco === 'Good' ? 'bg-eco-blue text-white' :
                          'bg-destructive text-destructive-foreground'
                        }
                      >
                        {route.eco}
                      </Badge>
                    </div>
                  </div>

                  <Button 
                    variant={index === 0 ? "hero" : "eco-outline"} 
                    className="w-full mt-4"
                  >
                    {index === 0 ? "Select Route" : "Choose This"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ready to start your sustainable journey?
          </p>
          <Button variant="eco-secondary" size="lg" className="px-8 py-4">
            <Navigation className="w-5 h-5 mr-2" />
            Start Route Planning
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RouteDemo;