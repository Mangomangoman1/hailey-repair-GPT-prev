'use client'

import { useEffect, useRef } from 'react'

type ShapeName = 'phone' | 'laptop' | 'watch' | 'text'

type ShapePoint = {
  x: number
  y: number
  z: number
}

type Particle = {
  x: number
  y: number
  z: number
  tx: number
  ty: number
  tz: number
  ox: number
  oy: number
  oz: number
  delay: number
  noiseOff: number
  size: number
}

const PARTICLE_COUNT = 14000
const SHAPES: ShapeName[] = ['phone', 'laptop', 'watch', 'text']
const SHAPE_HOLD = 3200
const MORPH_DURATION = 2400

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function inRoundedRect(x: number, y: number, hw: number, hh: number, r: number) {
  const cx = Math.max(0, Math.abs(x) - (hw - r))
  const cy = Math.max(0, Math.abs(y) - (hh - r))
  return cx * cx + cy * cy <= r * r
}

function ringPts(cx: number, cy: number, r: number, n: number, pts: ShapePoint[], z = 0) {
  for (let i = 0; i < n; i += 1) {
    const a = (i / n) * Math.PI * 2 + Math.random() * 0.3
    const rr = r + (Math.random() - 0.5) * 2
    pts.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr, z: z || (Math.random() - 0.5) * 3 })
  }
}

function fillCircle(cx: number, cy: number, r: number, n: number, pts: ShapePoint[], z = 0) {
  for (let i = 0; i < n; i += 1) {
    const a = Math.random() * Math.PI * 2
    const rr = Math.sqrt(Math.random()) * r
    pts.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr, z: z || (Math.random() - 0.5) * 3 })
  }
}

function lineEdge(x1: number, y1: number, x2: number, y2: number, n: number, pts: ShapePoint[], z = 0) {
  for (let i = 0; i < n; i += 1) {
    const t = Math.random()
    pts.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t, z: z || (Math.random() - 0.5) * 3 })
  }
}

function fillRect(x1: number, y1: number, x2: number, y2: number, n: number, pts: ShapePoint[], z = 0) {
  for (let i = 0; i < n; i += 1) {
    pts.push({ x: x1 + Math.random() * (x2 - x1), y: y1 + Math.random() * (y2 - y1), z: z || (Math.random() - 0.5) * 3 })
  }
}

function rrOutline(cx: number, cy: number, hw: number, hh: number, r: number, n: number, pts: ShapePoint[], z = 0) {
  const straightCount = Math.floor(n * 0.6)
  const cornerCount = n - straightCount
  const edgeCount = Math.floor(straightCount / 4)
  const cornerSlice = Math.floor(cornerCount / 4)

  lineEdge(-hw + r + cx, -hh + cy, hw - r + cx, -hh + cy, edgeCount, pts, z)
  lineEdge(-hw + r + cx, hh + cy, hw - r + cx, hh + cy, edgeCount, pts, z)
  lineEdge(-hw + cx, -hh + r + cy, -hw + cx, hh - r + cy, edgeCount, pts, z)
  lineEdge(hw + cx, -hh + r + cy, hw + cx, hh - r + cy, edgeCount, pts, z)

  const corners = [
    { x: hw - r + cx, y: -hh + r + cy, a0: -Math.PI / 2, a1: 0 },
    { x: hw - r + cx, y: hh - r + cy, a0: 0, a1: Math.PI / 2 },
    { x: -hw + r + cx, y: hh - r + cy, a0: Math.PI / 2, a1: Math.PI },
    { x: -hw + r + cx, y: -hh + r + cy, a0: Math.PI, a1: Math.PI * 1.5 },
  ]

  for (const corner of corners) {
    for (let i = 0; i < cornerSlice; i += 1) {
      const a = corner.a0 + Math.random() * (corner.a1 - corner.a0)
      pts.push({ x: corner.x + Math.cos(a) * r, y: corner.y + Math.sin(a) * r, z: z || (Math.random() - 0.5) * 3 })
    }
  }
}

