import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'

/** Accessible animated accordion. One item open at a time. */
export default function FAQ({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen)
  const reduce = useReducedMotion()
  const baseId = useId()

  return (
    <div className="faq" data-stagger="0.07">
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${baseId}-q-${i}`
        const panelId = `${baseId}-a-${i}`
        return (
          <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={item.q}>
            <h3 className="faq__heading">
              <button
                id={btnId}
                className="faq__q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="faq__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq__text">{item.q}</span>
                <span className="faq__icon" aria-hidden="true">
                  <Plus />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="faq__a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
