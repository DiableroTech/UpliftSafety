import { motion, useReducedMotion } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";
import { REVEAL_FROM, type RevealFrom } from "../motion/uplift";

const revealInView = { once: true, amount: 0 } as const;
const narrowQuery = "(max-width: 1023px)";

function useNarrowViewport() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(narrowQuery);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(narrowQuery).matches,
    () => false,
  );
}

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
  const narrow = useNarrowViewport();
  const shown = { opacity: 1, x: 0, y: 0 };
  const hidden =
    narrow && from === "left"
      ? { opacity: 0, x: "-1.5rem" }
      : narrow && from === "right"
        ? { opacity: 0, x: "1.5rem" }
        : REVEAL_FROM[from];
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
        key={narrow ? "narrow" : "wide"}
        initial={hidden}
        whileInView={shown}
        viewport={revealInView}
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
      key={narrow ? "narrow" : "wide"}
      initial={hidden}
      whileInView={shown}
      viewport={revealInView}
      transition={transition}
      style={{ backfaceVisibility: "hidden" }}
    >
      {children}
    </motion.div>
  );
}
