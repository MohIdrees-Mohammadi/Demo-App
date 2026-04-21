import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import heroBg from "@/assets/hero-bg-new.jpg";

interface PageBannerProps {
  title: string;
  breadcrumb: string;
  parent?: { label: string; href: string };
}

const PageBanner = ({ title, breadcrumb, parent }: PageBannerProps) => {
  return (
    <section className="relative bg-secondary pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Background image with strong overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/70" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-72 h-72 border border-primary-foreground/5 rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-44 h-44 border border-primary-foreground/5 rounded-full -translate-x-1/3 translate-y-1/3" />

      {/* Vertical accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary origin-top"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[4px] text-primary font-semibold mb-4"
        >
          <span className="block w-8 h-px bg-primary" />
          AceroEngineering LLC
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground tracking-tight leading-[1.05] text-balance mb-5 max-w-3xl"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-2 text-xs sm:text-sm text-primary-foreground/60 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 px-4 py-2.5 inline-flex w-fit"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          {parent && (
            <>
              <Link to={parent.href} className="hover:text-primary transition-colors">
                {parent.label}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </>
          )}
          <span className="text-primary font-semibold">{breadcrumb}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default PageBanner;
