import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

const reasons = [
  "End-to-end project support",
  "Experienced engineering and construction team",
  "High-quality drawings and detailing",
  "Reliable scheduling and delivery",
  "Focus on safety and compliance",
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 md:py-28 bg-secondary relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-0 left-0 w-72 h-72 border border-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] border border-primary-foreground/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/15 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="A Partner You Can Build On"
          description="Five reasons clients choose Brandford for their most important projects."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex items-start gap-4 p-5 sm:p-6 bg-primary-foreground/[0.04] backdrop-blur-sm border border-primary-foreground/10 rounded-xl hover:border-primary/40 hover:bg-primary-foreground/[0.06] transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-md bg-primary/20 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <p className="text-primary-foreground font-heading font-bold text-sm sm:text-base leading-snug">
                  {reason}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
