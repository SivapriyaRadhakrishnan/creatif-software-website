import { Network, Settings2, Cpu, BarChart3 } from 'lucide-react'
import SectionHeading from '../../components/SectionHeading'
import { services } from '../../data/services'
import { useScrollAnimations, gsap, ScrollTrigger } from '../../animations/scrollAnimations'

const benefits = [
  {
    icon: Network,
    title: 'One connected ecosystem',
    text: 'Customers, sales, billing, employees and payroll live in one place, so information flows between teams instead of getting lost between tools.',
  },
  {
    icon: Settings2,
    title: 'Built around how you work',
    text: 'Practical software with a simple user experience that fits your everyday processes, not the other way around.',
  },
  {
    icon: Cpu,
    title: 'AI-powered automation',
    text: 'Let routine, repetitive tasks run themselves so your team can focus on customers and growth.',
  },
  {
    icon: BarChart3,
    title: 'Clear business insights',
    text: 'See how your business is performing at a glance and make confident decisions backed by your own data.',
  },
]

export default function WhyCreatif() {
  const ref = useScrollAnimations(({ motion, desktop }, scope) => {
    const q = gsap.utils.selector(scope)
    const items = q('.why__item')

    // Active-state storytelling works for everyone; motion only adds tweening.
    items.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 58%',
        end: 'bottom 58%',
        toggleClass: 'is-active',
      })
    })

    if (!motion) return
    gsap.fromTo(
      q('.why__progress i'),
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: q('.why__list')[0], start: 'top 60%', end: 'bottom 50%', scrub: true },
      },
    )
    gsap.from(q('.orbit__node'), {
      scale: 0,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: q('.orbit')[0], start: 'top 75%', once: true },
    })
    gsap.from(q('.orbit__core'), {
      scale: 0.4,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: q('.orbit')[0], start: 'top 75%', once: true },
    })
    if (desktop) {
      gsap.to(q('.orbit__ring--outer'), {
        rotate: 120,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }
  })

  return (
    <section className="section section--soft why" ref={ref}>
      <div className="container why__grid">
        <div className="why__sticky">
          <SectionHeading
            eyebrow="WHY CREATIF"
            title="Smart Solutions. *Stronger* Businesses."
            description="From customer management to payroll and AI-powered automation, Creatif brings your essential business operations together in one connected ecosystem."
          />
          <div className="orbit" aria-hidden="true">
            <span className="orbit__ring orbit__ring--outer" />
            <span className="orbit__ring orbit__ring--inner" />
            <div className="orbit__core">
              <strong>Creatif</strong>
              <small>Ecosystem</small>
            </div>
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <span key={s.slug} className={`orbit__node orbit__node--${i}`}>
                  <Icon />
                  <small>{s.navLabel}</small>
                </span>
              )
            })}
          </div>
        </div>

        <div className="why__list">
          <span className="why__progress" aria-hidden="true">
            <i />
          </span>
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <article className="why__item" key={title}>
              <span className="why__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="icon-badge">
                <Icon aria-hidden="true" />
              </span>
              <h3 className="h3">{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
