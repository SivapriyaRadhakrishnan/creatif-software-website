import { Bot, CheckCircle2, UserPlus } from 'lucide-react'
import Button from './Button'
import { HeroDashboard } from './mockups/Dashboards'
import { useScrollAnimations, gsap } from '../animations/scrollAnimations'

const HEADING = [
  ['One', 'Smart', 'Ecosystem.'],
  ['Everything', 'Your', 'Business', 'Needs.'],
]

export default function Hero() {
  const ref = useScrollAnimations(({ motion, desktop }, scope) => {
    if (!motion) return
    const q = gsap.utils.selector(scope)

    // Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 })
    tl.from(q('.hero__eyebrow'), { y: 20, opacity: 0, duration: 0.9 })
      .from(q('.hero__title .split-inner'), { yPercent: 120, rotate: 4, duration: 1.3, stagger: 0.06 }, '-=0.6')
      .from(q('.hero__desc'), { y: 24, opacity: 0, duration: 1 }, '-=0.9')
      .from(q('.hero__ctas > *'), { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.8')
      .from(
        q('.hero__stage'),
        { y: 120, opacity: 0, rotateX: 28, scale: 0.9, duration: 1.6, ease: 'power4.out' },
        '-=0.9',
      )
      .from(q('.hero__float'), { scale: 0.6, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'back.out(1.6)' }, '-=0.8')

    // Scroll: dashboard flattens out and floats toward the viewer
    gsap.fromTo(
      q('.hero__stage-inner'),
      { rotateX: desktop ? 14 : 6, scale: 0.94 },
      {
        rotateX: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: q('.hero__stage')[0], start: 'top 85%', end: 'center 45%', scrub: 0.8 },
      },
    )

    if (desktop) {
      // Layered parallax: copy drifts up slower than the page, orbs move apart.
      gsap.to(q('.hero__copy'), {
        yPercent: -18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: '45% top', scrub: true },
      })
      gsap.to(q('.hero__orb--a'), {
        y: 220,
        x: -80,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(q('.hero__orb--b'), {
        y: 140,
        x: 120,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      })
      q('.hero__float').forEach((el, i) => {
        gsap.to(el, {
          y: [-70, -120, -50][i] || -60,
          ease: 'none',
          scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    }
  })

  return (
    <section className="hero" ref={ref}>
      <div className="hero__bg" aria-hidden="true">
        <div className="bg-grid" />
        <span className="orb orb--red hero__orb--a" />
        <span className="orb orb--warm hero__orb--b" />
        <svg className="hero__beams" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <path d="M-50 420 C 300 300, 520 520, 1250 180" />
          <path d="M-50 500 C 380 380, 700 560, 1250 300" />
        </svg>
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow eyebrow--center hero__eyebrow">SMART SOFTWARE SOLUTIONS</span>
          <h1 className="h1 hero__title">
            <span className="sr-only">One Smart Ecosystem. Everything Your Business Needs.</span>
            <span aria-hidden="true">
              {HEADING.map((line, li) => (
                <span className="split-line" key={li}>
                  {line.map((w, wi) => (
                    <span key={wi}>
                      <span className="split-word">
                        <span className={`split-inner ${li === 0 && wi === 2 ? 'hero__accent' : ''}`}>{w}</span>
                      </span>
                      {wi < line.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>
          <p className="lead hero__desc">
            Simplify your everyday operations with powerful software built to manage customers, sales, billing,
            employees, payroll and business workflows — all in one smart ecosystem.
          </p>
          <div className="btn-row hero__ctas">
            <Button to="/contact">Get Started</Button>
            <Button href="#solutions" variant="ghost" arrow={false}>
              Explore Solutions
            </Button>
          </div>
        </div>

        <div className="hero__stage">
          <div className="hero__stage-inner">
            <HeroDashboard />
          </div>

          <div className="hero__float hero__float--1" aria-hidden="true">
            <div className="float-card float-card--sm float-slow">
              <span className="float-card__icon float-card__icon--green">
                <CheckCircle2 />
              </span>
              <span>
                <strong>Payroll processed</strong>
                <small>46 employees · on time</small>
              </span>
            </div>
          </div>
          <div className="hero__float hero__float--2" aria-hidden="true">
            <div className="float-card float-card--sm float-slower">
              <span className="float-card__icon">
                <UserPlus />
              </span>
              <span>
                <strong>New lead captured</strong>
                <small>Assigned to Sales</small>
              </span>
            </div>
          </div>
          <div className="hero__float hero__float--3" aria-hidden="true">
            <div className="float-card float-card--chat">
              <span className="float-card__icon float-card__icon--dark">
                <Bot />
              </span>
              <span>
                <small>AI Assistant</small>
                <strong>“3 invoices are due this week. Send reminders?”</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
