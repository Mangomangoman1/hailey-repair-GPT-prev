import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="section concept concept-a" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="concept-label">Hailey Device Repair // 7 days a week</div>
          <div className="console-shell">
            <aside className="console-rail">
              <div className="rail-title">repair://hailey</div>
              <nav>
                <a href="#overview">Overview</a>
                <a href="#services">Services</a>
                <a href="#process">Process</a>
                <a href="#contact-fast">Contact</a>
              </nav>
            </aside>

            <div className="console-main" id="overview">
              <h2>Device Repair With Integrity</h2>
              <p>
                Straight diagnostics, practical options, and careful repair for phones, laptops, and tablets in the Wood River Valley.
              </p>

              <div className="actions">
                <Link className="btn btn-primary" href="/contact">Open intake</Link>
                <Link className="btn" href="/chat">Run quick triage</Link>
              </div>

              <div className="console-grid">
                <div className="mini">
                  Typical first response<br />
                  <strong>&lt; 2 hours</strong>
                </div>
                <div className="mini">
                  Most common requests<br />
                  <strong>Screen / Battery / Charging</strong>
                </div>
                <div className="mini">
                  Service area<br />
                  <strong>Hailey • Ketchum • Sun Valley • Bellevue</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Services</h2>
              <p>Start with the category that matches your issue. If you're unsure, use Tech Helper and we’ll route you.</p>
            </div>
          </div>

          <div className="grid3">
            <article className="card">
              <h3>Phone repair</h3>
              <p>Screens, batteries, charging, audio, and everyday device issues.</p>
              <div className="pills">
                <span className="pill">Screens</span>
                <span className="pill">Batteries</span>
                <span className="pill">Charging</span>
              </div>
            </article>

            <article className="card">
              <h3>Laptop + IT help</h3>
              <p>Slow systems, setup problems, account issues, and practical troubleshooting.</p>
              <div className="pills">
                <span className="pill">Performance</span>
                <span className="pill">Setup</span>
                <span className="pill">OS issues</span>
              </div>
            </article>

            <article className="card">
              <h3>Tablets & accessories</h3>
              <p>iPads/tablets, configuration help, and smaller repairs.</p>
              <div className="pills">
                <span className="pill">Tablet repair</span>
                <span className="pill">Config</span>
                <span className="pill">Accessories</span>
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
              <p>Clear workflow, no surprise work orders.</p>
            </div>
          </div>

          <div className="steps">
            <article className="step">
              <div className="n">1</div>
              <h3>Diagnose</h3>
              <p>We verify root cause and what’s worth fixing.</p>
            </article>
            <article className="step">
              <div className="n">2</div>
              <h3>Approve</h3>
              <p>You get a quote and options before work begins.</p>
            </article>
            <article className="step">
              <div className="n">3</div>
              <h3>Repair</h3>
              <p>Careful repair, quality parts, and final testing.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="contact-fast" className="section">
        <div className="container">
          <div className="split">
            <div className="big">
              <h3>Need help deciding?</h3>
              <p>Use Tech Helper first for fast triage. If it needs hands-on service, we’ll point you to the next move.</p>
              <div className="actions" style={{ marginTop: '0.9rem' }}>
                <Link className="btn btn-primary" href="/chat">Open Tech Helper</Link>
                <Link className="btn" href="/faq">Read FAQ</Link>
              </div>
            </div>

            <div className="big">
              <h3>Direct contact</h3>
              <p>
                <a href="tel:+12084503730">(208) 450-3730</a>
                <br />
                <a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a>
              </p>
              <div className="actions" style={{ marginTop: '0.9rem' }}>
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
