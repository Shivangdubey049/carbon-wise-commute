import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Leaf, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin,
  Navigation,
  Heart
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Product: [
      "Features",
      "Route Planner", 
      "Carbon Tracker",
      "Health Monitor",
      "Gamification"
    ],
    Company: [
      "About Us",
      "Our Mission",
      "Team",
      "Careers",
      "Press"
    ],
    Resources: [
      "Documentation",
      "API Reference",
      "Support Center",
      "Community",
      "Blog"
    ],
    Legal: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "Data Protection",
      "Accessibility"
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" }
  ];

  return (
    <footer className="bg-gradient-to-br from-eco-green/5 to-eco-blue/5 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-eco-primary flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">EcoTrail</h3>
              </div>
              
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Revolutionizing urban transportation through intelligent, eco-friendly route planning. 
                Making every journey count for a sustainable future.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  className="w-fit"
                  onClick={() => document.getElementById('route-planner')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Start Planning Routes
                </Button>
                <Button 
                  variant="eco-outline" 
                  className="w-fit"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Join Our Community
                </Button>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Follow us:</span>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full bg-eco-mint hover:bg-eco-green hover:text-white transition-all duration-300 flex items-center justify-center group"
                      >
                        <Icon className="w-5 h-5 text-eco-green group-hover:text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="font-semibold text-foreground mb-4">{category}</h4>
                  <ul className="space-y-3">
                    {links.map((link, index) => (
                      <li key={index}>
                        <a 
                          href="#" 
                          className="text-muted-foreground hover:text-eco-green transition-colors duration-200 text-sm"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Stats */}
          <div className="bg-gradient-card rounded-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <h4 className="text-xl font-semibold text-foreground mb-2">Our Community Impact</h4>
              <p className="text-muted-foreground">Together we're building a greener future</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-eco-green mb-1">2.4M kg</div>
                <p className="text-sm text-muted-foreground">CO₂ Saved</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-eco-blue mb-1">50K+</div>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-eco-green mb-1">8.2M</div>
                <p className="text-sm text-muted-foreground">Calories Burned</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-eco-blue mb-1">$1.2M</div>
                <p className="text-sm text-muted-foreground">Money Saved</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2024 EcoTrail. Building a sustainable future.</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-eco-green transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-eco-green transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-eco-green transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;