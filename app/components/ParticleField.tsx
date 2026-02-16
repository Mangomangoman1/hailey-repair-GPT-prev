'use client'

import { useEffect, useRef } from 'react'

type Dot = { x: number; y: number; vx: number; vy: number; r: number; a: number }

export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ua = navigator.userAgent
    const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua) && !/CriOS\//.test(ua) && !/FxiOS\//.test(ua)
    let w = 0
    let h = 0
    let raf = 0

    const mouse = { x: -9999, y: -9999, active: false }
    let dots: Dot[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Safari struggles with lots of particles + connections; keep it lighter there.
      const countBase = Math.floor((w * h) / (isSafari ? 23500 : 17400))
      const count = Math.min(isSafari ? 96 : 142, Math.max(isSafari ? 42 : 66, countBase))
      dots = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: -0.16 + Math.random() * 0.32,
        vy: -0.12 + Math.random() * 0.24,
        r: 0.7 + Math.random() * 1.6,
        // ~30% brighter than last pass
        a: 0.18 + Math.random() * 0.36,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const d of dots) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${d.a})`
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // very light near-line connections (Safari: fewer + smaller radius)
      const linkR2 = isSafari ? 3600 : 5600
      const linkOp = isSafari ? 0.045 : 0.06
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i]
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < linkR2) {
            const op = linkOp * (1 - dist2 / linkR2)
            ctx.strokeStyle = `rgba(255,255,255,${op})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const d of dots) {
        // pointer influence (very subtle). If reduced-motion is enabled,
        // keep pointer effect much lighter.
        if (mouse.active) {
          const dx = d.x - mouse.x
          const dy = d.y - mouse.y
          const dist2 = dx * dx + dy * dy
          // ~35% larger pointer impact radius
          if (dist2 < 18900 && dist2 > 0.01) {
            const strength = reduce ? 0.025 : 0.08
            const f = (1 - dist2 / 18900) * strength
            d.vx += (dx / Math.sqrt(dist2)) * f
            d.vy += (dy / Math.sqrt(dist2)) * f
          }
        }

        // keep a tiny ambient drift so particles never fully "freeze"
        const driftX = reduce ? 0.008 : 0.015
        const driftY = reduce ? 0.006 : 0.012
        d.vx = d.vx * 0.998 + (-driftX + Math.random() * (driftX * 2))
        d.vy = d.vy * 0.998 + (-driftY + Math.random() * (driftY * 2))
        d.x += d.vx
        d.y += d.vy

        if (d.x < -20) d.x = w + 20
        if (d.x > w + 20) d.x = -20
        if (d.y < -20) d.y = h + 20
        if (d.y > h + 20) d.y = -20
      }

      raf = window.requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave, { passive: true })
    window.addEventListener('resize', resize)

    resize()
    draw()

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="particle-field" aria-hidden="true" />
}
