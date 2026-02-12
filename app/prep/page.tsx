import Link from 'next/link'

export default function PrepPage() {
  return (
    <section className="page">
      <div className="container">
        <h2>Repair Prep Guide</h2>
        <p className="lead2">
          One page for all device categories. Use the buttons to jump to your section and complete the checklist before drop-off.
        </p>

        <div className="anchor-nav">
          <a className="btn" href="#apple">Apple & Mac</a>
          <a className="btn" href="#android">Android</a>
          <a className="btn" href="#laptop-it">Laptop + IT</a>
        </div>

        <div id="apple" className="big" style={{ marginTop: '1rem' }}>
          <h3>Apple & Mac Prep</h3>
          <p>Goal: avoid activation lock issues and protect your data.</p>
          <ul className="checklist">
            <li><strong>Back up first:</strong> iCloud or local backup so data is safe if hardware fails.</li>
            <li><strong>Turn off Find My:</strong> required for many board/display/battery workflows.</li>
            <li><strong>Know Apple ID + passcode:</strong> needed for post-repair verification.</li>
            <li><strong>Remove passcode only if requested:</strong> otherwise keep security enabled.</li>
            <li><strong>Bring charger/cable if power issue:</strong> helps isolate adapter vs board faults.</li>
          </ul>
          <div className="actions">
            <Link className="btn btn-primary" href="/contact">Start Apple/Mac intake</Link>
          </div>
        </div>

        <div id="android" className="big" style={{ marginTop: '1rem' }}>
          <h3>Android Prep</h3>
          <p>Goal: keep FRP/account lock from blocking testing after repair.</p>
          <ul className="checklist">
            <li><strong>Back up photos/messages:</strong> Google backup or manual copy.</li>
            <li><strong>Know Google account credentials:</strong> needed if device requests verification after service.</li>
            <li><strong>Disable screen lock only when asked:</strong> allows final function testing.</li>
            <li><strong>Tell us exact model/storage:</strong> Android parts vary by sub-model.</li>
            <li><strong>Note prior repairs/water exposure:</strong> prevents avoidable risk during disassembly.</li>
          </ul>
          <div className="actions">
            <Link className="btn btn-primary" href="/contact">Start Android intake</Link>
          </div>
        </div>

        <div id="laptop-it" className="big" style={{ marginTop: '1rem' }}>
          <h3>Laptop + IT Prep</h3>
          <p>Goal: speed up diagnosis for performance, OS, and account issues.</p>
          <ul className="checklist">
            <li><strong>Describe symptoms clearly:</strong> slow boot, fan noise, freezing, login loop, etc.</li>
            <li><strong>Bring charger:</strong> battery/power issues are impossible to isolate without it.</li>
            <li><strong>Back up critical files:</strong> always best before OS or storage work.</li>
            <li><strong>List recent changes:</strong> updates, app installs, spills, drops, or BIOS changes.</li>
            <li><strong>State your priority:</strong> fast turnaround, data recovery, or long-term stability.</li>
          </ul>
          <div className="actions">
            <Link className="btn btn-primary" href="/contact">Start Laptop/IT intake</Link>
            <Link className="btn" href="/chat">Open Tech Helper</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
