import { useRef } from 'react'
import { useScrollAnimations, gsap } from '../animations/scrollAnimations'

/**
 * Number that counts up once it scrolls into view.
 * The final value is rendered by default, so reduced-motion users and
 * crawlers always see the real figure.
 */
export default function Counter({ value, decimals = 0, prefix = '', suffix = '', label, className = '' }) {
  const numRef = useRef(null)
  const fmt = (v) => v.toFixed(decimals)

  const ref = useScrollAnimations(({ motion }, scope) => {
    if (!motion) return undefined
    const el = numRef.current
    const state = { v: 0 }
    el.textContent = fmt(0)
    gsap.to(state, {
      v: value,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: scope, start: 'top 88%', once: true },
      onUpdate: () => {
        el.textContent = fmt(state.v)
      },
    })
    return () => {
      el.textContent = fmt(value)
    }
  }, [value])

  return (
    <div className={`counter ${className}`} ref={ref}>
      <p className="counter__value">
        <span className="sr-only">
          {prefix}
          {fmt(value)}
          {suffix}
        </span>
        <span aria-hidden="true">
          {prefix}
          <span ref={numRef}>{fmt(value)}</span>
          <span className="counter__suffix">{suffix}</span>
        </span>
      </p>
      {label && <p className="counter__label">{label}</p>}
    </div>
  )
}
