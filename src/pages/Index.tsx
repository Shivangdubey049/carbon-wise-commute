import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import RouteDemo from "@/components/RouteDemo";
import Impact from "@/components/Impact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
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
