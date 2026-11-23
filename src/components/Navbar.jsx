import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react'
import Logo from './Logo'
import Button from './Button'
import { services } from '../data/services'

// Routes whose hero is dark: start with the solid glass navbar so the logo stays legible.
const DARK_HERO_ROUTES = ['/services/erp']

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { label: 'Services', dropdown: true },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServices, setMobileServices] = useState(false)
  const dropRef = useRef(null)
  const closeTimer = useRef(null)
  const hoverOpened = useRef(false)
  const openRef = useRef(false)
  const lastY = useRef(0)

  const servicesActive = pathname.startsWith('/services')
  const solid = scrolled || mobileOpen || DARK_HERO_ROUTES.includes(pathname)

  // Glass background after leaving the top; hide on fast scroll down, reveal on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const goingDown = y > lastY.current
      setHidden(goingDown && y > 480)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on navigation. Adjusting state during render on a changed key
  // avoids a cascading effect render.
  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    setDropdown(false)
    setMobileOpen(false)
    setMobileServices(false)
  }

  useEffect(() => {
    openRef.current = dropdown
  }, [dropdown])

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Escape and outside click close the dropdown.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDropdown(false)
        setMobileOpen(false)
      }
    }
    const onClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onClick)
    }
  }, [])

  const openHover = (e) => {
    if (e.pointerType !== 'mouse') return
    clearTimeout(closeTimer.current)
    if (!openRef.current) hoverOpened.current = true
    setDropdown(true)
  }
  const closeHover = (e) => {
    if (e.pointerType !== 'mouse') return
    closeTimer.current = setTimeout(() => {
      hoverOpened.current = false
      setDropdown(false)
    }, 160)
  }
  // A mouse user hovers (menu opens) and then clicks: keep it open instead of
  // toggling it shut. Keyboard and touch clicks toggle normally.
  const onServicesClick = () => {
    if (hoverOpened.current) {
      hoverOpened.current = false
      setDropdown(true)
      return
    }
    hoverOpened.current = false
    setDropdown((v) => !v)
  }

  const isActive = (l) => (l.dropdown ? servicesActive : l.end ? pathname === l.to : pathname.startsWith(l.to))

  return (
    <>
      <header
        className={`nav ${solid ? 'nav--scrolled' : ''} ${DARK_HERO_ROUTES.includes(pathname) ? 'nav--opaque' : ''} ${hidden && !dropdown && !mobileOpen ? 'nav--hidden' : ''}`}
      >
        <div className="container nav__inner">
          <Logo height={42} />

          <nav className="nav__links" aria-label="Main">
            <ul>
              {links.map((l) => (
                <li
                  key={l.label}
                  className="nav__item"
                  ref={l.dropdown ? dropRef : undefined}
                  onPointerEnter={l.dropdown ? openHover : undefined}
                  onPointerLeave={l.dropdown ? closeHover : undefined}
                >
                  {l.dropdown ? (
                    <button
                      className={`nav__link ${isActive(l) ? 'is-active' : ''}`}
                      aria-expanded={dropdown}
                      aria-controls="services-menu"
                      onClick={onServicesClick}
                    >
                      {isActive(l) && <ActivePill reduce={reduce} />}
                      <span>Services</span>
                      <ChevronDown className={`nav__chev ${dropdown ? 'is-open' : ''}`} aria-hidden="true" />
                    </button>
                  ) : (
                    <NavLink to={l.to} end={l.end} className={`nav__link ${isActive(l) ? 'is-active' : ''}`}>
                      {isActive(l) && <ActivePill reduce={reduce} />}
                      <span>{l.label}</span>
                    </NavLink>
                  )}

                  {l.dropdown && (
                    <AnimatePresence>
                      {dropdown && (
                        <motion.div
                          id="services-menu"
                          className="dropdown"
                          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <ul className="dropdown__list">
                            {services.map((s, i) => {
                              const Icon = s.icon
                              return (
                                <motion.li
                                  key={s.slug}
                                  initial={reduce ? false : { opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
                                >
                                  <Link
                                    to={s.path}
                                    className={`dropdown__item ${pathname === s.path ? 'is-active' : ''}`}
                                  >
                                    <span className="dropdown__icon">
                                      <Icon aria-hidden="true" />
                                    </span>
                                    <span>
                                      <strong>{s.navLabel}</strong>
                                      <small>{s.navHint}</small>
                                    </span>
                                  </Link>
                                </motion.li>
                              )
                            })}
                          </ul>
                          <div className="dropdown__promo">
                            <Sparkles aria-hidden="true" />
                            <p>
                              <strong>One smart ecosystem.</strong> Everything your business needs, connected.
                            </p>
                            <Link to="/contact" className="dropdown__promo-link">
                              Talk to our team <ArrowRight aria-hidden="true" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__actions">
            <Button to="/contact" size="sm" className="nav__cta">
              Get Started
            </Button>
            <button
              className={`burger ${mobileOpen ? 'is-open' : ''}`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile">
              <ul className="mobile-menu__list">
                {links.map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {l.dropdown ? (
                      <>
                        <button
                          className={`mobile-menu__link ${isActive(l) ? 'is-active' : ''}`}
                          aria-expanded={mobileServices}
                          onClick={() => setMobileServices((v) => !v)}
                        >
                          Services
                          <ChevronDown className={`nav__chev ${mobileServices ? 'is-open' : ''}`} aria-hidden="true" />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileServices && (
                            <motion.ul
                              className="mobile-menu__sub"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            >
                              {services.map((s) => {
                                const Icon = s.icon
                                return (
                                  <li key={s.slug}>
                                    <Link to={s.path} className={pathname === s.path ? 'is-active' : ''}>
                                      <Icon aria-hidden="true" />
                                      {s.navLabel}
                                    </Link>
                                  </li>
                                )
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <NavLink to={l.to} end={l.end} className={`mobile-menu__link ${isActive(l) ? 'is-active' : ''}`}>
                        {l.label}
                      </NavLink>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="mobile-menu__cta"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
            >
              <Button to="/contact">Get Started</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ActivePill({ reduce }) {
  return (
    <motion.span
      layoutId="nav-active"
      className="nav__pill"
      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
    />
  )
}
