/**
 * Contact form submission.
 *
 * Set VITE_CONTACT_ENDPOINT in a `.env` file to any endpoint that accepts a
 * JSON POST ({ name, email, message }), e.g. your own API, Formspree,
 * Web3Forms or a serverless function. Until it is set, submissions are NOT
 * sent and the form tells the visitor to use email/phone instead, so nobody
 * sees a false "message sent" confirmation.
 */

export class ContactNotConfiguredError extends Error {
  constructor() {
    super('Contact form endpoint is not configured.')
    this.name = 'ContactNotConfiguredError'
  }
}

export async function submitContactForm(data) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
  if (!endpoint) throw new ContactNotConfiguredError()

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
    return true
  } finally {
    clearTimeout(timeout)
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact({ name, email, message }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Please enter your name.'
  else if (name.trim().length < 2) errors.name = 'Name looks too short.'

  if (!email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(email.trim())) errors.email = 'Please enter a valid email address, e.g. name@company.com.'

  if (!message.trim()) errors.message = 'Please tell us a little about your project.'
  else if (message.trim().length < 10) errors.message = 'Please add a few more details (at least 10 characters).'

  return errors
}