function genPhone(scale: number) {
  const pts: ShapePoint[] = []
  const hw = 42 * scale
  const hh = 88 * scale
  const r = 12 * scale
  const z0 = 5 * scale

  rrOutline(0, 0, hw, hh, r, 2800, pts, z0)
  for (let i = 0; i < 3500; i += 1) {
    const x = (Math.random() - 0.5) * hw * 2
    const y = (Math.random() - 0.5) * hh * 2
    if (!inRoundedRect(x, y, hw, hh, r)) {
      i -= 1
      continue
    }
    pts.push({ x, y, z: z0 + (Math.random() - 0.5) * 2 })
  }

  const island = { x: -16 * scale, y: -52 * scale, s: 22 * scale, r: 6 * scale }
  rrOutline(island.x, island.y, island.s, island.s, island.r, 800, pts, z0 + 3)
  fillRect(island.x - island.s + island.r, island.y - island.s + island.r, island.x + island.s - island.r, island.y + island.s - island.r, 400, pts, z0 + 3)

  const lensRadius = 7 * scale
  ;[
    { x: island.x - 8 * scale, y: island.y - 8 * scale },
    { x: island.x + 8 * scale, y: island.y - 8 * scale },
    { x: island.x - 8 * scale, y: island.y + 8 * scale },
  ].forEach((lensPoint) => {
    ringPts(lensPoint.x, lensPoint.y, lensRadius, 180, pts, z0 + 5)
    ringPts(lensPoint.x, lensPoint.y, lensRadius * 0.6, 120, pts, z0 + 5)
    fillCircle(lensPoint.x, lensPoint.y, lensRadius * 0.35, 60, pts, z0 + 6)
  })

  fillCircle(island.x + 8 * scale, island.y + 8 * scale, 3 * scale, 50, pts, z0 + 4)
  fillCircle(0, 12 * scale, 8 * scale, 200, pts, z0 + 1)
  fillCircle(0, 4 * scale, 6.5 * scale, 150, pts, z0 + 1)
  for (let i = 0; i < 40; i += 1) {
    const t = Math.random()
    pts.push({ x: 2 * scale + t * 5 * scale, y: -2 * scale - t * 3 * scale + Math.sin(t * 3) * 2 * scale, z: z0 + 1 })
  }

  while (pts.length < PARTICLE_COUNT) {
    const x = (Math.random() - 0.5) * hw * 2
    const y = (Math.random() - 0.5) * hh * 2
    if (inRoundedRect(x, y, hw, hh, r)) {
      pts.push({ x, y, z: z0 + (Math.random() - 0.5) * 2 })
    }
  }

  return pts.slice(0, PARTICLE_COUNT)
}

