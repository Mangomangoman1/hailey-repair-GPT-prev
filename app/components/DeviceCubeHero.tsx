'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type DeviceKind = 'phone' | 'laptop' | 'tablet' | 'watch'

type PanelConfig = {
  kind: DeviceKind
  startPosition: [number, number, number]
  startRotationY: number
  targetKey: 'left' | 'right' | 'back' | 'front'
  renderOrder: number
}

type PanelMeshes = {
  group: THREE.Group
  faceMaterial: THREE.MeshBasicMaterial
  iconMaterial: THREE.MeshBasicMaterial
  edgeMaterial: THREE.LineBasicMaterial
  startPosition: THREE.Vector3
  startQuaternion: THREE.Quaternion
  targetPosition: THREE.Vector3
  targetQuaternion: THREE.Quaternion
}

const PANEL_CONFIGS: PanelConfig[] = [
  { kind: 'phone', startPosition: [-1.35, 0.125, -0.5], startRotationY: 0, targetKey: 'left', renderOrder: -3 },
  { kind: 'laptop', startPosition: [1.35, 0, 0.5], startRotationY: Math.PI, targetKey: 'right', renderOrder: -2 },
  { kind: 'tablet', startPosition: [0.65, 0.25, -0.5], startRotationY: Math.PI, targetKey: 'back', renderOrder: -4 },
  { kind: 'watch', startPosition: [-0.23, -0.125, 0.5], startRotationY: 0, targetKey: 'front', renderOrder: -1 },
]

const CARD_BG_DARK = '#041324'
const CARD_BG_MID = '#0d3471'
const CARD_BG_GLOW = '#134792'
const CARD_BORDER = '#2d7dff'
const ICON_COLOR = '#4f8eff'
const EDGE_COLOR = 0x2d7dff
const STAGE_HEIGHT = 640
const STICKY_HEIGHT = 1100
const HERO_PROGRESS_OFFSET = 120
const HERO_FADE_DISTANCE = 1400

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function heroEase(value: number) {
  return 0.5 * (1 - Math.sin(Math.PI * (0.5 - value)))
}

function svgDataUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function iconMarkup(kind: DeviceKind) {
  if (kind === 'phone') {
    return `
      <rect x="19" y="7" width="26" height="50" rx="7" fill="none" stroke="${ICON_COLOR}" stroke-width="3.5" />
      <line x1="27" y1="14" x2="37" y2="14" stroke="${ICON_COLOR}" stroke-width="3" stroke-linecap="round" />
      <circle cx="32" cy="49.5" r="2.4" fill="${ICON_COLOR}" />
    `
  }

  if (kind === 'laptop') {
    return `
      <rect x="14" y="14" width="36" height="24" rx="3.5" fill="none" stroke="${ICON_COLOR}" stroke-width="3.5" />
      <path d="M9 44h46l-4 7H13z" fill="none" stroke="${ICON_COLOR}" stroke-width="3.5" stroke-linejoin="round" />
    `
  }

  if (kind === 'tablet') {
    return `
      <rect x="14" y="9" width="36" height="46" rx="6.5" fill="none" stroke="${ICON_COLOR}" stroke-width="3.5" />
      <circle cx="32" cy="48.5" r="2.2" fill="${ICON_COLOR}" />
    `
  }

  return `
    <path d="M26 9c0-2 1.6-3.5 3.5-3.5h5c1.9 0 3.5 1.5 3.5 3.5v7H26z" fill="none" stroke="${ICON_COLOR}" stroke-width="3.5" stroke-linejoin="round" />
    <rect x="17" y="14" width="30" height="36" rx="9" fill="none" stroke="${ICON_COLOR}" stroke-width="3.5" />
    <rect x="24" y="21" width="16" height="22" rx="4.5" fill="none" stroke="${ICON_COLOR}" stroke-width="3" />
    <path d="M26 50v6.5c0 2 1.6 3.5 3.5 3.5h5c1.9 0 3.5-1.5 3.5-3.5V50" fill="none" stroke="${ICON_COLOR}" stroke-width="3.5" stroke-linejoin="round" />
  `
}

