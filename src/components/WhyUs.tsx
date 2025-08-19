import { Card, CardContent } from "@/components/ui/card";
import { Zap, Heart, Globe } from "lucide-react";

const features = [
  {
    id: "01",
    icon: Zap,
    title: "Seamless Spontaneity",
    description: "Book last-minute trips with ease. Our AI-powered system finds the perfect getaway in minutes, not hours."
  },
  {
    id: "02", 
    icon: Heart,
    title: "Curated Excellence",
    description: "Every destination is handpicked by travel experts. We ensure quality experiences that exceed expectations."
  },
  {
    id: "03",
    icon: Globe,
    title: "Diverse Destinations",
    description: "From hidden gems to iconic landmarks, explore over 500 destinations across 50 countries worldwide."
  }
];

const WhyUs = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="section-padding container-width">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why SnapTrips?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover what makes us the preferred choice for modern travelers seeking unforgettable experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card key={feature.id} className="card-hover border-border/50">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -left-2 text-6xl font-bold text-accent/20">
                      {feature.id}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;