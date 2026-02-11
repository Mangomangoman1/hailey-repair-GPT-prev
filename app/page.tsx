import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="hero" style={{paddingTop: '3.8rem', paddingBottom: '2.2rem'}}>
        <div className="container hero-grid" style={{alignItems: 'stretch'}}>
          <div className="reveal">
            <span className="kicker">Hailey • Wood River Valley • Open 7 days/week</span>
            <h1 style={{letterSpacing: '-0.02em'}}>What’s broken?</h1>
            <p className="lead">Pick a device, tell us what it’s doing, and we’ll give you a clear next step. If it’s something simple, try the Tech Helper first.</p>

            <div className="quick-grid" style={{marginTop: '1rem'}}>
              <Link className="quick-tile" href="/contact">
                <strong>Phone repair</strong>
                <span>Screens • batteries • charging • troubleshooting</span>
              </Link>
              <Link className="quick-tile" href="/contact">
                <strong>Laptop help</strong>
                <span>Slow device • OS issues • IT support • data help</span>
              </Link>
              <Link className="quick-tile" href="/contact">
                <strong>Tablet & accessories</strong>
                <span>iPads/tablets • setup • small fixes</span>
              </Link>
            </div>

            <div className="hero-actions" style={{marginTop: '1.25rem'}}>
              <Link className="btn btn-primary" href="/contact">Request a repair</Link>
              <Link className="btn" href="/chat">Try Tech Helper</Link>
              <a className="btn" href="#how">How it works</a>
            </div>

            <div className="badges" aria-label="Service highlights">
              <span className="badge">Straight answers</span>
              <span className="badge">Quality parts</span>
              <span className="badge">Privacy-respectful</span>
              <span className="badge">Local, responsive</span>
            </div>
          </div>

          <aside className="hero-card reveal" aria-label="Quick info" style={{padding: '1.25rem'}}>
            <h2 style={{marginTop: 0}}>Fast contact</h2>
            <p style={{marginBottom: '0.75rem'}}>If you’d rather talk to a human, call/text or email.</p>
            <div className="meta">
              <div className="meta-row"><strong>Phone</strong><span><a href="tel:+12084503730">(208) 450-3730</a></span></div>
              <div className="meta-row"><strong>Email</strong><span><a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a></span></div>
              <div className="meta-row"><strong>Hours</strong><span>Open 7 days/week</span></div>
              <div className="meta-row"><strong>Area</strong><span>Hailey • Ketchum • Sun Valley • Bellevue</span></div>
            </div>
            <div className="hero-actions" style={{marginTop: '0.95rem'}}>
              <a className="btn" href="tel:+12084503730">Call</a>
              <a className="btn" href="mailto:samuel@haileyrepair.com">Email</a>
            </div>

            <div className="card" style={{marginTop: '1rem', padding: '1rem', background: 'rgba(14,165,233,0.06)', borderColor: 'rgba(14,165,233,0.18)'}}>
              <h3 style={{margin: 0, fontSize: '1.05rem'}}>Quick tip for faster quotes</h3>
              <p style={{margin: '0.35rem 0 0', color: 'var(--muted)'}}>Include your device model and what happened. If data recovery is the priority, say that up front.</p>
            </div>
          </aside>
        </div>
      </section>

      <section id="how" className="section" style={{paddingTop: '1.0rem'}}>
        <div className="container">
          <div className="section-title reveal">
            <h2>How it works</h2>
            <p>Simple, transparent, and focused on doing it right the first time.</p>
          </div>

          <div className="grid-3">
            <article className="card step reveal">
              <div className="num" aria-hidden="true">1</div>
              <h3>Diagnosis</h3>
              <p>We start with a quick assessment and tell you what’s worth fixing and why.</p>
            </article>
            <article className="card step reveal">
              <div className="num" aria-hidden="true">2</div>
              <h3>Approval</h3>
              <p>You get a clear quote and options. No work begins until you say yes.</p>
            </article>
            <article className="card step reveal">
              <div className="num" aria-hidden="true">3</div>
              <h3>Repair</h3>
              <p>Quality parts + careful work. One device at a time, no rushed assembly line.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title reveal">
            <h2>About Hailey Device Repair</h2>
            <p>Practical options, honest assessments, and repairs that last—so you can get back to the devices you rely on.</p>
          </div>
          <article className="card callout reveal">
            <p>Hailey Device Repair is a locally owned electronics repair business servicing the Wood River Valley. We work on the devices people rely on every day, phones, laptops, tablets, and accessories. Every repair starts with a straightforward assessment and practical options, so you know exactly what's worth fixing and why. Based in Hailey, we serve the community with care, discretion, and respect for your time and your data.</p>
          </article>
        </div>
      </section>

      <section id="how" className="section">
        <div className="container">
          <div className="section-title reveal">
            <h2>How Repairs Work</h2>
            <p>A simple, transparent process—no surprises.</p>
          </div>

          <div className="grid-2">
            <article className="card step reveal">
              <div className="num" aria-hidden="true">1</div>
              <h3>Diagnostics and your approval</h3>
              <p>Every repair starts with a quick, honest diagnosis. We'll tell you if a repair makes sense or not. You'll get a clear explanation of the issue, the repair options, and the cost. No work begins until you say yes.</p>
            </article>

            <article className="card step reveal">
              <div className="num" aria-hidden="true">2</div>
              <h3>Quality parts, device longevity</h3>
              <p>We order parts on demand to match your exact device (we don't keep huge stock on hand). Most repairs are finished in <strong>1–2 days</strong> once parts arrive—shipping is usually another <strong>1–2 days</strong>. If you prefer, you can leave the device with us while we wait on parts.</p>
            </article>

            <article className="card step reveal">
              <div className="num" aria-hidden="true">3</div>
              <h3>Your device matters</h3>
              <p>I work on one device at a time, so your device and its issue receive my full attention. I don't rush repairs or bounce between projects.</p>
            </article>

            <article className="card step reveal">
              <div className="num" aria-hidden="true">4</div>
              <h3>Hassle free hand-off</h3>
              <p>When the work is done you get your device back—no upsells or caveats—and a clean assessment of the work that was done is provided.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title reveal">
            <h2>Repair or Not?</h2>
            <p>Sometimes the best service is telling you a repair may not be worth it.</p>
          </div>
          <article className="card callout reveal">
            <p>When does a repair make sense? This is a question worth asking before getting work done. If the device has severe water damage, failed logic board, multiple prior repair attempts, or the cost of repair approaches the practical value of the device, a repair might not be the right option. In cases where the goal is to recover photos or other important data, that should be communicated upfront. There may be simpler or more cost-effective approaches than a full repair. <strong>Note:</strong> water-damaged devices are excluded from our standard warranty.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title reveal">
            <h2>Free Tech Help</h2>
            <p>Got a quick tech question? Try our free troubleshooting assistant before bringing your device in.</p>
          </div>
          <div className="hero-actions reveal">
            <Link className="btn btn-primary" href="/chat">Chat with Tech Helper</Link>
            <Link className="btn" href="/contact">Or contact us directly</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title reveal">
            <h2>Reviews</h2>
            <p>We're new, local, and building this the right way—one honest repair at a time. If we helped you out, a quick Google review makes a huge difference.</p>
          </div>

          <div className="grid-2">
            <article className="card callout reveal">
              <p style={{margin: '0 0 0.75rem'}}>Already worked with us?</p>
              <p style={{margin: 0, color: 'var(--muted)'}}>Tap the button below to leave a review.</p>
              <div className="hero-actions" style={{marginTop: '1rem'}}>
                <Link className="btn btn-primary" href="/guide">See the Repair Guide</Link>
                <a className="btn" href="#" rel="nofollow">Leave a Google Review</a>
              </div>
            </article>

            <aside className="card hero-card reveal" aria-label="What to include in a review">
              <h3 style={{marginTop: 0}}>What to mention</h3>
              <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--muted)'}}>
                <li>Device model + repair type</li>
                <li>Turnaround time</li>
                <li>How the communication/quote felt</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title reveal">
            <h2>Ready to get started?</h2>
            <p>Tell us what device you have and what it's doing—we'll reply as soon as possible.</p>
          </div>
          <div className="hero-actions reveal">
            <Link className="btn btn-primary" href="/contact">Request a repair</Link>
            <a className="btn" href="mailto:samuel@haileyrepair.com">Email us</a>
            <a className="btn" href="tel:+12084503730">Call now</a>
          </div>
        </div>
      </section>
    </>
  )
}
