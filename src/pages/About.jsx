import {
  Users,
  Boxes,
  Dumbbell,
  Wallet,
  Bot,
  BarChart3,
  MousePointerClick,
  Link2,
  Workflow,
  LineChart,
  TrendingUp,
  LifeBuoy,
  Minimize2,
  Gauge,
  Network,
} from 'lucide-react'
import Page from '../components/Page'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import SplitText from '../components/SplitText'
import Button from '../components/Button'
import TeamCard from '../components/TeamCard'
import FAQ from '../components/FAQ'
import Counter from '../components/Counter'
import { SITE } from '../config/site'
import { team } from '../data/team'
import { aboutFaqs } from '../data/faqs'
import { useScrollAnimations, gsap } from '../animations/scrollAnimations'

const benefits = [
  {
    icon: MousePointerClick,
    title: 'Simple to use',
    text: 'Clean, intuitive interfaces your team can pick up quickly, without long training sessions.',
  },
  {
    icon: Link2,
    title: 'Connected teams',
    text: 'Sales, accounts, HR and operations work from the same up-to-date information.',
  },
  {
    icon: Workflow,
    title: 'Everyday automation',
    text: 'Routine tasks run automatically, reducing manual effort and costly errors.',
  },
  {
    icon: LineChart,
    title: 'Clear insights',
    text: 'Understand performance at a glance and make better decisions with your own data.',
  },
  {
    icon: TrendingUp,
    title: 'Grows with you',
    text: 'Flexible solutions that adapt as your business, team and processes evolve.',
  },
  {
    icon: LifeBuoy,
    title: 'Ongoing support',
    text: 'A team that stays with you after go-live to help you get the most from your software.',
  },
]

const impact = [
  { value: 5, suffix: '+', label: 'Software Solutions' },
  { value: 100, suffix: '+', label: 'Businesses Supported' },
  { value: 10, suffix: '+', label: 'Years of Experience' },
  { value: 50, suffix: '+', label: 'Projects Delivered' },
]

function HeroMosaic() {
  const tiles = [
    { icon: Users, label: 'CRM' },
    { icon: Boxes, label: 'ERP' },
    { icon: Dumbbell, label: 'FlexFlow AI' },
    { icon: null },
    { icon: Wallet, label: 'Kinetix Payroll' },
    { icon: Bot, label: 'AI Chatbot' },
    { icon: BarChart3, label: 'Insights' },
    { icon: Network, label: 'Integrations' },
  ]
  return (
    <div className="mosaic" aria-hidden="true">
      {tiles.map((t, i) =>
        t.icon ? (
          <div className={`mosaic__tile mosaic__tile--${i}`} key={i}>
            <t.icon />
            <span>{t.label}</span>
          </div>
        ) : (
          <div className="mosaic__tile mosaic__tile--logo" key={i}>
            <img src={SITE.logo} alt="" width="160" height="59" />
          </div>
        ),
      )}
      <span className="mosaic__glow" />
    </div>
  )
}

function Benefits() {
  // Pointer-following spotlight on each card (mouse only).
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const ref = useScrollAnimations(({ motion }, scope) => {
    if (!motion) return
    const q = gsap.utils.selector(scope)
    gsap.from(q('.benefit'), {
      y: 70,
      opacity: 0,
      rotateX: -12,
      transformOrigin: '50% 100%',
      stagger: { each: 0.09, grid: 'auto', from: 'start' },
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: q('.benefits__grid')[0], start: 'top 80%', once: true },
    })
  })

  return (
    <section className="section section--dark benefits" ref={ref}>
      <div className="bg-grid" aria-hidden="true" />
      <div className="container z-1">
        <SectionHeading
          eyebrow="WHY BUSINESSES CHOOSE US"
          title="The Creatif *Advantage*"
          description="Every Creatif product is designed around one idea: technology should make running your business simpler."
          align="center"
        />
        <div className="benefits__grid">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article className="benefit" key={title} onPointerMove={onMove}>
              <span className="icon-badge icon-badge--red">
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

export default function About() {
  return (
    <Page
      title="About Us"
      description="Creatif Digital Solutions builds practical software that simplifies everyday business operations, connects teams, and helps businesses grow with confidence. Meet our team."
    >
      <PageHero
        eyebrow="ABOUT US"
        title={'Smart Software.\n*Smarter* Business.'}
        description="Creatif Digital Solutions builds practical software solutions that simplify everyday business operations, connect teams, and help businesses work smarter and grow with confidence."
        actions={
          <>
            <Button to="/contact">Work With Us</Button>
            <Button href="#team" variant="ghost" arrow={false}>
              Meet the Team
            </Button>
          </>
        }
      >
        <HeroMosaic />
      </PageHero>

      <section className="section intro">
        <div className="container split split--wide-left">
          <div className="intro__visual" data-anim="clip" data-clip-dir="up">
            <div className="intro__visual-inner" data-clip-inner>
              <div className="bg-grid" />
              <div className="intro__pillars">
                {[
                  { icon: Minimize2, t: 'Reduce complexity' },
                  { icon: Gauge, t: 'Improve efficiency' },
                  { icon: Network, t: 'Stay connected' },
                ].map(({ icon: Icon, t }, i) => (
                  <div className="intro__pillar" key={t} data-parallax={[0.12, -0.06, 0.18][i]}>
                    <span className="icon-badge icon-badge--red">
                      <Icon aria-hidden="true" />
                    </span>
                    <strong>{t}</strong>
                  </div>
                ))}
              </div>
              <span className="orb orb--red intro__orb" />
            </div>
          </div>
          <div>
            <span className="eyebrow" data-anim="fade-up">
              WHO WE ARE
            </span>
            <SplitText as="h2" className="h2 intro__title" text="Building *Smarter* Businesses Through Technology" />
            <SplitText
              as="p"
              className="lead"
              mode="lines"
              text="We combine practical technology with a simple user experience, helping businesses reduce complexity, improve efficiency, and stay connected across their daily operations."
            />
            <ul className="intro__products" data-stagger="0.06">
              {['CRM', 'ERP', 'FlexFlow AI', 'Kinetix Payroll', 'AI Chatbot'].map((p) => (
                <li className="chip" key={p}>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Benefits />

      <section className="section team" id="team">
        <div className="container">
          <SectionHeading
            eyebrow="OUR TEAM"
            title="Meet Our *Team*"
            description="The people behind Creatif: designers, developers, strategists and managers working together to build software that makes a difference."
            align="center"
          />
          <div className="team__grid" data-stagger="0.08">
            {team.map((m) => (
              <TeamCard member={m} key={m.name} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft faq-section">
        <div className="container faq-layout">
          <div className="faq-layout__side">
            <SectionHeading eyebrow="FAQ" title="Frequently Asked *Questions*" />
            <p className="lead" data-anim="fade-up">
              Can’t find what you’re looking for? Our team is happy to help.
            </p>
            <div data-anim="fade-up">
              <Button to="/contact" variant="dark">
                Contact Us
              </Button>
            </div>
          </div>
          <FAQ items={aboutFaqs} />
        </div>
      </section>

      <section className="section about-impact">
        <div className="container">
          <SectionHeading eyebrow="OUR IMPACT" title="Growing *Together* With Our Clients" align="center" />
          <div className="about-impact__grid" data-stagger="0.1">
            {impact.map((s) => (
              <div className="about-impact__cell" key={s.label}>
                <Counter {...s} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Page>
  )
}
