import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg-new.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background with parallax-like zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
      >
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-secondary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary/30" />
      </motion.div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Accent line left */}
      <motion.div
        className="absolute left-8 sm:left-12 md:left-16 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-primary to-transparent hidden md:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      />

      {/* Main content - left aligned */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          <motion.div
            className="flex items-center gap-3 mb-6 md:mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="w-10 sm:w-14 h-px bg-primary" />
            <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[3px] sm:tracking-[5px] text-primary-foreground/80 font-semibold">
              AceroEngineering LLC
            </p>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-primary-foreground leading-[1.05] mb-5 md:mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Highest
            <br />
            Standards
            <br />
            <span className="text-[hsl(0,70%,65%)]">of Detailing</span>
          </motion.h1>

          <motion.p
            className="text-primary-foreground/50 text-sm sm:text-base md:text-lg max-w-lg mb-8 md:mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            Premier structural & miscellaneous steel detailing services across the United States & Canada
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-3.5 sm:px-8 sm:py-4 font-heading font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all"
            >
              Our Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 border border-primary-foreground/30 text-primary-foreground px-7 py-3.5 sm:px-8 sm:py-4 font-heading font-bold text-sm uppercase tracking-wider hover:bg-primary-foreground/10 transition-all"
            >
              Get A Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats bar at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
      >
        <div className="bg-primary/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
            <div className="flex flex-col items-center py-4 sm:py-5 gap-3 sm:gap-0 sm:flex-row sm:justify-between">
              <div className="flex items-center justify-center gap-8 sm:gap-10 md:gap-14 w-full sm:w-auto">
                {[
                  { number: "500+", label: "Projects" },
                  { number: "15+", label: "Years Exp." },
                  { number: "50+", label: "States" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <p className="text-primary-foreground font-heading font-bold text-xl sm:text-xl md:text-2xl leading-none">
                      {stat.number}
                    </p>
                    <p className="text-primary-foreground/70 text-[10px] sm:text-[10px] md:text-xs uppercase tracking-wider mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="border border-primary-foreground/40 text-primary-foreground px-6 py-2.5 text-xs font-heading font-bold uppercase tracking-wider hover:bg-primary-foreground/10 transition-all whitespace-nowrap"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
