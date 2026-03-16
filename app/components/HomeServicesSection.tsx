import Link from 'next/link'
import HoverBeamFrame from './HoverBeamFrame'

const SERVICE_CARDS = [
  {
    id: 'apple',
    title: 'Apple & Mac repair',
    description: 'iPhone, iPad, and Mac-focused repair workflow and pre-check requirements.',
    pills: ['Screens', 'Batteries', 'Charging', 'Mac diagnostics'],
    ctaHref: '/prep#apple',
    ctaLabel: 'Open Apple & Mac prep',
  },
  {
    id: 'android',
    title: 'Android repair',
    description: 'Samsung, Pixel, and other Android devices with model-specific prep steps.',
    pills: ['Screens', 'Batteries', 'Charging ports', 'Data-safe intake'],
    ctaHref: '/prep#android',
    ctaLabel: 'Open Android prep',
  },
  {
    id: 'laptop-it',
    title: 'Laptop + IT help',
    description: 'Performance, OS issues, startup failures, account recovery, and troubleshooting prep.',
    pills: ['Performance', 'OS issues', 'Startup errors', 'Account/login'],
    ctaHref: '/prep#laptop-it',
    ctaLabel: 'Open Laptop + IT prep',
  },
] as const

export default function HomeServicesSection() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Services</h2>
            <p>Start with the category that matches your issue. If you&apos;re unsure, use Tech Helper and we&apos;ll route you.</p>
          </div>
        </div>

        <div className="grid3">
          {SERVICE_CARDS.map((card) => (
            <HoverBeamFrame key={card.id} as="article" className="card service-card" radius={18}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="pills">
                {card.pills.map((pill) => (
                  <span key={pill} className="pill">{pill}</span>
                ))}
              </div>
              <div className="actions" style={{ marginTop: '0.9rem' }}>
                <Link className="btn btn-primary" href={card.ctaHref}>{card.ctaLabel}</Link>
              </div>
            </HoverBeamFrame>
          ))}
        </div>
      </div>
    </section>
  )
}
