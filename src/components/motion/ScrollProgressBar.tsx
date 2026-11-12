import type { RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePageScrollProgress, useSmoothedScrollProgress } from "../../motion/scroll";

export default function ScrollProgressBar({
  targetRef,
}: {
  targetRef: RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = usePageScrollProgress(targetRef);
  const scaleX = useSmoothedScrollProgress(scrollYProgress);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
