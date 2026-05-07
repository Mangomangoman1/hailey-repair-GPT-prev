import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Hailey Device Repair | Text Samuel for Repair Triage',
  description:
    'Text or email Hailey Device Repair for phone, laptop, tablet, console, and electronics repair triage in Hailey and the Wood River Valley.',
  alternates: {
    canonical: '/contact',
  },
}

export default function Contact() {
  return <ContactClient />
}
