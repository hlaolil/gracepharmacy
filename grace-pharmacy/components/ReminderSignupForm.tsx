'use client'
import { useState, FormEvent } from 'react'

const INTERVALS = [
  { days: 28, label: 'Every 4 weeks' },
  { days: 30, label: 'Every month' },
  { days: 60, label: 'Every 2 months' },
  { days: 90, label: 'Every 3 months' },
]

interface FormState {
  name: string
  email: string
  phone: string
  nextDue: string
  intervalDays: string
  consent: boolean
  website: string // honeypot
}

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'nextDue' | 'intervalDays' | 'consent', string>>

const initialState: FormState = { name: '', email: '', phone: '', nextDue: '', intervalDays: '30', consent: false, website: '' }

const todayLocal = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function ReminderSignupForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const validate = (): Errors => {
    const next: Errors = {}
    if (!/^[A-Za-z][A-Za-z\s'.-]{1,79}$/.test(form.name.trim())) next.name = 'Enter your name (letters only).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (form.phone.trim() && !/^\(\+266\) \d{8}$/.test(form.phone.trim())) next.phone = 'Use the format (+266) 58123456, or leave it blank.'
    if (!form.nextDue) next.nextDue = 'Choose the date your next refill is due.'
    else if (form.nextDue < todayLocal()) next.nextDue = 'That date has passed. Choose your next refill date.'
    if (!form.consent) next.consent = 'Please tick the box to agree to reminder emails.'
    return next
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const clientErrors = validate()
    setErrors(clientErrors)
    if (Object.keys(clientErrors).length > 0) return

    setStatus('submitting')
    setStatusMessage('')
    try {
      const res = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, intervalDays: Number(form.intervalDays) }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.errors) setErrors(data.errors)
        setStatus('error')
        setStatusMessage(data.error || 'Please check the highlighted fields and try again.')
        return
      }
      setStatus('success')
      setStatusMessage(data.message)
      setForm(initialState)
      setErrors({})
    } catch {
      setStatus('error')
      setStatusMessage('Something went wrong. Please try again or call us.')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="r-name">Your name<span className="required">*</span></label>
        <input
          type="text"
          id="r-name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          className={errors.name ? 'error' : ''}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="r-email">Email address<span className="required">*</span></label>
        <input
          type="email"
          id="r-email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          className={errors.email ? 'error' : ''}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>

      <div className="form-grid-2">
        <div className="form-row">
          <label htmlFor="r-due">Next refill due<span className="required">*</span></label>
          <input
            type="date"
            id="r-due"
            min={todayLocal()}
            aria-invalid={Boolean(errors.nextDue)}
            className={errors.nextDue ? 'error' : ''}
            value={form.nextDue}
            onChange={(e) => setForm({ ...form, nextDue: e.target.value })}
          />
          {errors.nextDue && <p className="field-error">{errors.nextDue}</p>}
        </div>
        <div className="form-row">
          <label htmlFor="r-interval">How often?<span className="required">*</span></label>
          <select
            id="r-interval"
            value={form.intervalDays}
            onChange={(e) => setForm({ ...form, intervalDays: e.target.value })}
          >
            {INTERVALS.map((o) => (
              <option key={o.days} value={o.days}>{o.label}</option>
            ))}
          </select>
          {errors.intervalDays && <p className="field-error">{errors.intervalDays}</p>}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="r-phone">Phone (optional)</label>
        <input
          type="tel"
          id="r-phone"
          placeholder="(+266) 58123456"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          className={errors.phone ? 'error' : ''}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        {errors.phone && <p className="field-error">{errors.phone}</p>}
        <p className="field-hint">So we can call if an email bounces.</p>
      </div>

      <div className="hp-field" aria-hidden="true">
        <label htmlFor="r-website">Leave this empty</label>
        <input type="text" id="r-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
      </div>

      <div className="form-row">
        <div className="checkbox-row">
          <input
            type="checkbox"
            id="r-consent"
            checked={form.consent}
            aria-invalid={Boolean(errors.consent)}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          />
          <label htmlFor="r-consent">
            I agree to receive refill reminder emails. I can stop them any time using the link in each email.
          </label>
        </div>
        {errors.consent && <p className="field-error">{errors.consent}</p>}
      </div>

      <button type="submit" className="btn btn-teal btn-block" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Signing you up…' : 'Remind me before each refill'}
      </button>

      {status === 'success' && <p className="form-status success">{statusMessage}</p>}
      {status === 'error' && <p className="form-status error">{statusMessage}</p>}
    </form>
  )
}
