import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Camera, Utensils, Car, Star, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface ItineraryData {
  name: string;
  email: string;
  currentCity: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  members: string;
  travelMode: string;
  totalDays: number;
}

interface DayActivity {
  time: string;
  activity: string;
  location: string;
  duration: string;
  type: 'sightseeing' | 'food' | 'travel' | 'leisure';
  tips?: string;
}

interface DayPlan {
  day: number;
  title: string;
  activities: DayActivity[];
  nearbyPlaces: string[];
}

const getItineraryForDestination = (destination: string, totalDays: number): DayPlan[] => {
  const itineraries: Record<string, DayPlan[]> = {
    "Agra, Uttar Pradesh": [
      {
        day: 1,
        title: "Arrival & Taj Mahal",
        activities: [
          { time: "09:00 AM", activity: "Arrival and hotel check-in", location: "Hotel", duration: "1 hour", type: "travel" },
          { time: "10:00 AM", activity: "Visit Taj Mahal", location: "Taj Mahal", duration: "3 hours", type: "sightseeing", tips: "Best photography time is morning" },
          { time: "01:00 PM", activity: "Lunch at local restaurant", location: "Taj Ganj", duration: "1 hour", type: "food" },
          { time: "03:00 PM", activity: "Explore Taj Mahal gardens", location: "Taj Mahal Gardens", duration: "2 hours", type: "leisure" },
          { time: "06:00 PM", activity: "Sunset view from Mehtab Bagh", location: "Mehtab Bagh", duration: "1.5 hours", type: "sightseeing" }
        ],
        nearbyPlaces: ["Agra Fort", "Itmad-ud-Daulah", "Fatehpur Sikri"]
      },
      {
        day: 2,
        title: "Agra Fort & Local Markets",
        activities: [
          { time: "08:00 AM", activity: "Visit Agra Fort", location: "Agra Fort", duration: "2.5 hours", type: "sightseeing" },
          { time: "11:00 AM", activity: "Shopping at Sadar Bazaar", location: "Sadar Bazaar", duration: "2 hours", type: "leisure" },
          { time: "01:00 PM", activity: "Traditional Mughlai lunch", location: "Pinch of Spice", duration: "1 hour", type: "food" },
          { time: "03:00 PM", activity: "Visit Itmad-ud-Daulah (Baby Taj)", location: "Itmad-ud-Daulah", duration: "2 hours", type: "sightseeing" },
          { time: "06:00 PM", activity: "Cultural show at Kalakriti", location: "Kalakriti Cultural Center", duration: "1.5 hours", type: "leisure" }
        ],
        nearbyPlaces: ["Akbar's Tomb", "Chini Ka Rauza", "Ram Bagh"]
      }
    ],
    "Kerala Backwaters": [
      {
        day: 1,
        title: "Arrival & Alleppey Backwaters",
        activities: [
          { time: "10:00 AM", activity: "Arrival and houseboat check-in", location: "Alleppey", duration: "1 hour", type: "travel" },
          { time: "11:00 AM", activity: "Houseboat cruise begins", location: "Vembanad Lake", duration: "3 hours", type: "sightseeing" },
          { time: "02:00 PM", activity: "Traditional Kerala lunch on boat", location: "Houseboat", duration: "1 hour", type: "food" },
          { time: "04:00 PM", activity: "Village visit and coconut farm tour", location: "Kumrakom Village", duration: "2 hours", type: "leisure" },
          { time: "07:00 PM", activity: "Sunset cruise with dinner", location: "Backwaters", duration: "2 hours", type: "sightseeing" }
        ],
        nearbyPlaces: ["Kumarakom", "Kottayam", "Marari Beach"]
      },
      {
        day: 2,
        title: "Munnar Hill Station",
        activities: [
          { time: "07:00 AM", activity: "Check-out and travel to Munnar", location: "Munnar", duration: "4 hours", type: "travel" },
          { time: "12:00 PM", activity: "Check-in and lunch", location: "Munnar Resort", duration: "1.5 hours", type: "food" },
          { time: "02:00 PM", activity: "Tea plantation tour", location: "Tata Tea Museum", duration: "2 hours", type: "sightseeing" },
          { time: "05:00 PM", activity: "Echo Point visit", location: "Echo Point", duration: "1 hour", type: "leisure" },
          { time: "07:00 PM", activity: "Local spice shopping", location: "Munnar Market", duration: "1 hour", type: "leisure" }
        ],
        nearbyPlaces: ["Eravikulam National Park", "Mattupetty Dam", "Kundala Lake"]
      }
    ],
    "Jaipur, Rajasthan": [
      {
        day: 1,
        title: "Pink City Heritage",
        activities: [
          { time: "09:00 AM", activity: "Visit Amber Palace", location: "Amber Fort", duration: "3 hours", type: "sightseeing", tips: "Take elephant ride up to the fort" },
          { time: "01:00 PM", activity: "Rajasthani thali lunch", location: "Chokhi Dhani", duration: "1 hour", type: "food" },
          { time: "03:00 PM", activity: "City Palace complex tour", location: "City Palace", duration: "2 hours", type: "sightseeing" },
          { time: "05:30 PM", activity: "Hawa Mahal photography", location: "Hawa Mahal", duration: "1 hour", type: "sightseeing" },
          { time: "07:00 PM", activity: "Shopping at Johari Bazaar", location: "Johari Bazaar", duration: "2 hours", type: "leisure" }
        ],
        nearbyPlaces: ["Nahargarh Fort", "Jaigarh Fort", "Jantar Mantar"]
      },
      {
        day: 2,
        title: "Forts & Local Culture",
        activities: [
          { time: "08:00 AM", activity: "Nahargarh Fort sunrise", location: "Nahargarh Fort", duration: "2 hours", type: "sightseeing" },
          { time: "11:00 AM", activity: "Jantar Mantar astronomical tour", location: "Jantar Mantar", duration: "1.5 hours", type: "sightseeing" },
          { time: "01:00 PM", activity: "Street food tour", location: "Bapu Bazaar", duration: "1.5 hours", type: "food" },
          { time: "03:30 PM", activity: "Albert Hall Museum", location: "Ram Niwas Garden", duration: "1.5 hours", type: "sightseeing" },
          { time: "06:00 PM", activity: "Cultural folk dance show", location: "Bagore Ki Haveli", duration: "1.5 hours", type: "leisure" }
        ],
        nearbyPlaces: ["Pushkar", "Ajmer", "Sanganer"]
      }
    ],
    "Goa": [
      {
        day: 1,
        title: "Beach Paradise & Portuguese Heritage",
        activities: [
          { time: "09:00 AM", activity: "Arrival and hotel check-in", location: "Beach Resort", duration: "1 hour", type: "travel" },
          { time: "10:00 AM", activity: "Baga Beach water sports", location: "Baga Beach", duration: "3 hours", type: "leisure", tips: "Try parasailing and jet skiing" },
          { time: "01:00 PM", activity: "Seafood lunch by the beach", location: "Beach Shack", duration: "1 hour", type: "food" },
          { time: "03:00 PM", activity: "Old Goa churches tour", location: "Basilica of Bom Jesus", duration: "2 hours", type: "sightseeing" },
          { time: "06:00 PM", activity: "Sunset at Anjuna Beach", location: "Anjuna Beach", duration: "1.5 hours", type: "leisure" }
        ],
        nearbyPlaces: ["Calangute Beach", "Fort Aguada", "Panaji Market"]
      },
      {
        day: 2,
        title: "South Goa Serenity",
        activities: [
          { time: "08:00 AM", activity: "Visit to Palolem Beach", location: "Palolem Beach", duration: "2 hours", type: "leisure" },
          { time: "11:00 AM", activity: "Dudhsagar Falls expedition", location: "Dudhsagar Falls", duration: "4 hours", type: "sightseeing" },
          { time: "03:00 PM", activity: "Goan fish curry lunch", location: "Local Restaurant", duration: "1 hour", type: "food" },
          { time: "05:00 PM", activity: "Spice plantation tour", location: "Sahakari Spice Farm", duration: "2 hours", type: "sightseeing" },
          { time: "08:00 PM", activity: "Night market shopping", location: "Anjuna Flea Market", duration: "1.5 hours", type: "leisure" }
        ],
        nearbyPlaces: ["Cabo de Rama Fort", "Colva Beach", "Margao Market"]
      }
    ],
    "Himachal Pradesh": [
      {
        day: 1,
        title: "Shimla Queen of Hills",
        activities: [
          { time: "09:00 AM", activity: "Arrival and hotel check-in", location: "Shimla Hotel", duration: "1 hour", type: "travel" },
          { time: "10:00 AM", activity: "Mall Road exploration", location: "Mall Road", duration: "2 hours", type: "leisure" },
          { time: "01:00 PM", activity: "Himachali lunch", location: "Local Restaurant", duration: "1 hour", type: "food" },
          { time: "03:00 PM", activity: "Ridge and Christ Church visit", location: "The Ridge", duration: "1.5 hours", type: "sightseeing" },
          { time: "05:00 PM", activity: "Toy train ride", location: "Kalka-Shimla Railway", duration: "2 hours", type: "leisure", tips: "Book window seats for best views" }
        ],
        nearbyPlaces: ["Kufri", "Chail", "Mashobra"]
      },
      {
        day: 2,
        title: "Manali Adventure",
        activities: [
          { time: "08:00 AM", activity: "Travel to Manali", location: "Manali", duration: "4 hours", type: "travel" },
          { time: "01:00 PM", activity: "Check-in and lunch", location: "Manali Resort", duration: "1 hour", type: "food" },
          { time: "03:00 PM", activity: "Hadimba Temple visit", location: "Hadimba Temple", duration: "1 hour", type: "sightseeing" },
          { time: "05:00 PM", activity: "Mall Road Manali shopping", location: "Mall Road Manali", duration: "2 hours", type: "leisure" },
          { time: "08:00 PM", activity: "Bonfire and local music", location: "Hotel", duration: "1.5 hours", type: "leisure" }
        ],
        nearbyPlaces: ["Solang Valley", "Rohtang Pass", "Kullu"]
      }
    ],
    "Hyderabad": [
      {
        day: 1,
        title: "City of Nizams",
        activities: [
          { time: "09:00 AM", activity: "Charminar and Laad Bazaar", location: "Charminar", duration: "2 hours", type: "sightseeing" },
          { time: "11:30 AM", activity: "Mecca Masjid visit", location: "Mecca Masjid", duration: "1 hour", type: "sightseeing" },
          { time: "01:00 PM", activity: "Hyderabadi biryani lunch", location: "Paradise Restaurant", duration: "1 hour", type: "food", tips: "Try the famous Hyderabadi dum biryani" },
          { time: "03:00 PM", activity: "Golconda Fort exploration", location: "Golconda Fort", duration: "2.5 hours", type: "sightseeing" },
          { time: "06:00 PM", activity: "Hussain Sagar Lake boat ride", location: "Hussain Sagar Lake", duration: "1.5 hours", type: "leisure" }
        ],
        nearbyPlaces: ["Qutb Shahi Tombs", "Chowmahalla Palace", "Salar Jung Museum"]
      },
      {
        day: 2,
        title: "Modern Hyderabad",
        activities: [
          { time: "10:00 AM", activity: "Ramoji Film City tour", location: "Ramoji Film City", duration: "5 hours", type: "leisure" },
          { time: "03:00 PM", activity: "HITEC City visit", location: "HITEC City", duration: "1.5 hours", type: "sightseeing" },
          { time: "05:00 PM", activity: "Shopping at Inorbit Mall", location: "Inorbit Mall", duration: "2 hours", type: "leisure" },
          { time: "08:00 PM", activity: "Haleem and sweets tasting", location: "Local Sweet Shop", duration: "1 hour", type: "food" }
        ],
        nearbyPlaces: ["Birla Mandir", "Snow World", "Lumbini Park"]
      }
    ]
  };

  const baseItinerary = itineraries[destination] || itineraries["Agra, Uttar Pradesh"];
  
  // Extend or trim itinerary based on total days
  if (totalDays <= baseItinerary.length) {
    return baseItinerary.slice(0, totalDays);
  } else {
    // Add extra days with generic activities
    const extendedItinerary = [...baseItinerary];
    for (let i = baseItinerary.length; i < totalDays; i++) {
      extendedItinerary.push({
        day: i + 1,
        title: `Day ${i + 1} - Leisure & Exploration`,
        activities: [
          { time: "09:00 AM", activity: "Free time for personal exploration", location: "Local area", duration: "3 hours", type: "leisure" },
          { time: "01:00 PM", activity: "Local cuisine experience", location: "Recommended restaurant", duration: "1 hour", type: "food" },
          { time: "03:00 PM", activity: "Shopping and souvenir hunting", location: "Local markets", duration: "2 hours", type: "leisure" },
          { time: "06:00 PM", activity: "Sunset viewing and relaxation", location: "Scenic spot", duration: "1.5 hours", type: "leisure" }
        ],
        nearbyPlaces: ["Local attractions", "Hidden gems", "Cultural sites"]
      });
    }
    return extendedItinerary;
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'sightseeing': return <Camera className="h-4 w-4" />;
    case 'food': return <Utensils className="h-4 w-4" />;
    case 'travel': return <Car className="h-4 w-4" />;
    case 'leisure': return <Star className="h-4 w-4" />;
    default: return <MapPin className="h-4 w-4" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'sightseeing': return 'bg-blue-500/10 text-blue-300 border-blue-500/20';
    case 'food': return 'bg-orange-500/10 text-orange-300 border-orange-500/20';
    case 'travel': return 'bg-green-500/10 text-green-300 border-green-500/20';
    case 'leisure': return 'bg-purple-500/10 text-purple-300 border-purple-500/20';
    default: return 'bg-gray-500/10 text-gray-300 border-gray-500/20';
  }
};

