import Link from 'next/link'

const faqs = [
  {
    q: 'How much does repair cost?',
    a: 'It depends on the exact model and the failure. We’ll confirm what’s going on first, then give you a clear quote before any work starts.'
  },
  {
    q: 'How long does it take?',
    a: 'Most repairs are completed in 1–2 days once parts arrive. Parts shipping is often another 1–2 days depending on the device.'
  },
  {
    q: 'Do you offer a warranty?',
    a: 'Yes—most repairs include a parts + labor warranty. Water damage is excluded.'
  },
  {
    q: 'Do you use OEM parts?',
    a: 'When possible, yes. If multiple quality tiers exist, we’ll explain options and pricing.'
  },
  {
    q: 'Can you help with “my device is slow”?',
    a: 'Yes. Try Tech Helper first for quick steps, or contact us for hands-on support.'
  }
]

export default function FAQ() {
  return (
    <section className="page">
      <div className="container">
        <h2>FAQ</h2>
        <p className="lead2">Quick answers to the most common questions.</p>

        <div className="grid3">
          {faqs.map((f, i) => (
            <article key={i} className="card">
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </article>
          ))}
        </div>

        <div className="actions" style={{ marginTop: '1.2rem' }}>
          <Link className="btn btn-primary" href="/contact">Request repair</Link>
          <Link className="btn" href="/chat">Tech Helper</Link>
          <Link className="btn btn-ghost" href="/guide">Before you bring it in</Link>
        </div>
      </div>
    </section>
  )
}
