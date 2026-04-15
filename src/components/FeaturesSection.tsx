import { Award, Clock, ShieldCheck, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const features = [
  {
    icon: Award,
    title: "Best Detailing",
    description:
      "We specialize in providing top-tier steel detailing services, including fabrication drawings and erection drawings.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "We are committed to providing exceptional service with a focus on timely delivery and high-quality work.",
  },
  {
    icon: ShieldCheck,
    title: "AISC Standards",
    description:
      "Our expert team has extensive experience in AISC steel detailing standards, providing top-notch service.",
  },
  {
    icon: DollarSign,
    title: "Within the Budget",
    description:
      "We provide steel detailing services that are high quality, reasonably priced, and dependable.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-12 sm:py-16 md:py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-40 sm:w-64 h-40 sm:h-64 border border-primary-foreground rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-60 sm:w-96 h-60 sm:h-96 border border-primary-foreground rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-[3px] text-primary-foreground/50 mb-2 sm:mb-3">
            AceroEngineering LLC
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
            Core Features
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-primary mx-auto mt-4 sm:mt-6" />
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="bg-navy-light/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 text-center group hover:bg-primary transition-all duration-500 border border-primary-foreground/5 hover:border-primary-foreground/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 md:mb-6 bg-primary/20 group-hover:bg-primary-foreground/20 rounded-full flex items-center justify-center transition-colors duration-500">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-lg font-heading font-bold text-primary-foreground mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-primary-foreground/60 leading-relaxed group-hover:text-primary-foreground/80 transition-colors duration-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
