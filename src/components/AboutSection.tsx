import { CheckCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import aboutEngineerImg from "@/assets/about-engineer.jpg";
import aboutSteelImg from "@/assets/about-steel-structure.jpg";
import { Link } from "react-router-dom";

const services = [
  "Estimodeling / Estimation",
  "Shop drawings and erection drawings",
  "Procurement reports like ABM, Shop bolt summary, field bolt summary",
  "Production reports like CNC, KISS and DXF and other reports as per fabricator request",
  "Detailing work within the guidelines set by AISC, NISD, OSHA",
];

const AboutSection = () => {
  return (
    <>
      {/* Committed to Excellence Section */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection direction="left">
              <img
                src={aboutEngineerImg}
                alt="Engineer working on steel detailing CAD software"
                className="w-full h-auto rounded shadow-lg"
                loading="lazy"
                width={768}
                height={512}
              />
            </AnimatedSection>

            <AnimatedSection direction="right">
              <p className="text-primary font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-primary inline-block" />
                Great Experience In Steel Detailing
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                We Are Committed to Excellence
              </h2>
              <div className="border-l-4 border-primary pl-5 mb-8">
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  AceroEngineering LLC is committed to providing customised solutions
                  for our clients, ensuring complete satisfaction in the most efficient and
                  cost effective manner. We do this by utilising our unique project work-flow
                  and highly experienced team. Our mission is to provide a design
                  and detail drafting service that is second to none.
                </p>
              </div>

              <div className="mb-6">
                <span className="inline-block bg-secondary text-primary-foreground text-xs sm:text-sm font-semibold px-5 py-2 rounded-full">
                  We Provide
                </span>
              </div>

              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="flex items-start gap-2 text-muted-foreground text-sm sm:text-base">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Bar */}
      <section className="bg-primary py-10 md:py-14 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-2">
              Looking for Steel Detailing Services?
            </h3>
            <p className="text-primary-foreground/70 text-sm sm:text-base">
              We can do Steel detailing Services at best prices available in the market.
            </p>
          </div>
          <Link
            to="/contact"
            className="border-2 border-primary-foreground text-primary-foreground px-8 py-3 text-sm font-semibold hover:bg-primary-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            Get A Quote →
          </Link>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 leading-tight italic">
                Vision &amp; Mission
              </h2>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary mt-1 shrink-0" />
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
                  Acero has a vision to give quality detailing services to fabricator in structural and
                  miscellaneous detailing. Our experienced resources generate erection drawings
                  and shop drawings using 3D software SDS/2.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="relative min-h-[350px] rounded shadow-lg overflow-hidden">
                <img
                  src={aboutSteelImg}
                  alt="Steel structure connections"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  width={768}
                  height={512}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

    </>
  );
};

export default AboutSection;
