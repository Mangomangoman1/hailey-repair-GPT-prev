import Link from 'next/link'
import ConsoleShellBeam from './components/ConsoleShellBeam'
import HeroParticleMorph from './components/HeroParticleMorph'
import HomeServicesSection from './components/HomeServicesSection'
import HomeScrollMotion from './components/HomeScrollMotion'
import HoverBeamFrame from './components/HoverBeamFrame'

export default function Home() {
  return (
    <>
      <HomeScrollMotion />
      <div className="home-scroll-stage">
        <section className="section concept concept-a home-hero-section" style={{ paddingTop: '5rem' }}>
          <div className="container">
            <div className="concept-label concept-label--morph">
              <HeroParticleMorph />
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
                <h2>The Valley&apos;s Device Repair Shop</h2>
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
        <HomeServicesSection />

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
