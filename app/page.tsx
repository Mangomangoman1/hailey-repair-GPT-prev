import Link from 'next/link'
import FlowLabel from './components/FlowLabel'
import ConsoleShellBeam from './components/ConsoleShellBeam'
import HomeScrollMotion from './components/HomeScrollMotion'
import HoverBeamFrame from './components/HoverBeamFrame'

function DeviceCard({
  kind,
  label,
  className,
}: {
  kind: 'phone' | 'laptop' | 'tablet' | 'watch'
  label: string
  className?: string
}) {
  return (
    <article className={['card', 'device-card', className].filter(Boolean).join(' ')} aria-label={label}>
      <DeviceIcon kind={kind} />
    </article>
  )
}

function DeviceIcon({ kind }: { kind: 'phone' | 'laptop' | 'tablet' | 'watch' }) {
  if (kind === 'phone') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="19" y="7" width="26" height="50" rx="7" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <line x1="27" y1="14" x2="37" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="49.5" r="2.4" fill="currentColor" />
      </svg>
    )
  }

  if (kind === 'laptop') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="14" y="14" width="36" height="24" rx="3.5" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path d="M9 44h46l-4 7H13z" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      </svg>
    )
  }

  if (kind === 'tablet') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="14" y="9" width="36" height="46" rx="6.5" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="32" cy="48.5" r="2.2" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M26 9c0-2 1.6-3.5 3.5-3.5h5c1.9 0 3.5 1.5 3.5 3.5v7H26z" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="17" y="14" width="30" height="36" rx="9" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <rect x="24" y="21" width="16" height="22" rx="4.5" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M26 50v6.5c0 2 1.6 3.5 3.5 3.5h5c1.9 0 3.5-1.5 3.5-3.5V50" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
    </svg>
  )
}

export default function Home() {
  return (
    <>
      <HomeScrollMotion />
      <div className="home-scroll-stage">
        <section className="section concept concept-a" style={{ paddingTop: '5rem' }}>
          <div className="container">
            <div className="concept-label">
              <FlowLabel text="Hailey Device Repair // 7 days a week" />
              <div className="text-first-pill">
                Texting is the fastest way to reach us: <a href="sms:+12083666111">(208) 366-6111</a>
              </div>
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
                <h2>No appointment needed, text us today</h2>
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

            <section className="device-cube-stage" aria-label="Supported devices">
              <div className="device-cube-pin">
                <div className="device-cube-scene">
                  <div className="device-cube-shadow" aria-hidden="true" />
                  <div className="device-cube-object">
                    <DeviceCard kind="phone" label="Phone repair" className="device-face device-face-front" />
                    <DeviceCard kind="laptop" label="Laptop repair" className="device-face device-face-right" />
                    <DeviceCard kind="tablet" label="Tablet repair" className="device-face device-face-top" />
                    <DeviceCard kind="watch" label="Smartwatch repair" className="device-face device-face-left" />
                    <div className="device-face device-face-back device-face-filler" aria-hidden="true" />
                    <div className="device-face device-face-bottom device-face-filler" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </section>

            <div className="device-grid device-grid-mobile" aria-label="Supported devices">
              <DeviceCard kind="phone" label="Phone repair" />
              <DeviceCard kind="laptop" label="Laptop repair" />
              <DeviceCard kind="tablet" label="Tablet repair" />
              <DeviceCard kind="watch" label="Smartwatch repair" />
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
              <HoverBeamFrame as="article" className="card service-card" radius={18}>
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
              </HoverBeamFrame>

              <HoverBeamFrame as="article" className="card service-card" radius={18}>
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
              </HoverBeamFrame>

              <HoverBeamFrame as="article" className="card service-card" radius={18}>
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
              </HoverBeamFrame>
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
              <HoverBeamFrame as="article" className="step sand-card" radius={18}>
                <div className="n">1</div>
                <h3>Diagnose</h3>
                <p>We verify root cause and what’s worth fixing.</p>
              </HoverBeamFrame>
              <HoverBeamFrame as="article" className="step sand-card" radius={18}>
                <div className="n">2</div>
                <h3>Approve</h3>
                <p>You get a quote and options before work begins.</p>
              </HoverBeamFrame>
              <HoverBeamFrame as="article" className="step sand-card" radius={18}>
                <div className="n">3</div>
                <h3>Repair</h3>
                <p>Careful repair, quality parts, and final testing.</p>
              </HoverBeamFrame>
            </div>
          </div>
        </section>

        <section id="contact-fast" className="section">
          <div className="container">
            <div className="split">
              <HoverBeamFrame className="big sand-card" radius={26}>
                <h3>Need help deciding?</h3>
                <p>Use Tech Helper first for fast triage. If it needs hands-on service, we’ll point you to the next move.</p>
                <div className="actions" style={{ marginTop: '0.9rem' }}>
                  <Link className="btn btn-primary" href="/chat">Open Tech Helper</Link>
                  <Link className="btn" href="/faq">Read FAQ</Link>
                </div>
              </HoverBeamFrame>

              <HoverBeamFrame className="big sand-card" radius={26}>
                <h3>Direct contact</h3>
                <p>
                  <a href="tel:+12083666111">(208) 366-6111</a>
                  <br />
                  <a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a>
                </p>
                <div className="actions" style={{ marginTop: '0.9rem' }}>
                  <Link className="btn" href="/contact">Request repair</Link>
                  <a className="btn btn-ghost" href="sms:+12083666111">Text now</a>
                </div>
              </HoverBeamFrame>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
