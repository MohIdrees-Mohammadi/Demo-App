import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowUpRight, HardHat, Ruler, Package } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = {
  construction: HardHat,
  "engineering-design": Ruler,
  "material-supply": Package,
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
      <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <SectionHeading
          eyebrow="Our Services"
          title={<>Integrated Solutions <span className="text-primary">For Every Stage</span></>}
          description="We provide integrated services to support every stage of your project — from first concept to final hand-off."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.slug] || HardHat;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30"
              >
                <Link to={`/services/${service.slug}`} className="block">
                  {service.image_url && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={service.image_url}
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent" />
                      <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground rounded-md shadow-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground rounded-md translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-7">
                    <h3 className="font-heading font-extrabold text-secondary text-xl mb-3 leading-tight group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
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
