import SplitText from './SplitText'
import Button from './Button'
import { useScrollAnimations, gsap } from '../animations/scrollAnimations'

/**
 * Conversion panel. The dark card widens from an inset card to near full
 * width as it scrolls into view.
 */
export default function CTASection({
  eyebrow = "LET'S TALK",
  title = 'Ready to Make Your Business *Smarter?*',
  description = "Let's simplify your business operations with powerful software solutions designed for your growth.",
  button = 'Get Started',
  to = '/contact',
  secondary,
}) {
  const ref = useScrollAnimations(({ motion, desktop }, scope) => {
    if (!motion) return
    const panel = scope.querySelector('.cta__panel')
    gsap.fromTo(
      panel,
      { scale: desktop ? 0.9 : 0.96, borderRadius: 48 },
      {
        scale: 1,
        borderRadius: 28,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top bottom', end: 'top 35%', scrub: 0.6 },
      },
    )
    gsap.to(scope.querySelectorAll('.cta__ring'), {
      rotate: 90,
      ease: 'none',
      scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  })

  return (
    <section className="cta" ref={ref}>
      <div className="container">
        <div className="cta__panel">
          <div className="cta__bg" aria-hidden="true">
            <span className="cta__ring cta__ring--1" />
            <span className="cta__ring cta__ring--2" />
            <span className="cta__glow" />
            <span className="bg-grid" />
          </div>
          <div className="cta__content">
            <span className="eyebrow eyebrow--center" data-anim="fade-up">
              {eyebrow}
            </span>
            <SplitText as="h2" className="h2 cta__title" text={title} />
            <SplitText as="p" className="lead" text={description} mode="lines" data-delay="0.2" />
            <div className="btn-row cta__buttons" data-anim="fade-up" data-delay="0.3">
              <Button to={to}>{button}</Button>
              {secondary && (
                <Button to={secondary.to} variant="outline-light" arrow={false}>
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
