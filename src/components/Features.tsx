import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Route, 
  Leaf, 
  Heart, 
  Trophy, 
  Navigation, 
  BarChart3,
  Users,
  Bell,
  Calculator
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Route,
      title: "Smart Route Planning",
      description: "Multi-modal route suggestions with real-time traffic and weather data",
      details: ["Walking", "Cycling", "Public Transport", "Carpooling"],
      color: "eco-green"
    },
    {
      icon: Calculator,
      title: "Carbon Footprint Tracker",
      description: "Real-time CO2 emission calculation and comparative analysis",
      details: ["Real-time tracking", "Route comparison", "Monthly reports", "Impact visualization"],
      color: "eco-blue"
    },
    {
      icon: Heart,
      title: "Health Benefits Monitor",
      description: "Track calories burned and health improvements from active transport",
      details: ["Calorie tracking", "Step counter", "Health milestones", "Fitness goals"],
      color: "eco-green"
    },
    {
      icon: Trophy,
      title: "Gamification System",
      description: "Earn points, badges, and compete with friends for eco-friendly choices",
      details: ["Green Points", "Achievement badges", "Weekly challenges", "Leaderboards"],
      color: "eco-blue"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into your travel patterns and environmental impact",
      details: ["Travel analytics", "Carbon savings", "Health metrics", "Cost analysis"],
      color: "eco-green"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Weather-based suggestions and eco-friendly alerts",
      details: ["Weather alerts", "Route suggestions", "Transport delays", "Eco tips"],
      color: "eco-blue"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-eco-mint/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
            Core Features
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Everything You Need for
            <span className="text-eco-green block">Sustainable Travel</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            GreenCommute combines intelligent route planning with environmental consciousness 
            to transform how you move through the city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-8 bg-gradient-card border-0 shadow-soft hover:shadow-eco transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 rounded-full bg-${feature.color}/20 flex items-center justify-center mb-6 group-hover:animate-pulse-eco`}>
                  <Icon className={`w-8 h-8 text-${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {feature.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${feature.color}`} />
                      <span className="text-sm text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="eco-ghost" className="w-full group-hover:bg-eco-mint">
                  Explore Feature
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Button variant="hero" size="lg" className="px-8 py-4">
            <Users className="w-5 h-5 mr-2" />
            Join the Green Movement
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;