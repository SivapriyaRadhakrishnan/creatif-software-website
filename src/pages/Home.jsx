import Page from '../components/Page'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import Testimonials from '../components/Testimonial'
import CTASection from '../components/CTASection'
import AboutPreview from '../sections/home/AboutPreview'
import WhyCreatif from '../sections/home/WhyCreatif'
import BuiltForBusiness from '../sections/home/BuiltForBusiness'
import Advantage from '../sections/home/Advantage'
import Impact from '../sections/home/Impact'
import { services } from '../data/services'

export default function Home() {
  return (
    <Page
      description="Creatif Digital Solutions builds CRM, ERP, payroll, FlexFlow AI and AI chatbot software that brings your customers, sales, billing, employees and workflows into one smart ecosystem."
    >
      <Hero />

      <section className="section solutions" id="solutions">
        <div className="container">
          <div className="solutions__head">
            <SectionHeading
              eyebrow="OUR SOLUTIONS"
              title="Powerful Software for Every *Business* Need"
              description="From customer management and business operations to payroll and AI-powered automation, our software solutions help you simplify workflows, improve efficiency, and grow with confidence."
            />
          </div>
          <div className="solutions__grid" data-stagger="0.12">
            {services.map((s, i) => (
              <div className={`solutions__cell solutions__cell--${i}`} key={s.slug}>
                <ServiceCard service={s} index={i} featured={i < 2} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutPreview />
      <WhyCreatif />
      <BuiltForBusiness />
      <Advantage />
      <Impact />

      <section className="section section--tint testimonials">
        <div className="container">
          <SectionHeading eyebrow="TESTIMONIAL" title="What Our *Clients* Say" align="center" />
          <div data-anim="fade-up">
            <Testimonials />
          </div>
        </div>
      </section>

      <CTASection />
    </Page>
  )
}
