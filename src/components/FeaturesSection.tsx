import { Award, Clock, ShieldCheck, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const features = [
  {
    icon: Award,
    title: "Best Detailing",
    description:
      "Top-tier steel detailing services, including fabrication and erection drawings.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "Exceptional service with a focus on timely delivery and high-quality work.",
  },
  {
    icon: ShieldCheck,
    title: "AISC Standards",
    description:
      "Extensive experience in AISC steel detailing standards, top-notch service.",
  },
  {
    icon: DollarSign,
    title: "Within Budget",
    description:
      "Steel detailing services that are high quality, reasonably priced, dependable.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 md:py-28 bg-secondary relative overflow-hidden"
    >
      {/* Decorative grid + ornaments */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-0 left-0 w-72 h-72 border border-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] border border-primary-foreground/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built On Precision & Trust"
          description="Four pillars that define every project we deliver — the foundation of our reputation."
          light
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-5 sm:p-7 md:p-8 text-center bg-navy-light/30 backdrop-blur-sm border border-primary-foreground/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Hover background sweep */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent transition-all duration-500" />
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 bg-primary/15 group-hover:bg-primary flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-heading font-bold text-primary-foreground mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-primary-foreground/55 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mx-auto mt-5 h-px w-8 bg-primary/40 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
