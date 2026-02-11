import Link from 'next/link'
import Particles from './components/Particles'

export default function Home() {
  return (
    <>
      <section className="hero">
        <Particles />
        <div className="container">
          <div className="hero-center">
            <span className="kicker">Hailey • Wood River Valley • Open 7 days/week</span>
            <h1>Honest repairs. Done right.</h1>
            <p className="lead">
              Phone, laptop, and tablet repair in Hailey, Idaho — with clear diagnostics, quality parts, and respectful handling of your data.
            </p>

            <div className="hero-actions">
              <Link className="btn btn-primary" href="/contact">Request a repair</Link>
              <Link className="btn btn-secondary" href="/chat">Try Tech Helper</Link>
              <a className="btn" href="#use-cases">Explore services</a>
            </div>

            <div className="chips" aria-label="Highlights">
              <span className="chip">Straight answers</span>
              <span className="chip">No-pressure quotes</span>
              <span className="chip">Quality parts</span>
              <span className="chip">Local + responsive</span>
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="section">
        <div className="container">
          <div className="section-head">
            <h2>Services</h2>
            <p>Pick a category. If you’re not sure, start with Tech Helper or send a quick message and we’ll point you in the right direction.</p>
          </div>

          <div className="grid">
            <article className="card">
              <h3>Phone repair</h3>
              <p>Screens, batteries, charging issues, speaker/mic problems, and troubleshooting.</p>
              <div className="hero-actions" style={{ justifyContent: 'flex-start', marginTop: '0.85rem' }}>
                <Link className="btn btn-secondary" href="/contact">Get a quote</Link>
                <Link className="btn" href="/chat">Tech Helper</Link>
              </div>
            </article>

            <article className="card">
              <h3>Laptops + IT help</h3>
              <p>Slow device cleanup, OS issues, setup help, and practical tech support.</p>
              <div className="hero-actions" style={{ justifyContent: 'flex-start', marginTop: '0.85rem' }}>
                <Link className="btn btn-secondary" href="/contact">Request help</Link>
                <Link className="btn" href="/chat">Tech Helper</Link>
              </div>
            </article>

            <article className="card">
              <h3>Tablets & accessories</h3>
              <p>iPads/tablets, setup, accessories, and smaller fixes.</p>
              <div className="hero-actions" style={{ justifyContent: 'flex-start', marginTop: '0.85rem' }}>
                <Link className="btn btn-secondary" href="/contact">Contact</Link>
                <Link className="btn" href="/faq">FAQ</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>How it works</h2>
            <p>A transparent process built for quality and clarity.</p>
          </div>

          <div className="grid">
            <article className="card">
              <h3>1) Diagnosis</h3>
              <p>We assess the issue and tell you what’s worth fixing (and what isn’t).</p>
            </article>
            <article className="card">
              <h3>2) Approval</h3>
              <p>You get a clear quote and options. No work begins until you say yes.</p>
            </article>
            <article className="card">
              <h3>3) Repair</h3>
              <p>Quality parts + careful work. One device at a time — no assembly line.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="panel">
              <h3>Not sure what you need?</h3>
              <p>Try the Tech Helper for fast troubleshooting. If it needs hands-on work, it’ll tell you to call/text Sam.</p>
              <div className="hero-actions" style={{ justifyContent: 'flex-start' }}>
                <Link className="btn btn-primary" href="/chat">Open Tech Helper</Link>
                <a className="btn" href="tel:+12084503730">Call (208) 450‑3730</a>
              </div>
            </div>

            <div className="panel">
              <h3>Fast contact</h3>
              <p>For the quickest quote, include your device model and what happened.</p>
              <div className="meta">
                <div className="meta-row"><strong>Phone</strong><span><a href="tel:+12084503730">(208) 450-3730</a></span></div>
                <div className="meta-row"><strong>Email</strong><span><a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a></span></div>
                <div className="meta-row"><strong>Area</strong><span>Hailey • Ketchum • Sun Valley • Bellevue</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
