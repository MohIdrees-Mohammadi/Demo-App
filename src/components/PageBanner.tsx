import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageBannerProps {
  title: string;
  breadcrumb: string;
  parent?: { label: string; href: string };
}

const PageBanner = ({ title, breadcrumb, parent }: PageBannerProps) => {
  return (
    <section className="bg-secondary pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 border border-primary-foreground rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-28 sm:w-40 h-28 sm:h-40 border border-primary-foreground rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.div
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-primary-foreground/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          {parent && (
            <>
              <Link to={parent.href} className="hover:text-primary transition-colors">{parent.label}</Link>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </>
          )}
          <span className="text-primary">{breadcrumb}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default PageBanner;
