import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="inline-flex items-center gap-3 text-xs uppercase tracking-[4px] text-primary font-bold mb-5 justify-center">
            <span className="w-8 h-px bg-primary" />
            Call to Action
            <span className="w-8 h-px bg-primary" />
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-primary-foreground leading-[1.1] mb-6">
            Have a project in mind?
            <br />
            <span className="text-primary">We'll help you get started.</span>
          </h2>
          <p className="text-primary-foreground/65 text-base md:text-lg max-w-2xl mx-auto mb-9">
            Send us your plans and we'll respond with a detailed quote and a clear path forward.
          </p>
          <Link
            to="/quote"
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-9 py-4 rounded-md font-heading font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all shadow-xl shadow-primary/30"
          >
            Get a Quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
