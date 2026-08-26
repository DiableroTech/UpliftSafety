import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
            Occupational health and safety. Kamloops, BC. Serving Western Canada.
          </p>
        </div>
        <div>
          <p className="font-display text-[11px] font-semibold tracking-[0.2em] text-hi uppercase">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li>
              <a className="hover:text-hi" href="mailto:jason.zaffino@upliftsafety.ca">
                jason.zaffino@upliftsafety.ca
              </a>
              <span className="block text-mute">250-540-3511</span>
            </li>
            <li>
              <a className="hover:text-hi" href="mailto:marsha.bell@upliftsafety.ca">
                marsha.bell@upliftsafety.ca
              </a>
              <span className="block text-mute">778-257-1863</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-[11px] font-semibold tracking-[0.2em] text-hi uppercase">
            Site
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="text-paper/80 hover:text-hi" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="text-paper/80 hover:text-hi" to="/services">
                Safety services
              </Link>
            </li>
            <li>
              <Link className="text-paper/80 hover:text-hi" to="/services/hygiene">
                Hygiene services
              </Link>
            </li>
            <li>
              <Link className="text-paper/80 hover:text-hi" to="/training">
                Safety training
              </Link>
            </li>
            <li>
              <Link className="text-paper/80 hover:text-hi" to="/training/equipment">
                Mobile equipment
              </Link>
            </li>
            <li>
              <Link className="text-paper/80 hover:text-hi" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs tracking-wide text-mute">
          © {new Date().getFullYear()} Uplift Safety · Demo UI · Kamloops · Kelowna · Edmonton ·
          and beyond
        </p>
      </div>
    </footer>
  )
}
