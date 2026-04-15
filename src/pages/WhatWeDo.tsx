import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { WithPageLoader } from "@/components/PageLoader";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import AnimatedSection from "@/components/AnimatedSection";
import { ChevronLeft, ChevronRight, Play, FileDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import sampleDrawing1 from "@/assets/sample-drawing-new-1.jpg";
import sampleDrawing2 from "@/assets/sample-drawing-new-2.jpg";
import sampleDrawing3 from "@/assets/sample-drawing-new-3.jpg";
import serviceStructural from "@/assets/service-structural.jpg";
import serviceMisc from "@/assets/service-misc.jpg";
import serviceConnection from "@/assets/service-connection.jpg";
import serviceTakeoff from "@/assets/service-takeoff.jpg";

const sampleDrawings = [
  { src: sampleDrawing1, label: "Structural Steel Shop Drawing" },
  { src: sampleDrawing2, label: "3D Tekla Model" },
  { src: sampleDrawing3, label: "Connection Detail Drawing" },
];

const fallbackImages: Record<string, string> = {
  "structural-steel-detailing": serviceStructural,
  "miscellaneous-steel-detailing": serviceMisc,
  "connection-design-pe-stamping": serviceConnection,
  "structural-steel-take-off-services": serviceTakeoff,
};

const WhatWeDo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: whatWeDoData } = useQuery({
    queryKey: ["what-we-do"],
    queryFn: async () => {
      const { data, error } = await supabase.from("what_we_do").select("*").eq("section_key", "main").single();
      if (error) throw error;
      return data;
    },
  });

  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const prev = () => setCurrentSlide((c) => (c === 0 ? sampleDrawings.length - 1 : c - 1));
  const next = () => setCurrentSlide((c) => (c === sampleDrawings.length - 1 ? 0 : c + 1));

  const subtitle = whatWeDoData?.subtitle || "Our Expertise";
  const title = whatWeDoData?.title || "Delivering Excellence in Steel Detailing";
  const description = whatWeDoData?.description || "";
  const videoUrl = whatWeDoData?.video_url || "https://www.youtube.com/embed/dQw4w9WgXcQ";
  const brochureUrl = whatWeDoData?.brochure_url || "#";

  return (
    <WithPageLoader>
      <Layout>
        <PageBanner title="What We Do" breadcrumb="What We Do" />

        {/* Intro + Video Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <p className="text-primary text-xs sm:text-sm font-semibold uppercase tracking-[3px] mb-3">
                // {subtitle}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                {title.includes("Steel Detailing") ? (
                  <>
                    {title.replace("Steel Detailing", "")}<span className="text-primary">Steel Detailing</span>
                  </>
                ) : (
                  title
                )}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {description}
              </p>
            </AnimatedSection>

            {/* Video */}
            <AnimatedSection className="max-w-5xl mx-auto">
              <div className="relative aspect-video bg-secondary rounded-sm overflow-hidden shadow-2xl group">
                <iframe
                  className="w-full h-full"
                  src={videoUrl}
                  title="Glimpse of Our Services"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </AnimatedSection>

            {/* CTA Cards */}
            <AnimatedSection className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto mt-8 md:mt-10">
              <a
                href="#"
                className="group flex items-center gap-4 bg-card border border-border p-5 sm:p-6 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 flex items-center justify-center shrink-0">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                    Glimpse of Our Services
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Watch our service overview video</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </a>
              <a
                href={brochureUrl}
                className="group flex items-center gap-4 bg-card border border-border p-5 sm:p-6 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 flex items-center justify-center shrink-0">
                  <FileDown className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                    AceroEngineering LLC Brochure
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Download our company brochure</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </a>
            </AnimatedSection>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-10 md:mb-14">
              <p className="text-primary text-xs sm:text-sm font-semibold uppercase tracking-[3px] mb-3">
                // Services
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground">
                What We <span className="text-primary">Offer</span>
              </h2>
              <div className="w-14 h-1 bg-primary mx-auto mt-5" />
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {services.map((service, i) => {
                const image = service.image_url || fallbackImages[service.slug] || serviceStructural;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className="group block bg-card border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={image}
                          alt={service.title}
                          loading="lazy"
                          className="w-full h-44 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
                      </div>
                      <div className="p-5">
                        <div className="w-8 h-0.5 bg-primary mb-3 group-hover:w-full transition-all duration-500" />
                        <h3 className="text-sm sm:text-base font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                          {service.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
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

        {/* Sample Drawings Carousel */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-10 md:mb-14">
              <p className="text-primary text-xs sm:text-sm font-semibold uppercase tracking-[3px] mb-3">
                // Portfolio
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground">
                Sample <span className="text-primary">Drawings</span>
              </h2>
              <div className="w-14 h-1 bg-primary mx-auto mt-5" />
            </AnimatedSection>

            <AnimatedSection className="max-w-5xl mx-auto relative">
              <div className="overflow-hidden shadow-2xl border border-border bg-card">
                <div className="relative">
                  <motion.img
                    key={currentSlide}
                    src={sampleDrawings[currentSlide].src}
                    alt={sampleDrawings[currentSlide].label}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    width={1024}
                    height={768}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary/80 to-transparent p-4 sm:p-6">
                    <p className="text-primary-foreground font-heading font-bold text-sm sm:text-base">
                      {sampleDrawings[currentSlide].label}
                    </p>
                    <p className="text-primary-foreground/60 text-xs">
                      {currentSlide + 1} / {sampleDrawings.length}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={prev}
                className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg"
                aria-label="Previous drawing"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg"
                aria-label="Next drawing"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex justify-center gap-2.5 mt-6">
                {sampleDrawings.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentSlide ? "bg-primary w-8" : "bg-muted-foreground/30 w-2"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-primary py-10 sm:py-14">
          <div className="container mx-auto px-4">
            <AnimatedSection className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary-foreground mb-2">
                  Ready to Start Your Project?
                </h2>
                <p className="text-primary-foreground/70 text-sm sm:text-base">
                  Get in touch with our team of experts for a free consultation.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary-foreground text-secondary px-8 py-3.5 font-heading font-bold text-sm uppercase tracking-wider hover:bg-primary-foreground/90 transition-colors shrink-0"
              >
                Get A Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </Layout>
    </WithPageLoader>
  );
};

export default WhatWeDo;
