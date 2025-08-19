import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Mail, MessageSquare, User, FileText } from "lucide-react";
import emailjs from '@emailjs/browser';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters")
});

const ContactUs = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Initialize EmailJS
      emailjs.init('3fC3SuJQ_hKkBoozB');

      // Send email using EmailJS
      await emailjs.send(
        'service_znx0dyj',
        'template_zjliuma',
        {
          from_name: values.name,
          from_email: values.email,
          subject: values.subject,
          message: values.message,
          to_email: 'your-email@example.com', // Replace with your actual email
        },
        '3fC3SuJQ_hKkBoozB'
      );

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 bg-primary">
      <div className="section-padding container-width">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Have questions about your next adventure? We're here to help make your travel dreams come true.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 card-shadow">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90">Name *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input 
                              placeholder="Enter your full name" 
                              className="pl-10 bg-white/90 border-white/30 placeholder:text-muted-foreground transition-all duration-300 focus:bg-white focus:shadow-md"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-orange-200" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90">Email Address *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input 
                              type="email"
                              placeholder="Enter your email" 
                              className="pl-10 bg-white/90 border-white/30 placeholder:text-muted-foreground transition-all duration-300 focus:bg-white focus:shadow-md"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-orange-200" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/90">Subject *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input 
                            placeholder="What's this about?" 
                            className="pl-10 bg-white/90 border-white/30 placeholder:text-muted-foreground transition-all duration-300 focus:bg-white focus:shadow-md"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-orange-200" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/90">Message *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                          <Textarea 
                            placeholder="Tell us more about your travel plans or questions..."
                            className="pl-10 pt-3 bg-white/90 border-white/30 placeholder:text-muted-foreground min-h-[120px] resize-none transition-all duration-300 focus:bg-white focus:shadow-md"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-orange-200" />
                    </FormItem>
                  )}
                />

                <div className="text-center">
                  <Button 
                    type="submit" 
                    variant="accent" 
                    size="lg" 
                    className="w-full md:w-auto px-12 font-semibold text-lg transition-all duration-300 hover:scale-105"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;