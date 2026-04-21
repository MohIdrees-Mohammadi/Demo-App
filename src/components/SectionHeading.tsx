import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) => {
  const isCenter = align === "center";
  return (
    <div
      className={`mb-10 sm:mb-14 md:mb-16 ${isCenter ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}
    >
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className={`inline-flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[4px] font-semibold mb-4 ${
            light ? "text-primary-foreground/70" : "text-primary"
          }`}
        >
          <span className="block w-8 h-px bg-primary" />
          {eyebrow}
          <span className="block w-8 h-px bg-primary" />
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className={`font-heading font-bold tracking-tight leading-[1.1] text-balance text-3xl sm:text-4xl md:text-5xl ${
          light ? "text-primary-foreground" : "text-secondary"
        }`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed ${
            light ? "text-primary-foreground/65" : "text-muted-foreground"
          }`}
        >
          {description}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`h-[3px] w-16 bg-primary mt-6 origin-left ${isCenter ? "mx-auto" : ""}`}
      />
    </div>
  );
};

export default SectionHeading;
