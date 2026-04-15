import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const images = Array.from(document.images);
    const total = images.length || 1;
    let loaded = 0;

    const checkComplete = () => {
      loaded++;
      setProgress(Math.round((loaded / total) * 100));
      if (loaded >= total) {
        setTimeout(onComplete, 400);
      }
    };

    if (images.length === 0) {
      setProgress(100);
      setTimeout(onComplete, 400);
      return;
    }

    images.forEach((img) => {
      if (img.complete) {
        checkComplete();
      } else {
        img.addEventListener("load", checkComplete);
        img.addEventListener("error", checkComplete);
      }
    });

    // Fallback timeout
    const fallback = setTimeout(() => {
      setProgress(100);
      onComplete();
    }, 6000);

    return () => clearTimeout(fallback);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-secondary"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Logo / Brand */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground tracking-wider">
          ACERO<span className="text-primary">ENGINEERING</span>
        </h1>
        <p className="text-primary-foreground/40 text-xs tracking-[4px] uppercase mt-1">
          Steel Detailing
        </p>
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 md:w-64 h-[2px] bg-primary-foreground/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <motion.span
        className="mt-3 text-primary-foreground/30 text-[10px] tracking-[3px] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading
      </motion.span>
    </motion.div>
  );
};

const WithPageLoader = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <PageLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export { PageLoader, WithPageLoader };
