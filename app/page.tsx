import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="kicker">Open 7 days/week • Hailey, Idaho • Wood River Valley</span>
            <h1>
              Repairs with
              <br />
              real answers.
            </h1>
            <p className="lead">
              Phone, laptop, and tablet repair — with straightforward diagnostics, quality parts, and a calm hand-off.
              No runaround. No pressure.
            </p>

            <div className="actions">
              <Link className="btn btn-primary" href="/contact">
                Request a repair
              </Link>
              <Link className="btn" href="/chat">
                Try Tech Helper
              </Link>
              <a className="btn btn-ghost" href="#services">
                Explore services
              </a>
            </div>

            <div className="badges" aria-label="Highlights">
              <span className="badge">Clear quote before work starts</span>
              <span className="badge">Privacy-respectful</span>
              <span className="badge">One device at a time</span>
              <span className="badge">Quality parts</span>
            </div>
          </div>

          <aside className="hero-card" aria-label="Quick info">
            <h3>Quick info</h3>
            <p>For fastest quotes, include the exact model + what happened.</p>

            <div className="meta">
              <div className="row">
                <strong>Phone</strong>
                <span>
                  <a href="tel:+12084503730">(208) 450-3730</a>
                </span>
              </div>
              <div className="row">
                <strong>Email</strong>
                <span>
                  <a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a>
                </span>
              </div>
              <div className="row">
                <strong>Service area</strong>
                <span>Hailey • Ketchum • Sun Valley • Bellevue</span>
              </div>
            </div>

            <div className="sig" aria-hidden="true" />
          </aside>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Services</h2>
              <p>Pick a lane, or just send a message. We’ll give you the most practical next step.</p>
            </div>
          </div>

          <div className="grid3">
            <article className="card">
              <h3>Phone repair</h3>
              <p>Screens, batteries, charging issues, speaker/mic problems, and troubleshooting.</p>
              <div className="linkrow">
                <Link className="btn" href="/contact">
                  Get a quote
                </Link>
                <Link className="btn btn-ghost" href="/faq">
                  Common questions
                </Link>
              </div>
            </article>

            <article className="card">
              <h3>Laptops + IT help</h3>
              <p>Slow devices, OS issues, setup help, and practical tech support.</p>
              <div className="linkrow">
                <Link className="btn" href="/chat">
                  Tech Helper
                </Link>
                <Link className="btn btn-ghost" href="/contact">
                  Request help
                </Link>
              </div>
            </article>

            <article className="card">
              <h3>Tablets & accessories</h3>
              <p>iPads/tablets, setup, and smaller fixes. If it powers on, we can usually help.</p>
              <div className="linkrow">
                <Link className="btn" href="/contact">
                  Contact
                </Link>
                <Link className="btn btn-ghost" href="/guide">
                  Before you come in
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>How it works</h2>
              <p>Quality and clarity, end-to-end.</p>
            </div>
          </div>

          <div className="grid3">
            <article className="card">
              <h3>1) Diagnose</h3>
              <p>We confirm what’s actually happening (and what’s worth fixing).</p>
            </article>
            <article className="card">
              <h3>2) Quote</h3>
              <p>You get a clear price and options. No work starts until you approve.</p>
            </article>
            <article className="card">
              <h3>3) Repair</h3>
              <p>Careful work with quality parts — and we test before it leaves.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="big">
              <h3>Not sure it’s worth fixing?</h3>
              <p>
                Try Tech Helper for quick troubleshooting. If it needs hands-on service, it’ll point you to the right next step.
              </p>
              <div className="actions" style={{ marginTop: '0.95rem' }}>
                <Link className="btn btn-primary" href="/chat">
                  Open Tech Helper
                </Link>
                <a className="btn" href="tel:+12084503730">
                  Call (208) 450-3730
                </a>
              </div>
            </div>

            <div className="big">
              <h3>Fast quotes</h3>
              <p>When you contact us, include:</p>
              <div className="badges" style={{ marginTop: '0.85rem' }}>
                <span className="badge">Exact model</span>
                <span className="badge">What happened</span>
                <span className="badge">Does it power on?</span>
                <span className="badge">Any prior repairs?</span>
              </div>
              <div className="actions" style={{ marginTop: '0.95rem' }}>
                <Link className="btn" href="/contact">
                  Request repair
                </Link>
                <Link className="btn btn-ghost" href="/faq">
                  Read FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
