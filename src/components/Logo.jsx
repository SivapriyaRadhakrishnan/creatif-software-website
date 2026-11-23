import { Link } from 'react-router-dom'
import { SITE } from '../config/site'

/** Official Creatif logo. Never recolour or redraw it; use `plate` on dark backgrounds. */
export default function Logo({ plate = false, className = '', height = 44 }) {
  return (
    <Link to="/" className={`logo ${plate ? 'logo--plate' : ''} ${className}`} aria-label="Creatif Digital Solutions, home">
      <img src={SITE.logo} alt="Creatif Software Solutions" width={Math.round(height * 2.708)} height={height} style={{ height }} />
    </Link>
  )
}
