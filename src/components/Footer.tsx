import { Button } from "@/components/ui/button";
import footerImage from "@/assets/footer-landscape.jpg";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-primary overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={footerImage} 
          alt="Mountain landscape silhouette"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div className="relative z-10 section-padding container-width py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-white mb-4">SnapTrips</h3>
            <p className="text-white/80 text-lg mb-6 max-w-md">
              Creating unforgettable travel experiences through inspiring explorations and endless possibilities. 
              Your journey to extraordinary destinations starts here.
            </p>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <span className="text-white/90">hello@snaptrips.com</span>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="text-white/80 hover:text-white p-0 h-auto font-normal">
                  About Us
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white/80 hover:text-white p-0 h-auto font-normal">
                  Our Story
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white/80 hover:text-white p-0 h-auto font-normal">
                  Careers
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white/80 hover:text-white p-0 h-auto font-normal">
                  Press
                </Button>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="text-white/80 hover:text-white p-0 h-auto font-normal">
                  Adventure Tours
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white/80 hover:text-white p-0 h-auto font-normal">
                  Cultural Experiences
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white/80 hover:text-white p-0 h-auto font-normal">
                  Luxury Packages
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white/80 hover:text-white p-0 h-auto font-normal">
                  Custom Trips
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 mb-4 md:mb-0">
            © 2024 SnapTrips. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Button variant="link" className="text-white/60 hover:text-white p-0 h-auto font-normal text-sm">
              Privacy Policy
            </Button>
            <Button variant="link" className="text-white/60 hover:text-white p-0 h-auto font-normal text-sm">
              Terms of Service
            </Button>
            <Button variant="link" className="text-white/60 hover:text-white p-0 h-auto font-normal text-sm">
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;