import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote, Star, ShieldCheck } from 'lucide-react'

/**
 * Testimonial carousel.
 * Add verified reviews as { quote, name, role, company, rating, verified: true }.
 * Stars only render for entries marked `verified` with a rating.
 */
const PLACEHOLDERS = [1, 2, 3].map((n) => ({
  quote:
    'Client testimonial placeholder. A verified review from a Creatif customer will appear here once it has been approved for publication.',
  name: `Client Name ${n}`,
  role: 'Designation',
  company: 'Company Name',
  rating: null,
  verified: false,
}))

export default function Testimonials({ items = PLACEHOLDERS }) {
  const reduce = useReducedMotion()
  const [[index, dir], setState] = useState([0, 1])
  const [paused, setPaused] = useState(false)
  const count = items.length

  const go = useCallback(
    (step) => setState(([i]) => [(i + step + count) % count, step]),
    [count],
  )

  useEffect(() => {
    if (reduce || paused || count < 2) return undefined
    const t = setInterval(() => go(1), 7000)
    return () => clearInterval(t)
  }, [reduce, paused, go, count])

  const item = items[index]

  return (
    <div
      className="testi"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="testi__stage">
        <Quote className="testi__mark" aria-hidden="true" />
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.figure
            key={index}
            className="testi__card"
            custom={dir}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 60, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            drag={reduce ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1)
              else if (info.offset.x > 60) go(-1)
            }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
          >
            {item.verified && item.rating ? (
              <div className="testi__stars" aria-label={`Rated ${item.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} aria-hidden="true" className={i < Math.round(item.rating) ? 'is-on' : ''} />
                ))}
              </div>
            ) : (
              <span className="testi__pending">
                <ShieldCheck aria-hidden="true" /> Placeholder · awaiting verified review
              </span>
            )}
            <blockquote className={`testi__quote ${item.verified ? '' : 'is-placeholder'}`}>
              <p>{item.quote}</p>
            </blockquote>
            <figcaption className="testi__author">
              <span className="testi__avatar" aria-hidden="true">
                {item.name
                  .split(' ')
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join('')}
              </span>
              <span>
                <strong>{item.name}</strong>
                <small>
                  {item.role}, {item.company}
                </small>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="testi__controls">
        <div className="testi__dots" role="tablist" aria-label="Choose testimonial">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial ${i + 1}`}
              className={`testi__dot ${i === index ? 'is-active' : ''}`}
              onClick={() => setState([i, i > index ? 1 : -1])}
            >
              {i === index && !reduce && !paused && <span className="testi__dot-fill" key={index} />}
            </button>
          ))}
        </div>
        <div className="testi__arrows">
          <button className="testi__arrow" onClick={() => go(-1)} aria-label="Previous testimonial">
            <ArrowLeft aria-hidden="true" />
          </button>
          <button className="testi__arrow" onClick={() => go(1)} aria-label="Next testimonial">
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
