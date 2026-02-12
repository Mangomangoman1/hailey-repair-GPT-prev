import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hailey Device Repair | Phone, Laptop, Tablet Repair',
  description:
    'Professional phone, laptop, and tablet repair in Hailey, Idaho. Clear diagnostics, quality parts, and respectful service across the Wood River Valley.',
  metadataBase: new URL('https://haileyrepair.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Test site: Nova chassis */}
        <link rel="stylesheet" href="/css/nova.css?v=2026-02-12a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Hailey Device Repair',
              url: 'https://haileyrepair.com/',
              telephone: '+1-208-450-3730',
              email: 'samuel@haileyrepair.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Hailey',
                addressRegion: 'ID',
                postalCode: '83333',
                addressCountry: 'US',
              },
              areaServed: [
                { '@type': 'City', name: 'Hailey' },
                { '@type': 'City', name: 'Ketchum' },
                { '@type': 'City', name: 'Sun Valley' },
                { '@type': 'City', name: 'Bellevue' },
              ],
            }),
          }}
        />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>

        <header className="header">
          <div className="container header-inner">
            <Link className="brand" href="/" aria-label="Hailey Device Repair">
              <div className="logo" aria-hidden="true" />
              <div>
                <div className="brand-title">HAILEY DEVICE REPAIR</div>
                <div className="brand-sub">Phones • Laptops • Tablets — Wood River Valley</div>
              </div>
            </Link>

            <nav className="nav" aria-label="Primary">
              <Link href="/">Home</Link>
              <Link href="/#services">Services</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/guide">Guide</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/chat">Tech Helper</Link>
            </nav>

            <div className="cta">
              <a className="btn btn-ghost" href="tel:+12084503730">
                Call
              </a>
              <Link className="btn" href="/chat">
                Tech Helper
              </Link>
              <Link className="btn btn-primary" href="/contact">
                Request repair
              </Link>
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
              <Link href="/contact">Contact</Link> • <Link href="/faq">FAQ</Link> • <Link href="/about">About</Link>
            </span>
          </div>
        </footer>
      </body>
    </html>
  )
}
