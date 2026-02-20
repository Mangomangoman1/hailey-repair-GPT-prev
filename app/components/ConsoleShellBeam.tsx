'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import BeamBorder from './BeamBorder'

export default function ConsoleShellBeam({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    // Safari detection (exclude Chrome iOS which is still WebKit but reports CriOS)
    const ua = navigator.userAgent
    const safari = /Safari\//.test(ua) && !/Chrome\//.test(ua) && !/CriOS\//.test(ua) && !/FxiOS\//.test(ua)
    setIsSafari(safari)

    const el = ref.current
    if (!el) return

    const update = () => {
      const r = el.getBoundingClientRect()
      setSize({ w: r.width, h: r.height })
    }

    // Safari sometimes reports 0x0 on first tick; re-measure a couple times.
    const raf1 = requestAnimationFrame(update)
    const raf2 = requestAnimationFrame(update)

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => update()) : null
    ro?.observe(el)

    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      ro?.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div ref={ref} className="console-shell beam-card">
      {size.w > 0 && size.h > 0 ? (
        <BeamBorder
          className="beam"
          width={size.w}
          height={size.h}
          radius={20}
          inset={1}
          strokeWidth={1.05}
          dash={144}
          gap={856}
          durationMs={isSafari ? Math.round(28000 * 1.3) : 28000}
          glow={!isSafari}
        />
      ) : null}
      {children}
    </div>
  )
}
