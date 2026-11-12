import type { RefObject } from "react";
import {
  useScroll,
  useSpring,
  type MotionValue,
} from "motion/react";

/** Element travel through the viewport — parallax, section scrubbing */
export const sectionInViewportOffset: ["start end", "end start"] = ["start end", "end start"];

/** Editorial reveal while the block enters — matches motion.dev scroll image reveal */
export const sectionEnterOffset: ["start end", "center center"] = ["start end", "center center"];

/** Whole page — reading progress */
export const pageScrollOffset: ["start start", "end end"] = ["start start", "end end"];

export function useSectionInViewportProgress(target: RefObject<HTMLElement | null>) {
  return useScroll({
    target,
    offset: sectionInViewportOffset,
  });
}

export function useSectionEnterProgress(target: RefObject<HTMLElement | null>) {
  return useScroll({
    target,
    offset: sectionEnterOffset,
  });
}

export function usePageScrollProgress(target: RefObject<HTMLElement | null>) {
  return useScroll({
    target,
    offset: pageScrollOffset,
  });
}

export function useSmoothedScrollProgress(scrollYProgress: MotionValue<number>) {
  return useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
}
