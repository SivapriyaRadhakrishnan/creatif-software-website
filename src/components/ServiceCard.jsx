import { Link } from 'react-router-dom'
import TiltCard from './TiltCard'
import MiniVisual from './mockups/MiniVisuals'
import { LinkArrow } from './Button'

export default function ServiceCard({ service, index, featured = false }) {
  const Icon = service.icon
  return (
    <TiltCard className="service-card-tilt" max={featured ? 4 : 6}>
      <Link to={service.path} className={`card card-hover service-card ${featured ? 'service-card--featured' : ''}`}>
        <div className="service-card__visual">
          <div className="service-card__visual-inner">
            <MiniVisual type={service.visual} />
          </div>
          <span className="service-card__index">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="service-card__body">
          <span className="icon-badge">
            <Icon aria-hidden="true" />
          </span>
          <h3 className="h3">{service.cardTitle}</h3>
          <p>{service.cardDescription}</p>
          <LinkArrow as="span" className="service-card__cta">
            Explore <span className="sr-only">{service.cardTitle}</span>
          </LinkArrow>
        </div>
      </Link>
    </TiltCard>
  )
}
