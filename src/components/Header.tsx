import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import NavDropdown, { linkClass } from "./NavDropdown";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-visible border-b border-white/10 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between overflow-visible px-5">
        <NavLink to="/" className="text-paper">
          <Logo />
        </NavLink>
        <nav className="flex items-center gap-5 overflow-visible sm:gap-8">
          {links.slice(0, 2).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => linkClass(isActive)}
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
            items={[
              { to: "/services", label: "Safety services", end: true },
              { to: "/services/hygiene", label: "Hygiene services" },
            ]}
          />

          <NavDropdown
            label="Training"
            to="/training"
            active={pathname.startsWith("/training")}
            items={[
              { to: "/training", label: "Safety training", end: true },
              { to: "/training/equipment", label: "Mobile equipment" },
            ]}
          />

          {links.slice(2).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => linkClass(isActive)}
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
        <NavLink
          to="/contact"
          className="hidden bg-hi px-4 py-2 font-display text-[11px] font-bold tracking-[0.16em] text-hi-ink uppercase sm:inline-block"
        >
          Get a quote
        </NavLink>
      </div>
    </header>
  );
}
