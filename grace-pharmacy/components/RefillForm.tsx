'use client'
import { useState, FormEvent } from 'react'

interface FormState {
  name: string
  prescription: string
  phone: string
}

interface FormErrors {
  name?: string
  prescription?: string
  phone?: string
}

export default function RefillForm() {
  const [form, setForm] = useState<FormState>({ name: '', prescription: '', phone: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (!/^[A-Za-z\s]+$/.test(form.name.trim())) {
      next.name = 'Please enter a valid name (letters only).'
    }
    if (!/^\d+$/.test(form.prescription.trim())) {
      next.prescription = 'Prescription number should contain digits only.'
    }
    if (!/^\(\+266\) \d{8}$/.test(form.phone.trim())) {
      next.phone = 'Use the format (+266) 58123456.'
    }
    return next
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSubmitted(true)
      setForm({ name: '', prescription: '', phone: '' })
    } else {
      setSubmitted(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">
          Full Name<span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your full name"
          required
          aria-label="Full Name"
          className={errors.name ? 'error' : ''}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="prescription">
          Prescription Number<span className="required">*</span>
        </label>
        <input
          type="text"
          id="prescription"
          name="prescription"
          placeholder="Your prescription number"
          required
          aria-label="Prescription Number"
          className={errors.prescription ? 'error' : ''}
          value={form.prescription}
          onChange={(e) => setForm({ ...form, prescription: e.target.value })}
        />
        {errors.prescription && <p className="field-error">{errors.prescription}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">
          Phone Number<span className="required">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="(+266) 58123456"
          required
          aria-label="Phone Number"
          title="Phone number should be in the format (+266) 58123456"
          className={errors.phone ? 'error' : ''}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        {errors.phone && <p className="field-error">{errors.phone}</p>}
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Submit Refill Request
        </button>
      </div>

      {submitted && (
        <p className="confirmation">Thank you! Your refill request has been submitted.</p>
      )}
    </form>
  )
}
