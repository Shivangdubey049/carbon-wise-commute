import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Route, 
  Calculator, 
  Heart, 
  Trophy, 
  BarChart3,
  Bell,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Globe,
  Users
} from "lucide-react";

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    icon: any;
    title: string;
    description: string;
    details: string[];
    color: string;
  } | null;
}

const FeatureModal = ({ isOpen, onClose, feature }: FeatureModalProps) => {
  if (!feature) return null;

  const Icon = feature.icon;

  const getFeatureContent = (title: string) => {
    switch (title) {
      case "Smart Route Planning":
        return {
          benefits: [
            "Save up to 30% travel time with optimized routes",
            "Real-time traffic and weather integration",
            "Multi-modal transport comparison",
            "Accessibility-friendly route options"
          ],
          howItWorks: [
            "Enter your destination",
            "AI analyzes all transport options",
            "Compare routes by time, cost, and emissions",
            "Get turn-by-turn navigation"
          ],
          techFeatures: ["Machine Learning Route Optimization", "Real-time Data Integration", "Predictive Traffic Analysis"]
        };
      case "Carbon Footprint Tracker":
        return {
          benefits: [
            "Track your daily CO2 savings",
            "See environmental impact in real-time",
            "Compare with city and global averages",
            "Generate sustainability reports"
          ],
          howItWorks: [
            "Automatic emission calculation per route",
            "Track cumulative carbon savings",
            "Set monthly reduction goals",
            "Share achievements with community"
          ],
          techFeatures: ["EPA-certified emission calculations", "Real-time impact visualization", "Comparative analytics"]
        };
      case "Health Benefits Monitor":
        return {
          benefits: [
            "Track calories burned from active transport",
            "Monitor daily physical activity",
            "Set and achieve fitness goals",
            "Improve cardiovascular health"
          ],
          howItWorks: [
            "Auto-detect walking and cycling",
            "Calculate calories and health metrics",
            "Set personalized fitness targets",
            "Receive health milestone notifications"
          ],
          techFeatures: ["Activity recognition AI", "Health data integration", "Personalized recommendations"]
        };
      case "Gamification System":
        return {
          benefits: [
            "Earn points for eco-friendly choices",
            "Unlock achievements and badges",
            "Compete with friends and community",
            "Stay motivated with challenges"
          ],
          howItWorks: [
            "Complete daily green commute challenges",
            "Earn Green Points for sustainable trips",
            "Unlock badges for milestones",
            "Climb leaderboards and win rewards"
          ],
          techFeatures: ["Dynamic challenge generation", "Social competition system", "Reward redemption platform"]
        };
      case "Analytics Dashboard":
        return {
          benefits: [
            "Comprehensive travel insights",
            "Environmental impact visualization",
            "Cost savings tracking",
            "Personal sustainability score"
          ],
          howItWorks: [
            "Automatic data collection and analysis",
            "Generate weekly and monthly reports",
            "Compare with personal and city goals",
            "Export data for personal records"
          ],
          techFeatures: ["Advanced data visualization", "Predictive analytics", "Custom report generation"]
        };
      case "Smart Notifications":
        return {
          benefits: [
            "Weather-based route recommendations",
            "Traffic and delay alerts",
            "Eco-friendly transport suggestions",
            "Personalized sustainability tips"
          ],
          howItWorks: [
            "AI analyzes weather and traffic patterns",
            "Send proactive route suggestions",
            "Alert about transport disruptions",
            "Provide timely eco-tips"
          ],
          techFeatures: ["Predictive notification engine", "Weather API integration", "Personalization algorithms"]
        };
      default:
        return {
          benefits: ["Enhanced user experience", "Improved sustainability", "Better decision making"],
          howItWorks: ["Easy setup", "Automatic tracking", "Smart recommendations"],
          techFeatures: ["AI-powered", "Real-time updates", "User-friendly interface"]
        };
    }
  };

  const content = getFeatureContent(feature.title);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-full bg-${feature.color}/20 flex items-center justify-center`}>
              <Icon className={`w-8 h-8 text-${feature.color}`} />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                {feature.title}
              </DialogTitle>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Benefits */}
          <Card className="p-6 bg-gradient-card border-0">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-eco-green" />
              <h3 className="text-lg font-semibold">Key Benefits</h3>
            </div>
            <ul className="space-y-3">
              {content.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-eco-green mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* How It Works */}
          <Card className="p-6 bg-gradient-card border-0">
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="w-5 h-5 text-eco-blue" />
              <h3 className="text-lg font-semibold">How It Works</h3>
            </div>
            <ol className="space-y-3">
              {content.howItWorks.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs flex-shrink-0">
                    {index + 1}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        {/* Technical Features */}
        <Card className="p-6 bg-gradient-card border-0 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-eco-mint" />
            <h3 className="text-lg font-semibold">Technical Features</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {content.techFeatures.map((tech, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Coming Soon Features */}
        <Card className="p-6 bg-gradient-to-r from-eco-mint/20 to-eco-blue/20 border border-eco-mint/30 mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-eco-mint" />
              <h3 className="text-lg font-semibold">Coming Soon</h3>
            </div>
            <Badge className="bg-eco-mint/20 text-eco-mint border-eco-mint/30">
              Beta Phase
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            This feature is currently in development. Join our beta program to get early access and help shape the future of sustainable transportation.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Join Beta
            </Button>
            <Button variant="eco-ghost" size="sm">
              Learn More
            </Button>
          </div>
        </Card>

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary">
            <ArrowRight className="w-4 h-4 mr-2" />
            Get Started
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureModal;