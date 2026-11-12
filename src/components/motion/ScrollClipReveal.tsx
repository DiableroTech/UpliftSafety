import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useSectionEnterProgress } from "../../motion/scroll";

export default function ScrollClipReveal({
  children,
  className = "",
  innerClassName = "",
  from = "left",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  from?: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useSectionEnterProgress(ref);

  const clipClosed =
    from === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";
  const clipPath = useTransform(scrollYProgress, [0, 1], [clipClosed, "inset(0% 0% 0% 0%)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.4, 1, 1]);

  if (reduce) {
    return (
      <div className={className.trim() || undefined}>
        <div className={`h-full ${innerClassName}`.trim()}>{children}</div>
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className.trim() || undefined} style={{ clipPath, opacity }}>
      <div className={`h-full ${innerClassName}`.trim()}>{children}</div>
    </motion.div>
  );
}
