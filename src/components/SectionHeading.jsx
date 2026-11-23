import SplitText from './SplitText'

/**
 * Eyebrow + word-by-word heading + line-by-line description.
 * Pass `title` with *asterisks* around words to highlight them in red,
 * and `\n` for deliberate line breaks.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as = 'h2',
  className = '',
  children,
}) {
  return (
    <div className={`section-heading ${align === 'center' ? 'section-heading--center' : ''} ${className}`}>
      {eyebrow && (
        <span className={`eyebrow ${align === 'center' ? 'eyebrow--center' : ''}`} data-anim="fade-up">
          {eyebrow}
        </span>
      )}
      {title && <SplitText as={as} className="h2" text={title} />}
      {description && <SplitText as="p" className="lead" text={description} mode="lines" data-delay="0.15" />}
      {children}
    </div>
  )
}
