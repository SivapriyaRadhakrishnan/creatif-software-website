import { useEffect } from 'react'
import Seo from './Seo'
import { usePageReveals, ScrollTrigger } from '../animations/scrollAnimations'

/**
 * Wraps every route: sets SEO tags, wires the declarative scroll reveals for
 * everything inside, and recalculates trigger positions once the page and its
 * images have laid out.
 */
export default function Page({ title, description, className = '', children }) {
  const ref = usePageReveals()

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    })
    const imgs = ref.current ? [...ref.current.querySelectorAll('img')] : []
    const onImg = () => ScrollTrigger.refresh()
    imgs.forEach((img) => !img.complete && img.addEventListener('load', onImg, { once: true }))
    return () => {
      cancelAnimationFrame(raf)
      imgs.forEach((img) => img.removeEventListener('load', onImg))
    }
  }, [ref])

  return (
    <div className={`page ${className}`} ref={ref}>
      <Seo title={title} description={description} />
      {children}
    </div>
  )
}
