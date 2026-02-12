import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="concept-intro section">
        <div className="container">
          <span className="kicker">Design study mode</span>
          <h1>Three completely different homepage bones.</h1>
          <p className="lead">
            Pick a structure first. We can add/refine content after. These are intentionally different in layout grammar.
          </p>
          <div className="actions">
            <a className="btn" href="#concept-a">Concept A</a>
            <a className="btn" href="#concept-b">Concept B</a>
            <a className="btn" href="#concept-c">Concept C</a>
          </div>
        </div>
      </section>

      {/* CONCEPT A — Left Rail / Product Console */}
      <section id="concept-a" className="section concept concept-a">
        <div className="container">
          <div className="concept-label">Concept A — Command Console (left rail)</div>
          <div className="console-shell">
            <aside className="console-rail">
              <div className="rail-title">repair://hailey</div>
              <nav>
                <a>Overview</a>
                <a>Intake</a>
                <a>Queue</a>
                <a>Status</a>
                <a>Support</a>
              </nav>
            </aside>
            <div className="console-main">
              <h2>Device Repair With Integrity</h2>
              <p>
                A dashboard-like first screen that feels more like a service interface than a brochure site.
              </p>
              <div className="actions">
                <Link className="btn btn-primary" href="/contact">Open intake</Link>
                <Link className="btn" href="/chat">Run quick triage</Link>
              </div>
              <div className="console-grid">
                <div className="mini">Avg. quote response<br /><strong>&lt; 2 hours</strong></div>
                <div className="mini">Common fixes<br /><strong>Screen / Battery / Charging</strong></div>
                <div className="mini">Service zone<br /><strong>Wood River Valley</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONCEPT B — Editorial / Brand Story */}
      <section id="concept-b" className="section concept concept-b">
        <div className="container">
          <div className="concept-label">Concept B — Editorial Flow (story first)</div>
          <div className="editorial-hero">
            <div>
              <p className="eyebrow">Hailey, Idaho</p>
              <h2>Repair is personal.</h2>
              <p>
                This version opens like a brand story, then flows into practical information as you scroll.
              </p>
            </div>
            <div className="editorial-aside">
              <p>“Clear communication, quality parts, no pressure.”</p>
              <div className="actions">
                <Link className="btn btn-primary" href="/contact">Start a request</Link>
              </div>
            </div>
          </div>

          <div className="editorial-columns">
            <article>
              <h3>What we fix</h3>
              <p>Phones, laptops, tablets, and small-device issues that disrupt daily life.</p>
            </article>
            <article>
              <h3>How we work</h3>
              <p>Diagnosis first. Quote second. Repair third. No surprise work.</p>
            </article>
            <article>
              <h3>Where we help</h3>
              <p>Hailey, Ketchum, Sun Valley, Bellevue.</p>
            </article>
          </div>
        </div>
      </section>

      {/* CONCEPT C — Bold Blocks / Asymmetric */}
      <section id="concept-c" className="section concept concept-c">
        <div className="container">
          <div className="concept-label">Concept C — Asymmetric Blocks (bold + minimal text)</div>
          <div className="blocks">
            <div className="blk blk-main">
              <h2>Device Repair With Integrity</h2>
              <p>No fluff. Just clear diagnosis and clean execution.</p>
              <div className="actions">
                <Link className="btn btn-primary" href="/contact">Request repair</Link>
                <Link className="btn" href="/chat">Tech Helper</Link>
              </div>
            </div>
            <div className="blk blk-stat">
              <small>Signal</small>
              <strong>Human support, fast</strong>
            </div>
            <div className="blk blk-note">
              <small>Best for</small>
              <strong>People who hate cluttered websites</strong>
            </div>
            <div className="blk blk-call">
              <small>Direct line</small>
              <a href="tel:+12084503730">(208) 450-3730</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
