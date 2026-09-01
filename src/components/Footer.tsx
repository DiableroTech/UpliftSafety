import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:gap-12 md:py-16">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
            Occupational health and safety. Kamloops, BC. Serving Western Canada.
          </p>
        </div>
        <div>
          <p className="text-sm text-paper/50">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li>
              <a className="break-all hover:text-hi" href="mailto:jason.zaffino@upliftsafety.ca">
                jason.zaffino@upliftsafety.ca
              </a>
              <span className="block text-mute">250-540-3511</span>
            </li>
            <li>
              <a className="break-all hover:text-hi" href="mailto:marsha.bell@upliftsafety.ca">
                marsha.bell@upliftsafety.ca
              </a>
              <span className="block text-mute">778-257-1863</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-paper/50">Site</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link viewTransition className="text-paper/80 hover:text-hi" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link viewTransition className="text-paper/80 hover:text-hi" to="/services">
                Safety services
              </Link>
            </li>
            <li>
              <Link viewTransition className="text-paper/80 hover:text-hi" to="/services/hygiene">
                Hygiene services
              </Link>
            </li>
            <li>
              <Link viewTransition className="text-paper/80 hover:text-hi" to="/training">
                Safety Training
              </Link>
            </li>
            <li>
              <Link viewTransition className="text-paper/80 hover:text-hi" to="/training/equipment">
                Mobile Equipment Training
              </Link>
            </li>
            <li>
              <a
                className="text-paper/80 hover:text-hi"
                href="https://www.bissafety.app/v1/index.cfm?action=classroom.home&company=2818"
                target="_blank"
                rel="noreferrer"
              >
                Training Calendar
              </a>
            </li>
            <li>
              <Link viewTransition className="text-paper/80 hover:text-hi" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs tracking-wide text-mute">
          © {new Date().getFullYear()} Uplift Safety · Kamloops · Kelowna · Edmonton ·
          and beyond
        </p>
      </div>
    </footer>
  )
}
