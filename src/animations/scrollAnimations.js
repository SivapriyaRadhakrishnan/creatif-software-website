import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

gsap.defaults({ ease: 'power3.out', duration: 1 })

export const EASE = {
  out: 'power3.out',
  expo: 'expo.out',
  inOut: 'power2.inOut',
}

/** Media queries shared by every animation block. */
export const MEDIA = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px)',
  mobile: '(max-width: 1023px)',
}

/**
 * Runs GSAP code scoped to a container and reverts everything on unmount.
 * `setup(conditions, scope)` only runs when matching media queries change, so
 * reduced-motion visitors never get hidden initial states.
 */
export function useScrollAnimations(setup, deps = []) {
  const scope = useRef(null)

  useLayoutEffect(() => {
    if (!scope.current) return undefined
    const mm = gsap.matchMedia(scope.current)
    mm.add(
      { motion: MEDIA.motion, reduce: MEDIA.reduce, desktop: MEDIA.desktop, mobile: MEDIA.mobile },
      (ctx) => setup(ctx.conditions, scope.current),
    )
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scope
}

const triggerStart = (el, fallback = 'top 86%') => el.dataset.start || fallback

/** Groups split words by rendered line so a paragraph reveals line by line. */
function lineIndexes(words) {
  const tops = words.map((w) => Math.round(w.parentElement.offsetTop))
  const unique = [...new Set(tops)].sort((a, b) => a - b)
  return tops.map((t) => unique.indexOf(t))
}

/**
 * Declarative reveal system. Mark elements with data attributes:
 *  data-anim="words"   word-by-word heading reveal (use <SplitText>)
 *  data-anim="lines"   line-by-line text reveal (use <SplitText mode="lines">)
 *  data-anim="fade-up" | "fade" | "scale-in" | "slide-left" | "slide-right"
 *  data-anim="clip"    clip-path image reveal, inner [data-clip-inner] scales
 *  data-stagger        children enter one after another
 *  data-parallax="0.15" scroll-linked vertical drift
 *  data-delay="0.2"    extra delay in seconds
 */
export function initReveals(scope, { desktop = true } = {}) {
  const q = gsap.utils.selector(scope)

  q('[data-anim="words"]').forEach((el) => {
    const inner = el.querySelectorAll('.split-inner')
    gsap.from(inner, {
      yPercent: 118,
      rotate: 3,
      opacity: 0,
      duration: 1.05,
      ease: EASE.expo,
      stagger: 0.045,
      delay: parseFloat(el.dataset.delay || 0),
      scrollTrigger: { trigger: el, start: triggerStart(el), once: true },
    })
  })

  q('[data-anim="lines"]').forEach((el) => {
    const inner = gsap.utils.toArray(el.querySelectorAll('.split-inner'))
    if (!inner.length) return
    const idx = lineIndexes(inner)
    gsap.from(inner, {
      yPercent: 105,
      opacity: 0,
      duration: 0.95,
      ease: EASE.out,
      delay: parseFloat(el.dataset.delay || 0),
      stagger: (i) => idx[i] * 0.09,
      scrollTrigger: { trigger: el, start: triggerStart(el), once: true },
    })
  })

  const simple = {
    'fade-up': { y: 46, opacity: 0 },
    fade: { opacity: 0 },
    'scale-in': { scale: 0.94, opacity: 0, y: 24 },
    'slide-left': { x: desktop ? 70 : 30, opacity: 0 },
    'slide-right': { x: desktop ? -70 : -30, opacity: 0 },
  }

  Object.entries(simple).forEach(([name, from]) => {
    q(`[data-anim="${name}"]`).forEach((el) => {
      gsap.from(el, {
        ...from,
        clearProps: 'transform',
        duration: 1.1,
        ease: EASE.out,
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: triggerStart(el, 'top 90%'), once: true },
      })
    })
  })

  q('[data-anim="clip"]').forEach((el) => {
    const dir = el.dataset.clipDir || 'up'
    const start = {
      up: 'inset(100% 0% 0% 0% round 28px)',
      left: 'inset(0% 100% 0% 0% round 28px)',
      right: 'inset(0% 0% 0% 100% round 28px)',
      center: 'inset(18% 18% 18% 18% round 28px)',
    }[dir]
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: triggerStart(el, 'top 82%'), once: true },
      delay: parseFloat(el.dataset.delay || 0),
    })
    tl.fromTo(
      el,
      { clipPath: start },
      { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.4, ease: 'expo.inOut' },
    )
    const inner = el.querySelector('[data-clip-inner]')
    if (inner) tl.from(inner, { scale: 1.3, duration: 1.8, ease: EASE.expo }, 0)
  })

  q('[data-stagger]').forEach((el) => {
    const children = el.children
    if (!children.length) return
    gsap.from(children, {
      y: 56,
      opacity: 0,
      clearProps: 'transform',
      duration: 1,
      ease: EASE.out,
      stagger: parseFloat(el.dataset.stagger) || 0.1,
      delay: parseFloat(el.dataset.delay || 0),
      scrollTrigger: { trigger: el, start: triggerStart(el, 'top 85%'), once: true },
    })
  })

  // Parallax is desktop/tablet only; on phones it costs more than it adds.
  if (desktop) {
    q('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.15
      gsap.fromTo(
        el,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })
  }
}

/** Page-level hook: wires all declarative reveals inside the page root. */
export function usePageReveals(deps = []) {
  return useScrollAnimations(({ motion, desktop }, scope) => {
    if (!motion) return
    initReveals(scope, { desktop })
  }, deps)
}

/** Recalculate trigger positions after fonts/images change layout. */
export function refreshScroll() {
  ScrollTrigger.refresh()
}

if (typeof window !== 'undefined') {
  if (document.fonts?.ready) document.fonts.ready.then(refreshScroll)
  window.addEventListener('load', refreshScroll)
}

export { gsap, ScrollTrigger }
