import Link from 'next/link'

export default function Guide() {
  return (
    <section className="page">
      <div className="container">
        <h2>Before you bring it in</h2>
        <p className="lead2">A few small steps that make quotes faster and repairs smoother.</p>

        <div className="grid3">
          <article className="card">
            <h3>1) Back up (if you can)</h3>
            <p>iCloud/Google Drive or a computer backup. Especially before screen or battery work.</p>
          </article>
          <article className="card">
            <h3>2) Know the exact model</h3>
            <p>Exact model = correct parts + better quotes the first time.</p>
          </article>
          <article className="card">
            <h3>3) Tell us the goal</h3>
            <p>If data recovery is the priority, say that up front so we optimize for it.</p>
          </article>
        </div>

        <div className="split" style={{ marginTop: '1rem' }}>
          <div className="big">
            <h3>Quick contact</h3>
            <p>Send the model + what happened and we’ll reply with next steps.</p>
            <div className="actions" style={{ marginTop: '0.9rem' }}>
              <Link className="btn btn-primary" href="/contact">Request repair</Link>
              <a className="btn" href="sms:+12083666111">Text (208) 366-6111</a>
            </div>
          </div>
          <div className="big">
            <h3>Try Tech Helper</h3>
            <p>For slow devices, Wi‑Fi, printers, email, and general troubleshooting.</p>
            <div className="actions" style={{ marginTop: '0.9rem' }}>
              <Link className="btn" href="/chat">Open Tech Helper</Link>
              <Link className="btn btn-ghost" href="/faq">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