function buildCardTexture() {
  return svgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <defs>
        <radialGradient id="cardGlow" cx="50%" cy="44%" r="72%">
          <stop offset="0%" stop-color="${CARD_BG_GLOW}" stop-opacity="0.95" />
          <stop offset="54%" stop-color="${CARD_BG_MID}" stop-opacity="0.9" />
          <stop offset="100%" stop-color="${CARD_BG_DARK}" stop-opacity="1" />
        </radialGradient>
        <radialGradient id="cardBloom" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#0f4ea4" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#0f4ea4" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="edgeFade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#081a33" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#051121" stop-opacity="0.4" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" fill="url(#cardGlow)" />
      <rect width="512" height="512" fill="url(#cardBloom)" />
      <rect width="512" height="512" fill="url(#edgeFade)" opacity="0.55" />
      <rect x="1.5" y="1.5" width="509" height="509" fill="none" stroke="${CARD_BORDER}" stroke-width="3" />
    </svg>
  `)
}

function buildIconTexture(kind: DeviceKind) {
  return svgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <g transform="translate(256 256) scale(4.8) translate(-32 -32)">
        ${iconMarkup(kind)}
      </g>
    </svg>
  `)
}

function DeviceIcon({ kind }: { kind: DeviceKind }) {
  if (kind === 'phone') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="19" y="7" width="26" height="50" rx="7" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <line x1="27" y1="14" x2="37" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="49.5" r="2.4" fill="currentColor" />
      </svg>
    )
  }

  if (kind === 'laptop') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="14" y="14" width="36" height="24" rx="3.5" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path d="M9 44h46l-4 7H13z" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      </svg>
    )
  }

  if (kind === 'tablet') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="14" y="9" width="36" height="46" rx="6.5" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="32" cy="48.5" r="2.2" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M26 9c0-2 1.6-3.5 3.5-3.5h5c1.9 0 3.5 1.5 3.5 3.5v7H26z" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="17" y="14" width="30" height="36" rx="9" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <rect x="24" y="21" width="16" height="22" rx="4.5" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M26 50v6.5c0 2 1.6 3.5 3.5 3.5h5c1.9 0 3.5-1.5 3.5-3.5V50" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
    </svg>
  )
}

function DeviceCard({ kind, label }: { kind: DeviceKind; label: string }) {
  return (
    <article className="card device-card" aria-label={label}>
      <DeviceIcon kind={kind} />
    </article>
  )
}

