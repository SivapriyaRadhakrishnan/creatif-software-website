import { Mail, Phone, MapPin, Clock3, ArrowUpRight } from 'lucide-react'
import Page from '../components/Page'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import ContactForm from '../components/ContactForm'
import CTASection from '../components/CTASection'
import FAQ from '../components/FAQ'
import Button from '../components/Button'
import { SITE } from '../config/site'
import { contactFaqs } from '../data/faqs'

const channels = [
  { icon: Mail, label: 'Email us', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: 'Call us', value: SITE.phoneDisplay, href: SITE.phoneHref },
  { icon: MapPin, label: 'Visit us', value: SITE.address.join(', ') },
]

function HeroChannels() {
  return (
    <div className="channels-visual" aria-hidden="true">
      <div className="channels-visual__card channels-visual__card--main">
        <span className="channels-visual__badge">
          <span className="pulse-dot" /> We’re listening
        </span>
        <strong>Tell us what you want to simplify.</strong>
        <div className="channels-visual__lines">
          <i />
          <i />
          <i />
        </div>
        <span className="channels-visual__send">
          Send <ArrowUpRight />
        </span>
      </div>
      <div className="channels-visual__card channels-visual__card--mail float-slow">
        <Mail />
        <span>
          <small>Email</small>
          <b>Reply from our team</b>
        </span>
      </div>
      <div className="channels-visual__card channels-visual__card--call float-slower">
        <Phone />
        <span>
          <small>Call</small>
          <b>Talk to an expert</b>
        </span>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <Page
      title="Contact Us"
      description="Have a project in mind? Contact Creatif Digital Solutions at CIASL Business Centre, CIAL Aero Park, and let's build smart software for your business together."
    >
      <PageHero
        eyebrow="CONTACT US"
        title={"Let's Build Something\n*Smart* Together"}
        description="Have a project in mind? Our team is ready to turn your ideas into powerful software solutions."
        actions={
          <Button href="#contact-form" arrow>
            Send a Message
          </Button>
        }
        className="page-hero--contact"
      >
        <HeroChannels />
      </PageHero>

      <section className="section contact-main" id="contact-form">
        <div className="container contact-main__grid">
          <aside className="contact-info">
            <SectionHeading eyebrow="GET IN TOUCH" title="Start the *Conversation*" />
            <ul className="contact-info__list" data-stagger="0.1">
              {channels.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="icon-badge">
                      <Icon aria-hidden="true" />
                    </span>
                    <span>
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </span>
                  </>
                )
                return (
                  <li key={label}>
                    {href ? (
                      <a className="contact-info__item contact-info__item--link" href={href}>
                        {inner}
                      </a>
                    ) : (
                      <div className="contact-info__item">{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>
            <div className="contact-info__note" data-anim="fade-up">
              <Clock3 aria-hidden="true" />
              <p>Share a few details about your business and we’ll get back to you to discuss the next steps.</p>
            </div>
          </aside>

          <div className="contact-panel card" data-anim="slide-left">
            <h2 className="h3 contact-panel__title">Send us a message</h2>
            <p className="contact-panel__sub">We’ll use your details only to respond to your enquiry.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="LET'S BUILD TOGETHER"
        title={"Let's Build *Together*"}
        description="From CRM and ERP to payroll and AI-powered automation, we’ll help you find the right software for your business."
        button="Get Started"
        to="/contact#contact-form"
        secondary={{ label: 'Explore Solutions', to: '/#solutions' }}
      />

      <section className="section section--soft faq-section">
        <div className="container faq-layout">
          <div className="faq-layout__side">
            <SectionHeading eyebrow="FAQ" title="Frequently Asked *Questions*" />
            <p className="lead" data-anim="fade-up">
              Quick answers about working with Creatif. Still curious? Just ask.
            </p>
            <div data-anim="fade-up">
              <Button href={`mailto:${SITE.email}`} variant="dark">
                Email Our Team
              </Button>
            </div>
          </div>
          <FAQ items={contactFaqs} />
        </div>
      </section>
    </Page>
  )
}
