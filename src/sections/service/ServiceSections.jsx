import { Check } from 'lucide-react'
import SplitText from '../../components/SplitText'
import SectionHeading from '../../components/SectionHeading'
import Button from '../../components/Button'
import { useScrollAnimations, gsap } from '../../animations/scrollAnimations'

/* --------------------------------------------------------------------------
   ServiceHero: shared skeleton with per-product theme and layout.
   theme: 'light' | 'dark' | 'warm'   layout: 'split' | 'split-reverse' | 'center'
   -------------------------------------------------------------------------- */
export function ServiceHero({
  eyebrow,
  title,
  description,
  cta,
  ctaTo = '/contact',
  theme = 'light',
  layout = 'split',
  visual,
  chips,
  className = '',
}) {
  const ref = useScrollAnimations(({ motion, desktop }, scope) => {
    if (!motion) return
    const q = gsap.utils.selector(scope)
    gsap.from(q('.svc-hero__visual'), {
      y: 90,
      opacity: 0,
      rotateX: layout === 'center' ? 22 : 0,
      rotateY: layout === 'split' ? -14 : layout === 'split-reverse' ? 14 : 0,
      scale: 0.94,
      duration: 1.6,
      delay: 0.35,
      ease: 'expo.out',
      transformPerspective: 1400,
    })
    gsap.from(q('.svc-hero__float'), {
      scale: 0.7,
      opacity: 0,
      stagger: 0.15,
      delay: 1,
      duration: 0.9,
      ease: 'back.out(1.6)',
    })
    if (desktop) {
      gsap.to(q('.svc-hero__visual-inner'), {
        y: -70,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(q('.svc-hero__orb'), {
        y: 200,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      })
    }
  })

  return (
    <section
      className={`svc-hero svc-hero--${theme} svc-hero--${layout} ${theme === 'dark' ? 'section--dark' : ''} ${className}`}
      ref={ref}
    >
      <div className="svc-hero__bg" aria-hidden="true">
        <div className="bg-grid" />
        <span className={`orb ${theme === 'warm' ? 'orb--warm' : 'orb--red'} svc-hero__orb`} />
        <span className="orb orb--red svc-hero__orb svc-hero__orb--2" />
      </div>
      <div className="container svc-hero__inner">
        <div className="svc-hero__copy">
          <span className={`eyebrow ${layout === 'center' ? 'eyebrow--center' : ''}`} data-anim="fade-up">
            {eyebrow}
          </span>
          <SplitText as="h1" className="h1 svc-hero__title" text={title} />
          <SplitText as="p" className="lead" text={description} mode="lines" data-delay="0.25" />
          <div className="btn-row" data-anim="fade-up" data-delay="0.4">
            <Button to={ctaTo}>{cta}</Button>
            <Button to="/contact" variant={theme === 'dark' ? 'outline-light' : 'ghost'} arrow={false}>
              Book a Demo
            </Button>
          </div>
          {chips && (
            <ul className="svc-hero__chips" data-stagger="0.06" data-delay="0.5">
              {chips.map(({ icon: Icon, label }) => (
                <li className="chip" key={label}>
                  {Icon && <Icon aria-hidden="true" />}
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="svc-hero__visual">
          <div className="svc-hero__visual-inner">{visual}</div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   StatementIntro: large statement whose words light up as you scroll.
   -------------------------------------------------------------------------- */
export function StatementIntro({ label, text, aside }) {
  const ref = useScrollAnimations(({ motion }, scope) => {
    if (!motion) return
    const words = scope.querySelectorAll('.statement__text .split-inner')
    gsap.fromTo(
      words,
      { opacity: 0.14 },
      {
        opacity: 1,
        stagger: 0.08,
        ease: 'none',
        scrollTrigger: { trigger: scope.querySelector('.statement__text'), start: 'top 80%', end: 'bottom 50%', scrub: true },
      },
    )
  })

  return (
    <section className="section statement" ref={ref}>
      <div className="container statement__inner">
        <span className="eyebrow" data-anim="fade-up">
          {label}
        </span>
        <SplitText as="p" className="statement__text" text={text} mode="scrub" />
        {aside && (
          <div className="statement__aside" data-stagger="0.1">
            {aside}
          </div>
        )}
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   FeatureCards: icon cards in a responsive grid.
   -------------------------------------------------------------------------- */
export function FeatureCards({ eyebrow, title, description, items, columns = 3, tone = 'light' }) {
  return (
    <section className={`section ${tone === 'soft' ? 'section--soft' : ''} features`}>
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className={`features__grid features__grid--${columns}`} data-stagger="0.08">
          {items.map(({ icon: Icon, title: t, text }, i) => (
            <article className="card card-hover feature" key={t}>
              <div className="feature__top">
                <span className="icon-badge">
                  <Icon aria-hidden="true" />
                </span>
                <span className="feature__num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="h3">{t}</h3>
              {text && <p>{text}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   CheckList: simple animated list of points.
   -------------------------------------------------------------------------- */
export function CheckList({ items, className = '' }) {
  return (
    <ul className={`checklist ${className}`} data-stagger="0.07">
      {items.map((t) => (
        <li key={t}>
          <span className="checklist__icon">
            <Check aria-hidden="true" />
          </span>
          {t}
        </li>
      ))}
    </ul>
  )
}
