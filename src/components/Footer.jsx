import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import SocialIcons from './SocialIcons'
import { SITE } from '../config/site'
import { services } from '../data/services'
import { useScrollAnimations, gsap } from '../animations/scrollAnimations'

export default function Footer() {
  const ref = useScrollAnimations(({ motion }, scope) => {
    if (!motion) return
    const tl = gsap.timeline({
      scrollTrigger: { trigger: scope, start: 'top 88%', once: true },
    })
    tl.from('.footer__brand > *', { y: 30, opacity: 0, stagger: 0.08, duration: 0.9 })
      .from('.footer__col', { y: 40, opacity: 0, stagger: 0.1, duration: 0.9 }, '-=0.6')
      .from('.footer__bottom', { opacity: 0, duration: 0.8 }, '-=0.4')
      .from('.footer__wordmark span', { yPercent: 100, stagger: 0.04, duration: 1.2, ease: 'expo.out' }, '-=1')
  })

  return (
    <footer className="footer" ref={ref}>
      <div className="footer__glow" aria-hidden="true" />
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo plate height={40} />
            <p className="footer__name">{SITE.footerName}</p>
            <p className="footer__tag">
              Smart software that brings customers, sales, billing, employees and payroll into one connected ecosystem.
            </p>
            <SocialIcons />
          </div>

          <div className="footer__col">
            <h2 className="footer__title">Navigation</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="footer__title">Solutions</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={s.path}>{s.navLabel}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col footer__col--contact">
            <h2 className="footer__title">Address</h2>
            <p className="footer__line">
              <MapPin aria-hidden="true" />
              <span>
                {SITE.address.map((l) => (
                  <span key={l} className="footer__addr">{l}</span>
                ))}
              </span>
            </p>
            <h2 className="footer__title footer__title--spaced">Contact Us</h2>
            <a className="footer__line footer__line--link" href={`mailto:${SITE.email}`}>
              <Mail aria-hidden="true" />
              <span>{SITE.email}</span>
            </a>
            <a className="footer__line footer__line--link" href={SITE.phoneHref}>
              <Phone aria-hidden="true" />
              <span>{SITE.phoneDisplay}</span>
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>{SITE.copyright}</p>
          <Link to="/contact" className="footer__cta">
            Start a project <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="footer__wordmark" aria-hidden="true">
        {'CREATIF'.split('').map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>
    </footer>
  )
}
