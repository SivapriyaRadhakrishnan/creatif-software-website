import {
  Calculator,
  Users,
  Clock,
  SlidersHorizontal,
  Fingerprint,
  CalendarDays,
  FileBarChart,
  CalendarCheck,
  PlusCircle,
  MinusCircle,
  FileCheck2,
  Wallet,
} from 'lucide-react'
import Page from '../components/Page'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'
import SplitText from '../components/SplitText'
import { PayrollDashboard, Payslip } from '../components/mockups/Dashboards'
import { ServiceHero, StatementIntro } from '../sections/service/ServiceSections'
import { useScrollAnimations, gsap } from '../animations/scrollAnimations'

const features = [
  { icon: Calculator, title: 'Automated Salary Processing' },
  { icon: Users, title: 'Employee Management' },
  { icon: Clock, title: 'Attendance & Timesheet Tracking' },
  { icon: SlidersHorizontal, title: 'Allowances & Deductions' },
  { icon: Fingerprint, title: 'Biometric Integration' },
  { icon: CalendarDays, title: 'Holiday Management' },
  { icon: FileBarChart, title: 'Accurate Payroll Reports' },
]

const steps = [
  { icon: CalendarCheck, title: 'Attendance', text: 'Attendance and timesheets flow in automatically.' },
  { icon: PlusCircle, title: 'Allowances', text: 'Allowances are applied for each employee.' },
  { icon: MinusCircle, title: 'Deductions', text: 'Deductions are calculated without manual work.' },
  { icon: FileCheck2, title: 'Payslips', text: 'Accurate salaries and payslips, ready to go.' },
]

function FeatureRail() {
  const ref = useScrollAnimations(({ motion }, scope) => {
    if (!motion) return
    const q = gsap.utils.selector(scope)
    q('.rail__item').forEach((item) => {
      gsap.from(item, {
        x: 60,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: item, start: 'top 88%', once: true },
      })
    })
  })

  return (
    <section className="section rail" ref={ref}>
      <div className="container rail__grid">
        <div className="rail__sticky">
          <SectionHeading
            eyebrow="FEATURES"
            title="Everything Payroll Needs, *Built In*"
            description="From the first punch-in to the final payslip, Kinetix covers every step of your payroll."
          />
          <div className="rail__visual" data-anim="clip" data-clip-dir="up">
            <div className="rail__visual-inner" data-clip-inner>
              <Payslip />
            </div>
          </div>
        </div>
        <ol className="rail__list">
          {features.map(({ icon: Icon, title }, i) => (
            <li className="rail__item" key={title}>
              <span className="rail__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="icon-badge">
                <Icon aria-hidden="true" />
              </span>
              <h3 className="h3">{title}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function ProcessHighlight() {
  const ref = useScrollAnimations(({ motion }, scope) => {
    if (!motion) return
    const q = gsap.utils.selector(scope)
    const tl = gsap.timeline({
      scrollTrigger: { trigger: q('.process__steps')[0], start: 'top 75%', end: 'bottom 60%', scrub: 0.8 },
    })
    tl.fromTo(q('.process__track i'), { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 })
    q('.process__step').forEach((step, i) => {
      tl.fromTo(
        step,
        { opacity: 0.35, y: 20 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        i * 0.25,
      )
    })
  })

  return (
    <section className="section section--dark process" ref={ref}>
      <div className="bg-grid" aria-hidden="true" />
      <div className="container z-1">
        <div className="process__head">
          <span className="eyebrow" data-anim="fade-up">
            WHY KINETIX PAYROLL
          </span>
          <SplitText as="h2" className="h2" text="Simpler Payroll. *Smarter* Employee Management." />
          <SplitText
            as="p"
            className="lead"
            mode="lines"
            text="Manage salaries, attendance, employee details, allowances, deductions, and payroll processes with one simple and efficient system."
          />
        </div>

        <div className="process__card" data-anim="scale-in">
          <div className="process__card-head">
            <span className="icon-badge icon-badge--red">
              <Wallet aria-hidden="true" />
            </span>
            <div>
              <h3 className="h3">Effortless Payroll Processing</h3>
              <p>
                Process salaries accurately, manage attendance, and handle employee payments without the hassle of
                manual calculations.
              </p>
            </div>
          </div>
          <div className="process__steps">
            <span className="process__track" aria-hidden="true">
              <i />
            </span>
            {steps.map(({ icon: Icon, title, text }) => (
              <div className="process__step" key={title}>
                <span className="process__dot">
                  <Icon aria-hidden="true" />
                </span>
                <strong>{title}</strong>
                <small>{text}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Kinetix() {
  return (
    <Page
      title="Kinetix Payroll System"
      description="Kinetix Payroll System simplifies salary processing, attendance, employee management, allowances, deductions and payroll reports for your business."
      className="page--kinetix"
    >
      <ServiceHero
        eyebrow="SMART PAYROLL MANAGEMENT"
        title={'Simplify Payroll.\n*Empower* Your People.'}
        description="Kinetix Payroll System makes salary processing, attendance, employee management, and payroll administration simple and efficient — giving your team more control and your employees a better experience."
        cta="Explore Kinetix Payroll"
        layout="split"
        visual={
          <div className="pay-visual">
            <PayrollDashboard />
            <div className="svc-hero__float pay-visual__slip">
              <Payslip />
            </div>
          </div>
        }
      />

      <StatementIntro
        label="INTRODUCTION"
        text="Kinetix Payroll simplifies salary processing, attendance, employee management, and payroll tasks, helping businesses save time, reduce errors, and manage their workforce efficiently."
      />

      <FeatureRail />
      <ProcessHighlight />

      <CTASection
        eyebrow="KINETIX PAYROLL"
        title="Make Every Payday *Effortless*"
        description="See how Kinetix Payroll can save your team time and reduce payroll errors."
        button="Explore Kinetix Payroll"
      />
    </Page>
  )
}
