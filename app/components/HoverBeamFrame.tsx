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
  const beamUnmountTimerRef = useRef<number | null>(null)
  const beamActivateRafRef = useRef<number | null>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [isSafari, setIsSafari] = useState(false)
  const [isBeamMounted, setIsBeamMounted] = useState(false)
  const [isBeamActive, setIsBeamActive] = useState(false)

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

  useEffect(() => {
    return () => {
      if (beamUnmountTimerRef.current !== null) {
        window.clearTimeout(beamUnmountTimerRef.current)
      }
      if (beamActivateRafRef.current !== null) {
        cancelAnimationFrame(beamActivateRafRef.current)
      }
    }
  }, [])

  const handlePointerEnter = () => {
    if (beamUnmountTimerRef.current !== null) {
      window.clearTimeout(beamUnmountTimerRef.current)
      beamUnmountTimerRef.current = null
    }
    if (beamActivateRafRef.current !== null) {
      cancelAnimationFrame(beamActivateRafRef.current)
    }

    setIsBeamMounted(true)
    beamActivateRafRef.current = requestAnimationFrame(() => {
      setIsBeamActive(true)
      beamActivateRafRef.current = null
    })
  }

  const handlePointerLeave = () => {
    if (beamActivateRafRef.current !== null) {
      cancelAnimationFrame(beamActivateRafRef.current)
      beamActivateRafRef.current = null
    }

    setIsBeamActive(false)
    beamUnmountTimerRef.current = window.setTimeout(() => {
      setIsBeamMounted(false)
      beamUnmountTimerRef.current = null
    }, 180)
  }

  const content = (
    <>
      {isBeamMounted && size.w > 0 && size.h > 0 ? (
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
          glowBlur={isSafari ? 0.95 : 1.35}
          glowStrength={isSafari ? 0.22 : 0.42}
        />
      ) : null}
      {children}
    </>
  )

  if (as === 'article') {
    return (
      <article
        ref={articleRef}
        className={`${className ?? ''} hover-beam-frame${isBeamActive ? ' is-beam-active' : ''}${isSafari ? ' is-safari-beam' : ''}`.trim()}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {content}
      </article>
    )
  }

  return (
    <div
      ref={divRef}
      className={`${className ?? ''} hover-beam-frame${isBeamActive ? ' is-beam-active' : ''}${isSafari ? ' is-safari-beam' : ''}`.trim()}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {content}
    </div>
  )
}
