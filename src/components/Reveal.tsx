import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { REVEAL_FROM, type RevealFrom, revealViewport } from "../motion/uplift";

export default function Reveal({
  children,
  from = "left",
  delay = 0,
  duration = 850,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  from?: RevealFrom;
  delay?: number;
  duration?: number;
  className?: string;
  innerClassName?: string;
}) {
  const reduce = useReducedMotion();
  const shown = { opacity: 1, x: 0, y: 0 };
  const transition = {
    duration: duration / 1000,
    ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    delay: delay / 1000,
  };

  if (reduce) {
    return (
      <div className={className.trim() || undefined}>
        <div className={`h-full ${innerClassName}`.trim()}>{children}</div>
      </div>
    );
  }

  if (innerClassName) {
    return (
      <motion.div
        className={className.trim() || undefined}
        initial={REVEAL_FROM[from]}
        whileInView={shown}
        viewport={revealViewport}
        transition={transition}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className={`h-full ${innerClassName}`.trim()}>{children}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className.trim() || undefined}
      initial={REVEAL_FROM[from]}
      whileInView={shown}
      viewport={revealViewport}
      transition={transition}
      style={{ backfaceVisibility: "hidden" }}
    >
      {children}
    </motion.div>
  );
}
