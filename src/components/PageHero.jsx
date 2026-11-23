import SplitText from './SplitText'
import { useScrollAnimations, gsap } from '../animations/scrollAnimations'

/** Hero for inner pages (About, Contact). Visual goes in `children`. */
export default function PageHero({ eyebrow, title, description, actions, children, className = '' }) {
  const ref = useScrollAnimations(({ motion, desktop }, scope) => {
    if (!motion || !desktop) return
    const q = gsap.utils.selector(scope)
    gsap.to(q('.page-hero__orb'), {
      y: 160,
      ease: 'none',
      scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
    })
    gsap.to(q('.page-hero__visual-inner'), {
      y: -60,
      ease: 'none',
      scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
    })
  })

  return (
    <section className={`page-hero ${className}`} ref={ref}>
      <div className="page-hero__bg" aria-hidden="true">
        <div className="bg-grid" />
        <span className="orb orb--red page-hero__orb" />
      </div>
      <div className="container page-hero__inner">
        <div className="page-hero__copy">
          <span className="eyebrow" data-anim="fade-up">
            {eyebrow}
          </span>
          <SplitText as="h1" className="h1 page-hero__title" text={title} />
          <SplitText as="p" className="lead" text={description} mode="lines" data-delay="0.25" />
          {actions && (
            <div className="btn-row" data-anim="fade-up" data-delay="0.4">
              {actions}
            </div>
          )}
        </div>
        {children && (
          <div className="page-hero__visual" data-anim="scale-in" data-delay="0.3">
            <div className="page-hero__visual-inner">{children}</div>
          </div>
        )}
      </div>
    </section>
  )
}
