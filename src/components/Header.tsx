import { ArrowSquareOut, List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import NavDropdown, { linkClass, type DropLink } from "./NavDropdown";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
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
    isActive ? "text-hi" : "text-paper/80"
  }`;
}

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-5">
        <NavLink viewTransition to="/" className="shrink-0 text-paper">
          <Logo />
        </NavLink>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.slice(0, 2).map((link) => (
            <NavLink
              key={link.to}
              viewTransition
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `${linkClass(isActive)} whitespace-nowrap`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-hi" />
                  )}
                </>
              )}
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

          {links.slice(2).map((link) => (
            <NavLink
              key={link.to}
              viewTransition
              to={link.to}
              className={({ isActive }) =>
                `${linkClass(isActive)} whitespace-nowrap`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-hi" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            viewTransition
            to="/contact"
            className="hidden bg-hi px-4 py-2 font-display text-[11px] font-bold tracking-[0.16em] text-hi-ink uppercase transition-transform duration-150 active:scale-[0.98] lg:inline-block"
          >
            Talk to us
          </NavLink>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-paper lg:hidden"
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
        <nav className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-white/10 bg-ink px-5 py-6 lg:hidden">
          {links.slice(0, 2).map((link) => (
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
                className="flex items-center gap-2 py-3 font-display text-sm font-semibold tracking-[0.16em] text-paper/80 uppercase"
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
            className="mt-6 inline-flex bg-hi px-5 py-3 font-display text-[11px] font-bold tracking-[0.16em] text-hi-ink uppercase"
          >
            Talk to us
          </NavLink>
        </nav>
      )}
    </header>
  );
}
