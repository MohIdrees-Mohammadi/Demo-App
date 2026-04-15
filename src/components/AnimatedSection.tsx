import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

const directionMap = {
  up: { y: 20, x: 0 },
  left: { x: -20, y: 0 },
  right: { x: 20, y: 0 },
};

const AnimatedSection = ({ children, className, delay = 0, direction = "up" }: AnimatedSectionProps) => {
  const offset = directionMap[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: Math.min(delay, 0.2), ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
