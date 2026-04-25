import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link, useSearchParams } from "react-router-dom";
import PageBanner from "@/components/PageBanner";
import { WithPageLoader } from "@/components/PageLoader";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Filter } from "lucide-react";

const CATEGORIES = ["All", "Construction Projects", "Engineering & Design", "Drawings & Models"];

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects" as any)
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <WithPageLoader>
      <Layout>
        <PageBanner
          title="Our Projects"
          breadcrumb="Projects"
          description="Explore our work across construction, engineering, and design."
        />

        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Filter chips */}
            <div className="flex flex-wrap items-center gap-2 mb-10 justify-center">
              <Filter className="w-4 h-4 text-muted-foreground mr-1" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSearchParams(cat === "All" ? {} : { category: cat })}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="text-center py-20 text-muted-foreground">Loading projects...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">No projects in this category yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
                {filtered.map((p, i) => (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
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
                        <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-primary-foreground/20 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
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
                      <div className="p-5">
                        <p className="text-sm text-muted-foreground line-clamp-2">{p.summary}</p>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </Layout>
    </WithPageLoader>
  );
};

export default Projects;
