import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import heroImage from "@/assets/hero-mountain-cabin.jpg";
import { CalendarDays, MapPin, Users, IndianRupee } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import ItineraryDisplay from "./ItineraryDisplay";
import TransportRulesDialog from "./TransportRulesDialog";
const destinations = ["Agra, Uttar Pradesh", "Kerala Backwaters", "Jaipur, Rajasthan", "Goa", "Kashmir Valley", "Himachal Pradesh", "Uttarakhand", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Leh Ladakh", "Manali", "Shimla", "Darjeeling", "Ooty", "Kodaikanal", "Munnar", "Alleppey", "Varanasi", "Rishikesh", "Haridwar", "Amritsar", "Udaipur", "Jodhpur", "Pushkar", "Mount Abu", "Ranthambore", "Khajuraho", "Hampi", "Mysore", "Coorg", "Wayanad", "Thekkady", "Kumarakom", "Kochi", "Kovalam", "Varkala", "Andaman Islands", "Lakshadweep", "Sikkim", "Arunachal Pradesh", "Meghalaya", "Assam", "Kolkata", "Chennai"];
const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Vadodara", "Coimbatore", "Madurai", "Vijayawada", "Guwahati", "Mysore", "Kochi", "Thiruvananthapuram", "Bhubaneswar", "Chandigarh", "Dehradun", "Agra"];
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  currentCity: z.string().min(1, "Please select your current city"),
  destination: z.string().min(1, "Please select a destination"),
  startDate: z.string().min(1, "Please select start date"),
  endDate: z.string().min(1, "Please select end date"),
  budget: z.string().min(1, "Please enter your budget"),
  members: z.string().min(1, "Please select number of members"),
  travelMode: z.string().min(1, "Please select mode of travel")
});
const Hero = ({ preSelectedDestination }: { preSelectedDestination?: string } = {}) => {
  const [showItinerary, setShowItinerary] = useState(false);
  const [itineraryData, setItineraryData] = useState<any>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      currentCity: "",
      destination: preSelectedDestination || "",
      startDate: "",
      endDate: "",
      budget: "",
      members: "",
      travelMode: ""
    }
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const startDate = new Date(values.startDate);
      const endDate = new Date(values.endDate);
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end days

      const itinerary = {
        ...values,
        totalDays: totalDays
      };
      setItineraryData(itinerary);
      setShowItinerary(true);
      toast({
        title: "Itinerary Generated!",
        description: `Your ${totalDays}-day journey to ${values.destination} is ready!`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive"
      });
    }
  };
  const handleBackToBooking = () => {
    setShowItinerary(false);
    setItineraryData(null);
  };
  if (showItinerary && itineraryData) {
    return <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Serene mountain landscape with lakeside cabin" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-60"></div>
        </div>
        
        {/* Itinerary Content */}
        <div className="relative z-10 section-padding container-width">
          <div className="max-w-6xl mx-auto py-12">
            <ItineraryDisplay data={itineraryData} onBack={handleBackToBooking} />
          </div>
        </div>
      </section>;
  }
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Serene mountain landscape with lakeside cabin" className="w-full h-full object-cover" />
        
        
        {/* Animated Nature Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating clouds */}
          <div className="absolute top-10 left-1/4 w-16 h-8 bg-white/20 rounded-full animate-drift opacity-60"></div>
          <div className="absolute top-20 left-1/2 w-20 h-10 bg-white/15 rounded-full animate-drift opacity-50" style={{
          animationDelay: '2s'
        }}></div>
          <div className="absolute top-16 left-3/4 w-12 h-6 bg-white/25 rounded-full animate-drift opacity-70" style={{
          animationDelay: '4s'
        }}></div>
          
          {/* Swaying elements */}
          <div className="absolute bottom-32 left-10 w-2 h-20 bg-nature/40 rounded-full animate-sway origin-bottom"></div>
          <div className="absolute bottom-28 right-20 w-1 h-16 bg-nature/30 rounded-full animate-sway origin-bottom" style={{
          animationDelay: '1s'
        }}></div>
          <div className="absolute bottom-40 left-1/3 w-1 h-12 bg-nature/50 rounded-full animate-sway origin-bottom" style={{
          animationDelay: '3s'
        }}></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent/60 rounded-full animate-float" style={{
          animationDelay: '0.5s'
        }}></div>
          <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-accent/40 rounded-full animate-float" style={{
          animationDelay: '2.5s'
        }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-accent/50 rounded-full animate-float" style={{
          animationDelay: '4.5s'
        }}></div>
          
          {/* Water ripple effects */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-secondary/20 to-transparent animate-ripple"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 section-padding container-width text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Inspiring Explorations<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-100">
              and Endless Possibilities
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Discover breathtaking destinations and create unforgettable memories with SnapTrips
          </p>
          
          {/* Booking Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 card-shadow max-w-6xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField control={form.control} name="name" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white/90">Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" className="bg-white/90 border-white/30 placeholder:text-muted-foreground transition-all duration-300 focus:bg-white focus:shadow-md" {...field} />
                        </FormControl>
                        <FormMessage className="text-orange-200" />
                      </FormItem>} />

                  <FormField control={form.control} name="email" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white/90">Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" className="bg-white/90 border-white/30 placeholder:text-muted-foreground transition-all duration-300 focus:bg-white focus:shadow-md" {...field} />
                        </FormControl>
                        <FormMessage className="text-orange-200" />
                      </FormItem>} />

                  <FormField control={form.control} name="currentCity" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white/90">Current City *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/90 border-white/30 transition-all duration-300 focus:bg-white focus:shadow-md">
                              <SelectValue placeholder="Select your city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {cities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-orange-200" />
                      </FormItem>} />

                  <FormField control={form.control} name="destination" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white/90">Destination *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/90 border-white/30 transition-all duration-300 focus:bg-white focus:shadow-md">
                              <SelectValue placeholder="Select destination" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {destinations.map(destination => <SelectItem key={destination} value={destination}>{destination}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-orange-200" />
                      </FormItem>} />

                  <FormField control={form.control} name="members" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white/90">Number of Members *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/90 border-white/30 transition-all duration-300 focus:bg-white focus:shadow-md">
                              <SelectValue placeholder="Select members" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8,9,10].map(num => <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Member' : 'Members'}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-orange-200" />
                      </FormItem>} />

                  <FormField control={form.control} name="travelMode" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white/90">Mode of Travel *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/90 border-white/30 transition-all duration-300 focus:bg-white focus:shadow-md">
                              <SelectValue placeholder="Select travel mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="flight">Flight</SelectItem>
                            <SelectItem value="train">Train</SelectItem>
                            <SelectItem value="bus">Bus</SelectItem>
                            <SelectItem value="car">Car</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-orange-200" />
                      </FormItem>} />

                  <FormField control={form.control} name="startDate" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white/90">Start Date *</FormLabel>
                        <FormControl>
                          <Input type="date" className="bg-white/90 border-white/30 transition-all duration-300 focus:bg-white focus:shadow-md" {...field} />
                        </FormControl>
                        <FormMessage className="text-orange-200" />
                      </FormItem>} />

                  <FormField control={form.control} name="endDate" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white/90">End Date *</FormLabel>
                        <FormControl>
                          <Input type="date" className="bg-white/90 border-white/30 transition-all duration-300 focus:bg-white focus:shadow-md" {...field} />
                        </FormControl>
                        <FormMessage className="text-orange-200" />
                      </FormItem>} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="budget" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white/90">Budget (INR) *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input placeholder="e.g., 50,000" className="pl-10 bg-white/90 border-white/30 placeholder:text-muted-foreground transition-all duration-300 focus:bg-white focus:shadow-md" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage className="text-orange-200" />
                      </FormItem>} />

                  <div className="flex flex-col items-end space-y-3">
                    <TransportRulesDialog />
                    <Button type="submit" variant="accent" size="lg" className="w-full font-semibold text-lg transition-all duration-300 hover:scale-105">
                      Book Your Trip
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>;
};
export default Hero;