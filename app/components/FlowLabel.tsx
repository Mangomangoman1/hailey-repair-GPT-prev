'use client'

import { useEffect, useRef } from 'react'

export default function FlowLabel({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let raf = 0
    let pos = 0

    const tick = () => {
      pos += 0.45
      if (pos > 300) pos = 0
      el.style.backgroundPosition = `${pos}% 50%`
      raf = window.requestAnimationFrame(tick)
    }

    raf = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(raf)
  }, [])

  return (
    <span ref={ref} className="flow-label">
      {text}
    </span>
  )
}
