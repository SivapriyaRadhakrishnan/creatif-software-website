import SectionHeading from '../../components/SectionHeading'
import Counter from '../../components/Counter'
import LogoMarquee from '../../components/LogoMarquee'

const stats = [
  { value: 4.9, decimals: 1, suffix: '/5', label: 'Trusted by businesses across Kerala' },
  { value: 500, suffix: '+', label: 'Businesses Supported' },
  { value: 25, suffix: 'K+', label: 'Transactions Managed' },
  { value: 10, suffix: 'K+', label: 'Employees Managed' },
  { value: 300, suffix: '+', label: 'Projects Delivered' },
]

export default function Impact() {
  return (
    <section className="section impact">
      <div className="container">
        <SectionHeading
          eyebrow="BUSINESS IMPACT"
          title="Built to Deliver *Real* Business Results"
          align="center"
        />
        <div className="impact__grid" data-stagger="0.08">
          {stats.map((s, i) => (
            <div className={`impact__cell ${i === 0 ? 'impact__cell--feature' : ''}`} key={s.label}>
              <Counter {...s} />
            </div>
          ))}
        </div>
      </div>

      <div className="impact__trusted">
        <div className="container">
          <p className="impact__trusted-title" data-anim="fade-up">
            Trusted by <strong>500+</strong> Brands &amp; Companies
          </p>
        </div>
        <div data-anim="fade">
          <LogoMarquee />
        </div>
      </div>
    </section>
  )
}
