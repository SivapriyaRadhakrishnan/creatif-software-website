import {
  ShoppingCart,
  Receipt,
  Package,
  Users,
  UserCog,
  Boxes,
  Eye,
  Gauge,
  Layers,
  ShieldCheck,
} from 'lucide-react'
import Page from '../components/Page'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'
import { ERPDashboard } from '../components/mockups/Dashboards'
import { ServiceHero, StatementIntro } from '../sections/service/ServiceSections'
import { useScrollAnimations, gsap } from '../animations/scrollAnimations'

const modules = [
  { icon: ShoppingCart, title: 'Sales', text: 'Orders, quotations and sales performance.' },
  { icon: Receipt, title: 'Billing', text: 'Fast, accurate invoices and payment tracking.' },
  { icon: Package, title: 'Inventory', text: 'Real-time stock levels and movements.' },
  { icon: Users, title: 'Customers', text: 'Customer records connected to every sale.' },
  { icon: UserCog, title: 'Staff', text: 'Team roles, access and daily activity.' },
]

const reasons = [
  {
    icon: Layers,
    title: 'One connected system',
    text: 'Stop switching between disconnected tools. Every department works from the same platform.',
  },
  {
    icon: Eye,
    title: 'Complete visibility',
    text: 'Get a clear view of your overall business performance, from sales to stock to staff.',
  },
  {
    icon: Gauge,
    title: 'Improved efficiency',
    text: 'Automate routine work and cut out repetitive data entry across departments.',
  },
  {
    icon: ShieldCheck,
    title: 'Complete control',
    text: 'Manage daily operations with confidence and the right access for every team member.',
  },
]

function ModuleHub() {
  const ref = useScrollAnimations(({ motion }, scope) => {
    if (!motion) return
    const q = gsap.utils.selector(scope)
    const tl = gsap.timeline({
      scrollTrigger: { trigger: q('.hub')[0], start: 'top 70%', once: true },
    })
    tl.from(q('.hub__core'), { scale: 0.5, opacity: 0, duration: 1, ease: 'expo.out' })
      .fromTo(
        q('.hub__wires path'),
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.1, stagger: 0.08, ease: 'power2.inOut' },
        '-=0.6',
      )
      .from(q('.hub__module'), { y: 30, opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.9')
  })

  return (
    <section className="section modules" ref={ref}>
      <div className="container">
        <SectionHeading
          eyebrow="ONE PLATFORM"
          title="Your Core Operations, *Connected*"
          description="Sales, billing, inventory, customers and staff management work together, so every update flows through your entire business."
          align="center"
        />
        <div className="hub">
          <svg className="hub__wires" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="1" d="M500 260 C 380 260, 300 90, 150 90" />
            <path pathLength="1" d="M500 260 C 620 260, 700 90, 850 90" />
            <path pathLength="1" d="M500 260 C 380 260, 300 430, 150 430" />
            <path pathLength="1" d="M500 260 C 620 260, 700 430, 850 430" />
            <path pathLength="1" d="M500 260 L 500 470" />
          </svg>
          <div className="hub__core">
            <Boxes aria-hidden="true" />
            <strong>ERP</strong>
            <small>Core</small>
          </div>
          {modules.map(({ icon: Icon, title, text }, i) => (
            <article className={`hub__module hub__module--${i}`} key={title}>
              <span className="icon-badge icon-badge--dark">
                <Icon aria-hidden="true" />
              </span>
              <span>
                <h3>{title}</h3>
                <p>{text}</p>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ERP() {
  return (
    <Page
      title="ERP Software"
      description="Creatif ERP brings sales, billing, inventory, customers and staff management together, giving you complete control of your business operations from one connected system."
      className="page--erp"
    >
      <ServiceHero
        eyebrow="SMART BUSINESS MANAGEMENT"
        title={'Manage Smarter.\n*Grow* Faster.'}
        description="A powerful ERP solution that brings sales, billing, inventory, customers, and staff management together — giving you complete control of your business operations from one connected system."
        cta="Explore ERP Solutions"
        theme="dark"
        layout="center"
        chips={modules.map(({ icon, title }) => ({ icon, label: title }))}
        visual={<ERPDashboard />}
      />

      <StatementIntro
        label="INTRODUCTION"
        text="ERP brings your essential business operations together in one powerful platform, helping you manage daily tasks, improve efficiency, and get a clear view of your overall business performance."
      />

      <ModuleHub />

      <section className="section section--soft erp-why">
        <div className="container">
          <SectionHeading
            eyebrow="WHY ERP"
            title="Complete Control of Your *Business* Operations"
            description="When every part of your business runs on one system, you spend less time reconciling data and more time growing."
          />
          <div className="erp-why__grid" data-stagger="0.1">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <article className={`erp-why__card ${i === 0 ? 'erp-why__card--accent' : ''}`} key={title}>
                <span className="erp-why__num">{String(i + 1).padStart(2, '0')}</span>
                <span className={`icon-badge ${i === 0 ? 'icon-badge--light' : ''}`}>
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="h3">{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="ERP SOFTWARE"
        title="Bring Your Whole Business Into *One* System"
        description="Talk to our team about how Creatif ERP can connect your sales, billing, inventory and staff."
        button="Explore ERP Solutions"
      />
    </Page>
  )
}
