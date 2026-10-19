import { useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default function Layout() {
  return (
    <div className="min-h-svh bg-paper text-ink">
      <ScrollToTop />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-20 focus:z-[70] focus:bg-accent focus:px-3 focus:py-2 focus:font-display focus:text-xs focus:font-bold focus:tracking-[0.16em] focus:text-ink focus:uppercase"
      >
        Skip to content
      </a>
      <Header />
      <main id="content" className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
