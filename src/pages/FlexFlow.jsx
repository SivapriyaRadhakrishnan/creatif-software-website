import {
  IdCard,
  CalendarCheck,
  CreditCard,
  Package,
  LineChart,
  Sparkles,
  Rocket,
  Dumbbell,
  Clock,
  BellRing,
} from 'lucide-react'
import Page from '../components/Page'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'
import { FlexFlowDashboard, FlexFlowPhone } from '../components/mockups/Dashboards'
import { ServiceHero, StatementIntro, CheckList } from '../sections/service/ServiceSections'

function AttendanceGraph() {
  const vals = [42, 58, 50, 72, 64, 88, 70, 54, 76, 68, 92, 80]
  return (
    <div className="ff-graph" aria-hidden="true">
      {vals.map((v, i) => (
        <i key={i} style={{ height: `${v}%` }} />
      ))}
    </div>
  )
}

function BillingRows() {
  return (
    <ul className="ff-billing" aria-hidden="true">
      {[
        ['Gold · Monthly', 'Paid', true],
        ['Silver · Quarterly', 'Due today', false],
        ['Platinum · Annual', 'Paid', true],
      ].map(([p, s, ok]) => (
        <li key={p}>
          <span>{p}</span>
          <em className={ok ? 'is-ok' : 'is-due'}>{s}</em>
        </li>
      ))}
    </ul>
  )
}

function PlanStack() {
  return (
    <div className="ff-plans" aria-hidden="true">
      {['Monthly', 'Quarterly', 'Annual'].map((p, i) => (
        <span key={p} style={{ '--i': i }}>
          <Package /> {p}
        </span>
      ))}
    </div>
  )
}

const bento = [
  {
    icon: IdCard,
    title: 'Membership Management',
    text: 'Register members, manage profiles and track every membership from one place.',
    size: 'wide',
    visual: <PlanStack />,
  },
  {
    icon: CalendarCheck,
    title: 'Attendance Tracking',
    text: 'See who checks in, when, and how often, with clear attendance graphs.',
    size: 'tall',
    visual: <AttendanceGraph />,
  },
  {
    icon: CreditCard,
    title: 'Billing & Packages',
    text: 'Handle renewals, package pricing and payments without the paperwork.',
    size: 'normal',
    visual: <BillingRows />,
  },
  {
    icon: LineChart,
    title: 'Business Performance',
    text: 'Analyse revenue, renewals and growth trends for your fitness business.',
    size: 'normal',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Insights',
    text: 'Smart suggestions that help you understand members and plan for growth.',
    size: 'accent',
  },
]

export default function FlexFlow() {
  return (
    <Page
      title="FlexFlow AI"
      description="FlexFlow AI is an AI-powered fitness management platform to manage memberships, attendance, billing, packages and business performance in one place."
      className="page--flexflow"
    >
      <ServiceHero
        eyebrow="FLEXFLOW AI"
        title={'Smarter Fitness Management.\nBetter Business *Growth.*'}
        description="Manage memberships, attendance, billing, packages, and business performance with an AI-powered platform designed to simplify your entire fitness business workflow."
        cta="Grow Smarter with FlexFlow"
        theme="warm"
        layout="split-reverse"
        chips={[
          { icon: Dumbbell, label: 'Gyms & studios' },
          { icon: Clock, label: 'Attendance' },
          { icon: BellRing, label: 'Renewals' },
        ]}
        visual={
          <div className="ff-visual">
            <FlexFlowDashboard />
            <div className="svc-hero__float ff-visual__phone">
              <FlexFlowPhone />
            </div>
          </div>
        }
      />

      <StatementIntro
        label="INTRODUCTION"
        text="FlexFlow AI brings your complete fitness business into one connected platform, making it easier to manage members, track attendance, handle billing, analyze performance, and plan for growth."
      />

      <section className="section ff-bento-section">
        <div className="container">
          <SectionHeading
            eyebrow="FEATURES"
            title="Your Entire Fitness Business, *One* Platform"
          />
          <div className="ff-bento" data-stagger="0.1">
            {bento.map(({ icon: Icon, title, text, size, visual }) => (
              <article className={`ff-card ff-card--${size}`} key={title}>
                <span className={`icon-badge ${size === 'accent' ? 'icon-badge--light' : ''}`}>
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="h3">{title}</h3>
                <p>{text}</p>
                {visual && <div className="ff-card__visual">{visual}</div>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark ff-why">
        <div className="bg-grid" aria-hidden="true" />
        <span className="orb orb--warm ff-why__orb" aria-hidden="true" data-parallax="0.3" />
        <div className="container split z-1">
          <div>
            <SectionHeading
              eyebrow="WHY FLEXFLOW AI"
              title="Spend Less Time Managing. More Time *Growing.*"
              description="Running a fitness business means juggling members, schedules and payments. FlexFlow AI handles the routine so you can focus on your members."
            />
            <CheckList
              className="checklist--dark"
              items={[
                'Every member, plan and payment in one place',
                'Clear attendance and membership statistics',
                'Simplified billing and package renewals',
                'AI-powered insights to plan for growth',
              ]}
            />
          </div>
          <div className="ff-why__stack" data-anim="slide-left">
            <div className="ff-stat">
              <Rocket aria-hidden="true" />
              <span>
                <small>Built for</small>
                <strong>Gyms, studios &amp; fitness centres</strong>
              </span>
            </div>
            <div className="ff-stat">
              <Sparkles aria-hidden="true" />
              <span>
                <small>Powered by</small>
                <strong>AI-driven business insights</strong>
              </span>
            </div>
            <div className="ff-stat">
              <CalendarCheck aria-hidden="true" />
              <span>
                <small>Simplifies</small>
                <strong>Members, attendance &amp; billing</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="FLEXFLOW AI"
        title="Ready to Grow Your Fitness *Business?*"
        description="Discover how FlexFlow AI can simplify memberships, attendance and billing for your gym or studio."
        button="Grow Smarter with FlexFlow"
      />
    </Page>
  )
}
