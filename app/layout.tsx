import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hailey Device Repair | Phone, Laptop, Tablet Repair',
  description: 'Professional phone, laptop, and tablet repair in Hailey, Idaho. Clear diagnostics, quality parts, and respectful service across the Wood River Valley.',
  metadataBase: new URL('https://haileyrepair.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/antigravity.css?v=2026-02-11c" />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>

        <header className="header">
          <div className="container header-inner">
            <div className="brand" aria-label="Hailey Device Repair">
              <div className="brand-mark" aria-hidden="true" />
              <div>
                <div className="brand-title">HAILEY DEVICE REPAIR</div>
                <div className="brand-sub">Phones • Laptops • Tablets — Wood River Valley</div>
              </div>
            </div>

            <nav className="nav" aria-label="Primary">
              <Link href="/">Home</Link>

              <div className="menu">
                <details>
                  <summary style={{ listStyle: 'none' } as any}>
                    <span>Services ▾</span>
                  </summary>
                  <div className="menu-panel" role="menu">
                    <Link className="menu-item" href="/contact">
                      <strong>Phone repair</strong>
                      <span>Screens, batteries, charging, speakers/mics</span>
                    </Link>
                    <Link className="menu-item" href="/contact">
                      <strong>Laptop repair + IT help</strong>
                      <span>Slow devices, OS issues, setup, data help</span>
                    </Link>
                    <Link className="menu-item" href="/contact">
                      <strong>Tablets & accessories</strong>
                      <span>iPads/tablets, setup, smaller fixes</span>
                    </Link>
                  </div>
                </details>
              </div>

              <div className="menu">
                <details>
                  <summary style={{ listStyle: 'none' } as any}>
                    <span>Common issues ▾</span>
                  </summary>
                  <div className="menu-panel" role="menu">
                    <Link className="menu-item" href="/faq">
                      <strong>Cracked screen</strong>
                      <span>What it typically costs + what to expect</span>
                    </Link>
                    <Link className="menu-item" href="/faq">
                      <strong>Battery / charging</strong>
                      <span>Drain, swelling, won’t charge, loose port</span>
                    </Link>
                    <Link className="menu-item" href="/chat">
                      <strong>Slow device</strong>
                      <span>Try the Tech Helper first</span>
                    </Link>
                  </div>
                </details>
              </div>

              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/chat">Tech Helper</Link>
            </nav>

            <div className="cta">
              <a className="btn" href="tel:+12084503730">Call</a>
              <Link className="btn btn-primary" href="/contact">Request repair</Link>
              <Link className="btn btn-secondary" href="/chat">Tech Helper</Link>
            </div>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="footer">
          <div className="container footer-inner">
            <div>
              <h3>Hailey Device Repair</h3>
              <p>Locally owned electronics repair in Hailey, Idaho—serving the Wood River Valley with honesty, discretion, and quality workmanship.</p>
            </div>
            <div>
              <h3>Contact</h3>
              <p>
                <a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a>
                <br />
                <a href="tel:+12084503730">(208) 450-3730</a>
              </p>
            </div>
            <div>
              <h3>Service area</h3>
              <p>Hailey • Ketchum • Sun Valley • Bellevue</p>
            </div>
          </div>
          <div className="container footer-bottom">
            <span>© {new Date().getFullYear()} Hailey Device Repair</span>
            <span>
              <Link href="/faq">FAQ</Link> • <Link href="/contact">Contact</Link> • <Link href="/about">About</Link>
            </span>
          </div>
        </footer>
      </body>
    </html>
  )
}