function genLaptop(scale: number) {
  const pts: ShapePoint[] = []
  const baseWidth = 150 * scale
  const baseDepth = 8 * scale
  const screenWidth = 142 * scale
  const screenHeight = 95 * scale
  const screenDepth = 5 * scale
  const hingeY = 25 * scale

  rrOutline(0, hingeY + baseDepth / 2, baseWidth / 2, baseDepth / 2, 3 * scale, 1200, pts, 0)
  for (let i = 0; i < 1500; i += 1) {
    const x = (Math.random() - 0.5) * baseWidth
    let y = hingeY + Math.random() * baseDepth
    const z = (Math.random() - 0.5) * 10 * scale
    if (Math.random() < 0.4) y = Math.random() < 0.5 ? hingeY : hingeY + baseDepth
    pts.push({ x, y, z })
  }

  const kbLeft = -baseWidth * 0.43
  const kbRight = baseWidth * 0.43
  const kbTop = hingeY + baseDepth * 0.15
  const kbBottom = hingeY + baseDepth * 0.85
  const rows = 5
  const cols = 13
  const keyW = (kbRight - kbLeft) / cols
  const keyH = (kbBottom - kbTop) / rows
  const gap = 1.2 * scale

  for (let row = 0; row < rows; row += 1) {
    const keyCount = row === 4 ? 8 : cols
    for (let col = 0; col < keyCount; col += 1) {
      let keyWidth = keyW - gap
      let keyX = 0
      if (row === 4 && (col === 3 || col === 4)) keyWidth = keyW * 2 - gap
      if (row === 4) {
        keyX = kbLeft + ((kbRight - kbLeft) / keyCount) * col + keyWidth / 2
      } else {
        keyX = kbLeft + keyW * col + keyW / 2
      }
      const keyY = kbTop + keyH * row + keyH / 2
      const hw = keyWidth / 2
      const hh = (keyH - gap) / 2

      for (let k = 0; k < 2; k += 1) {
        pts.push({ x: keyX - hw, y: keyY + (Math.random() - 0.5) * (keyH - gap), z: 1 })
        pts.push({ x: keyX + hw, y: keyY + (Math.random() - 0.5) * (keyH - gap), z: 1 })
        pts.push({ x: keyX + (Math.random() - 0.5) * keyWidth, y: keyY - hh, z: 1 })
        pts.push({ x: keyX + (Math.random() - 0.5) * keyWidth, y: keyY + hh, z: 1 })
      }

      if (row === 4 && (col === 3 || col === 4)) col += 1
    }
  }

  rrOutline(0, hingeY + baseDepth * 0.55, baseWidth * 0.18, baseDepth * 0.25, 2 * scale, 300, pts, 1)
  rrOutline(0, hingeY - screenHeight / 2, screenWidth / 2, screenHeight / 2, 3 * scale, 1600, pts, 4 * scale)
  rrOutline(0, hingeY - screenHeight / 2, screenWidth / 2 - 3 * scale, screenHeight / 2 - 3 * scale, 2 * scale, 600, pts, 4 * scale)

  for (let i = 0; i < 3000; i += 1) {
    const x = (Math.random() - 0.5) * (screenWidth - 8 * scale)
    const localY = Math.random() * (screenHeight - 8 * scale)
    const y = hingeY - screenHeight + 4 * scale + localY
    const z = 4 * scale + (Math.random() - 0.5) * screenDepth * 0.3
    pts.push({ x, y, z })
  }

  const notchY = hingeY - screenHeight + 3 * scale
  rrOutline(0, notchY + 2 * scale, 8 * scale, 2 * scale, 1.5 * scale, 100, pts, 5 * scale)
  fillCircle(0, notchY + 2 * scale, 1.2 * scale, 25, pts, 5 * scale)
  lineEdge(-baseWidth / 2, hingeY, baseWidth / 2, hingeY, 400, pts, 2)

  while (pts.length < PARTICLE_COUNT) {
    pts.push({
      x: (Math.random() - 0.5) * baseWidth,
      y: hingeY + Math.random() * baseDepth,
      z: (Math.random() - 0.5) * 4,
    })
  }

  return pts.slice(0, PARTICLE_COUNT)
}

