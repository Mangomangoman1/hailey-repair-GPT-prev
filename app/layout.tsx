import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hailey Device Repair | Phone, Laptop, Tablet Repair',
  description: 'Professional phone, laptop, and tablet repair in Hailey, Idaho. Clear diagnostics, quality parts, and respectful service across the Wood River Valley.',
  metadataBase: new URL('https://haileyrepair.com'),
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/rebuild.css?v=2026-02-11b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Hailey Device Repair",
              "url": "https://haileyrepair.com/",
              "telephone": "+1-208-450-3730",
              "email": "samuel@haileyrepair.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Hailey",
                "addressRegion": "ID",
                "postalCode": "83333",
                "addressCountry": "US"
              },
              "areaServed": [
                {"@type": "City", "name": "Hailey"},
                {"@type": "City", "name": "Ketchum"},
                {"@type": "City", "name": "Sun Valley"},
                {"@type": "City", "name": "Bellevue"}
              ],
              "openingHoursSpecification": [
                {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "09:00", "closes": "18:00"}
              ]
            })
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>

        <header className="header">
          <div className="container header-inner">
            <div className="brand">
              <img className="brand-logo" src="/assets/logo-transparent.png" alt="Hailey Device Repair" />
              <div>
                <div className="brand-title">HAILEY DEVICE REPAIR</div>
                <div className="brand-sub">Phone • Laptop • Tablet — Wood River Valley</div>
              </div>
            </div>

            <nav className="nav" aria-label="Primary">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/guide">Guide</Link>
              <Link href="/chat">Tech Helper</Link>
            </nav>

            <div className="cta">
              <a className="btn btn-ghost" href="tel:+12084503730">Call</a>
              <Link className="btn btn-primary" href="/contact">Request repair</Link>
              <Link className="btn" href="/chat">Tech Helper</Link>
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
