import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "San Francisco, CA",
    rating: 5,
    text: "SnapTrips made planning our honeymoon effortless. The Cultural Discovery package exceeded all our expectations. Every detail was perfectly organized, and we created memories that will last a lifetime.",
    initials: "SJ"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    rating: 5,
    text: "As someone who loves adventure, the Adventure Explorer package was perfect. Professional guides, stunning locations, and seamless logistics. I'm already planning my next trip with SnapTrips!",
    initials: "MC"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    rating: 5,
    text: "The Relaxation Retreat was exactly what I needed after a stressful year. The spa treatments and sunset cruise were magical. SnapTrips truly understands how to create the perfect getaway.",
    initials: "ER"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="section-padding container-width">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stories of SnapTrips Explorers
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Hear from travelers who have experienced the magic of SnapTrips firsthand
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="h-8 w-8 text-accent/30 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground leading-relaxed pl-6">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;