'use client'

import { useEffect, useRef } from 'react'

type Dot = {
  x0: number
  y0: number
  phase: number
  speed: number
  ampX: number
  ampY: number
  r: number
  a: number
  x: number
  y: number
}

export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let raf = 0
    let t = 0

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

      const count = Math.min(85, Math.max(42, Math.floor((w * h) / 30000)))
      dots = Array.from({ length: count }).map(() => {
        const x0 = Math.random() * w
        const y0 = Math.random() * h
        return {
          x0,
          y0,
          phase: Math.random() * Math.PI * 2,
          speed: 0.35 + Math.random() * 0.65,
          ampX: 6 + Math.random() * 16,
          ampY: 4 + Math.random() * 12,
          r: 0.8 + Math.random() * 1.8,
          a: 0.08 + Math.random() * 0.22,
          x: x0,
          y: y0,
        }
      })
    }

    const draw = () => {
      t += reduce ? 0.004 : 0.01
      ctx.clearRect(0, 0, w, h)

      // update positions: guaranteed motion from sinusoidal drift
      for (const d of dots) {
        const waveX = Math.sin(t * d.speed + d.phase) * d.ampX
        const waveY = Math.cos(t * d.speed * 0.9 + d.phase) * d.ampY

        let x = d.x0 + waveX
        let y = d.y0 + waveY

        // loose pointer interaction (subtle repulsion)
        if (mouse.active) {
          const dx = x - mouse.x
          const dy = y - mouse.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < 18000 && dist2 > 0.001) {
            const strength = reduce ? 6 : 12
            const m = (1 - dist2 / 18000) * strength
            const inv = 1 / Math.sqrt(dist2)
            x += dx * inv * m
            y += dy * inv * m
          }
        }

        // wrap around bounds softly
        if (x < -30) x = w + 30
        if (x > w + 30) x = -30
        if (y < -30) y = h + 30
        if (y > h + 30) y = -30

        d.x = x
        d.y = y
      }

      // draw lines first
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i]
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < 6200) {
            const op = 0.07 * (1 - dist2 / 6200)
            ctx.strokeStyle = `rgba(255,255,255,${op})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // draw dots
      for (const d of dots) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${d.a})`
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
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
