'use client'
import { useState, FormEvent } from 'react'

interface FormState {
  name: string
  prescription: string
  phone: string
  notes: string
}

interface FormErrors {
  name?: string
  prescription?: string
  phone?: string
  notes?: string
}

const initialState: FormState = { name: '', prescription: '', phone: '', notes: '' }

export default function RefillForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const validateClientSide = (): FormErrors => {
    const next: FormErrors = {}
    if (!/^[A-Za-z\s]{2,80}$/.test(form.name.trim())) {
      next.name = 'Enter a valid full name (letters only).'
    }
    if (!/^\d{3,12}$/.test(form.prescription.trim())) {
      next.prescription = 'Prescription number should be 3-12 digits.'
    }
    if (!/^\(\+266\) \d{8}$/.test(form.phone.trim())) {
      next.phone = 'Use the format (+266) 58123456.'
    }
    return next
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const clientErrors = validateClientSide()
    setErrors(clientErrors)
    if (Object.keys(clientErrors).length > 0) {
      setStatus('idle')
      return
    }

    setStatus('submitting')
    setStatusMessage('')

    try {
      const res = await fetch('/api/refill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors)
        }
        setStatus('error')
        setStatusMessage(data.error || 'Please check the highlighted fields and try again.')
        return
      }

      setStatus('success')
      setStatusMessage(data.message || 'Thank you! Your refill request has been submitted.')
      setForm(initialState)
      setErrors({})
    } catch {
      setStatus('error')
      setStatusMessage('Something went wrong sending your request. Please try again or call us.')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="name">
          Full name<span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your full name"
          required
          aria-label="Full Name"
          aria-invalid={Boolean(errors.name)}
          className={errors.name ? 'error' : ''}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="prescription">
          Prescription number<span className="required">*</span>
        </label>
        <input
          type="text"
          id="prescription"
          name="prescription"
          placeholder="e.g. 48213"
          required
          aria-label="Prescription Number"
          aria-invalid={Boolean(errors.prescription)}
          className={errors.prescription ? 'error' : ''}
          value={form.prescription}
          onChange={(e) => setForm({ ...form, prescription: e.target.value })}
        />
        {errors.prescription && <p className="field-error">{errors.prescription}</p>}
        <p className="field-hint">Found at the top of your prescription label.</p>
      </div>

      <div className="form-row">
        <label htmlFor="phone">
          Phone number<span className="required">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="(+266) 58123456"
          required
          aria-label="Phone Number"
          title="Phone number should be in the format (+266) 58123456"
          aria-invalid={Boolean(errors.phone)}
          className={errors.phone ? 'error' : ''}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        {errors.phone && <p className="field-error">{errors.phone}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Anything we should know — preferred pickup time, substitutions, etc."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        {errors.notes && <p className="field-error">{errors.notes}</p>}
      </div>

      <button type="submit" className="btn btn-pine btn-block" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Submit refill request'}
      </button>

      {status === 'success' && <p className="form-status success">{statusMessage}</p>}
      {status === 'error' && <p className="form-status error">{statusMessage}</p>}
    </form>
  )
}
