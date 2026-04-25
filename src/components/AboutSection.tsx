import { CheckCircle2, Compass, Users, ShieldCheck } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import aboutImg from "@/assets/brandford-about.jpg";
import { Link } from "react-router-dom";

const whatWeDoItems = [
  "Construction services",
  "Engineering design and drafting",
  "Shop drawings and detailing",
  "Material sourcing and supply",
];

const AboutSection = () => {
  return (
    <>
      {/* Who We Are */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection direction="left">
              <img
                src={aboutImg}
                alt="Brandford construction project manager on site"
                className="w-full h-auto rounded-lg shadow-xl"
                loading="lazy"
                width={1280}
                height={896}
              />
            </AnimatedSection>

            <AnimatedSection direction="right">
              <p className="section-eyebrow mb-4">Who We Are</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-6 leading-tight">
                Building with purpose, <span className="text-primary">delivering with precision</span>
              </h2>
              <div className="border-l-4 border-primary pl-5 mb-8">
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  We are a multidisciplinary company providing construction, engineering, and material solutions. Our team works closely with clients to deliver practical, efficient, and high-quality results.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Users, label: "Experienced Team" },
                  { icon: ShieldCheck, label: "Safety First" },
                  { icon: Compass, label: "Clear Communication" },
                  { icon: CheckCircle2, label: "Quality Guarantee" },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                    <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{b.label}</p>
                  </div>
                ))}
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
              <p className="section-eyebrow mb-4 justify-center">Our Approach</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-6 leading-tight">
                Clear communication. <span className="text-primary">Careful planning.</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                We believe in clear communication, careful planning, and delivering work that meets both technical and project requirements. Every Brandford project is built on the same disciplined approach — from the first call to final close-out.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <p className="section-eyebrow mb-4 justify-center">What We Do</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-foreground leading-tight">
              Capabilities that <span className="text-primary">cover every stage</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {whatWeDoItems.map((item, i) => (
              <AnimatedSection key={item} delay={i * 0.08}>
                <div className="bg-card border border-border rounded-xl p-6 h-full flex items-start gap-3 hover:border-primary/40 hover:shadow-lg transition-all">
                  <div className="w-9 h-9 shrink-0 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-sm">
                    0{i + 1}
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-snug pt-1.5">{item}</p>
                </div>
              </AnimatedSection>
            ))}
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
                Our Commitment
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-primary-foreground leading-tight mb-6">
                Quality, safety, and <span className="text-primary">complete delivery</span>
              </h2>
              <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed mb-8">
                We are committed to quality, safety, and delivering projects that meet client expectations from start to finish.
              </p>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-heading font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
              >
                Start Your Project
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
