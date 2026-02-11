import Link from 'next/link'

export default function About() {
  return (
    <>
      <section className="section" style={{ paddingTop: '2.2rem' }}>
        <div className="container">
          <div className="hgroup">
            <div>
              <h2>About</h2>
              <p>Locally owned repair and IT help in Hailey—focused on honesty, quality, and respect for your data.</p>
            </div>
          </div>

          <div className="grid-3" style={{ gridTemplateColumns: '1.4fr 0.6fr 0.6fr' } as any}>
            <article className="card panel">
              <h3>What we do</h3>
              <p>
                Phones, laptops, tablets, accessories — screens, batteries, charging issues, troubleshooting, and practical IT help.
                Every job starts with a clear diagnosis so you can decide what makes sense.
              </p>
              <div className="hero-actions" style={{ marginTop: '1rem' }}>
                <Link className="btn btn-primary" href="/contact">Request a repair</Link>
                <Link className="btn" href="/chat">Tech Helper</Link>
              </div>
            </article>

            <aside className="card panel">
              <h3>Values</h3>
              <p style={{ marginTop: 0, color: 'var(--muted)' }}>Clear quotes. No pressure. No upsells.</p>
              <div className="trustbar" style={{ marginTop: '0.8rem' }}>
                <span className="chip">Honest diagnosis</span>
                <span className="chip">Quality parts</span>
                <span className="chip">Respectful service</span>
              </div>
            </aside>

            <aside className="card panel">
              <h3>Service area</h3>
              <p>Hailey • Ketchum • Sun Valley • Bellevue</p>
              <p style={{ marginTop: '0.6rem' }}>
                <a className="btn" href="tel:+12084503730">Call (208) 450‑3730</a>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
