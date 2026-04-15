import { useParams, Navigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";
import { WithPageLoader } from "@/components/PageLoader";
import { supabase } from "@/integrations/supabase/client";

import serviceStructuralHero from "@/assets/service-structural-hero.jpg";
import serviceMiscHero from "@/assets/service-misc-hero.jpg";
import serviceConnectionHero from "@/assets/service-connection-hero.jpg";
import serviceTakeoffHero from "@/assets/service-takeoff-hero.jpg";
import serviceStructuralInline1 from "@/assets/service-structural-inline1.jpg";
import serviceStructuralInline2 from "@/assets/service-structural-inline2.jpg";
import serviceMiscInline1 from "@/assets/service-misc-inline1.jpg";
import serviceMiscInline2 from "@/assets/service-misc-inline2.jpg";
import serviceConnectionInline1 from "@/assets/service-connection-inline1.jpg";
import serviceConnectionInline2 from "@/assets/service-connection-inline2.jpg";
import serviceTakeoffInline1 from "@/assets/service-takeoff-inline1.jpg";
import serviceTakeoffInline2 from "@/assets/service-takeoff-inline2.jpg";

const fallbackHeroImages: Record<string, string> = {
  "structural-steel-detailing": serviceStructuralHero,
  "miscellaneous-steel-detailing": serviceMiscHero,
  "connection-design-pe-stamping": serviceConnectionHero,
  "structural-steel-take-off-services": serviceTakeoffHero,
};

const fallbackInlineImages: Record<string, [string, string]> = {
  "structural-steel-detailing": [serviceStructuralInline1, serviceStructuralInline2],
  "miscellaneous-steel-detailing": [serviceMiscInline1, serviceMiscInline2],
  "connection-design-pe-stamping": [serviceConnectionInline1, serviceConnectionInline2],
  "structural-steel-take-off-services": [serviceTakeoffInline1, serviceTakeoffInline2],
};

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
      <WithPageLoader>
        <Layout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </Layout>
      </WithPageLoader>
    );
  }

  const heroImage = service.hero_image_url || fallbackHeroImages[service.slug] || serviceStructuralHero;
  const inlineImages = [
    service.inline_image1_url || fallbackInlineImages[service.slug]?.[0] || serviceStructuralInline1,
    service.inline_image2_url || fallbackInlineImages[service.slug]?.[1] || serviceStructuralInline2,
  ];
  const inlineInsertIndex = Math.min(2, service.paragraphs.length - 1);

  return (
    <WithPageLoader>
      <Layout>
        <PageBanner title={service.title} breadcrumb={service.title} parent={{ label: "Home", href: "/" }} />
        <section className="py-12 sm:py-16 md:py-24 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Main Content */}
              <AnimatedSection className="flex-1 min-w-0">
                <img
                  src={heroImage}
                  alt={service.title}
                  width={1024}
                  height={768}
                  className="w-full max-w-[800px] h-auto object-contain mb-8"
                />

                <div className="space-y-5">
                  {service.paragraphs.map((p, i) => (
                    <div key={i}>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{p}</p>
                      {i === inlineInsertIndex && (
                        <div className="grid grid-cols-2 gap-4 my-8">
                          <img
                            src={inlineImages[0]}
                            alt={`${service.title} detail 1`}
                            loading="lazy"
                            width={512}
                            height={512}
                            className="w-full h-auto object-contain"
                          />
                          <img
                            src={inlineImages[1]}
                            alt={`${service.title} detail 2`}
                            loading="lazy"
                            width={512}
                            height={512}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Sidebar */}
              <aside className="w-full lg:w-[320px] xl:w-[360px] shrink-0 space-y-6">
                <div className="space-y-3">
                  {allServices.map((s) => (
                    <Link
                      key={s.id}
                      to={`/services/${s.slug}`}
                      className={`flex items-center justify-between px-5 py-4 border transition-colors ${
                        s.slug === slug
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
                      }`}
                    >
                      <span className="font-medium text-sm">{s.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ))}
                </div>

                <div className="bg-muted p-6 sm:p-8">
                  <p className="text-primary text-sm font-medium mb-1">// subscribe</p>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-5">Get Newsletter</h3>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your E-mail..."
                      className="flex-1 px-4 py-3 bg-secondary text-secondary-foreground text-sm border-0 outline-none placeholder:text-muted-foreground"
                    />
                    <button className="px-5 py-3 bg-primary text-primary-foreground font-bold text-sm uppercase hover:bg-primary/90 transition-colors">
                      Submit
                    </button>
                  </div>
                  <label className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <input type="checkbox" defaultChecked className="accent-primary" />
                    List choice: AceroEngineering
                  </label>
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
