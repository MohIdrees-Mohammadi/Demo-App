import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { supabase } from "@/integrations/supabase/client";

const FeaturedProjectsSection = () => {
  const { data: projects = [] } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects" as any)
        .select("*")
        .order("sort_order")
        .limit(6);
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-muted/40 overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Featured Projects"
          title={<>Recent <span className="text-primary">Work</span></>}
          description="Take a look at some of our recent work, including construction projects, engineering drawings, and detailed models."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30 transition-all duration-500"
            >
              <Link to={`/projects/${p.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.cover_image_url}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/30 to-transparent" />
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">
                    {p.category}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-heading font-extrabold text-primary-foreground text-lg leading-tight mb-1.5">
                      {p.title}
                    </h3>
                    <p className="flex items-center gap-1.5 text-primary-foreground/80 text-xs">
                      <MapPin className="w-3 h-3" />
                      {p.location}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-heading font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
