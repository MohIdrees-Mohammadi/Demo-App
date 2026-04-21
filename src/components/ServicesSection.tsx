import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
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
    <section className="py-16 sm:py-20 md:py-28 bg-background overflow-hidden relative">
      {/* Subtle background ornament */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <SectionHeading
          eyebrow="Our Expertise"
          title={<>What We <span className="text-primary italic">Do Best</span></>}
          description="Premier steel detailing services delivered with precision, reliability, and the highest industry standards."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {services.map((service, i) => {
            const image = service.image_url || fallbackImages[service.slug] || serviceStructural;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-card border border-border overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30"
              >
                <Link to={`/services/${service.slug}`} className="block">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent" />
                    {/* Number badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground font-heading font-bold text-sm">
                      0{i + 1}
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    {/* Title overlay on image bottom */}
                    <h3 className="absolute bottom-4 left-4 right-4 font-heading font-bold text-primary-foreground text-base md:text-lg leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  <div className="p-6">
                    <div className="w-10 h-0.5 bg-primary mb-4 transition-all duration-500 group-hover:w-20" />
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-primary group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
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
