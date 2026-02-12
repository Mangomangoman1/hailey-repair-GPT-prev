'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    device: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Repair request from ${formData.name}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nDevice: ${formData.device}\n\nMessage:\n${formData.message}`
    window.location.href = `mailto:samuel@haileyrepair.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="page">
      <div className="container">
        <h2>Contact</h2>
        <p className="lead2">Tell us your device model and what’s happening. This form opens your email app—nothing is stored on the website.</p>

        <div className="split">
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Request a repair</h3>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div>
                  <label htmlFor="name">Name</label>
                  <input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="device">Device</label>
                  <select id="device" value={formData.device} onChange={(e) => setFormData({ ...formData, device: e.target.value })} required>
                    <option value="" disabled>
                      Select
                    </option>
                    <option>Phone</option>
                    <option>Laptop</option>
                    <option>Tablet</option>
                    <option>Accessory</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message">What’s happening?</label>
                <textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
              </div>

              <div className="actions">
                <button className="btn btn-primary" type="submit">
                  Send
                </button>
                <a className="btn" href="tel:+12084503730">
                  Call
                </a>
                <Link className="btn btn-ghost" href="/chat">
                  Tech Helper
                </Link>
              </div>

              <div className="note">No appointment required to start a conversation.</div>
            </form>
          </div>

          <div>
            <div className="big">
              <h3>Fast contact</h3>
              <p>
                If you’d rather text/call: <a href="tel:+12084503730">(208) 450-3730</a>
                <br />
                Email: <a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a>
              </p>
              <div className="badges" style={{ marginTop: '0.85rem' }}>
                <span className="badge">Exact model</span>
                <span className="badge">What happened</span>
                <span className="badge">Power on?</span>
                <span className="badge">Prior repairs?</span>
              </div>
              <div className="actions" style={{ marginTop: '0.95rem' }}>
                <a className="btn btn-primary" href="tel:+12084503730">
                  Call now
                </a>
                <Link className="btn" href="/chat">
                  Tech Helper
                </Link>
              </div>
            </div>

            <div className="big" style={{ marginTop: '1rem' }}>
              <h3>What we’ll ask</h3>
              <p>Just enough detail to quote accurately and order the right part.</p>
              <p className="note" style={{ marginTop: '0.6rem' }}>
                Tip: If your priority is data recovery, say that up front.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
