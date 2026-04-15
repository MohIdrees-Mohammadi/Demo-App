import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "./AnimatedSection";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Houston, Texas, USA" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: Mail, label: "Email", value: "info@aceroengllc.com" },
  { icon: Clock, label: "Working Hours", value: "Mon - Fri: 9AM - 6PM" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
          <p className="section-subtitle mb-2 sm:mb-3 text-xs sm:text-sm">Get In Touch</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Contact Us</h2>
          <div className="w-12 sm:w-16 h-1 bg-primary mx-auto mt-4 sm:mt-6" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <AnimatedSection direction="left" className="lg:col-span-2 space-y-4 sm:space-y-6">
            <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-xs sm:text-sm md:text-base">
              Ready to start your next project? Contact us today for a free
              consultation and quote.
            </p>
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-3 sm:gap-4 group">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-primary/10 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-300">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-secondary text-[10px] sm:text-xs md:text-sm uppercase tracking-wider">
                    {item.label}
                  </h4>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 sm:mt-1">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </AnimatedSection>

          <AnimatedSection direction="right" className="lg:col-span-3">
            <div className="bg-card border border-border shadow-lg overflow-hidden">
              <div className="bg-primary px-4 sm:px-6 md:px-8 py-4 sm:py-5">
                <h3 className="font-heading text-primary-foreground text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                  Get a Quote
                </h3>
                <p className="text-primary-foreground/70 text-xs sm:text-sm mt-1">
                  Tell us about your project and we'll provide a detailed estimate.
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div>
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-secondary mb-1.5 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-secondary mb-1.5 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div>
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-secondary mb-1.5 sm:mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
                      placeholder="Your Phone"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-secondary mb-1.5 sm:mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
                      placeholder="Subject"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-secondary mb-1.5 sm:mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors resize-none"
                    placeholder="Describe your project requirements..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full sm:w-auto inline-flex items-center gap-2 justify-center text-xs sm:text-sm">
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Get Quote
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
