'use client'

import { useEffect, useMemo, useState } from 'react'

type BeamBorderProps = {
  width: number
  height: number
  radius?: number
  inset?: number
  strokeWidth?: number
  dash?: number
  gap?: number
  durationMs?: number
  glow?: boolean
  className?: string
}

export default function BeamBorder({
  width,
  height,
  radius = 20,
  inset = 1,
  strokeWidth = 1.2,
  dash = 80,
  gap = 920,
  durationMs = 19000,
  glow = true,
  className,
}: BeamBorderProps) {
  const [uid] = useState(() => Math.random().toString(36).slice(2))

  const w = Math.max(1, Math.floor(width))
  const h = Math.max(1, Math.floor(height))
  const rx = Math.max(0, radius)

  // Keep the rect inside the viewBox so the stroke is visually aligned.
  const x = inset
  const y = inset
  const rw = Math.max(1, w - inset * 2)
  const rh = Math.max(1, h - inset * 2)

  const pathLength = 1000

  const style = useMemo(
    () => ({
      ['--beamDur' as any]: `${durationMs}ms`,
      ['--beamDash' as any]: `${dash}`,
      ['--beamGap' as any]: `${gap}`,
      ['--beamStroke' as any]: `${strokeWidth}`,
    }),
    [durationMs, dash, gap, strokeWidth]
  )

  // Clamp corner radius to rect size
  const maxR = Math.min(rw, rh) / 2
  const cr = Math.min(rx, maxR)

  return (
    <svg
      className={className}
      style={style}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id={`beamGlow-${uid}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.4" result="b" />
          <feColorMatrix
            in="b"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.35 0"
            result="g"
          />
          <feMerge>
            <feMergeNode in="g" />
            <feMergeNode in="g" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x={x}
        y={y}
        width={rw}
        height={rh}
        rx={cr}
        ry={cr}
        pathLength={pathLength}
        className="beam-path"
        filter={glow ? `url(#beamGlow-${uid})` : undefined}
      />

      <rect
        x={x}
        y={y}
        width={rw}
        height={rh}
        rx={cr}
        ry={cr}
        pathLength={pathLength}
        className="beam-path beam-path2"
        style={{ animationDelay: `-${Math.round(durationMs / 2)}ms` }}
        filter={glow ? `url(#beamGlow-${uid})` : undefined}
      />
    </svg>
  )
}
