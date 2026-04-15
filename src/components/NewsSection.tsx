import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { ArrowRight, CalendarDays, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

// Fallback images mapped by slug
const fallbackImages: Record<string, string> = {
  "structural-steel-take-off-services": news1,
  "steel-detailing-for-pedestrian-bridges": news2,
  "steel-detailing-change-orders": news3,
};

const NewsSection = () => {
  const { data: newsItems = [] } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-3">
            News & Blogs
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-secondary">
            Latest News
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-6" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, i) => {
            const image = item.image_url || fallbackImages[item.slug] || news1;
            return (
              <motion.article
                key={item.id}
                className="group bg-card border border-border overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Link to={`/news/${item.slug}`} className="block relative h-56 overflow-hidden">
                  <img
                    src={image}
                    alt={item.title}
                    loading="lazy"
                    width={800}
                    height={512}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-secondary/20 group-hover:bg-secondary/10 transition-colors duration-500" />
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5">
                    {item.category}
                  </span>
                </Link>

                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-muted-foreground text-xs mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-primary" />
                      {item.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-primary" />
                      Steel Detailing
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg sm:text-xl text-secondary group-hover:text-primary transition-colors duration-300 mb-3 leading-tight">
                    <Link to={`/news/${item.slug}`}>{item.title}</Link>
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {item.excerpt}
                  </p>

                  <Link
                    to={`/news/${item.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300 group/link"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
