export default function PageHero({
  kicker,
  title,
  image,
  children,
}: {
  kicker?: string;
  title: string;
  image: string;
  children: string;
}) {
  return (
    <section className="relative isolate min-h-[32svh] overflow-hidden sm:min-h-[40svh]">
      <img
        src={image}
        alt=""
        className="hero-reveal absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/35" />
      <div className="relative mx-auto flex min-h-[32svh] max-w-6xl flex-col justify-end px-5 pt-12 pb-10 sm:min-h-[40svh] sm:pt-16 sm:pb-12">
        {kicker ? (
          <p className="enter-slide font-display text-[11px] font-semibold tracking-[0.24em] text-hi uppercase">
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
        <p className={`enter-slide max-w-[65ch] text-base leading-relaxed text-paper/75 sm:text-lg ${kicker ? "d2 mt-4 sm:mt-5" : "d1 mt-4 sm:mt-5"}`}>
          {children}
        </p>
      </div>
    </section>
  );
}
