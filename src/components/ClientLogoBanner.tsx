import { motion, useReducedMotion } from "motion/react";
import { clientLogos } from "../data/clientLogos";
import { useReveal } from "../hooks/useReveal";
import { UPLIFT_EASE, logoGridViewport } from "../motion/uplift";

const logoGridStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const logoCellEnter = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: UPLIFT_EASE },
  },
};

const gridClass =
  "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5";

function LogoCell({ name, src }: { name: string; src: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <li className="relative aspect-[5/3] overflow-hidden border border-line/80 bg-paper">
        <div className="flex h-full w-full items-center justify-center p-4 sm:p-5">
          <img
            src={src}
            alt=""
            className="max-h-full max-w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className="sr-only">{name}</span>
      </li>
    );
  }

  return (
    <motion.li
      variants={logoCellEnter}
      className="relative aspect-[5/3] overflow-hidden border border-line/80 bg-paper"
    >
      <div className="flex h-full w-full items-center justify-center p-4 sm:p-5">
        <img
          src={src}
          alt=""
          className="max-h-full max-w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center bg-black/78 px-3 text-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <span className="font-display text-[11px] font-bold tracking-[0.14em] text-white uppercase sm:text-xs">
          {name}
        </span>
      </motion.div>
      <span className="sr-only">{name}</span>
    </motion.li>
  );
}

export default function ClientLogoBanner() {
  const reduce = useReducedMotion();
  const { revealTarget, shown } = useReveal<HTMLElement>(0.85);

  return (
    <section
      aria-labelledby="client-logo-heading"
      className={`client-logo-section bg-paper px-5 py-14 sm:py-20 ${shown ? "is-shown" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <header ref={revealTarget} className="max-w-[65ch]">
          <h2
            id="client-logo-heading"
            className="project-cta-heading font-display text-2xl font-bold tracking-tight sm:text-4xl"
          >
            Trusted partners
          </h2>
          <p className="project-cta-intro mt-4 text-lg leading-relaxed text-mute">
            Organizations across Western Canada trust Uplift Safety for practical health, safety, and
            hygiene support.
          </p>
        </header>
        {reduce ? (
          <ul className={gridClass}>
            {clientLogos.map((logo) => (
              <LogoCell key={logo.id} name={logo.name} src={logo.src} />
            ))}
          </ul>
        ) : (
          <motion.ul
            className={gridClass}
            initial="hidden"
            whileInView="show"
            viewport={logoGridViewport}
            variants={logoGridStagger}
          >
            {clientLogos.map((logo) => (
              <LogoCell key={logo.id} name={logo.name} src={logo.src} />
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
