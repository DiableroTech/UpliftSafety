import { ArrowSquareOut, CaretDown } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export type DropLink = {
  to: string;
  label: string;
  end?: boolean;
  external?: boolean;
};

function linkClass(isActive: boolean) {
  return `relative font-display text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors ${
    isActive ? "text-blue" : "text-ink/80 hover:text-blue"
  }`;
}

export default function NavDropdown({
  label,
  to,
  active,
  items,
}: {
  label: string;
  to: string;
  active: boolean;
  items: DropLink[];
}) {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (!menu.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div
      ref={menu}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        viewTransition
        to={to}
        data-nav=""
        className={`${linkClass(active)} inline-flex items-center gap-1.5 whitespace-nowrap`}
        onClick={() => setOpen(false)}
      >
        {label}
        <CaretDown size={12} weight="bold" className="shrink-0 opacity-80" aria-hidden />
      </NavLink>
      <div
        role="menu"
        className={`absolute top-full left-0 z-[60] min-w-[17rem] border border-line bg-paper py-1 shadow-lg transition-opacity duration-200 ease-out ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {items.map((item) =>
          item.external ? (
            <a
              key={item.to}
              href={item.to}
              role="menuitem"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 font-display text-[11px] font-semibold tracking-[0.16em] text-ink/80 uppercase hover:bg-blue/5 hover:text-blue"
            >
              {item.label}
              <ArrowSquareOut
                size={13}
                weight="bold"
                className="shrink-0 opacity-70"
                aria-hidden
              />
            </a>
          ) : (
            <NavLink
              key={item.to}
              viewTransition
              to={item.to}
              role="menuitem"
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 font-display text-[11px] font-semibold tracking-[0.16em] uppercase ${
                  isActive
                    ? "bg-blue text-white"
                    : "text-ink/80 hover:bg-blue/5 hover:text-blue"
                }`
              }
            >
              {item.label}
            </NavLink>
          ),
        )}
      </div>
    </div>
  );
}

export { linkClass };
