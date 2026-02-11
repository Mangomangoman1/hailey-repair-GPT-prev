import Link from 'next/link'

export default function Guide() {
  return (
    <section className="section" style={{ paddingTop: '2.2rem' }}>
      <div className="container">
        <div className="hgroup">
          <div>
            <h2>Repair guide</h2>
            <p>Small steps that save time (and money) before you bring a device in.</p>
          </div>
        </div>

        <div className="grid-3">
          <article className="card step">
            <div className="num" aria-hidden="true">1</div>
            <h3>Back up (if you can)</h3>
            <p>iCloud/Google Drive or a computer backup—especially before major repairs.</p>
          </article>
          <article className="card step">
            <div className="num" aria-hidden="true">2</div>
            <h3>Know your model</h3>
            <p>Exact model = faster quotes + correct parts the first time.</p>
          </article>
          <article className="card step">
            <div className="num" aria-hidden="true">3</div>
            <h3>Tell us the goal</h3>
            <p>If data recovery is the priority, say that up front.</p>
          </article>
        </div>

        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <Link className="btn btn-primary" href="/contact">Request a repair</Link>
          <Link className="btn" href="/chat">Try Tech Helper</Link>
        </div>
      </div>
    </section>
  )
}
