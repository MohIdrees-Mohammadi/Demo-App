import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Mail, CalendarDays, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import footerEngineer from "@/assets/footer-engineer.jpg";
import logoSds2 from "@/assets/logo-sds2.png";
import logoTekla from "@/assets/logo-tekla.png";
import logoAutocad from "@/assets/logo-autocad.png";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

const newsFallback: Record<string, string> = {
  "structural-steel-take-off-services": news1,
  "steel-detailing-for-pedestrian-bridges": news2,
  "steel-detailing-change-orders": news3,
};

const FloatingPartnerBanner = () => (
  <div className="relative z-10 -mb-14 sm:-mb-16">
    <div className="container mx-auto px-4">
      <div
        className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] bg-primary rounded-xl py-6 sm:py-7 md:py-8 px-6 sm:px-10 md:px-16 flex items-center justify-between"
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
      >
        <div className="flex-1 flex items-center justify-center">
          <img src={logoSds2} alt="SDS2" className="h-16 sm:h-20 md:h-24 object-contain brightness-0 invert opacity-90" loading="lazy" width={512} height={512} />
        </div>
        <div className="w-px h-8 sm:h-9 bg-white/20 shrink-0 mx-2 sm:mx-4" />
        <div className="flex-1 flex items-center justify-center">
          <img src={logoTekla} alt="Tekla Structures" className="h-16 sm:h-20 md:h-24 object-contain brightness-0 invert opacity-90" loading="lazy" width={512} height={512} />
        </div>
        <div className="w-px h-8 sm:h-9 bg-white/20 shrink-0 mx-2 sm:mx-4" />
        <div className="flex-1 flex items-center justify-center">
          <img src={logoAutocad} alt="Autodesk AutoCAD" className="h-16 sm:h-20 md:h-24 object-contain brightness-0 invert opacity-90" loading="lazy" width={512} height={512} />
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => {
  const { data: recentPosts = [] } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <FloatingPartnerBanner />
      <footer className="bg-secondary pt-24 sm:pt-28 pb-10 sm:pb-14 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
            {/* Column 1: Logo + Description + Address */}
            <div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-primary-foreground mb-4">
                <span className="text-primary">A</span>cero
                <span className="text-primary">E</span>ngineering LLC
              </h3>
              <p className="text-xs sm:text-sm text-primary-foreground/50 leading-relaxed mb-6">
                AceroEngineering LLC is your one-stop destination as well as a service provider that serves its clients globally by providing all major types of steel detailing services, Estimation services and a lot more
              </p>
              <div className="space-y-2.5">
                <p className="flex items-start gap-2 text-xs sm:text-sm text-primary-foreground/50">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  4461 Alma Road, Mckinney TX, 75070
                </p>
                <p className="flex items-center gap-2 text-xs sm:text-sm text-primary-foreground/50">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  info@aceroengllc.com
                </p>
              </div>
            </div>

            {/* Column 2: Company Links */}
            <div>
              <h4 className="font-heading font-bold text-primary-foreground mb-4 text-base sm:text-lg">
                Company
              </h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {[
                  { label: "About", href: "/about" },
                  { label: "News", href: "/news" },
                  { label: "Services", href: "/services" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-xs sm:text-sm text-primary-foreground/50 hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-primary text-[10px]">//</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Recent Posts */}
            <div>
              <h4 className="font-heading font-bold text-primary-foreground mb-4 text-base sm:text-lg">
                Recent Post
              </h4>
              <ul className="space-y-4">
                {recentPosts.slice(0, 3).map((post) => {
                  const img = post.image_url || newsFallback[post.slug];
                  return (
                    <li key={post.id}>
                      <Link to={`/news/${post.slug}`} className="flex items-start gap-3 group">
                        <div className="w-16 h-14 shrink-0 overflow-hidden border border-primary-foreground/10">
                          {img ? (
                            <img
                              src={img}
                              alt={post.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/40" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="flex items-center gap-1 text-[10px] sm:text-xs text-primary mb-1 font-semibold uppercase tracking-wider">
                            <CalendarDays className="w-3 h-3" />
                            {post.date}
                          </p>
                          <p className="text-xs sm:text-sm text-primary-foreground/70 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 4: Image with overlay */}
            <div className="hidden lg:block">
              <div className="relative h-full min-h-[240px] overflow-hidden group">
                <img
                  src={footerEngineer}
                  alt="Engineer working on steel detailing"
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] uppercase tracking-[3px] text-primary font-semibold mb-2">
                    Get Started
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-primary-foreground font-heading font-bold text-sm hover:gap-3 transition-all"
                  >
                    Request a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-primary-foreground/10 mt-8 sm:mt-10 pt-4 sm:pt-6 flex items-center justify-between">
            <p className="text-[10px] sm:text-xs md:text-sm text-primary-foreground/30">
              © {new Date().getFullYear()} AceroEngineering LLC. All Rights Reserved.
            </p>
            <Link
              to="/admin"
              className="text-[10px] sm:text-xs text-primary-foreground/20 hover:text-primary-foreground/40 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
