import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Globe, 
  Heart, 
  DollarSign,
  Leaf,
  Users,
  Award,
  TreePine
} from "lucide-react";

const Impact = () => {
  const impactStats = [
    {
      icon: Globe,
      value: "2.4M",
      suffix: "kg CO₂",
      label: "Carbon Saved",
      description: "Equivalent to planting 100 trees",
      color: "eco-green",
      progress: 78
    },
    {
      icon: Heart,
      value: "8.2M",
      suffix: "calories",
      label: "Health Impact",
      description: "Through active transportation",
      color: "eco-blue",
      progress: 65
    },
    {
      icon: DollarSign,
      value: "$1.2M",
      suffix: "",
      label: "Money Saved",
      description: "In transport costs",
      color: "eco-green",
      progress: 82
    },
    {
      icon: Users,
      value: "50K+",
      suffix: "",
      label: "Active Users",
      description: "Making sustainable choices daily",
      color: "eco-blue",
      progress: 91
    }
  ];

  const sdgGoals = [
    { number: 3, title: "Good Health", description: "Promoting active transportation" },
    { number: 11, title: "Sustainable Cities", description: "Smart urban mobility solutions" },
    { number: 13, title: "Climate Action", description: "Reducing transport emissions" }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-eco-mint/10 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
            Global Impact
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Creating Real
            <span className="text-eco-green block">Environmental Change</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of users worldwide who are making a difference one commute at a time. 
            Together, we're building a more sustainable future.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 bg-gradient-card border-0 shadow-soft hover:shadow-eco transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full bg-${stat.color}/20 flex items-center justify-center group-hover:animate-pulse-eco`}>
                    <Icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                  <TrendingUp className="w-5 h-5 text-eco-green" />
                </div>
                
                <div className="mb-4">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                    <span className="text-lg text-muted-foreground ml-1">{stat.suffix}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{stat.progress}%</span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* SDG Goals Section */}
        <div className="bg-gradient-card rounded-2xl p-8 mb-16 shadow-soft">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Aligned with UN Sustainable Development Goals
            </h3>
            <p className="text-muted-foreground">
              GreenCommute directly contributes to global sustainability targets
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sdgGoals.map((goal, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-eco-blue text-white flex items-center justify-center text-xl font-bold">
                  {goal.number}
                </div>
                <h4 className="font-semibold text-foreground mb-2">{goal.title}</h4>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Impact Calculator */}
        <Card className="p-8 bg-gradient-to-r from-eco-green/10 to-eco-blue/10 border-0 shadow-soft">
          <div className="text-center mb-8">
            <TreePine className="w-16 h-16 mx-auto mb-4 text-eco-green" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Calculate Your Environmental Impact
            </h3>
            <p className="text-muted-foreground mb-6">
              Discover how much CO₂ you could save and trees you could help plant by choosing sustainable transport options.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white/60 rounded-xl p-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-eco-green mb-2">3.2 kg CO₂</div>
                <p className="text-sm text-muted-foreground mb-4">Could be saved daily by walking instead of driving</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-eco-green" />
                    <span>= 0.13 trees planted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-eco-blue" />
                    <span>= $8.50 saved</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" className="flex-1">
                <Award className="w-4 h-4 mr-2" />
                Start My Impact Journey
              </Button>
              <Button variant="eco-outline" className="flex-1">
                Learn More
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Impact;