export default function DeviceCubeHero() {
  const stageRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const stage = stageRef.current
    const canvasHost = canvasRef.current

    if (!stage || !canvasHost) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReduced.matches || window.innerWidth < 1024) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 50)
    camera.position.y = 0.7
    camera.position.z = 4
    camera.lookAt(scene.position)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.margin = '0 auto'
    renderer.domElement.style.pointerEvents = 'none'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = `${STAGE_HEIGHT}px`
    canvasHost.appendChild(renderer.domElement)

    const textureLoader = new THREE.TextureLoader()
    const cardTexture = textureLoader.load(buildCardTexture())
    cardTexture.colorSpace = THREE.SRGBColorSpace

    const planeGeometry = new THREE.PlaneGeometry(1, 1)
    const edgeGeometry = new THREE.EdgesGeometry(planeGeometry)

    const viewRoot = new THREE.Group()
    scene.add(viewRoot)

    const targetRoot = new THREE.Group()
    targetRoot.rotation.y = THREE.MathUtils.degToRad(-21)
    targetRoot.rotation.z = THREE.MathUtils.degToRad(10)

    const targetFaces = {
      left: new THREE.Object3D(),
      right: new THREE.Object3D(),
      back: new THREE.Object3D(),
      front: new THREE.Object3D(),
    }

    targetFaces.left.position.x = -0.5
    targetFaces.left.rotation.y = -Math.PI / 2
    targetFaces.right.position.x = 0.5
    targetFaces.right.rotation.y = Math.PI / 2
    targetFaces.back.position.z = -0.5
    targetFaces.back.rotation.y = Math.PI
    targetFaces.front.position.z = 0.5

    Object.values(targetFaces).forEach((face) => targetRoot.add(face))
    targetRoot.updateMatrixWorld(true)

    const panelMeshes: PanelMeshes[] = PANEL_CONFIGS.map((panel) => {
      const group = new THREE.Group()

      const faceMaterial = new THREE.MeshBasicMaterial({
        map: cardTexture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        toneMapped: false,
      })

      const iconTexture = textureLoader.load(buildIconTexture(panel.kind))
      iconTexture.colorSpace = THREE.SRGBColorSpace

      const iconMaterial = new THREE.MeshBasicMaterial({
        map: iconTexture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        toneMapped: false,
      })

      const faceMesh = new THREE.Mesh(planeGeometry, faceMaterial)
      faceMesh.renderOrder = panel.renderOrder
      group.add(faceMesh)

      const iconMesh = new THREE.Mesh(planeGeometry, iconMaterial)
      iconMesh.position.z = 0.002
      iconMesh.renderOrder = panel.renderOrder + 0.01
      group.add(iconMesh)

      const edgeMaterial = new THREE.LineBasicMaterial({
        color: EDGE_COLOR,
        transparent: true,
        opacity: 1,
        depthWrite: false,
      })

      const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)
      edges.position.z = 0.004
      edges.renderOrder = panel.renderOrder + 0.02
      group.add(edges)

      const startPosition = new THREE.Vector3(...panel.startPosition)
      const startQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, panel.startRotationY, 0),
      )

      const targetPosition = new THREE.Vector3()
      const targetQuaternion = new THREE.Quaternion()
      targetFaces[panel.targetKey].getWorldPosition(targetPosition)
      targetFaces[panel.targetKey].getWorldQuaternion(targetQuaternion)

      group.position.copy(startPosition)
      group.quaternion.copy(startQuaternion)
      viewRoot.add(group)

      return {
        group,
        faceMaterial,
        iconMaterial,
        edgeMaterial,
        startPosition,
        startQuaternion,
        targetPosition,
        targetQuaternion,
      }
    })

    const resize = () => {
      const width = Math.min(1200, canvasHost.offsetWidth)
      const pixelRatio = window.devicePixelRatio
      camera.aspect = width / STAGE_HEIGHT
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(width, STAGE_HEIGHT, false)
    }

    let active = false

    const getStageTop = () => stage.getBoundingClientRect().top + window.scrollY

    const renderFrame = () => {
      const stageTop = getStageTop()
      const rawProgress = clamp((window.scrollY - (stageTop - HERO_PROGRESS_OFFSET)) / STAGE_HEIGHT, 0, 1)
      const easedProgress = heroEase(rawProgress)
      const fadeStart = stageTop + STAGE_HEIGHT * 0.8
      const fadeProgress = clamp((window.scrollY - fadeStart) / HERO_FADE_DISTANCE, 0, 1)
      const panelAlpha = Math.sin((1 - fadeProgress) * Math.PI * 0.5)
      const iconAlpha = Math.sin((1 - easedProgress) * Math.PI * 0.5) * panelAlpha

      viewRoot.position.x = -0.22 * (1 - easedProgress)
      viewRoot.rotation.x = THREE.MathUtils.lerp(
        THREE.MathUtils.degToRad(-10),
        THREE.MathUtils.degToRad(5),
        fadeProgress,
      )

      panelMeshes.forEach((panel) => {
        panel.group.position.copy(panel.startPosition).lerp(panel.targetPosition, easedProgress)
        panel.group.quaternion.copy(panel.startQuaternion).slerp(panel.targetQuaternion, easedProgress)

        const visible = panelAlpha > 0.001
        panel.group.visible = visible
        panel.faceMaterial.opacity = panelAlpha
        panel.iconMaterial.opacity = iconAlpha
        panel.edgeMaterial.opacity = panelAlpha
      })

      renderer.render(scene, camera)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!active) {
            active = true
            resize()
            renderer.setAnimationLoop(renderFrame)
          }
          return
        }

        active = false
        renderer.setAnimationLoop(null)
      },
      { threshold: 0 },
    )

    observer.observe(stage)
    resize()
    renderFrame()

    const onResize = () => {
      if (window.innerWidth < 1024 || prefersReduced.matches) {
        renderer.setAnimationLoop(null)
        return
      }

      resize()
      renderFrame()
    }

    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      renderer.setAnimationLoop(null)

      panelMeshes.forEach((panel) => {
        panel.faceMaterial.dispose()
        panel.iconMaterial.map?.dispose()
        panel.iconMaterial.dispose()
        panel.edgeMaterial.dispose()
      })

      edgeGeometry.dispose()
      planeGeometry.dispose()
      cardTexture.dispose()
      renderer.dispose()
      canvasHost.innerHTML = ''
    }
  }, [])

  return (
    <>
      <section ref={stageRef} className="device-cube-stage" aria-hidden="true">
        <div className="device-cube-pin">
          <div className="device-cube-ground" />
          <div ref={canvasRef} className="device-cube-canvas" />
        </div>
      </section>

      <div className="device-grid device-grid-mobile" aria-label="Supported devices">
        <DeviceCard kind="phone" label="Phone repair" />
        <DeviceCard kind="laptop" label="Laptop repair" />
        <DeviceCard kind="tablet" label="Tablet repair" />
        <DeviceCard kind="watch" label="Smartwatch repair" />
      </div>
    </>
  )
}
