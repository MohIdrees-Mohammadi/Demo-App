import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const testimonials = [
  {
    name: "Williams",
    location: "Texas, USA",
    role: "Project Manager",
    text: "AceroEngineering LLC delivered exceptional steel detailing services for us at a great price. Their attention to detail set them apart.",
  },
  {
    name: "Liam",
    location: "Ohio, USA",
    role: "Fabricator",
    text: "I am really impressed with your work and you can expect good projects in the near future. Reliable, accurate, and consistently on time.",
  },
  {
    name: "Alexander",
    location: "California, USA",
    role: "Structural Engineer",
    text: "I appreciate your command on the project and your dedication to complete the work on time. A truly professional team.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-muted overflow-hidden relative">
      {/* Decorative quote watermark */}
      <Quote
        className="absolute top-12 right-8 md:right-20 w-40 h-40 md:w-64 md:h-64 text-primary/[0.04] -scale-x-100"
        aria-hidden
      />

      <div className="container mx-auto px-4 relative">
        <SectionHeading
          eyebrow="Testimonials"
          title={<>What Our <span className="text-primary italic">Clients</span> Say</>}
          description="Trusted by fabricators, engineers, and project managers across the United States and Canada."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative bg-card p-7 md:p-8 border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1.5 hover:border-primary/30 transition-all duration-500 flex flex-col"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

              {/* Quote icon badge */}
              <div className="absolute -top-5 right-7 w-11 h-11 bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                <Quote className="w-5 h-5" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic mb-7 flex-1">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 pt-5 border-t border-border">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-lg font-heading shrink-0 shadow-md">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-secondary font-heading text-base leading-none">
                    {t.name}
                  </h4>
                  <p className="text-xs text-primary mt-1.5 font-semibold uppercase tracking-wider">
                    {t.role}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t.location}</p>
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
