import { Hexagon } from 'lucide-react'

/**
 * Continuously scrolling client logo strip.
 * Pass real logos as `logos=[{ name, src }]`. Until then, clearly labelled
 * placeholders are shown so no client is implied.
 */
const PLACEHOLDERS = Array.from({ length: 10 }, (_, i) => ({
  name: `Client logo ${String(i + 1).padStart(2, '0')}`,
  src: null,
}))

export default function LogoMarquee({ logos = PLACEHOLDERS, reverse = false }) {
  const isPlaceholder = logos === PLACEHOLDERS
  const renderTrack = (hidden) => (
    <ul className="marquee__track" aria-hidden={hidden ? 'true' : undefined}>
      {logos.map((l) => (
        <li key={l.name} className={`logo-slot ${isPlaceholder ? 'logo-slot--placeholder' : ''}`}>
          {l.src ? (
            <img src={l.src} alt={hidden ? '' : l.name} loading="lazy" />
          ) : (
            <>
              <Hexagon aria-hidden="true" />
              <span>{l.name}</span>
            </>
          )}
        </li>
      ))}
    </ul>
  )

  return (
    <div className="logo-marquee">
      <div className={`marquee ${reverse ? 'marquee--reverse' : ''}`}>
        {renderTrack(false)}
        {renderTrack(true)}
      </div>
      {isPlaceholder && (
        <p className="logo-marquee__note">Placeholder slots. Client logos will be added once approved.</p>
      )}
    </div>
  )
}
