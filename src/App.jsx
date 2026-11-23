import { lazy, Suspense, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import { ScrollTrigger } from './animations/scrollAnimations'

// Home ships in the main bundle; other routes load on demand.
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const CRM = lazy(() => import('./pages/CRM'))
const ERP = lazy(() => import('./pages/ERP'))
const FlexFlow = lazy(() => import('./pages/FlexFlow'))
const Kinetix = lazy(() => import('./pages/Kinetix'))
const AIChatbot = lazy(() => import('./pages/AIChatbot'))
const NotFound = lazy(() => import('./pages/NotFound'))

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Scrolls to #hash targets. Same-page links glide smoothly; after a route
 * change we wait for the new page to mount and for ScrollTrigger to lay out
 * (pins add height), then jump straight to the target.
 */
function useHashScroll(location) {
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    const samePage = prevPath.current === location.pathname
    prevPath.current = location.pathname
    if (!location.hash) return undefined

    const id = decodeURIComponent(location.hash.slice(1))
    let tries = 0
    let raf
    let timer
    const seek = () => {
      const el = document.getElementById(id)
      if (!el) {
        if (tries++ < 90) raf = requestAnimationFrame(seek)
        return
      }
      if (samePage) {
        el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' })
        return
      }
      // Let the page's own ScrollTrigger refresh run first, then jump.
      timer = setTimeout(() => {
        ScrollTrigger.refresh()
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
      }, 120)
    }
    raf = requestAnimationFrame(seek)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [location.hash, location.pathname, location.key])
}

export default function App() {
  const location = useLocation()
  useHashScroll(location)

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        }}
      >
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services/crm" element={<CRM />} />
              <Route path="/services/erp" element={<ERP />} />
              <Route path="/services/flexflow-ai" element={<FlexFlow />} />
              <Route path="/services/kinetix-payroll" element={<Kinetix />} />
              <Route path="/services/ai-chatbot" element={<AIChatbot />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </>
  )
}
