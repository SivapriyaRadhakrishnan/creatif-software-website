import { useState } from 'react'
import { Camera } from 'lucide-react'

const initials = (name) =>
  name
    .split(' ')
    .filter((w) => w.length > 1)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

/**
 * Team profile card. If `member.image` is missing or fails to load, a
 * branded placeholder is shown instead (no stock or generated faces).
 */
export default function TeamCard({ member }) {
  const [failed, setFailed] = useState(false)
  const showImage = member.image && !failed

  return (
    <article className="team-card">
      <div className="team-card__media">
        {showImage ? (
          <img
            src={member.image}
            alt={`Portrait of ${member.name}, ${member.role}`}
            loading="lazy"
            width="480"
            height="600"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="team-card__placeholder" role="img" aria-label={`Photo of ${member.name} coming soon`}>
            <span className="team-card__initials">{initials(member.name)}</span>
            <span className="team-card__soon">
              <Camera aria-hidden="true" /> Photo coming soon
            </span>
          </div>
        )}
        <span className="team-card__role-tag">{member.role}</span>
      </div>
      <div className="team-card__body">
        <h3 className="team-card__name">{member.name}</h3>
        <p className="team-card__role">{member.role}</p>
        <p className="team-card__bio">{member.bio}</p>
      </div>
    </article>
  )
}
