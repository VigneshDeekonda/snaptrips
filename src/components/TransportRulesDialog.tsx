import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Info } from "lucide-react";

const transportRules = [
  {
    budgetRange: "Below ₹2,000",
    modes: ["Bus", "Shared Cab"],
    reasoning: "Most economical options for budget-conscious travelers"
  },
  {
    budgetRange: "₹2,001 - ₹5,000",
    modes: ["Train Sleeper/3AC", "Deluxe Bus"],
    reasoning: "Balance of comfort and affordability for medium distances"
  },
  {
    budgetRange: "₹5,001 - ₹10,000",
    modes: ["Train 2AC/1AC", "Private Cab (short distance)", "Budget Flight (if available)"],
    reasoning: "Enhanced comfort with multiple travel options"
  },
  {
    budgetRange: "₹10,001 - ₹20,000",
    modes: ["Flight Economy", "Luxury Train", "Private Cab"],
    reasoning: "Premium comfort with faster travel times"
  },
  {
    budgetRange: "₹20,001 - ₹40,000",
    modes: ["Flight Premium Economy", "Car Rental"],
    reasoning: "High-end travel with maximum flexibility and comfort"
  },
  {
    budgetRange: "Above ₹40,000",
    modes: ["Business Flight", "Luxury Travel Options"],
    reasoning: "Ultimate luxury travel experience with premium services"
  }
];

const TransportRulesDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
          <Info className="h-4 w-4 mr-2" />
          Transport Guidelines
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Transport Mode Recommendations
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-muted-foreground text-center">
            Choose your preferred mode of transport based on your budget range for the best travel experience.
          </p>
          
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-foreground">Budget Range (₹)</TableHead>
                  <TableHead className="font-semibold text-foreground">Suggested Transport Modes</TableHead>
                  <TableHead className="font-semibold text-foreground">Reasoning / Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transportRules.map((rule, index) => (
                  <TableRow 
                    key={index} 
                    className={index % 2 === 0 ? "bg-muted/20" : "bg-background"}
                  >
                    <TableCell className="font-medium">
                      {rule.budgetRange}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {rule.modes.map((mode, modeIndex) => (
                          <div 
                            key={modeIndex}
                            className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-sm mr-2 mb-1"
                          >
                            {mode}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {rule.reasoning}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Important Notes:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Prices may vary based on destination, season, and availability</li>
              <li>• Book in advance for better deals and availability</li>
              <li>• Consider travel time vs. budget when making your choice</li>
              <li>• Group discounts may be available for certain transport modes</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransportRulesDialog;