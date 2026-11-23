/**
 * Splits text into masked words for GSAP reveals.
 * - `\n` forces a line break.
 * - Wrap a word in *asterisks* to render it in brand red.
 * Screen readers get the plain sentence; the split copy is aria-hidden.
 */
export default function SplitText({ as: Tag = 'span', text, mode = 'words', className, ...rest }) {
  const plain = text.replace(/\*/g, '').replace(/\n/g, ' ')
  const lines = text.split('\n')

  return (
    <Tag className={className} data-anim={mode} {...rest}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span className="split-line" key={li}>
            {line
              .split(' ')
              .filter(Boolean)
              .map((word, wi, arr) => {
                const accent = /^\*.*\*[.,!?]?$/.test(word)
                const clean = word.replace(/\*/g, '')
                return (
                  <span key={wi}>
                    <span className="split-word">
                      <span className={accent ? 'split-inner is-accent' : 'split-inner'}>{clean}</span>
                    </span>
                    {wi < arr.length - 1 ? ' ' : ''}
                  </span>
                )
              })}
          </span>
        ))}
      </span>
    </Tag>
  )
}
