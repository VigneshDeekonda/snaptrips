import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import tajMahalImage from "@/assets/destination-taj-mahal.jpg";
import keralaImage from "@/assets/destination-kerala.jpg";
import jaipurImage from "@/assets/destination-jaipur.jpg";
import goaImage from "@/assets/destination-goa.jpg";
import himachalImage from "@/assets/destination-himachal.jpg";
import hyderabadImage from "@/assets/destination-hyderabad.jpg";
import { Star, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

const destinations = [
  {
    id: 1,
    name: "Agra, Uttar Pradesh",
    image: tajMahalImage,
    rating: 4.9,
    description: "Home of the Magnificent Taj Mahal",
    price: "From ₹15,999"
  },
  {
    id: 2,
    name: "Kerala Backwaters",
    image: keralaImage,
    rating: 4.8,
    description: "God's Own Country Paradise",
    price: "From ₹22,999"
  },
  {
    id: 3,
    name: "Jaipur, Rajasthan",
    image: jaipurImage,
    rating: 4.7,
    description: "The Pink City of Royal Heritage",
    price: "From ₹18,999"
  },
  {
    id: 4,
    name: "Goa",
    image: goaImage,
    rating: 4.6,
    description: "Tropical Paradise with Golden Beaches",
    price: "From ₹16,999"
  },
  {
    id: 5,
    name: "Himachal Pradesh",
    image: himachalImage,
    rating: 4.8,
    description: "Majestic Mountains and Hill Stations",
    price: "From ₹19,999"
  },
  {
    id: 6,
    name: "Hyderabad",
    image: hyderabadImage,
    rating: 4.5,
    description: "City of Nizams and Royal Cuisine",
    price: "From ₹17,999"
  }
];

const allDestinations = [
  "Agra, Uttar Pradesh", "Kerala Backwaters", "Jaipur, Rajasthan", "Goa", "Kashmir Valley",
  "Himachal Pradesh", "Uttarakhand", "Rajasthan", "Mumbai", "Delhi", "Bangalore", 
  "Leh Ladakh", "Manali", "Shimla", "Darjeeling", "Ooty", "Kodaikanal", 
  "Munnar", "Alleppey", "Varanasi", "Rishikesh", "Haridwar", "Amritsar",
  "Udaipur", "Jodhpur", "Pushkar", "Mount Abu", "Ranthambore", "Khajuraho",
  "Hampi", "Mysore", "Coorg", "Wayanad", "Thekkady", "Kumarakom", 
  "Kochi", "Kovalam", "Varkala", "Andaman Islands", "Lakshadweep", 
  "Sikkim", "Arunachal Pradesh", "Meghalaya", "Assam", "Nagaland",
  "Kolkata", "Chennai", "Hyderabad", "Pune", "Ahmedabad", "Chandigarh",
  "Bhopal", "Indore", "Aurangabad", "Nashik", "Lonavala", "Mahabaleshwar"
];

const Destinations = ({ onExploreClick }: { onExploreClick?: (destination: string) => void } = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleExploreClick = (destinationName: string) => {
    if (onExploreClick) {
      onExploreClick(destinationName);
    }
  };
  return (
    <section className="py-20 bg-primary">
      <div className="section-padding container-width">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our Most Coveted
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-accent mb-6">
            SnapTrip Destinations
          </h3>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            From bustling cities to serene landscapes, discover destinations that will take your breath away
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="card-hover border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={destination.image} 
                  alt={`Beautiful view of ${destination.name}`}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <h4 className="text-lg font-semibold text-white">{destination.name}</h4>
                </div>
                <p className="text-white/70 mb-4">{destination.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-accent">{destination.price}</span>
                  <Button variant="hero" size="sm" onClick={() => handleExploreClick(destination.name)}>
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="accent" 
                size="lg" 
                className="font-semibold transition-all duration-300 hover:scale-105"
              >
                View All Destinations
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto animate-fade-in">
                {allDestinations.map((destination, index) => (
                  <Card 
                    key={destination} 
                    className="card-hover border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:bg-white/10"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardContent className="p-4 text-center">
                      <MapPin className="h-4 w-4 text-accent mx-auto mb-2" />
                      <p className="text-sm text-white/90 font-medium">{destination}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </section>
  );
};

export default Destinations;