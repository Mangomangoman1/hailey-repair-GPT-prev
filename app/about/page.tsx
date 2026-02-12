import Link from 'next/link'

export default function About() {
  return (
    <section className="page">
      <div className="container">
        <h2>About</h2>
        <p className="lead2">
          Hailey Device Repair is a local repair and tech support shop serving the Wood River Valley. The focus is simple: be clear,
          be careful, and treat your data with respect.
        </p>

        <div className="grid3">
          <article className="card">
            <h3>What we fix</h3>
            <p>Phones, laptops, tablets, and accessories — screens, batteries, charging, troubleshooting, and practical IT help.</p>
            <div className="linkrow">
              <Link className="btn" href="/contact">Request repair</Link>
              <Link className="btn btn-ghost" href="/chat">Tech Helper</Link>
            </div>
          </article>

          <article className="card">
            <h3>How we work</h3>
            <p>Diagnosis first, then a clear quote. No work starts until you approve. We test before it leaves.</p>
          </article>

          <article className="card">
            <h3>Service area</h3>
            <p>Hailey • Ketchum • Sun Valley • Bellevue</p>
            <div className="linkrow">
              <a className="btn" href="tel:+12084503730">Call (208) 450-3730</a>
              <Link className="btn btn-ghost" href="/faq">FAQ</Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