function genWatch(scale: number) {
  const pts: ShapePoint[] = []
  const hw = 30 * scale
  const hh = 36 * scale
  const r = 12 * scale

  rrOutline(0, 0, hw, hh, r, 1800, pts, 0)
  for (let i = 0; i < 2000; i += 1) {
    const x = (Math.random() - 0.5) * hw * 2
    const y = (Math.random() - 0.5) * hh * 2
    if (!inRoundedRect(x, y, hw, hh, r)) {
      i -= 1
      continue
    }
    pts.push({ x, y, z: (Math.random() - 0.5) * 8 * scale })
  }

  rrOutline(0, 0, hw - 4 * scale, hh - 4 * scale, r - 2 * scale, 1000, pts, 4 * scale)
  for (let i = 0; i < 1500; i += 1) {
    const x = (Math.random() - 0.5) * (hw - 8 * scale) * 2
    const y = (Math.random() - 0.5) * (hh - 8 * scale) * 2
    if (!inRoundedRect(x, y, hw - 6 * scale, hh - 6 * scale, r - 3 * scale)) {
      i -= 1
      continue
    }
    pts.push({ x, y, z: 4 * scale + (Math.random() - 0.5) })
  }

  const clockRadius = 22 * scale
  ringPts(0, 0, clockRadius, 300, pts, 4.5 * scale)
  for (let h = 0; h < 12; h += 1) {
    const a = (h / 12) * Math.PI * 2 - Math.PI / 2
    const markerRadius = clockRadius - 4 * scale
    fillCircle(Math.cos(a) * markerRadius, Math.sin(a) * markerRadius, 1.5 * scale, 15, pts, 4.5 * scale)
  }

  const hourAngle = -Math.PI / 6
  for (let i = 0; i < 60; i += 1) {
    const t = Math.random() * 14 * scale
    pts.push({ x: Math.cos(hourAngle) * t + (Math.random() - 0.5) * 1.5, y: Math.sin(hourAngle) * t + (Math.random() - 0.5) * 1.5, z: 5 * scale })
  }

  const minuteAngle = Math.PI / 12
  for (let i = 0; i < 80; i += 1) {
    const t = Math.random() * 19 * scale
    pts.push({ x: Math.cos(minuteAngle) * t + (Math.random() - 0.5), y: Math.sin(minuteAngle) * t + (Math.random() - 0.5), z: 5 * scale })
  }
  fillCircle(0, 0, 2 * scale, 30, pts, 5.5 * scale)

  const crownX = hw + 3 * scale
  const crownY = -5 * scale
  rrOutline(crownX, crownY, 3.5 * scale, 8 * scale, 2 * scale, 250, pts, 0)
  fillRect(crownX - 3.5 * scale, crownY - 8 * scale, crownX + 3.5 * scale, crownY + 8 * scale, 150, pts, 0)
  rrOutline(crownX, crownY + 18 * scale, 3 * scale, 5 * scale, 1.5 * scale, 100, pts, 0)

  const bandWidth = 18 * scale
  for (let i = 0; i < 600; i += 1) {
    pts.push({ x: (Math.random() - 0.5) * bandWidth, y: -hh - 5 * scale - Math.random() * 60 * scale, z: (Math.random() - 0.5) * 4 * scale })
  }
  lineEdge(-bandWidth / 2, -hh - 5 * scale, -bandWidth / 2, -hh - 65 * scale, 100, pts, 0)
  lineEdge(bandWidth / 2, -hh - 5 * scale, bandWidth / 2, -hh - 65 * scale, 100, pts, 0)
  for (let i = 0; i < 600; i += 1) {
    pts.push({ x: (Math.random() - 0.5) * bandWidth, y: hh + 5 * scale + Math.random() * 60 * scale, z: (Math.random() - 0.5) * 4 * scale })
  }
  lineEdge(-bandWidth / 2, hh + 5 * scale, -bandWidth / 2, hh + 65 * scale, 100, pts, 0)
  lineEdge(bandWidth / 2, hh + 5 * scale, bandWidth / 2, hh + 65 * scale, 100, pts, 0)
  for (let h = 0; h < 5; h += 1) ringPts(0, -hh - 20 * scale - h * 10 * scale, 2.5 * scale, 20, pts, 0)

  while (pts.length < PARTICLE_COUNT) {
    const x = (Math.random() - 0.5) * hw * 2
    const y = (Math.random() - 0.5) * hh * 2
    if (inRoundedRect(x, y, hw, hh, r)) pts.push({ x, y, z: (Math.random() - 0.5) * 6 * scale })
  }

  return pts.slice(0, PARTICLE_COUNT)
}

