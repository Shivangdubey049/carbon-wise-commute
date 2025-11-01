import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import RouteDemo from "@/components/RouteDemo";
import Impact from "@/components/Impact";
import Footer from "@/components/Footer";
import UserGreeting from "@/components/UserGreeting";
import SpeedTracker from "@/components/SpeedTracker";
import WeatherDisplay from "@/components/WeatherDisplay";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {user && (
          <div className="container mx-auto px-4 pt-20">
            <UserGreeting />
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <SpeedTracker />
              <WeatherDisplay />
            </div>
          </div>
        )}
        <Hero />
        <section id="features">
          <Features />
        </section>
        <section id="demo">
          <RouteDemo />
        </section>
        <section id="impact">
          <Impact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
