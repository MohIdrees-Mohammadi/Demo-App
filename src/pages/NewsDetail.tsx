import { useParams, Navigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import AnimatedSection from "@/components/AnimatedSection";
import { WithPageLoader } from "@/components/PageLoader";
import { ArrowRight, CalendarDays, User, Tag, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

const fallbackImages: Record<string, string> = {
  "structural-steel-take-off-services": news1,
  "steel-detailing-for-pedestrian-bridges": news2,
  "steel-detailing-change-orders": news3,
};

const NewsDetail = () => {
  const { slug } = useParams();

  const { data: allNews = [] } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const article = allNews.find((n) => n.slug === slug);

  if (allNews.length > 0 && !article) return <Navigate to="/news" replace />;

  if (!article) {
    return (
      <WithPageLoader>
        <Layout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </Layout>
      </WithPageLoader>
    );
  }

  const image = article.image_url || fallbackImages[article.slug] || news1;

  return (
    <WithPageLoader>
      <Layout>
        <PageBanner title={article.title} breadcrumb={article.title} parent={{ label: "News", href: "/news" }} />

        <section className="py-16 sm:py-20 md:py-28 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
              {/* Main Content */}
              <AnimatedSection direction="left" className="lg:col-span-2">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    {article.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    AceroEngineering
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" />
                    Steel Detailing
                  </span>
                </div>

                <div className="relative overflow-hidden mb-10">
                  <img
                    src={image}
                    alt={article.title}
                    width={800}
                    height={512}
                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
                </div>

                <div className="prose prose-lg max-w-none">
                  {article.content.map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base">
                      {i === 0 ? (
                        <>
                          <span className="text-secondary font-semibold text-base sm:text-lg leading-relaxed">
                            {p.split(".")[0]}.
                          </span>
                          {p.substring(p.indexOf(".") + 1)}
                        </>
                      ) : (
                        p
                      )}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-border">
                  <span className="text-sm font-semibold text-secondary mr-2">Tags:</span>
                  {["Steel Detailing", "Construction", "Engineering", "Fabrication"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-muted text-muted-foreground px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </AnimatedSection>

              {/* Sidebar */}
              <AnimatedSection direction="right" className="space-y-8">
                <div className="bg-card border border-border p-6 sm:p-8">
                  <h3 className="text-lg font-heading font-bold text-secondary mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-primary" />
                    Recent Posts
                  </h3>
                  <ul className="space-y-4">
                    {allNews.map((n) => {
                      const nImage = n.image_url || fallbackImages[n.slug] || news1;
                      return (
                        <li key={n.id}>
                          <Link
                            to={`/news/${n.slug}`}
                            className={`flex items-start gap-4 p-3 transition-all duration-300 group/item ${
                              n.slug === slug
                                ? "bg-primary/10 border-l-2 border-primary"
                                : "hover:bg-muted border-l-2 border-transparent hover:border-primary"
                            }`}
                          >
                            <img
                              src={nImage}
                              alt={n.title}
                              loading="lazy"
                              width={80}
                              height={60}
                              className="w-20 h-16 object-cover flex-shrink-0"
                            />
                            <div>
                              <span className="block text-sm font-medium text-secondary group-hover/item:text-primary transition-colors leading-snug">
                                {n.title}
                              </span>
                              <span className="text-xs text-muted-foreground mt-1 block">{n.date}</span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="bg-card border border-border p-6 sm:p-8">
                  <h3 className="text-lg font-heading font-bold text-secondary mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-primary" />
                    Categories
                  </h3>
                  <ul className="space-y-1">
                    {["Steel Detailing", "Structural Engineering", "Construction", "Project Management"].map((cat) => (
                      <li key={cat}>
                        <span className="flex items-center gap-2 text-sm text-muted-foreground py-2.5 px-3 hover:bg-muted hover:text-secondary transition-colors cursor-pointer">
                          <ChevronRight className="w-3.5 h-3.5 text-primary" />
                          {cat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-secondary p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 border border-primary-foreground/10 rounded-full translate-x-1/2 -translate-y-1/2" />
                  <h3 className="text-lg font-heading font-bold text-primary-foreground mb-3 relative z-10">
                    Need Our Services?
                  </h3>
                  <p className="text-primary-foreground/70 text-sm mb-6 relative z-10 leading-relaxed">
                    Get in touch with our expert team for your next steel detailing project.
                  </p>
                  <Link
                    to="/contact"
                    className="relative z-10 inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-3 hover:bg-primary/90 transition-colors"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </Layout>
    </WithPageLoader>
  );
};

export default NewsDetail;
