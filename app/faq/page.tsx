import Link from 'next/link'

const faqs = [
  {
    q: 'How much does phone screen repair cost?',
    a: 'Most phone screen repairs fall in the $50–$200 range. The exact quote depends on the device model and what we find during diagnosis.'
  },
  {
    q: 'How long does a typical repair take?',
    a: 'Most repairs are completed in 1–2 days once parts arrive. We order parts on demand for your specific device (shipping is often another 1–2 days).'
  },
  {
    q: 'Do you use original (OEM) parts?',
    a: 'We source OEM or OEM-equivalent parts whenever possible.'
  },
  {
    q: 'Do you fix water-damaged devices?',
    a: 'We can assess water damage and, when possible, attempt repair or data recovery. Results vary. Water-damaged devices are excluded from our standard warranty.'
  },
  {
    q: 'Do you offer a warranty?',
    a: 'Yes—60 days on parts and labor for most repairs. Water damage is excluded.'
  }
]

export default function FAQ() {
  return (
    <section className="section" style={{ paddingTop: '2.2rem' }}>
      <div className="container">
        <div className="hgroup">
          <div>
            <h2>FAQ</h2>
            <p>Quick answers to the most common questions.</p>
          </div>
        </div>

        <div className="grid-3" style={{ gridTemplateColumns: '1fr 1fr 1fr' } as any}>
          {faqs.map((f, i) => (
            <article key={i} className="card panel">
              <h3 style={{ marginTop: 0 }}>{f.q}</h3>
              <p>{f.a}</p>
            </article>
          ))}
        </div>

        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <Link className="btn btn-primary" href="/contact">Request a repair</Link>
          <Link className="btn" href="/chat">Tech Helper</Link>
        </div>
      </div>
    </section>
  )
}
