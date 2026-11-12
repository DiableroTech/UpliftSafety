import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function PageHero({
  kicker,
  title,
  image,
  imagePosition = "center",
  roomy = false,
  crop = "cover",
  backHref,
  scrim = "from-blue via-blue/80 to-blue/30",
  children,
}: {
  kicker?: string;
  title: string;
  image: string;
  imagePosition?: string;
  roomy?: boolean;
  crop?: "cover" | "half";
  backHref?: string;
  scrim?: string;
  children: string;
}) {
  const height =
    crop === "half"
      ? "h-[36svh] sm:h-[46svh]"
      : roomy
        ? "min-h-[36svh] sm:min-h-[46svh]"
        : "min-h-[32svh] sm:min-h-[40svh]";

  return (
    <section className={`relative isolate overflow-hidden ${crop === "half" ? "bg-blue" : ""} ${height}`}>
      {crop === "half" ? (
        <img
          src={image}
          alt=""
          className="absolute top-[-50%] right-0 h-[200%] w-auto max-w-none"
        />
      ) : (
        <img
          src={image}
          alt=""
          style={{ objectPosition: imagePosition }}
          className="hero-reveal absolute inset-0 h-full w-full object-cover"
        />
      )}
      {crop === "half" ? (
        <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-blue via-blue/75 to-transparent" />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-r ${scrim}`} />
      )}
      {backHref ? (
        <Link
          viewTransition
          to={backHref}
          aria-label="Back to projects"
          className="absolute top-4 left-4 z-10 flex h-11 w-11 items-center justify-center text-white hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:top-1/2 xl:left-5 xl:-translate-y-1/2"
        >
          <ArrowLeft size={22} weight="bold" aria-hidden />
        </Link>
      ) : null}
      <div className={`relative mx-auto flex max-w-6xl flex-col justify-end px-5 pb-10 text-white sm:pb-12 ${height} ${backHref ? "pt-20 xl:pt-16" : "pt-12 sm:pt-16"}`}>
        {kicker ? (
          <p className="enter-slide font-display text-[11px] font-semibold tracking-[0.24em] text-accent uppercase">
            {kicker}
          </p>
        ) : null}
        <h1
          className={`enter-slide max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl ${
            kicker ? "d1 mt-3 sm:mt-4" : ""
          }`}
        >
          {title}
        </h1>
        <p className={`enter-slide max-w-[65ch] text-base leading-relaxed text-white/80 sm:text-lg ${kicker ? "d2 mt-4 sm:mt-5" : "d1 mt-4 sm:mt-5"}`}>
          {children}
        </p>
      </div>
    </section>
  );
}
