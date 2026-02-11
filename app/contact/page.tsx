'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    device: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Repair request from ${formData.name}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nDevice: ${formData.device}\n\nMessage:\n${formData.message}`
    window.location.href = `mailto:samuel@haileyrepair.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="section" style={{ paddingTop: '2.2rem' }}>
      <div className="container">
        <div className="hgroup">
          <div>
            <h2>Contact</h2>
            <p>Tell us your device model and what’s happening. We’ll reply with next steps.</p>
          </div>
        </div>

        <div className="grid-3" style={{ gridTemplateColumns: '1.2fr 0.8fr 0.8fr' } as any}>
          <div className="card panel">
            <h3>Request a repair</h3>
            <form onSubmit={handleSubmit}>
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
                    <option value="" disabled>Select</option>
                    <option>Phone</option>
                    <option>Laptop</option>
                    <option>Tablet</option>
                    <option>Accessory</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: '0.9rem' }}>
                <label htmlFor="message">What’s happening?</label>
                <textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" type="submit">Send</button>
                <a className="btn" href="tel:+12084503730">Call</a>
                <a className="btn btn-ghost" href="mailto:samuel@haileyrepair.com">Email</a>
              </div>
              <div className="note">This form opens your email app — no data is stored on the website.</div>
            </form>
          </div>

          <aside className="card panel">
            <h3>Prefer to talk?</h3>
            <p>Call or text and we’ll figure out the best next step.</p>
            <div className="meta">
              <div className="meta-row"><strong>Phone</strong><span><a href="tel:+12084503730">(208) 450-3730</a></span></div>
              <div className="meta-row"><strong>Email</strong><span><a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a></span></div>
            </div>
            <div className="hero-actions" style={{ marginTop: '0.95rem' }}>
              <a className="btn btn-primary" href="tel:+12084503730">Call now</a>
              <a className="btn" href="/chat">Tech Helper</a>
            </div>
          </aside>

          <aside className="card panel">
            <h3>For faster quotes</h3>
            <p style={{ color: 'var(--muted)' }}>Include:</p>
            <div className="trustbar">
              <span className="chip">Device model</span>
              <span className="chip">What happened</span>
              <span className="chip">Does it power on?</span>
              <span className="chip">Any prior repairs?</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
