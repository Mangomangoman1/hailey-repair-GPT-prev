import type { Metadata } from 'next'
import Link from 'next/link'
import ParticleField from './components/ParticleField'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hailey Device Repair | Phone, Laptop, Tablet Repair',
  description:
    'Professional phone, laptop, and tablet repair in Hailey, Idaho. Clear diagnostics, quality parts, and respectful service across the Wood River Valley.',
  metadataBase: new URL('https://haileyrepair.com'),
  icons: {
    icon: [
      { url: '/assets/favicon-32.png?v=2026-03-11a', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon-16.png?v=2026-03-11a', sizes: '16x16', type: 'image/png' },
      { url: '/assets/favicon-192.png?v=2026-03-11a', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/assets/favicon-32.png?v=2026-03-11a',
    apple: [
      { url: '/assets/apple-touch-icon.png?v=2026-03-11a', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preview/test site: Orbit chassis (fresh start) */}
        <link rel="stylesheet" href="/css/orbit.css?v=2026-03-06a" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png?v=2026-03-11a" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16.png?v=2026-03-11a" />
        <link rel="shortcut icon" href="/assets/favicon-32.png?v=2026-03-11a" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png?v=2026-03-11a" />
      </head>
      <body>
        <div className="gridfx" aria-hidden="true" />
        <ParticleField />

        <a className="skip" href="#main">
          Skip to content
        </a>

        <header className="header">
          <div className="container header-inner">
            <Link className="brand" href="/" aria-label="Hailey Device Repair">
              <span className="markWrap" aria-hidden="true">
                <img className="mark" src="/assets/hdr-mark.png?v=2026-02-13b" alt="" />
              </span>
              <div>
                <div className="brand-title">Hailey Device Repair</div>
                <div className="brand-sub">Phones • Laptops • Tablets — Wood River Valley</div>
              </div>
            </Link>

            <nav className="nav" aria-label="Primary">
              <Link href="/">Home</Link>
              <Link href="/#services">Services</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/prep">Repair Prep</Link>
              <Link href="/chat">Tech Helper</Link>
            </nav>

            <div className="cta">
              <a className="btn btn-call shine tag" href="sms:+12083666111">
                <span className="btn-call-label">Text</span>
              </a>
            </div>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="footer">
          <div className="container footer-inner">
            <div>
              <h3>Hailey Device Repair</h3>
              <p>
                Locally owned electronics repair in Hailey, Idaho — serving the Wood River Valley with honesty, discretion, and careful workmanship.
              </p>
            </div>
            <div>
              <h3>Contact</h3>
              <p>
                <a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a>
                <br />
                <a href="tel:+12083666111">(208) 366-6111</a>
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
              <Link href="/faq">FAQ</Link> • <Link href="/contact">Contact</Link> • <Link href="/chat">Tech Helper</Link>
            </span>
          </div>
        </footer>
      </body>
    </html>
  )
}
