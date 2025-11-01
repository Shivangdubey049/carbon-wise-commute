import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Leaf, Menu, Navigation2, BarChart3, Users, Award, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  const navItems = [
    { name: "Features", href: "#features", icon: Navigation2 },
    { name: "Route Demo", href: "#demo", icon: BarChart3 },
    { name: "Impact", href: "#impact", icon: Award },
    { name: "Community", href: "#community", icon: Users },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-eco-primary flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">EcoTrail</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-muted-foreground hover:text-eco-green transition-colors duration-200 font-medium"
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {profile?.full_name || user.email?.split('@')[0]}!
                </span>
                <Button 
                  variant="eco-ghost" 
                  onClick={signOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="eco-ghost">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="hero">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="eco-ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-gradient-eco-primary flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold text-foreground">EcoTrail</span>
                </div>

                <div className="space-y-6">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 text-foreground hover:text-eco-green transition-colors duration-200 font-medium text-lg"
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </a>
                    );
                  })}
                </div>

                <div className="mt-8 space-y-4">
                  {user ? (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Welcome, {profile?.full_name || user.email?.split('@')[0]}!
                      </p>
                      <Button 
                        variant="eco-outline" 
                        onClick={signOut}
                        className="w-full flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Link to="/auth">
                        <Button variant="eco-outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/auth">
                        <Button variant="hero" className="w-full">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;