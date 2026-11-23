import {
  Contact,
  Target,
  BellRing,
  ListTodo,
  KanbanSquare,
  BarChart3,
  UserPlus,
  PhoneCall,
  CalendarClock,
  Handshake,
  HeartHandshake,
  Users,
} from 'lucide-react'
import Page from '../components/Page'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'
import { CRMDashboard, CRMContactCard } from '../components/mockups/Dashboards'
import { ServiceHero, StatementIntro, FeatureCards, CheckList } from '../sections/service/ServiceSections'
import { useScrollAnimations, gsap } from '../animations/scrollAnimations'

const journey = [
  { icon: UserPlus, title: 'Capture', text: 'Every enquiry becomes a lead with full contact details.' },
  { icon: PhoneCall, title: 'Connect', text: 'Log calls, emails and meetings in one timeline.' },
  { icon: CalendarClock, title: 'Follow up', text: 'Timely reminders so no opportunity slips through.' },
  { icon: Handshake, title: 'Close', text: 'Track work progress and move deals to completion.' },
  { icon: HeartHandshake, title: 'Retain', text: 'Stay connected and build long-term relationships.' },
]

const features = [
  { icon: Contact, title: 'Customer Details', text: 'Keep every customer’s information, history and notes organised in one place.' },
  { icon: Target, title: 'Lead Tracking', text: 'Capture leads from every channel and see exactly where each one stands.' },
  { icon: BellRing, title: 'Follow-up Reminders', text: 'Organise follow-ups with reminders so your team always responds on time.' },
  { icon: ListTodo, title: 'Work Progress Tracking', text: 'Track tasks and work progress for every customer and project.' },
  { icon: KanbanSquare, title: 'Visual Sales Pipeline', text: 'Move deals through clear stages and focus on what needs attention.' },
  { icon: BarChart3, title: 'Reports & Insights', text: 'Understand your sales performance and customer trends at a glance.' },
]

function CustomerJourney() {
  const ref = useScrollAnimations(({ motion, desktop }, scope) => {
    if (!motion) return
    const q = gsap.utils.selector(scope)
    const line = q('.journey__line-fill')[0]
    gsap.fromTo(
      line,
      { scaleX: desktop ? 0 : 1, scaleY: desktop ? 1 : 0 },
      {
        scaleX: 1,
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: q('.journey__steps')[0], start: 'top 75%', end: 'bottom 55%', scrub: true },
      },
    )
    q('.journey__step').forEach((step) => {
      gsap.from(step, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: step, start: 'top 85%', once: true },
      })
      gsap.from(step.querySelector('.journey__dot'), {
        scale: 0,
        duration: 0.7,
        ease: 'back.out(2.2)',
        scrollTrigger: { trigger: step, start: 'top 75%', once: true },
      })
    })
  })

  return (
    <section className="section section--soft journey" ref={ref}>
      <div className="container">
        <SectionHeading
          eyebrow="THE CUSTOMER JOURNEY"
          title="Every Customer, *Connected* From First Hello"
          description="Keep your entire customer journey connected in one place, from the first enquiry to a lasting relationship."
          align="center"
        />
        <div className="journey__steps">
          <span className="journey__line" aria-hidden="true">
            <i className="journey__line-fill" />
          </span>
          {journey.map(({ icon: Icon, title, text }, i) => (
            <article className="journey__step" key={title}>
              <span className="journey__dot">
                <Icon aria-hidden="true" />
              </span>
              <span className="journey__index">Step {i + 1}</span>
              <h3 className="h3">{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function CRM() {
  return (
    <Page
      title="CRM Software"
      description="Creatif CRM helps you manage customer details, track work progress, organise follow-ups and keep your entire customer journey connected in one place."
      className="page--crm"
    >
      <ServiceHero
        eyebrow="CRM SOFTWARE"
        title={'Build Stronger Relationships.\n*Grow* Your Business.'}
        description="A powerful CRM solution that helps you manage customer details, track work progress, organize follow-ups, and keep your entire customer journey connected in one place."
        cta="Explore CRM Solutions"
        layout="split"
        chips={[
          { icon: Users, label: 'Customers' },
          { icon: Target, label: 'Leads' },
          { icon: BellRing, label: 'Follow-ups' },
        ]}
        visual={
          <div className="crm-visual">
            <CRMDashboard />
            <div className="svc-hero__float crm-visual__contact">
              <CRMContactCard />
            </div>
          </div>
        }
      />

      <StatementIntro
        label="INTRODUCTION"
        text="Manage customer details, track work progress, organize follow-ups, and stay connected with your clients through one powerful CRM platform built for your business."
      />

      <CustomerJourney />

      <FeatureCards
        eyebrow="FEATURES"
        title="Everything You Need to Manage *Customers*"
        items={features}
      />

      <section className="section section--dark why-svc">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container split z-1">
          <div>
            <SectionHeading
              eyebrow="WHY CRM"
              title="Never Lose Track of a *Customer* Again"
              description="When customer information lives in spreadsheets, notebooks and inboxes, opportunities get missed. A CRM brings it all together so your team can act faster and serve better."
            />
            <CheckList
              className="checklist--dark"
              items={[
                'One complete view of every customer',
                'Organised follow-ups that happen on time',
                'Clear visibility of work progress',
                'Stronger, longer-lasting relationships',
                'Better sales decisions with real data',
              ]}
            />
          </div>
          <div className="why-svc__visual" data-anim="clip" data-clip-dir="center">
            <div className="why-svc__visual-inner" data-clip-inner>
              <CRMContactCard />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="CRM SOFTWARE"
        title="Ready to Build *Stronger* Customer Relationships?"
        description="See how Creatif CRM can organise your customers, follow-ups and sales in one place."
        button="Explore CRM Solutions"
      />
    </Page>
  )
}
