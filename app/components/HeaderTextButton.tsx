'use client'

import { useEffect, useState } from 'react'
import { Dithering } from '@paper-design/shaders-react'

const paperGradient =
  'linear-gradient(in oklab 180deg, oklab(0% 0 0) -9.59%, oklab(29.2% 0 0) 63.46%, oklab(32.8% 0 0) 72.45%, oklab(36.1% 0 0) 81.43%, oklab(40% 0 0) 90.41%)'

export default function HeaderTextButton() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)

    updateMotionPreference()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMotionPreference)
      return () => mediaQuery.removeEventListener('change', updateMotionPreference)
    }

    mediaQuery.addListener(updateMotionPreference)
    return () => mediaQuery.removeListener(updateMotionPreference)
  }, [])

  return (
    <a className="btn btn-call btn-call--paper" href="sms:+12083666111" aria-label="Text Hailey Device Repair">
      <span className="btn-call-paper-bg" aria-hidden="true">
        <Dithering
          speed={reducedMotion ? 0 : 0.57}
          shape="simplex"
          type="2x2"
          size={1.9}
          scale={1}
          colorBack="#00000000"
          colorFront="#00B2FF"
          width="100%"
          height="100%"
          maxPixelCount={32000}
          className="btn-call-paper-noise"
          style={{ backgroundImage: paperGradient }}
        />
        <span className="btn-call-paper-veil" />
      </span>
      <span className="btn-call-label">Text</span>
    </a>
  )
}
