'use client'

import { useEffect, useRef } from 'react'

export default function Particles() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvasEl = ref.current
    if (!canvasEl) return
    const canvas = canvasEl as HTMLCanvasElement
    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let w = 0
    let h = 0

    type Dot = { x: number; y: number; r: number; vx: number; vy: number; a: number }
    let dots: Dot[] = []

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round((w * h) / 28000) // scale with area
      dots = Array.from({ length: Math.min(140, Math.max(70, count)) }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.6,
        vx: (-0.18 + Math.random() * 0.36),
        vy: (-0.12 + Math.random() * 0.24),
        a: 0.10 + Math.random() * 0.22,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)

      // faint paper grain
      ctx.fillStyle = 'rgba(16,18,24,0.03)'
      ctx.fillRect(0, 0, w, h)

      // dots
      for (const d of dots) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(11,87,208,${d.a})`
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!prefersReduced) {
        for (const d of dots) {
          d.x += d.vx
          d.y += d.vy
          if (d.x < -20) d.x = w + 20
          if (d.x > w + 20) d.x = -20
          if (d.y < -20) d.y = h + 20
          if (d.y > h + 20) d.y = -20
        }
      }

      raf = window.requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)
    resize()
    draw()

    return () => {
      ro.disconnect()
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={ref} className="particles" aria-hidden="true" />
}
