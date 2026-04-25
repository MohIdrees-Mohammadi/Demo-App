import { useParams, Navigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { WithPageLoader } from "@/components/PageLoader";
import { supabase } from "@/integrations/supabase/client";
import heroFallback from "@/assets/brandford-hero.jpg";

const ServiceDetail = () => {
  const { slug } = useParams();

  const { data: allServices = [] } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const service = allServices.find((s) => s.slug === slug);

  if (allServices.length > 0 && !service) return <Navigate to="/services" replace />;

  if (!service) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </Layout>
    );
  }

  const heroImage = service.hero_image_url || service.image_url || heroFallback;

  return (
    <WithPageLoader>
      <Layout>
        <PageBanner title={service.title} breadcrumb={service.title} parent={{ label: "Services", href: "/services" }} />
        <section className="py-12 sm:py-16 md:py-24 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-10">
              <AnimatedSection className="flex-1 min-w-0">
                <img
                  src={heroImage}
                  alt={service.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-xl shadow-md mb-8"
                />
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-medium">{service.description}</p>
                <div className="space-y-5">
                  {service.paragraphs.map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed text-sm sm:text-base">{p}</p>
                  ))}
                </div>
              </AnimatedSection>

              <aside className="w-full lg:w-[320px] xl:w-[360px] shrink-0 space-y-5">
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider mb-4">All Services</h3>
                  <div className="space-y-2">
                    {allServices.map((s) => (
                      <Link
                        key={s.id}
                        to={`/services/${s.slug}`}
                        className={`flex items-center justify-between px-4 py-3 rounded-md text-sm transition-colors ${
                          s.slug === slug
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/40 text-foreground hover:bg-primary hover:text-primary-foreground"
                        }`}
                      >
                        <span className="font-semibold">{s.title}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-secondary text-primary-foreground rounded-xl p-6">
                  <CheckCircle2 className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading font-extrabold text-lg mb-2">Ready to start?</h3>
                  <p className="text-primary-foreground/70 text-sm mb-5">Tell us about your project and get a quote within 24 hours.</p>
                  <Link to="/quote" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors w-full justify-center">
                    Get a Quote <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </Layout>
    </WithPageLoader>
  );
};

export default ServiceDetail;
