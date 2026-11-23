import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

/**
 * Brand button. Internal routes use `to`, external/mailto use `href`,
 * hash links on the same page use `href="#id"`.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size,
  arrow = true,
  className = '',
  children,
  ...rest
}) {
  const cls = ['btn', `btn--${variant}`, size ? `btn--${size}` : '', className].filter(Boolean).join(' ')
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  )
}

/** "Explore →" style link with a sliding arrow. */
export function LinkArrow({ to, children, as, className = '', ...rest }) {
  const inner = (
    <>
      <span>{children}</span>
      <span className="link-arrow__icon" aria-hidden="true">
        <ArrowUpRight />
        <ArrowUpRight />
      </span>
    </>
  )
  if (as === 'span') {
    return <span className={`link-arrow ${className}`}>{inner}</span>
  }
  return (
    <Link to={to} className={`link-arrow ${className}`} {...rest}>
      {inner}
    </Link>
  )
}
