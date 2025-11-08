"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className,
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`], {
    // Clamp values to prevent excessive calculations
    clamp: true,
  });

  return (
    <div ref={ref} className={className}>
      <motion.div 
        style={{ y, willChange: "transform" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
