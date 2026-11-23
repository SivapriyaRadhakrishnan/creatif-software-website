import { CheckCircle2, Receipt, TrendingUp, Users } from 'lucide-react'
import SplitText from '../../components/SplitText'
import Button from '../../components/Button'
import { useScrollAnimations, gsap } from '../../animations/scrollAnimations'

const words = ['Customers', 'Sales', 'Billing', 'Payroll', 'Automation', 'Insights']

/**
 * Full-bleed dark section. On scroll the inset card expands to the full
 * viewport width and a band of capability words slides across.
 */
export default function BuiltForBusiness() {
  const ref = useScrollAnimations(({ motion, desktop }, scope) => {
    if (!motion) return
    const q = gsap.utils.selector(scope)

    gsap.fromTo(
      q('.built__frame'),
      { clipPath: desktop ? 'inset(0% 5% 0% 5% round 36px)' : 'inset(0% 3% 0% 3% round 24px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top 90%', end: 'top 15%', scrub: 0.6 },
      },
    )
    gsap.fromTo(
      q('.built__band-track'),
      { xPercent: 0 },
      {
        xPercent: -35,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
    gsap.from(q('.built__ui'), {
      y: 80,
      opacity: 0,
      stagger: 0.12,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: q('.built__content')[0], start: 'top 70%', once: true },
    })
    if (desktop) {
      q('.built__ui').forEach((el, i) => {
        gsap.to(el, {
          y: [-30, -50, -24][i],
          ease: 'none',
          scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }
  })

  return (
    <section className="built" ref={ref}>
      <div className="built__frame section--dark">
        <div className="built__bg" aria-hidden="true">
          <div className="bg-grid" />
          <span className="built__glow" />
        </div>

        <div className="container built__content">
          <span className="eyebrow eyebrow--center" data-anim="fade-up">
            BUILT FOR YOUR BUSINESS
          </span>
          <SplitText as="h2" className="h1 built__title" text={'Powering *Smarter* Business.\nDriving Better Results.'} />
          <SplitText
            as="p"
            className="lead built__lead"
            mode="lines"
            data-delay="0.2"
            text="From customer management to sales, billing, payroll and AI-powered automation, Creatif brings everything your business needs into one connected ecosystem."
          />
          <div data-anim="fade-up" data-delay="0.3">
            <Button href="#solutions" variant="light">
              Explore More
            </Button>
          </div>

          <div className="built__ui built__ui--1" aria-hidden="true">
            <span className="float-card__icon">
              <TrendingUp />
            </span>
            <span>
              <small>Sales this month</small>
              <strong>Trending up</strong>
            </span>
          </div>
          <div className="built__ui built__ui--2" aria-hidden="true">
            <span className="float-card__icon float-card__icon--green">
              <CheckCircle2 />
            </span>
            <span>
              <small>Invoices</small>
              <strong>All sent</strong>
            </span>
            <Receipt className="built__ui-bg" />
          </div>
          <div className="built__ui built__ui--3" aria-hidden="true">
            <span className="float-card__icon float-card__icon--dark">
              <Users />
            </span>
            <span>
              <small>Team</small>
              <strong>Attendance synced</strong>
            </span>
          </div>
        </div>

        <div className="built__band" aria-hidden="true">
          <div className="built__band-track">
            {[...words, ...words, ...words].map((w, i) => (
              <span key={i}>
                {w}
                <i />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
