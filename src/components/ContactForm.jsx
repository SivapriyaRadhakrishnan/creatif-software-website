import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Send, Info } from 'lucide-react'
import { submitContactForm, validateContact, ContactNotConfiguredError } from '../services/contact'
import { SITE } from '../config/site'

const EMPTY = { name: '', email: '', message: '' }

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error | unconfigured
  const formRef = useRef(null)

  const update = (e) => {
    const { name, value } = e.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name]) setErrors(validateContact(next))
    if (status !== 'idle' && status !== 'loading') setStatus('idle')
  }

  const blur = (e) => {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validateContact(values))
  }

  const submit = async (e) => {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    setTouched({ name: true, email: true, message: true })
    const first = Object.keys(found)[0]
    if (first) {
      formRef.current?.elements.namedItem(first)?.focus()
      return
    }

    setStatus('loading')
    try {
      await submitContactForm({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      })
      setStatus('success')
      setValues(EMPTY)
      setTouched({})
    } catch (err) {
      setStatus(err instanceof ContactNotConfiguredError ? 'unconfigured' : 'error')
    }
  }

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: update,
    onBlur: blur,
    'aria-invalid': touched[name] && errors[name] ? 'true' : 'false',
    'aria-describedby': touched[name] && errors[name] ? `contact-${name}-error` : undefined,
    required: true,
    disabled: status === 'loading',
  })

  const showError = (name) => touched[name] && errors[name]

  const mailtoHref = `mailto:${SITE.email}?subject=${encodeURIComponent(
    `Project enquiry from ${values.name || 'website visitor'}`,
  )}&body=${encodeURIComponent(values.message)}`

  return (
    <form className="contact-form" onSubmit={submit} noValidate ref={formRef}>
      <div className="contact-form__row">
        {['name', 'email'].map((name) => (
          <div className="field" data-invalid={showError(name) ? 'true' : 'false'} key={name}>
            <label htmlFor={`contact-${name}`}>
              {name === 'name' ? 'Full name' : 'Email address'} <span aria-hidden="true" className="text-red">*</span>
            </label>
            <input
              {...fieldProps(name)}
              type={name === 'email' ? 'email' : 'text'}
              autoComplete={name === 'email' ? 'email' : 'name'}
              placeholder={name === 'email' ? 'you@company.com' : 'Your name'}
            />
            <FieldError id={`contact-${name}-error`} message={showError(name)} />
          </div>
        ))}
      </div>

      <div className="field" data-invalid={showError('message') ? 'true' : 'false'}>
        <label htmlFor="contact-message">
          Message <span aria-hidden="true" className="text-red">*</span>
        </label>
        <textarea
          {...fieldProps('message')}
          placeholder="Tell us about your business and what you’d like to simplify…"
          rows={6}
        />
        <FieldError id="contact-message-error" message={showError('message')} />
      </div>

      <div className="contact-form__footer">
        <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <>
              <span className="spinner" aria-hidden="true" />
              <span>Sending…</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send aria-hidden="true" />
            </>
          )}
        </button>
        <p className="contact-form__hint">Fields marked * are required.</p>
      </div>

      <div aria-live="polite" role="status">
        <AnimatePresence mode="wait">
          {status === 'success' && (
            <Alert key="ok" tone="success" icon={CheckCircle2}>
              <strong>Thank you! Your message has been sent.</strong> Our team will get back to you soon.
            </Alert>
          )}
          {status === 'error' && (
            <Alert key="err" tone="error" icon={AlertCircle}>
              <strong>We couldn’t send your message.</strong> Please try again in a moment, or email us at{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </Alert>
          )}
          {status === 'unconfigured' && (
            <Alert key="cfg" tone="info" icon={Info}>
              <strong>Online form submissions aren’t connected yet.</strong> Your message has not been sent. Please{' '}
              <a href={mailtoHref}>email it to us</a> or call <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>.
            </Alert>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

function FieldError({ id, message }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          className="field__error"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <AlertCircle aria-hidden="true" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

function Alert({ tone, icon: Icon, children }) {
  return (
    <motion.div
      className={`alert alert--${tone}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <Icon aria-hidden="true" />
      <p>{children}</p>
    </motion.div>
  )
}
