import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

/** Floating "back to top" button with a scroll-progress ring. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setVisible(window.scrollY > 600)
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  const C = 2 * Math.PI * 22

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="to-top"
          onClick={toTop}
          aria-label="Scroll back to top"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="22" className="to-top__track" />
            <circle
              cx="24"
              cy="24"
              r="22"
              className="to-top__bar"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - progress)}
            />
          </svg>
          <ArrowUp aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
