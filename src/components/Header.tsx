import { ArrowSquareOut, List, X } from "@phosphor-icons/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import NavDropdown, { linkClass, type DropLink } from "./NavDropdown";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const serviceItems: DropLink[] = [
  { to: "/services", label: "Safety services", end: true },
  { to: "/services/hygiene", label: "Hygiene services" },
];

const trainingItems: DropLink[] = [
  { to: "/training", label: "Safety Training", end: true },
  { to: "/training/equipment", label: "Mobile Equipment Training" },
  {
    to: "https://www.bissafety.app/v1/index.cfm?action=classroom.home&company=2818",
    label: "Training Calendar",
    external: true,
  },
];

function mobileLinkClass(isActive: boolean) {
  return `block py-3 font-display text-sm font-semibold tracking-[0.16em] uppercase ${
    isActive ? "text-blue" : "text-ink"
  }`;
}

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [bar, setBar] = useState({ left: 0, width: 0, top: 0 });
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const measure = () => {
      const active = nav.querySelector<HTMLElement>("[data-nav][aria-current='page']");
      if (!active) {
        setBar((prev) => (prev.width === 0 ? prev : { left: 0, width: 0, top: 0 }));
        return;
      }
      const navBox = nav.getBoundingClientRect();
      const box = active.getBoundingClientRect();
      const left = box.left - navBox.left - nav.clientLeft;
      const width = box.width;
      const top = box.bottom - navBox.top - nav.clientTop + 2;
      setBar((prev) =>
        prev.left === left && prev.width === width && prev.top === top
          ? prev
          : { left, width, top },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    const frame = requestAnimationFrame(() => setSlide(true));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-5">
        <NavLink viewTransition to="/" className="shrink-0">
          <img
            src="/uplift-logo-grey.png"
            alt="Uplift Safety"
            className="h-8 w-auto"
          />
        </NavLink>

        <nav ref={navRef} className="relative hidden items-center gap-8 lg:flex">
          {links.slice(0, 3).map((link) => (
            <NavLink
              key={link.to}
              viewTransition
              to={link.to}
              end={link.end}
              data-nav=""
              className={({ isActive }) =>
                `${linkClass(isActive)} whitespace-nowrap`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <NavDropdown
            label="Services"
            to="/services"
            active={pathname.startsWith("/services")}
            items={serviceItems}
          />

          <NavDropdown
            label="Training"
            to="/training"
            active={pathname.startsWith("/training")}
            items={trainingItems}
          />

          {links.slice(3).map((link) => (
            <NavLink
              key={link.to}
              viewTransition
              to={link.to}
              data-nav=""
              className={({ isActive }) =>
                `${linkClass(isActive)} whitespace-nowrap`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute h-0.5 bg-blue ${
              slide
                ? "transition-[left,width,top] duration-300 ease-out motion-reduce:transition-none"
                : ""
            }`}
            style={{ left: bar.left, width: bar.width, top: bar.top }}
          />
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            viewTransition
            to="/contact"
            className="hidden bg-blue px-4 py-2 font-display text-[11px] font-bold tracking-[0.16em] text-white uppercase transition-transform duration-150 active:scale-[0.98] lg:inline-block"
          >
            Talk to us
          </NavLink>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X size={22} weight="bold" />
            ) : (
              <List size={22} weight="bold" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-paper px-5 py-6 lg:hidden">
          {links.slice(0, 3).map((link) => (
            <NavLink
              key={link.to}
              viewTransition
              to={link.to}
              end={link.end}
              className={({ isActive }) => mobileLinkClass(isActive)}
            >
              {link.label}
            </NavLink>
          ))}

          <p className="mt-5 mb-1 font-display text-[10px] tracking-[0.2em] text-mute uppercase">
            Services
          </p>
          {serviceItems.map((item) => (
            <NavLink
              key={item.to}
              viewTransition
              to={item.to}
              end={item.end}
              className={({ isActive }) => mobileLinkClass(isActive)}
            >
              {item.label}
            </NavLink>
          ))}

          <p className="mt-5 mb-1 font-display text-[10px] tracking-[0.2em] text-mute uppercase">
            Training
          </p>
          {trainingItems.map((item) =>
            item.external ? (
              <a
                key={item.to}
                href={item.to}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 py-3 font-display text-sm font-semibold tracking-[0.16em] text-ink uppercase"
              >
                {item.label}
                <ArrowSquareOut size={14} weight="bold" className="opacity-70" aria-hidden />
              </a>
            ) : (
              <NavLink
                key={item.to}
                viewTransition
                to={item.to}
                end={item.end}
                className={({ isActive }) => mobileLinkClass(isActive)}
              >
                {item.label}
              </NavLink>
            ),
          )}

          <NavLink
            viewTransition
            to="/contact"
            className={({ isActive }) => mobileLinkClass(isActive)}
          >
            Contact
          </NavLink>

          <NavLink
            viewTransition
            to="/contact"
            className="mt-6 inline-flex bg-blue px-5 py-3 font-display text-[11px] font-bold tracking-[0.16em] text-white uppercase"
          >
            Talk to us
          </NavLink>
        </nav>
      )}
    </header>
  );
}