function genText(width: number, height: number) {
  const textCanvas = document.createElement('canvas')
  textCanvas.width = 760
  textCanvas.height = 180
  const textContext = textCanvas.getContext('2d')
  if (!textContext) return [] as ShapePoint[]

  textContext.fillStyle = '#000'
  textContext.font = '700 52px ui-monospace, Menlo, Consolas, monospace'
  textContext.textAlign = 'center'
  textContext.textBaseline = 'middle'
  textContext.fillText('HAILEY DEVICE', 380, 56)
  textContext.fillText('REPAIR', 380, 122)

  const imageData = textContext.getImageData(0, 0, textCanvas.width, textCanvas.height)
  const sourcePoints: { x: number; y: number }[] = []
  const scale = Math.min(width / 760, height / 180) * 0.62

  for (let y = 0; y < textCanvas.height; y += 1) {
    for (let x = 0; x < textCanvas.width; x += 1) {
      if (imageData.data[(y * textCanvas.width + x) * 4 + 3] > 128) {
        sourcePoints.push({ x: (x - textCanvas.width / 2) * scale, y: (y - textCanvas.height / 2) * scale })
      }
    }
  }

  const pts: ShapePoint[] = []
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const point = sourcePoints[Math.floor(Math.random() * sourcePoints.length)]
    pts.push({ x: point.x + (Math.random() - 0.5) * 1.5, y: point.y + (Math.random() - 0.5) * 1.5, z: (Math.random() - 0.5) * 6 })
  }

  return pts
}

function noise3D(x: number, y: number, z: number) {
  return Math.sin(x * 1.2 + y * 0.9) * Math.cos(y * 1.1 + z * 0.8) * Math.sin(z * 0.7 + x * 1.3)
}

function curlNoise(x: number, y: number, z: number, strength: number) {
  const e = 0.01
  const dy = (noise3D(x, y + e, z) - noise3D(x, y - e, z)) / (2 * e)
  const dz = (noise3D(x, y, z + e) - noise3D(x, y, z - e)) / (2 * e)
  const dx = (noise3D(x + e, y, z) - noise3D(x - e, y, z)) / (2 * e)

  return {
    x: (dy - dz) * strength,
    y: (dz - dx) * strength,
    z: (dx - dy) * strength,
  }
}

