import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export type DropLink = {
  to: string;
  label: string;
  end?: boolean;
};

function linkClass(isActive: boolean) {
  return `relative font-display text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors ${
    isActive ? "text-hi" : "text-paper/70 hover:text-paper"
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
        to={to}
        className={linkClass(active)}
        onClick={() => setOpen(false)}
      >
        {label}
        <span className="ml-1 inline-block text-[9px]" aria-hidden>
          ▾
        </span>
        {active && (
          <span className="absolute -bottom-1 left-0 h-px w-full bg-hi" />
        )}
      </NavLink>
      <div
        role="menu"
        className={`absolute top-full left-0 z-[60] min-w-[13.5rem] border border-line bg-ink py-1 shadow-xl ${
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            role="menuitem"
            end={item.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 font-display text-[11px] font-semibold tracking-[0.16em] uppercase ${
                isActive
                  ? "bg-ink-2 text-hi"
                  : "text-paper/70 hover:bg-ink-2 hover:text-paper"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export { linkClass };
