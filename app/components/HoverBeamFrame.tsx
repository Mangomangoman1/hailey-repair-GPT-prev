'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import BeamBorder from './BeamBorder'

type HoverBeamFrameProps = {
  as?: 'article' | 'div'
  children: ReactNode
  className?: string
  radius?: number
  inset?: number
  strokeWidth?: number
  dash?: number
  gap?: number
  durationMs?: number
}

export default function HoverBeamFrame({
  as = 'div',
  children,
  className,
  radius = 18,
  inset = 1,
  strokeWidth = 1.45,
  dash = 214,
  gap = 786,
  durationMs = 10800,
}: HoverBeamFrameProps) {
  const divRef = useRef<HTMLDivElement | null>(null)
  const articleRef = useRef<HTMLElement | null>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent
    const safari = /Safari\//.test(ua) && !/Chrome\//.test(ua) && !/CriOS\//.test(ua) && !/FxiOS\//.test(ua)
    setIsSafari(safari)

    const el = as === 'article' ? articleRef.current : divRef.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      setSize({ w: rect.width, h: rect.height })
    }

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
  }, [as])

  const content = (
    <>
      {size.w > 0 && size.h > 0 ? (
        <BeamBorder
          className="beam hover-beam-svg"
          width={size.w}
          height={size.h}
          radius={radius}
          inset={inset}
          strokeWidth={strokeWidth}
          dash={dash}
          gap={gap}
          durationMs={isSafari ? Math.round(durationMs * 1.2) : durationMs}
          glow
          glowBlur={1.15}
          glowStrength={0.34}
        />
      ) : null}
      {children}
    </>
  )

  if (as === 'article') {
    return <article ref={articleRef} className={`${className ?? ''} hover-beam-frame`.trim()}>{content}</article>
  }

  return <div ref={divRef} className={`${className ?? ''} hover-beam-frame`.trim()}>{content}</div>
}
