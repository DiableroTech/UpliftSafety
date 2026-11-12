export const UPLIFT_EASE = [0.215, 0.61, 0.355, 1] as const;

export const REVEAL_FROM = {
  left: { opacity: 0, x: "-100%" },
  right: { opacity: 0, x: "100%" },
  bottom: { opacity: 0, y: "3.75rem" },
  fade: { opacity: 0 },
} as const;

export type RevealFrom = keyof typeof REVEAL_FROM;

export const revealViewport = { once: true, amount: 0.12 as number };

export const logoGridViewport = { once: true, amount: 0.22 as number };

/** Fires when ~half of the observed element intersects the viewport */
export const revealViewportHalf = { once: true, amount: 0.5 as number };

export type RevealViewportOptions = {
  once?: boolean;
  amount?: number | "some" | "all";
  margin?: string;
};

export const servicesChoreoViewport = { once: true, amount: 0.08 as number };

export const categoryLightRootVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0 },
  },
};

export const categoryLightIntroVariants = {
  hidden: REVEAL_FROM.bottom,
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.85, ease: UPLIFT_EASE },
  },
};

export const gridStaggerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.3, delayChildren: 0.3 },
  },
};

export const gridItemRevealVariants = {
  hidden: REVEAL_FROM.left,
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.85, ease: UPLIFT_EASE },
  },
};

const choreoSlide = (delaySeconds: number) => ({
  hidden: { opacity: 0, x: "-100%" as const },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: UPLIFT_EASE, delay: delaySeconds },
  },
});

export const choreoPhotoFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.6, ease: "easeInOut" as const } },
};

export const choreoScrimSlide = choreoSlide(0);
export const choreoTitleSlide = choreoSlide(0.3);
export const choreoBodySlide = choreoSlide(0.5);
