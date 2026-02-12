import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-center">
          <span className="kicker">Hailey • Wood River Valley • Open 7 days/week</span>
          <h1>Device Repair With Integrity.</h1>
          <p className="lead">
            Honest diagnostics, clear options, and careful repair for phones, laptops, and tablets — without the runaround.
          </p>

          <div className="actions">
            <Link className="btn btn-primary" href="/contact">
              Request repair
            </Link>
            <Link className="btn" href="/chat">
              Try Tech Helper
            </Link>
            <a className="btn btn-ghost" href="#flow">
              How it works
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="story">
            <h2>Local service, real communication</h2>
            <p>
              Every repair starts with a diagnosis and a plain-language quote. If it’s not worth fixing, we’ll tell you.
            </p>
          </div>

          <div className="grid3">
            <article className="card">
              <h3>Phone repair</h3>
              <p>Screens, batteries, charging ports, and audio issues.</p>
              <div className="linkrow">
                <Link className="btn" href="/contact">
                  Get quote
                </Link>
              </div>
            </article>
            <article className="card">
              <h3>Laptop + IT help</h3>
              <p>Slow systems, setup issues, OS problems, and practical support.</p>
              <div className="linkrow">
                <Link className="btn" href="/chat">
                  Start with helper
                </Link>
              </div>
            </article>
            <article className="card">
              <h3>Tablets & accessories</h3>
              <p>iPads/tablets, setup help, and smaller repairs.</p>
              <div className="linkrow">
                <Link className="btn" href="/contact">
                  Contact
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="flow" className="section">
        <div className="container">
          <div className="timeline">
            <article className="step">
              <div className="n">1</div>
              <h3>Diagnose</h3>
              <p>We confirm what failed and what the smart fix is.</p>
            </article>
            <article className="step">
              <div className="n">2</div>
              <h3>Approve</h3>
              <p>You get a clear quote. No work starts until you approve.</p>
            </article>
            <article className="step">
              <div className="n">3</div>
              <h3>Repair</h3>
              <p>Quality parts + careful workmanship + final checks.</p>
            </article>
          </div>

          <div className="band">
            <div>
              <h3>Not sure if repair is worth it?</h3>
              <p className="note">Use Tech Helper for quick triage. If it needs hands-on work, we’ll point you to the next step.</p>
              <div className="actions" style={{ justifyContent: 'flex-start' }}>
                <Link className="btn btn-primary" href="/chat">
                  Open Tech Helper
                </Link>
              </div>
            </div>
            <div>
              <h3>Fast contact</h3>
              <p className="note">
                <a href="tel:+12084503730">(208) 450-3730</a>
                <br />
                <a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a>
                <br />
                Service area: Hailey • Ketchum • Sun Valley • Bellevue
              </p>
              <div className="actions" style={{ justifyContent: 'flex-start' }}>
                <Link className="btn" href="/contact">
                  Request repair
                </Link>
                <Link className="btn btn-ghost" href="/faq">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
