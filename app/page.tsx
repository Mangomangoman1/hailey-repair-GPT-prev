import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="kicker">Hailey • Wood River Valley • Open 7 days/week</span>
            <h1>Fix the device you rely on — fast, clear, and local.</h1>
            <p className="lead">
              Phone, laptop, and tablet repair in Hailey, Idaho. We start with honest diagnostics and practical options—then we do the repair right.
            </p>

            <div className="tile-grid" style={{ marginTop: '1.15rem' }}>
              <Link className="tile" href="/contact">
                <strong>Phone repair</strong>
                <span>Screens • batteries • charging • speakers/mics</span>
              </Link>
              <Link className="tile" href="/contact">
                <strong>Laptop repair + IT help</strong>
                <span>Slow device • OS issues • setup • data help</span>
              </Link>
              <Link className="tile" href="/contact">
                <strong>Tablets + accessories</strong>
                <span>iPads/tablets • setup • small fixes</span>
              </Link>
            </div>

            <div className="hero-actions">
              <Link className="btn btn-primary" href="/contact">Request a repair</Link>
              <Link className="btn" href="/chat">Try Tech Helper</Link>
              <Link className="btn btn-ghost" href="/faq">See FAQs</Link>
            </div>

            <div className="trustbar" aria-label="Service highlights">
              <span className="chip">Straight answers</span>
              <span className="chip">Quality parts</span>
              <span className="chip">Privacy-respectful</span>
              <span className="chip">One device at a time</span>
            </div>
          </div>

          <aside className="card panel" aria-label="Quick contact">
            <h3>Fast contact</h3>
            <p>For the quickest quote, include your device model and what happened.</p>
            <div className="meta">
              <div className="meta-row"><strong>Phone</strong><span><a href="tel:+12084503730">(208) 450-3730</a></span></div>
              <div className="meta-row"><strong>Email</strong><span><a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a></span></div>
              <div className="meta-row"><strong>Hours</strong><span>Open 7 days/week</span></div>
              <div className="meta-row"><strong>Area</strong><span>Hailey • Ketchum • Sun Valley • Bellevue</span></div>
            </div>
            <div className="hero-actions" style={{ marginTop: '0.95rem' }}>
              <a className="btn" href="tel:+12084503730">Call</a>
              <a className="btn btn-ghost" href="mailto:samuel@haileyrepair.com">Email</a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="hgroup">
            <div>
              <h2>How it works</h2>
              <p>A simple process designed for quality and clarity.</p>
            </div>
          </div>

          <div className="grid-3">
            <article className="card step">
              <div className="num" aria-hidden="true">1</div>
              <h3>Diagnosis</h3>
              <p>We assess the issue and tell you what’s worth fixing (and what isn’t).</p>
            </article>
            <article className="card step">
              <div className="num" aria-hidden="true">2</div>
              <h3>Approval</h3>
              <p>You get a clear quote and options. No work begins until you say yes.</p>
            </article>
            <article className="card step">
              <div className="num" aria-hidden="true">3</div>
              <h3>Repair</h3>
              <p>Quality parts + careful work. Your device gets full attention.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="hgroup">
            <div>
              <h2>Not sure if it’s worth repairing?</h2>
              <p>Try the Tech Helper for quick troubleshooting—or contact us for an honest assessment.</p>
            </div>
          </div>

          <div className="hero-actions">
            <Link className="btn btn-primary" href="/chat">Open Tech Helper</Link>
            <Link className="btn" href="/contact">Ask for a quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}
