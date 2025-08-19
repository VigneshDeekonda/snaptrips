import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const packages = [
  {
    id: 1,
    name: "Adventure Explorer",
    price: 599,
    duration: "7 days",
    popular: false,
    features: [
      "Mountain hiking expeditions",
      "White-water rafting",
      "Rock climbing adventures",
      "Camping under the stars",
      "Professional guide included"
    ],
    gradient: "nature-gradient"
  },
  {
    id: 2,
    name: "Cultural Discovery",
    price: 799,
    duration: "10 days",
    popular: true,
    features: [
      "Historical site visits",
      "Local cooking classes",
      "Traditional craft workshops",
      "Museum private tours",
      "Cultural performances",
      "Language immersion"
    ],
    gradient: "hero-gradient"
  },
  {
    id: 3,
    name: "Relaxation Retreat",
    price: 899,
    duration: "5 days",
    popular: false,
    features: [
      "Luxury spa treatments",
      "Beach resort accommodation",
      "Yoga and meditation",
      "Gourmet dining experiences",
      "Sunset cruise included"
    ],
    gradient: "accent-gradient"
  }
];

const Packages = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="section-padding container-width">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover Your Perfect Journey
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Choose from our carefully crafted travel packages designed to match your unique interests and style
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((package_) => (
            <Card 
              key={package_.id} 
              className={`card-hover relative overflow-hidden ${
                package_.popular ? 'ring-2 ring-accent shadow-2xl scale-105' : ''
              }`}
            >
              {package_.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-accent text-accent-foreground px-4 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                <div className={`w-20 h-20 mx-auto ${package_.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                  <span className="text-2xl font-bold text-white">
                    {package_.name.split(' ').map(word => word[0]).join('')}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {package_.name}
                </h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary">${package_.price}</span>
                  <span className="text-muted-foreground ml-2">/ {package_.duration}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {package_.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-nature mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={package_.popular ? "accent" : "default"} 
                  size="lg" 
                  className="w-full font-semibold"
                >
                  Choose Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;