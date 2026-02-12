import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="kicker">Hailey • Wood River Valley • Open 7 days/week</span>
            <h1>Device repair with integrity.</h1>
            <p className="lead">
              Straight diagnostics. Clear options. Careful work.
              <br />
              Phones, laptops, and tablets — without the runaround.
            </p>

            <div className="actions">
              <Link className="btn btn-primary" href="/contact">Request a repair</Link>
              <Link className="btn" href="/chat">Try Tech Helper</Link>
              <a className="btn btn-ghost" href="#services">Explore services</a>
            </div>

            <div className="pills" aria-label="Highlights">
              <span className="pill">Clear quote before work starts</span>
              <span className="pill">Privacy-respectful</span>
              <span className="pill">Quality parts</span>
              <span className="pill">One device at a time</span>
            </div>
          </div>

          <aside className="code" aria-label="A repair request, like an API">
            <div className="code-top">
              <div className="dots" aria-hidden="true">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
              <div className="code-title">repair.request</div>
            </div>
            <pre>
              <code>{`POST /repair/request
{
  "device": "iPhone 15 Pro",
  "issue": "Screen cracked, touch works",
  "priority": "same-week",
  "goal": "reliable daily use"
}

→ reply: quote + next step`}</code>
            </pre>
          </aside>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Services</h2>
              <p>Pick a category. If you’re not sure, start with Tech Helper or send a quick message.</p>
            </div>
          </div>

          <div className="grid3">
            <article className="card">
              <h3>Phone repair</h3>
              <p>Screens, batteries, charging issues, speakers/mics, and troubleshooting.</p>
              <div className="pills">
                <span className="pill">Screen</span>
                <span className="pill">Battery</span>
                <span className="pill">Charging</span>
              </div>
            </article>

            <article className="card">
              <h3>Laptop repair + IT help</h3>
              <p>Slow devices, setup, OS issues, accounts, Wi‑Fi, and practical support.</p>
              <div className="pills">
                <span className="pill">Slow</span>
                <span className="pill">Setup</span>
                <span className="pill">Wi‑Fi</span>
              </div>
            </article>

            <article className="card">
              <h3>Tablets & accessories</h3>
              <p>iPads/tablets, setup help, and smaller repairs.</p>
              <div className="pills">
                <span className="pill">iPad</span>
                <span className="pill">Setup</span>
                <span className="pill">Fixes</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="process" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Process</h2>
              <p>Quality is a workflow. We keep it simple and transparent.</p>
            </div>
          </div>

          <div className="steps">
            <article className="step">
              <div className="n">1</div>
              <h3>Diagnose</h3>
              <p>We confirm what failed and what’s worth doing next.</p>
            </article>
            <article className="step">
              <div className="n">2</div>
              <h3>Approve</h3>
              <p>You get a clear quote. No work starts until you say yes.</p>
            </article>
            <article className="step">
              <div className="n">3</div>
              <h3>Repair</h3>
              <p>Quality parts + careful work + testing before it leaves.</p>
            </article>
          </div>

          <div className="split" style={{ marginTop: '1rem' }}>
            <div className="big">
              <h3>Not sure what you need?</h3>
              <p>Tech Helper can triage slow devices, Wi‑Fi, email, and “what should I do next?” questions.</p>
              <div className="actions" style={{ marginTop: '0.95rem' }}>
                <Link className="btn btn-primary" href="/chat">Open Tech Helper</Link>
                <Link className="btn" href="/faq">Read FAQ</Link>
              </div>
            </div>
            <div className="big">
              <h3>Fast contact</h3>
              <p>
                <a href="tel:+12084503730">(208) 450-3730</a>
                <br />
                <a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a>
                <br />
                Service area: Hailey • Ketchum • Sun Valley • Bellevue
              </p>
              <div className="actions" style={{ marginTop: '0.95rem' }}>
                <Link className="btn" href="/contact">Request repair</Link>
                <a className="btn btn-ghost" href="tel:+12084503730">Call now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
