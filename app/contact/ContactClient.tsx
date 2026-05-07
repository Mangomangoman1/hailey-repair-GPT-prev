'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Repair request from ${formData.name}`
    const body = `Name: ${formData.name}\nBest contact: ${formData.contact}\n\nWhat happened / device details:\n${formData.message}`
    window.location.href = `mailto:samuel@haileyrepair.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="page contact-page">
      <div className="container">
        <div className="contact-hero">
          <div>
            <div className="contact-kicker">Hailey repair intake</div>
            <h1>Text the problem. Get the right repair path.</h1>
            <p className="lead2">
              For phones, laptops, tablets, consoles, and small electronics in Hailey and the Wood River Valley, send the model, what happened, and whether it powers on. I’ll tell you the safest next step before you waste time or order the wrong part.
            </p>
            <div className="actions contact-hero-actions">
              <a className="btn btn-primary" href="sms:+12083666111">
                Text Samuel now
              </a>
              <a className="btn" href="tel:+12083666111">
                Call (208) 366-6111
              </a>
            </div>
            <p className="contact-risk">No pressure to book — just enough triage to avoid making the device worse.</p>
          </div>

          <aside className="intake-ticket" aria-label="Best first text example">
            <div className="ticket-topline">
              <span>Best first text</span>
              <span>HDR intake</span>
            </div>
            <div className="ticket-message">
              “iPhone 13, dropped yesterday, screen is green but it still rings. I’m in Hailey and can send photos.”
            </div>
            <div className="ticket-checks">
              <span>Model</span>
              <span>What happened</span>
              <span>Powers on?</span>
              <span>Photos</span>
            </div>
          </aside>
        </div>

        <div className="split contact-split">
          <div className="card contact-card">
            <h2>Request a repair by email</h2>
            <p className="contact-card-copy">Three fields is enough. Include the model and the symptom in the message; phone is optional.</p>
            <form className="form contact-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <label htmlFor="contact">Best contact email or phone</label>
                <input id="contact" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} required />
              </div>
              <div>
                <label htmlFor="message">Device model + what’s happening</label>
                <textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
              </div>

              <div className="actions contact-form-actions">
                <button className="btn btn-primary" type="submit">
                  Open my repair email
                </button>
                <a className="btn" href="sms:+12083666111">
                  Text instead
                </a>
              </div>

              <div className="note">The form opens your email app. Nothing is stored on the website.</div>
            </form>
          </div>

          <div className="contact-side">
            <div className="big">
              <h2>Fast contact</h2>
              <p>
                Text: <a href="sms:+12083666111">(208) 366-6111</a>
                <br />
                Email: <a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a>
              </p>
              <div className="actions" style={{ marginTop: '0.95rem' }}>
                <a className="btn btn-primary" href="sms:+12083666111">
                  Send the repair details
                </a>
                <Link className="btn" href="/chat">
                  Try Tech Helper first
                </Link>
              </div>
            </div>

            <div className="big" style={{ marginTop: '1rem' }}>
              <h2>What to include</h2>
              <div className="badges contact-badges" style={{ marginTop: '0.85rem' }}>
                <span className="badge">Exact model</span>
                <span className="badge">What happened</span>
                <span className="badge">Power on?</span>
                <span className="badge">Data priority</span>
                <span className="badge">Photos if useful</span>
              </div>
              <p className="note" style={{ marginTop: '0.8rem' }}>
                If it got wet, do not plug it in. Tell me liquid, heat, drop damage, and whether your data matters most.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
