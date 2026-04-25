import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/brandford-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
      >
        <img
          src={heroBg}
          alt="Construction site at sunset with cranes and steel framework"
          className="w-full h-full object-cover"
          width={1920}
          height={1088}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary/30" />
      </motion.div>

      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-16 lg:px-20 pt-24 pb-32">
        <div className="max-w-3xl">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-px bg-primary" />
            <p className="text-[10px] sm:text-xs uppercase tracking-[4px] text-primary font-bold">
              Brandford Construction
            </p>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-primary-foreground leading-[1.05] tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Construction,
            <br />
            Engineering &
            <br />
            <span className="text-primary">Material Solutions</span>
          </motion.h1>

          <motion.p
            className="text-primary-foreground/70 text-sm sm:text-base md:text-lg max-w-xl mb-9 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            From design and detailing to supply and construction, we deliver complete solutions that keep your projects moving forward.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link
              to="/quote"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-3.5 sm:px-8 sm:py-4 rounded-md font-heading font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 border border-primary-foreground/40 text-primary-foreground px-7 py-3.5 sm:px-8 sm:py-4 rounded-md font-heading font-bold text-sm uppercase tracking-wider hover:bg-primary-foreground/10 transition-all"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
      >
        <div className="bg-primary/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-20">
            <div className="flex flex-col items-center py-4 gap-3 sm:gap-0 sm:flex-row sm:justify-between">
              <div className="flex items-center justify-center gap-8 sm:gap-12 w-full sm:w-auto">
                {[
                  { number: "500+", label: "Projects" },
                  { number: "15+", label: "Years Exp." },
                  { number: "100%", label: "On-Time" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <p className="text-primary-foreground font-heading font-extrabold text-xl md:text-2xl leading-none">
                      {stat.number}
                    </p>
                    <p className="text-primary-foreground/75 text-[10px] md:text-xs uppercase tracking-wider mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="border border-primary-foreground/40 text-primary-foreground px-6 py-2.5 rounded-md text-xs font-heading font-bold uppercase tracking-wider hover:bg-primary-foreground/10 transition-all whitespace-nowrap"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
