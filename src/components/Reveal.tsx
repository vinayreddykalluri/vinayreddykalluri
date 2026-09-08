"use client";

import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  // Keep motion lightweight by animating only major page sections.
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    // Animates position only — never opacity. Fading in from 0 means the page
    // is blank until an IntersectionObserver fires and the animation finishes,
    // so a throttled rAF (background tab, hidden window, slow device) leaves
    // content stuck half-transparent. Text stays readable in the first frame.
    <motion.div
      className={className}
      initial={{ y: 14 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, margin: "-80px 0px" }}
    >
      {children}
    </motion.div>
  );
}