export default function HeroParticleMorph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = hostRef.current
    if (!canvas || !host) return

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const particles: Particle[] = []
    let shapeData: ShapePoint[][] = []
    let width = 0
    let height = 0
    let dpr = 1
    let shapeScale = 0.7
    let currentShape = prefersReduced ? SHAPES.indexOf('text') : 0
    let nextShape = currentShape
    let morphing = false
    let morphStart = 0
    let lastShapeTime = performance.now()
    let start = performance.now()
    let rafId = 0

    const resize = (reset = false) => {
      const rect = host.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      shapeScale = clamp(1.55 * Math.min(width / 920, height / 230), 0.38, 1.14)
      shapeData = [genPhone(shapeScale), genLaptop(shapeScale), genWatch(shapeScale), genText(width, height)]

      if (!particles.length) {
        for (let i = 0; i < PARTICLE_COUNT; i += 1) {
          particles.push({
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            z: (Math.random() - 0.5) * 400,
            tx: 0,
            ty: 0,
            tz: 0,
            ox: 0,
            oy: 0,
            oz: 0,
            delay: Math.random(),
            noiseOff: Math.random() * 1000,
            size: 0.6 + Math.random() * 0.6,
          })
        }
      }

      const targetPoints = shapeData[currentShape]
      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const particle = particles[i]
        const point = targetPoints[i % targetPoints.length]
        particle.x = point.x
        particle.y = point.y
        particle.z = point.z
        particle.tx = point.x
        particle.ty = point.y
        particle.tz = point.z
        particle.ox = point.x
        particle.oy = point.y
        particle.oz = point.z
      }

      if (reset) drawFrame(lastShapeTime)
    }

    const setTargets = (index: number) => {
      const nextPoints = shapeData[index]
      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const particle = particles[i]
        const point = nextPoints[i % nextPoints.length]
        particle.ox = particle.x
        particle.oy = particle.y
        particle.oz = particle.z
        particle.tx = point.x
        particle.ty = point.y
        particle.tz = point.z
      }
    }

    const drawFrame = (now: number) => {
      const time = (now - start) / 1000
      context.clearRect(0, 0, width, height)

      if (!prefersReduced && !morphing && now - lastShapeTime > SHAPE_HOLD) {
        morphing = true
        morphStart = now
        nextShape = (currentShape + 1) % SHAPES.length
        setTargets(nextShape)
      }

      if (!prefersReduced && morphing && now - morphStart >= MORPH_DURATION) {
        morphing = false
        currentShape = nextShape
        lastShapeTime = now
      }

      const wobble = Math.sin(time * 0.25) * 0.1
      const cosR = Math.cos(wobble)
      const sinR = Math.sin(wobble)

      for (const particle of particles) {
        if (!prefersReduced && morphing) {
          const morphElapsed = now - morphStart
          const staggeredTime = morphElapsed - particle.delay * MORPH_DURATION * 0.35
          const raw = clamp(staggeredTime / (MORPH_DURATION * 0.75), 0, 1)
          const eased = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2
          const chaos = Math.sin(raw * Math.PI) * 45
          const curl = curlNoise(particle.x * 0.007 + time * 0.4, particle.y * 0.007 + particle.noiseOff, particle.z * 0.007, chaos)
          const fade = 1 - eased * eased

          particle.x = particle.ox + (particle.tx - particle.ox) * eased + curl.x * fade
          particle.y = particle.oy + (particle.ty - particle.oy) * eased + curl.y * fade
          particle.z = particle.oz + (particle.tz - particle.oz) * eased + curl.z * fade
        } else if (!morphing) {
          const nx = Math.sin(time * 0.7 + particle.noiseOff) * 0.8
          const ny = Math.cos(time * 0.5 + particle.noiseOff * 1.3) * 0.8
          const nz = Math.sin(time * 0.6 + particle.noiseOff * 0.7) * 0.5
          const distance = Math.hypot(particle.tx, particle.ty)
          const ripple = Math.sin(distance * 0.04 - time * 1.8) * 0.8
          particle.x = particle.tx + nx + ripple * 0.2
          particle.y = particle.ty + ny + ripple * 0.2
          particle.z = particle.tz + nz
        }

        const rotatedX = particle.x * cosR + particle.z * sinR
        const rotatedZ = -particle.x * sinR + particle.z * cosR
        const rotatedY = particle.y

        const perspective = 600
        const scale = perspective / (perspective + rotatedZ + 200)
        const anchorX = width * 0.39
        const screenX = anchorX + rotatedX * scale
        const screenY = height / 2 + rotatedY * scale

        const depthFactor = (rotatedZ + 200) / 400
        const alpha = clamp((0.26 + depthFactor * 0.52) * scale, 0.05, 0.78)
        const size = Math.max(0.45, particle.size * scale)

        context.fillStyle = `rgba(24, 19, 15, ${alpha})`
        context.fillRect(screenX - size / 2, screenY - size / 2, size, size)
      }
    }

    const animate = (now: number) => {
      drawFrame(now)
      if (!prefersReduced) {
        rafId = window.requestAnimationFrame(animate)
      }
    }

    const resizeObserver = new ResizeObserver(() => resize(true))

    resize(true)
    resizeObserver.observe(host)

    if (prefersReduced) {
      drawFrame(performance.now())
    } else {
      rafId = window.requestAnimationFrame(animate)
    }

    return () => {
      resizeObserver.disconnect()
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={hostRef} className="hero-particle-morph" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