interface Props {
  data: ItineraryData;
  onBack: () => void;
}

const ItineraryDisplay = ({ data, onBack }: Props) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const itinerary = getItineraryForDestination(data.destination, data.totalDays);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleConfirmBooking = async () => {
    setIsConfirming(true);
    try {
      const bookingData = {
        name: data.name,
        email: data.email,
        currentCity: data.currentCity,
        destination: data.destination,
        startDate: data.startDate,
        endDate: data.endDate,
        budget: data.budget,
        members: data.members,
        travelMode: data.travelMode,
        totalDays: data.totalDays,
        timestamp: new Date().toISOString()
      };

      const response = await fetch('https://vigneshdeekonda.app.n8n.cloud/webhook-test/a6c0e237-fbbc-4d90-ac5c-5d0676ed0dc1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        toast({
          title: "Booking Confirmed!",
          description: "Your trip booking has been successfully submitted. We'll contact you soon!",
        });
      } else {
        throw new Error('Failed to submit booking');
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Unable to confirm your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Booking
        </Button>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Your Perfect {data.totalDays}-Day Journey
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-accent mb-6">
          {data.destination}
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white/80">
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {formatDate(data.startDate)} - {formatDate(data.endDate)}
          </p>
          <p className="hidden md:block">•</p>
          <p>{data.totalDays} Days of Amazing Experiences</p>
        </div>
      </div>

      {/* Day-by-day Itinerary */}
      <div className="space-y-6">
        {itinerary.map((day) => (
          <Card key={day.day} className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <Badge className="bg-accent text-accent-foreground px-3 py-1">
                  Day {day.day}
                </Badge>
                {day.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {day.activities.map((activity, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <Badge className={`p-2 ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </Badge>
                    {index < day.activities.length - 1 && (
                      <div className="w-px h-8 bg-white/20 mt-2" />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <Badge variant="outline" className="bg-white/5 text-white/80 border-white/20 w-fit">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </Badge>
                      <span className="text-white/60">•</span>
                      <Badge variant="outline" className="bg-white/5 text-white/80 border-white/20 w-fit">
                        {activity.duration}
                      </Badge>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-white">{activity.activity}</h4>
                    <p className="text-white/70 flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {activity.location}
                    </p>
                    
                    {activity.tips && (
                      <p className="text-accent text-sm italic">💡 {activity.tips}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Nearby Places */}
              <Separator className="my-4 bg-white/20" />
              <div>
                <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Nearby Places to Explore
                </h5>
                <div className="flex flex-wrap gap-2">
                  {day.nearbyPlaces.map((place, index) => (
                    <Badge key={index} variant="secondary" className="bg-white/10 text-white/80 border-white/20">
                      {place}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Confirm Booking Button */}
      <div className="text-center pt-8">
        <Button 
          onClick={handleConfirmBooking}
          disabled={isConfirming}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-4 transition-all duration-300 hover:scale-105"
        >
          {isConfirming ? "Confirming..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
};

export default ItineraryDisplay;