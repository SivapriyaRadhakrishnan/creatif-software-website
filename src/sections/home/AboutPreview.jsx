import {
  Workflow,
  PenTool,
  Lightbulb,
  Zap,
  GitBranch,
  LineChart,
  ListChecks,
  Sparkles,
} from 'lucide-react'
import SectionHeading from '../../components/SectionHeading'
import Button from '../../components/Button'

const highlights = [
  { icon: Workflow, label: 'Smart Automation' },
  { icon: PenTool, label: 'AI Content Assistant' },
  { icon: Lightbulb, label: 'Intelligent Insights' },
  { icon: Zap, label: 'Faster Decisions' },
  { icon: GitBranch, label: 'Workflow Automation' },
  { icon: LineChart, label: 'AI-Powered Analytics' },
  { icon: ListChecks, label: 'Task Management' },
]

export default function AboutPreview() {
  return (
    <section className="section about-preview">
      <div className="container split split--wide-right">
        <div className="about-visual" data-anim="clip" data-clip-dir="left">
          <div className="about-visual__inner" data-clip-inner>
            <div className="bg-grid" />
            <span className="orb orb--red about-visual__orb" data-parallax="0.25" />
            <div className="flow" data-parallax="-0.08">
              <div className="flow__node flow__node--trigger">
                <small>Trigger</small>
                <strong>New order received</strong>
              </div>
              <span className="flow__wire" />
              <div className="flow__node flow__node--ai">
                <Sparkles aria-hidden="true" />
                <small>Creatif AI</small>
                <strong>Classify &amp; route</strong>
              </div>
              <span className="flow__wire" />
              <div className="flow__split">
                <div className="flow__node">
                  <small>Action</small>
                  <strong>Create invoice</strong>
                </div>
                <div className="flow__node">
                  <small>Action</small>
                  <strong>Notify team</strong>
                </div>
              </div>
            </div>
            <div className="about-visual__stat" data-parallax="0.18">
              <span className="about-visual__stat-icon">
                <Zap aria-hidden="true" />
              </span>
              <span>
                <small>Workflow</small>
                <strong>Automated</strong>
              </span>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="ABOUT US"
            title="We create powerful software solutions that help businesses work *smarter,* faster, and more efficiently."
            className="about-preview__heading"
          />
          <p className="lead" data-anim="fade-up">
            Creatif Digital Solutions builds practical software solutions that simplify everyday business operations,
            connect teams, and help businesses work smarter and grow with confidence.
          </p>
          <ul className="highlights" data-stagger="0.06">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="chip">
                <Icon aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
          <div data-anim="fade-up">
            <Button to="/about" variant="dark">
              More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
