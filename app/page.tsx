import Link from 'next/link'
import FlowLabel from './components/FlowLabel'
import ConsoleShellBeam from './components/ConsoleShellBeam'

export default function Home() {
  return (
    <>
      <section className="section concept concept-a" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="concept-label">
            <FlowLabel text="Hailey Device Repair // 7 days a week" />
          </div>
          <ConsoleShellBeam>
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
          </ConsoleShellBeam>
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
              <h3>Apple & Mac repair</h3>
              <p>iPhone, iPad, and Mac-focused repair workflow and pre-check requirements.</p>
              <div className="pills">
                <span className="pill">Screens</span>
                <span className="pill">Batteries</span>
                <span className="pill">Charging</span>
                <span className="pill">Mac diagnostics</span>
              </div>
              <div className="actions" style={{ marginTop: '0.9rem' }}>
                <Link className="btn btn-primary" href="/prep#apple">Open Apple & Mac prep</Link>
              </div>
            </article>

            <article className="card">
              <h3>Android repair</h3>
              <p>Samsung, Pixel, and other Android devices with model-specific prep steps.</p>
              <div className="pills">
                <span className="pill">Screens</span>
                <span className="pill">Batteries</span>
                <span className="pill">Charging ports</span>
                <span className="pill">Data-safe intake</span>
              </div>
              <div className="actions" style={{ marginTop: '0.9rem' }}>
                <Link className="btn btn-primary" href="/prep#android">Open Android prep</Link>
              </div>
            </article>

            <article className="card">
              <h3>Laptop + IT help</h3>
              <p>Performance, OS issues, startup failures, account recovery, and troubleshooting prep.</p>
              <div className="pills">
                <span className="pill">Performance</span>
                <span className="pill">OS issues</span>
                <span className="pill">Startup errors</span>
                <span className="pill">Account/login</span>
              </div>
              <div className="actions" style={{ marginTop: '0.9rem' }}>
                <Link className="btn btn-primary" href="/prep#laptop-it">Open Laptop + IT prep</Link>
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
