"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  showAfter?: number;
  className?: string;
}

export function FloatingActionButton({
  showAfter = 300,
  className,
}: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn("fixed bottom-8 right-8 z-50", className)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={scrollToTop}
              size="lg"
              className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-tertiary hover:from-brand-secondary hover:via-brand-tertiary hover:to-brand-primary text-brand-neutral-white shadow-2xl hover:shadow-brand-primary/25 transition-all duration-300 border-0 backdrop-blur-sm"
            >
              <ArrowUp className="h-6 w-6" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
