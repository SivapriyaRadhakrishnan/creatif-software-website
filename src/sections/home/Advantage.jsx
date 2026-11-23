import { MousePointerClick, Sprout, Gauge, PieChart } from 'lucide-react'
import SplitText from '../../components/SplitText'
import Button from '../../components/Button'
import { useScrollAnimations, gsap } from '../../animations/scrollAnimations'

const items = [
  {
    icon: MousePointerClick,
    title: 'Smart & Simple',
    text: 'Powerful technology made simple, so your team can manage everyday tasks with ease.',
  },
  {
    icon: Sprout,
    title: 'Ready to Grow',
    text: 'Flexible software solutions that adapt to your business and support long-term growth.',
  },
  {
    icon: Gauge,
    title: 'Boost Efficiency & Productivity',
    text: 'Automate everyday tasks, simplify workflows, and help your team focus on what matters most.',
  },
  {
    icon: PieChart,
    title: 'Smarter Business Insights',
    text: 'Turn your business data into clear insights, track performance, identify opportunities, and make better decisions for sustainable growth.',
  },
]

/**
 * Desktop: the section pins and the cards travel horizontally with scroll.
 * Tablet/mobile and reduced motion: a regular grid.
 */
export default function Advantage() {
  const ref = useScrollAnimations(({ motion, desktop }, scope) => {
    if (!motion) return
    const q = gsap.utils.selector(scope)
    const track = q('.adv__track')[0]

    if (!desktop) {
      gsap.from(q('.adv__card'), {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        scrollTrigger: { trigger: track, start: 'top 85%', once: true },
      })
      return
    }

    const distance = () => track.scrollWidth - track.parentElement.clientWidth

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: q('.adv__pin')[0],
        start: 'top top',
        end: () => `+=${distance() * 1.6}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })

    gsap.fromTo(
      q('.adv__bar i'),
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: q('.adv__pin')[0],
          start: 'top top',
          end: () => `+=${distance() * 1.6}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    )

    // Each card lifts as it travels into the centre of the viewport.
    q('.adv__card').forEach((card) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0.45, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: 'left 95%',
            end: 'left 55%',
            scrub: true,
          },
        },
      )
    })
  })

  return (
    <section className="adv" ref={ref}>
      <div className="adv__pin">
        <div className="container adv__head">
          <div>
            <span className="eyebrow" data-anim="fade-up">
              OUR ADVANTAGE
            </span>
            <SplitText as="h2" className="h2" text="Technology That *Works* for Your Business" />
          </div>
          <div className="adv__head-side" data-anim="fade-up">
            <span className="adv__bar" aria-hidden="true">
              <i />
            </span>
            <Button to="/about" variant="dark">
              Explore More
            </Button>
          </div>
        </div>
        <div className="adv__viewport">
          <div className="adv__track">
            {items.map(({ icon: Icon, title, text }, i) => (
              <article className="adv__card" key={title}>
                <div className="adv__card-top">
                  <span className="icon-badge icon-badge--red">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="adv__num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="adv__title">{title}</h3>
                <p>{text}</p>
                <span className="adv__deco" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
