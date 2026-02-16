'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import BeamBorder from './BeamBorder'

export default function ConsoleShellBeam({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const r = el.getBoundingClientRect()
      setSize({ w: r.width, h: r.height })
    }

    update()

    const ro = new ResizeObserver(() => update())
    ro.observe(el)

    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
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
          durationMs={14000}
        />
      ) : null}
      {children}
    </div>
  )
}
