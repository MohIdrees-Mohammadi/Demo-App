import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    name: "Williams",
    location: "USA",
    text: "AceroEngineering LLC delivered exceptional steel detailing services for us at a great price.",
  },
  {
    name: "Liam",
    location: "USA",
    text: "I am really impressed with your work and you can expect good projects in the near future.",
  },
  {
    name: "Alexander",
    location: "USA",
    text: "I appreciate your command on the project and your dedication to complete the work on time.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
          <p className="section-subtitle mb-2 sm:mb-3 text-xs sm:text-sm">Testimonials</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Client Feedback</h2>
          <div className="w-12 sm:w-16 h-1 bg-primary mx-auto mt-4 sm:mt-6" />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-card p-5 sm:p-6 md:p-8 relative border border-border shadow-sm hover:shadow-xl transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary/20 mb-3 sm:mb-4" />
              <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed italic text-xs sm:text-sm md:text-base">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm sm:text-lg font-heading shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-secondary font-heading text-sm sm:text-base">{t.name}</h4>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
