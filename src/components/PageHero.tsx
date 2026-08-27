export default function PageHero({
  kicker,
  title,
  image,
  children,
}: {
  kicker: string;
  title: string;
  image: string;
  children: string;
}) {
  return (
    <section className="relative isolate min-h-[36svh] overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/35" />
      <div className="relative mx-auto flex min-h-[36svh] max-w-6xl flex-col justify-end px-5 pb-12 pt-24">
        <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-hi uppercase">
          {kicker}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">
          {children}
        </p>
      </div>
    </section>
  );
}
