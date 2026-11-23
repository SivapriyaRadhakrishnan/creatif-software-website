import { useEffect } from 'react'

const setMeta = (selector, attr, value) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/)
    el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/** Sets the page title and description for each route. */
export default function Seo({ title, description }) {
  useEffect(() => {
    const full = title ? `${title} | Creatif Digital Solutions` : 'Creatif Digital Solutions | Smart Business Software'
    document.title = full
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }
    setMeta('meta[property="og:title"]', 'content', full)
  }, [title, description])
  return null
}
