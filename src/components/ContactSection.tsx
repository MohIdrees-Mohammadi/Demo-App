import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import AnimatedSection from "./AnimatedSection";

const contactInfo = [
  { icon: MapPin, label: "Our Office", value: "123 Main Street, Suite 400" },
  { icon: Phone, label: "Phone", value: "+93 747 877 431" },
  { icon: Mail, label: "Email", value: "info@brandford.com" },
  { icon: Clock, label: "Working Hours", value: "Mon - Fri: 9AM - 6PM" },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(1500),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast({ title: "Please check your form", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    toast({ title: "Message Sent!", description: "We'll get back to you as soon as possible." });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-muted/40 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <p className="section-subtitle mb-3">Get In Touch</p>
          <h2 className="section-title">Contact Us</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Have questions or need more information? Contact us today.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <AnimatedSection direction="left" className="lg:col-span-2 space-y-5">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4 group bg-card border border-border rounded-lg p-5">
                <div className="w-12 h-12 rounded-md bg-primary/10 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors">
                  <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-secondary text-xs uppercase tracking-wider">{item.label}</h4>
                  <p className="text-foreground text-sm mt-1">{item.value}</p>
                </div>
              </div>
            ))}
          </AnimatedSection>

          <AnimatedSection direction="right" className="lg:col-span-3">
            <div className="bg-card border border-border shadow-lg rounded-xl overflow-hidden">
              <div className="bg-primary px-6 md:px-8 py-5">
                <h3 className="font-heading text-primary-foreground text-xl md:text-2xl font-extrabold">
                  Send Us a Message
                </h3>
                <p className="text-primary-foreground/80 text-xs sm:text-sm mt-1">
                  We typically respond within 24 hours.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-secondary mb-1.5">Name *</label>
                    <input
                      type="text" name="name" required maxLength={100}
                      value={formData.name} onChange={handleChange}
                      className="w-full border border-border bg-background px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-secondary mb-1.5">Email *</label>
                    <input
                      type="email" name="email" required maxLength={255}
                      value={formData.email} onChange={handleChange}
                      className="w-full border border-border bg-background px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1.5">Phone</label>
                  <input
                    type="tel" name="phone" maxLength={40}
                    value={formData.phone} onChange={handleChange}
                    className="w-full border border-border bg-background px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="+1 555 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1.5">Message *</label>
                  <textarea
                    name="message" required rows={5} maxLength={1500}
                    value={formData.message} onChange={handleChange}
                    className="w-full border border-border bg-background px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  <Send className="w-4 h-4" /> Send Message
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
