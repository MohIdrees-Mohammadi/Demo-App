import { CheckCircle2, Compass, Users, ShieldCheck, ArrowUpRight, HardHat, PencilRuler, FileText } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import aboutImg from "@/assets/brandford-about.jpg";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const ICONS = [Users, ShieldCheck, Compass, CheckCircle2];

const DEFAULT_BADGES = [
  { label: "Experienced Team" },
  { label: "Safety First" },
  { label: "Clear Communication" },
  { label: "Quality Guarantee" },
];

const DEFAULT_WWD = [
  { label: "Construction services" },
  { label: "Engineering design and drafting" },
  { label: "Shop drawings and detailing" },
];

const AboutSection = () => {
  const { get, getJSON } = useSiteContent();
  const image = get("home.about.image", aboutImg);
  const badges = getJSON<{ label: string }[]>("home.about.badges", DEFAULT_BADGES);
  const wwd = getJSON<{ label: string }[]>("home.whatwedo.items", DEFAULT_WWD);

  return (
    <>
      {/* Who We Are */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection direction="left">
              <img
                src={image}
                alt="Brandford construction project manager on site"
                className="w-full h-auto rounded-lg shadow-xl"
                loading="lazy"
                width={1280}
                height={896}
              />
            </AnimatedSection>

            <AnimatedSection direction="right">
              <p className="section-eyebrow mb-4">{get("home.about.eyebrow", "Who We Are")}</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-6 leading-tight uppercase">
                {get("home.about.title", "Building with purpose, delivering with precision")}
              </h2>
              <div className="border-l-4 border-primary pl-5 mb-8 space-y-4">
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {get(
                    "home.about.paragraph1",
                    "We are a multidisciplinary construction and engineering firm committed to turning complex challenges into practical, high quality solutions. Our team brings together builders, engineers, and technical specialists who collaborate closely with clients from concept through completion."
                  )}
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {get(
                    "home.about.paragraph2",
                    "With a focus on efficiency, accuracy, and long term performance, we deliver work that stands up to real world demands — whether it's ground up construction, structural engineering, or detailed material and drafting support."
                  )}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {(badges || DEFAULT_BADGES).map((b, i) => {
                  const Icon = ICONS[i % ICONS.length];
                  return (
                    <div key={`${b.label}-${i}`} className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                      <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">{b.label}</p>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24 bg-muted/40 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <p className="section-eyebrow mb-4 justify-center">{get("home.approach.eyebrow", "Our Approach")}</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-6 leading-tight uppercase">
                {get("home.approach.title", "Clear communication. Careful planning.")}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {get(
                  "home.approach.description",
                  "We believe in clear communication, careful planning, and delivering work that meets both technical and project requirements. Every Brandford project is built on the same disciplined approach — from the first call to final close-out."
                )}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <p className="section-eyebrow mb-4 justify-center">{get("home.whatwedo.eyebrow", "What We Do")}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-foreground leading-tight uppercase">
              {get("home.whatwedo.title", "Capabilities that cover every stage")}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {(wwd || DEFAULT_WWD).map((item, i) => {
              const WwdIcons = [HardHat, PencilRuler, FileText, Compass];
              const Icon = WwdIcons[i % WwdIcons.length];
              const title = item.label.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
              return (
                <AnimatedSection key={`${item.label}-${i}`} delay={i * 0.08}>
                  <div className="group relative bg-card border border-border rounded-xl p-7 h-full overflow-hidden hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* number watermark */}
                    <span className="absolute -top-4 -right-2 font-heading font-extrabold text-[88px] leading-none text-primary/5 group-hover:text-primary/10 transition-colors select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="relative flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-6 h-6" strokeWidth={2} />
                      </div>
                      <span className="text-[11px] font-heading font-bold tracking-[2px] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")} / {String((wwd || DEFAULT_WWD).length).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="relative font-heading font-bold text-foreground text-lg leading-snug mb-4 uppercase">
                      {title}
                    </h3>

                    <div className="relative h-px w-10 bg-primary mb-4 group-hover:w-full transition-all duration-500" />

                    <div className="relative flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                      Learn More <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 md:py-24 bg-secondary overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute -top-32 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <p className="inline-flex items-center gap-3 text-xs uppercase tracking-[4px] text-primary font-bold mb-4 justify-center">
                <span className="w-8 h-px bg-primary" />
                {get("home.commitment.eyebrow", "Our Commitment")}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-primary-foreground leading-tight mb-6 uppercase">
                {get("home.commitment.title", "Quality, safety, and complete delivery")}
              </h2>
              <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed mb-8">
                {get(
                  "home.commitment.description",
                  "We are committed to quality, safety, and delivering projects that meet client expectations from start to finish."
                )}
              </p>
              <Link
                to={get("home.commitment.cta_link", "/quote")}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-heading font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
              >
                {get("home.commitment.cta_label", "Start Your Project")}
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
