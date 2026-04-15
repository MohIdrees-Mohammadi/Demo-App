import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import AnimatedSection from "./AnimatedSection";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import serviceStructural from "@/assets/service-structural.jpg";
import serviceMisc from "@/assets/service-misc.jpg";
import serviceConnection from "@/assets/service-connection.jpg";
import serviceTakeoff from "@/assets/service-takeoff.jpg";

const fallbackImages: Record<string, string> = {
  "structural-steel-detailing": serviceStructural,
  "miscellaneous-steel-detailing": serviceMisc,
  "connection-design-pe-stamping": serviceConnection,
  "structural-steel-take-off-services": serviceTakeoff,
};

const ServicesSection = () => {
  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
          <p className="section-subtitle mb-2 sm:mb-3 text-xs sm:text-sm">Our Expertise</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">
            SERVICES — <span className="text-primary">What We Do</span>
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-primary mx-auto mt-4 sm:mt-6" />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
          {services.map((service, i) => {
            const image = service.image_url || fallbackImages[service.slug] || serviceStructural;
            return (
              <motion.div
                key={service.id}
                className="group bg-card border border-border overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Link to={`/services/${service.slug}`}>
                  <div className="overflow-hidden relative">
                    <img
                      src={image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-44 sm:h-48 md:h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
                  </div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="w-8 sm:w-10 h-0.5 bg-primary mb-3 sm:mb-4 group-hover:w-full transition-all duration-500" />
                    <h3 className="text-sm sm:text-base md:text-lg font-heading font-bold text-secondary mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
