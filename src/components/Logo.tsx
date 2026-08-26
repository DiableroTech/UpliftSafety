export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 28" className="h-7 w-10" aria-hidden>
        <path d="M2 26 L14 4 L20 16" fill="none" stroke="#c8e000" strokeWidth="2.4" />
        <path d="M14 4 L20 16 L26 4 L38 26" fill="none" stroke="currentColor" strokeWidth="2.4" />
      </svg>
      <span className="font-display text-[15px] font-bold tracking-[0.14em] uppercase">
        Uplift Safety
      </span>
    </span>
  )
}
