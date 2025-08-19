import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import { useState } from "react";

const Index = () => {
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [showItinerary, setShowItinerary] = useState(false);

  const handleExploreDestination = (destination: string) => {
    setSelectedDestination(destination);
    setShowItinerary(true);
    // Scroll to hero section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Hero preSelectedDestination={selectedDestination} />
      <Destinations onExploreClick={handleExploreDestination} />
      <WhyUs />
      <Testimonials />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;