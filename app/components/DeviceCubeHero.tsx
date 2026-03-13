'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import HoverBeamFrame from './HoverBeamFrame'

type DeviceKind = 'phone' | 'laptop' | 'tablet' | 'watch'
type FaceKey = 'left' | 'front' | 'right' | 'back'

type ServiceCardConfig = {
  id: string
  faceKey: Exclude<FaceKey, 'back'>
  title: string
  previewTitle: string
  description: string
  pills: string[]
  ctaHref: string
  ctaLabel: string
}

type PanelConfig = {
  kind: DeviceKind
  startPosition: [number, number, number]
  startRotationY: number
  targetKey: FaceKey
  renderOrder: number
  serviceId?: string
  isDisposable?: boolean
}

type PanelMeshes = {
  group: THREE.Group
  faceMaterial: THREE.MeshBasicMaterial
  surfaceMaterial: THREE.MeshBasicMaterial | null
  iconMaterial: THREE.MeshBasicMaterial
  previewMaterial: THREE.MeshBasicMaterial | null
  edgeMaterial: THREE.LineBasicMaterial
  surfaceTexture: THREE.Texture | null
  iconTexture: THREE.Texture
  previewTexture: THREE.Texture | null
  startPosition: THREE.Vector3
  startQuaternion: THREE.Quaternion
  cubePosition: THREE.Vector3
  cubeQuaternion: THREE.Quaternion
  targetKey: FaceKey
  isDisposable: boolean
}

type TargetMeasurement = {
  position: THREE.Vector3
  scale: THREE.Vector3
}

const SERVICE_CARDS: ServiceCardConfig[] = [
  {
    id: 'apple',
    faceKey: 'left',
    title: 'Apple & Mac repair',
    previewTitle: 'Apple & Mac',
    description: 'iPhone, iPad, and Mac-focused repair workflow and pre-check requirements.',
    pills: ['Screens', 'Batteries', 'Charging', 'Mac diagnostics'],
    ctaHref: '/prep#apple',
    ctaLabel: 'Open Apple & Mac prep',
  },
  {
    id: 'android',
    faceKey: 'front',
    title: 'Android repair',
    previewTitle: 'Android',
    description: 'Samsung, Pixel, and other Android devices with model-specific prep steps.',
    pills: ['Screens', 'Batteries', 'Charging ports', 'Data-safe intake'],
    ctaHref: '/prep#android',
    ctaLabel: 'Open Android prep',
  },
  {
    id: 'laptop-it',
    faceKey: 'right',
    title: 'Laptop + IT help',
    previewTitle: 'Laptop + IT',
    description: 'Performance, OS issues, startup failures, account recovery, and troubleshooting prep.',
    pills: ['Performance', 'OS issues', 'Startup errors', 'Account/login'],
    ctaHref: '/prep#laptop-it',
    ctaLabel: 'Open Laptop + IT prep',
  },
]

const PANEL_CONFIGS: PanelConfig[] = [
  { kind: 'phone', startPosition: [-1.35, 0.125, -0.5], startRotationY: 0, targetKey: 'left', renderOrder: -3, serviceId: 'apple' },
  { kind: 'laptop', startPosition: [1.35, 0, 0.5], startRotationY: Math.PI, targetKey: 'right', renderOrder: -2, serviceId: 'laptop-it' },
  { kind: 'tablet', startPosition: [0.65, 0.25, -0.5], startRotationY: Math.PI, targetKey: 'back', renderOrder: -4, isDisposable: true },
  { kind: 'watch', startPosition: [-0.23, -0.125, 0.5], startRotationY: 0, targetKey: 'front', renderOrder: -1, serviceId: 'android' },
]

const CARD_BG_DARK = '#17110d'
const CARD_BG_MID = '#2f2218'
const CARD_BG_GLOW = '#5b4330'
const CARD_BORDER = '#c79868'
const ICON_COLOR = '#dfba8e'
const EDGE_COLOR = 0xc79868
const STAGE_HEIGHT = 640
const SECTION_HEIGHT = 1080
const TRANSITION_RANGE = 900
const HERO_PROGRESS_OFFSET = 210
const HANDOFF_PLANE_Z = 0

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function heroEase(value: number) {
  return 0.5 * (1 - Math.sin(Math.PI * (0.5 - value)))
}

function phaseValue(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start), 0, 1)
}

function easedPhase(progress: number, start: number, end: number) {
  return heroEase(phaseValue(progress, start, end))
}

function peakPhase(progress: number, start: number, peak: number, end: number) {
  if (progress <= start || progress >= end) return 0
  if (progress <= peak) return heroEase(phaseValue(progress, start, peak))
  return 1 - heroEase(phaseValue(progress, peak, end))
}

function svgDataUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function escapeXml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
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
          <stop offset="0%" stop-color="#d5a26d" stop-opacity="0.16" />
          <stop offset="100%" stop-color="#d5a26d" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="edgeFade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#26180f" stop-opacity="0.82" />
          <stop offset="100%" stop-color="#140d08" stop-opacity="0.38" />
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

function buildServicePreviewTexture(card: ServiceCardConfig) {
  const pills = card.pills.slice(0, 3)
  const pillMarkup = pills
    .map((pill, index) => {
      const x = 72 + index * 122
      return `
        <rect x="${x}" y="262" width="102" height="30" rx="15" fill="rgba(248,240,226,0.94)" stroke="rgba(119,90,53,0.14)" stroke-width="1.4" />
        <text x="${x + 51}" y="281" text-anchor="middle" fill="#6a5337" font-size="14" font-weight="700">${escapeXml(pill)}</text>
      `
    })
    .join('')

  return svgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <rect width="512" height="512" fill="none" />
      <text x="72" y="126" fill="#2f2417" font-size="34" font-weight="800">${escapeXml(card.previewTitle)}</text>
      <text x="72" y="170" fill="#7a6450" font-size="20">Repair pathway</text>
      ${pillMarkup}
      <rect x="72" y="336" width="224" height="58" rx="29" fill="#caa16f" />
      <text x="184" y="371" text-anchor="middle" fill="#2f2112" font-size="22" font-weight="800">Open prep</text>
    </svg>
  `)
}

function buildServiceSurfaceTexture() {
  return svgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <defs>
        <linearGradient id="sandFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5ead8" />
          <stop offset="100%" stop-color="#ead8bc" />
        </linearGradient>
        <radialGradient id="sandCool" cx="12%" cy="10%" r="76%">
          <stop offset="0%" stop-color="rgba(214, 228, 239, 0.34)" />
          <stop offset="100%" stop-color="rgba(214, 228, 239, 0)" />
        </radialGradient>
        <radialGradient id="sandWarm" cx="88%" cy="92%" r="60%">
          <stop offset="0%" stop-color="rgba(181, 126, 84, 0.12)" />
          <stop offset="100%" stop-color="rgba(181, 126, 84, 0)" />
        </radialGradient>
        <pattern id="sandDots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.9" fill="rgba(91, 69, 42, 0.08)" />
        </pattern>
      </defs>
      <rect width="512" height="512" fill="url(#sandFill)" />
      <rect width="512" height="512" fill="url(#sandCool)" />
      <rect width="512" height="512" fill="url(#sandWarm)" />
      <rect width="512" height="512" fill="url(#sandDots)" opacity="0.56" />
    </svg>
  `)
}

function isSafariBrowser() {
  const ua = navigator.userAgent
  return /Safari\//.test(ua) && !/Chrome\//.test(ua) && !/CriOS\//.test(ua) && !/FxiOS\//.test(ua)
}

function screenPointToWorldOnPlane(
  camera: THREE.PerspectiveCamera,
  canvasRect: DOMRect,
  clientX: number,
  clientY: number,
  planeZ: number,
) {
  const pointer = new THREE.Vector3(
    ((clientX - canvasRect.left) / canvasRect.width) * 2 - 1,
    -(((clientY - canvasRect.top) / canvasRect.height) * 2 - 1),
    0.5,
  )

  pointer.unproject(camera)

  const direction = pointer.sub(camera.position).normalize()
  const distance = (planeZ - camera.position.z) / direction.z

  return camera.position.clone().add(direction.multiplyScalar(distance))
}

function rectToWorldTarget(
  rect: DOMRect,
  camera: THREE.PerspectiveCamera,
  canvasRect: DOMRect,
  planeZ: number,
) {
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const worldCenter = screenPointToWorldOnPlane(camera, canvasRect, centerX, centerY, planeZ)
  const worldLeft = screenPointToWorldOnPlane(camera, canvasRect, rect.left, centerY, planeZ)
  const worldRight = screenPointToWorldOnPlane(camera, canvasRect, rect.right, centerY, planeZ)
  const worldTop = screenPointToWorldOnPlane(camera, canvasRect, centerX, rect.top, planeZ)
  const worldBottom = screenPointToWorldOnPlane(camera, canvasRect, centerX, rect.bottom, planeZ)

  return {
    position: worldCenter,
    scale: new THREE.Vector3(worldRight.distanceTo(worldLeft), worldTop.distanceTo(worldBottom), 1),
  }
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
  const sectionRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLDivElement | null>(null)
  const serviceSlotRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const canvasHost = canvasRef.current

    if (!section || !stage || !canvasHost) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReduced.matches || window.innerWidth < 1024) return

    const isSafari = isSafariBrowser()
    const serviceCardMap = new Map(SERVICE_CARDS.map((card) => [card.id, card]))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 50)
    camera.position.y = 0.7
    camera.position.z = 4
    camera.lookAt(scene.position)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSafari ? 1.5 : 2))
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

      const surfaceTexture = panel.serviceId ? textureLoader.load(buildServiceSurfaceTexture()) : null
      if (surfaceTexture) {
        surfaceTexture.colorSpace = THREE.SRGBColorSpace
      }

      const surfaceMaterial = surfaceTexture
        ? new THREE.MeshBasicMaterial({
            map: surfaceTexture,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            toneMapped: false,
            opacity: 0,
          })
        : null

      const previewTexture = panel.serviceId
        ? textureLoader.load(buildServicePreviewTexture(serviceCardMap.get(panel.serviceId)!))
        : null

      if (previewTexture) {
        previewTexture.colorSpace = THREE.SRGBColorSpace
      }

      const previewMaterial = previewTexture
        ? new THREE.MeshBasicMaterial({
            map: previewTexture,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            toneMapped: false,
            opacity: 0,
          })
        : null

      const faceMesh = new THREE.Mesh(planeGeometry, faceMaterial)
      faceMesh.renderOrder = panel.renderOrder
      group.add(faceMesh)

      const iconMesh = new THREE.Mesh(planeGeometry, iconMaterial)
      iconMesh.position.z = 0.002
      iconMesh.renderOrder = panel.renderOrder + 0.01
      group.add(iconMesh)

      if (surfaceMaterial) {
        const surfaceMesh = new THREE.Mesh(planeGeometry, surfaceMaterial)
        surfaceMesh.position.z = 0.0015
        surfaceMesh.renderOrder = panel.renderOrder + 0.008
        group.add(surfaceMesh)
      }

      if (previewMaterial) {
        const previewMesh = new THREE.Mesh(planeGeometry, previewMaterial)
        previewMesh.position.z = 0.0035
        previewMesh.renderOrder = panel.renderOrder + 0.015
        group.add(previewMesh)
      }

      const edgeMaterial = new THREE.LineBasicMaterial({
        color: EDGE_COLOR,
        transparent: true,
        opacity: 1,
        depthWrite: false,
      })

      const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)
      edges.position.z = 0.0045
      edges.renderOrder = panel.renderOrder + 0.02
      group.add(edges)

      const startPosition = new THREE.Vector3(...panel.startPosition)
      const startQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, panel.startRotationY, 0))
      const cubePosition = new THREE.Vector3()
      const cubeQuaternion = new THREE.Quaternion()
      targetFaces[panel.targetKey].getWorldPosition(cubePosition)
      targetFaces[panel.targetKey].getWorldQuaternion(cubeQuaternion)

      group.position.copy(startPosition)
      group.quaternion.copy(startQuaternion)
      viewRoot.add(group)

      return {
        group,
        faceMaterial,
        surfaceMaterial,
        iconMaterial,
        previewMaterial,
        edgeMaterial,
        surfaceTexture,
        iconTexture,
        previewTexture,
        startPosition,
        startQuaternion,
        cubePosition,
        cubeQuaternion,
        targetKey: panel.targetKey,
        isDisposable: Boolean(panel.isDisposable),
      }
    })

    let measuredTargets: Partial<Record<FaceKey, TargetMeasurement>> = {}
    let hasValidTargets = false
    let observerActive = false
    let rafId: number | null = null

    const setSectionStyles = (progress: number) => {
      const headingReveal = easedPhase(progress, 0.5, 0.64)
      const cardsReveal = easedPhase(progress, 0.6, 0.76)
      const sceneOpacity = 1 - easedPhase(progress, 0.8, 0.94)

      section.style.setProperty('--services-heading-opacity', headingReveal.toFixed(4))
      section.style.setProperty('--services-heading-y', `${(1 - headingReveal) * 18}px`)
      section.style.setProperty('--services-cards-opacity', cardsReveal.toFixed(4))
      section.style.setProperty('--services-cards-y', `${(1 - cardsReveal) * 24}px`)
      section.style.setProperty('--services-cards-scale', `${0.96 + cardsReveal * 0.04}`)
      stage.style.setProperty('--device-scene-opacity', sceneOpacity.toFixed(4))
      section.classList.toggle('services-live', progress >= 0.72)
    }

    const resize = () => {
      const width = Math.min(1200, canvasHost.offsetWidth)
      camera.aspect = width / STAGE_HEIGHT
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSafari ? 1.5 : 2))
      renderer.setSize(width, STAGE_HEIGHT, false)
    }

    const measureTargets = () => {
      const canvasRect = canvasHost.getBoundingClientRect()
      const headingRect = headingRef.current?.getBoundingClientRect()

      if (
        canvasRect.width <= 0 ||
        canvasRect.height <= 0 ||
        !headingRect ||
        headingRect.width <= 0 ||
        headingRect.height <= 0
      ) {
        hasValidTargets = false
        return
      }

      const nextTargets: Partial<Record<FaceKey, TargetMeasurement>> = {}

      for (const card of SERVICE_CARDS) {
        const slotIndex = SERVICE_CARDS.findIndex((candidate) => candidate.id === card.id)
        const slot = serviceSlotRefs.current[slotIndex]

        if (!slot) {
          hasValidTargets = false
          return
        }

        const rect = slot.getBoundingClientRect()
        if (rect.width <= 0 || rect.height <= 0) {
          hasValidTargets = false
          return
        }

        nextTargets[card.faceKey] = rectToWorldTarget(rect, camera, canvasRect, HANDOFF_PLANE_Z)
      }

      const rightTarget = nextTargets.right
      if (!rightTarget) {
        hasValidTargets = false
        return
      }

      nextTargets.back = {
        position: rightTarget.position.clone().add(new THREE.Vector3(rightTarget.scale.x + 0.22, 0.02, -0.08)),
        scale: rightTarget.scale.clone(),
      }

      measuredTargets = nextTargets
      hasValidTargets = true
    }

    const renderFrame = () => {
      const stageTop = stage.getBoundingClientRect().top + window.scrollY
      const progress = clamp((window.scrollY - (stageTop - HERO_PROGRESS_OFFSET)) / TRANSITION_RANGE, 0, 1)
      const assembleAmount = easedPhase(progress, 0, 0.24)
      const completionAmount = peakPhase(progress, 0.24, 0.32, 0.38)
      const morphAmount = easedPhase(progress, 0.38, 0.5)
      const surfaceMorphAmount = easedPhase(progress, 0.42, 0.56)
      const contentRevealAmount = easedPhase(progress, 0.5, 0.64)
      const unfoldAmount = easedPhase(progress, 0.5, 0.68)
      const handoffAmount = easedPhase(progress, 0.58, 0.74)
      const disposableFade = 1 - easedPhase(progress, 0.52, 0.64)

      setSectionStyles(progress)

      viewRoot.position.x = -0.22 * (1 - assembleAmount)
      viewRoot.rotation.set(
        THREE.MathUtils.degToRad(-6 * completionAmount),
        THREE.MathUtils.degToRad(-12 * completionAmount),
        THREE.MathUtils.degToRad(4 * completionAmount),
      )

      panelMeshes.forEach((panel) => {
        const cubePosition = panel.cubePosition.clone()
        const cubeQuaternion = panel.cubeQuaternion.clone()
        const target = hasValidTargets ? measuredTargets[panel.targetKey] : null

        if (progress <= 0.24) {
          panel.group.position.copy(panel.startPosition).lerp(cubePosition, assembleAmount)
          panel.group.quaternion.copy(panel.startQuaternion).slerp(cubeQuaternion, assembleAmount)
          panel.group.scale.setScalar(1)
        } else if (progress <= 0.5 || !target) {
          panel.group.position.copy(cubePosition)
          panel.group.quaternion.copy(cubeQuaternion)
          panel.group.scale.setScalar(1)
        } else {
          panel.group.position.copy(cubePosition).lerp(target.position, unfoldAmount)
          panel.group.quaternion.copy(cubeQuaternion).slerp(new THREE.Quaternion(), unfoldAmount)
          panel.group.scale.set(
            THREE.MathUtils.lerp(1, target.scale.x, unfoldAmount),
            THREE.MathUtils.lerp(1, target.scale.y, unfoldAmount),
            1,
          )
        }

        const handoffFade = 1 - handoffAmount
        const faceAlpha = panel.isDisposable
          ? handoffFade * disposableFade
          : handoffFade * (1 - surfaceMorphAmount)
        const surfaceAlpha = panel.isDisposable ? 0 : handoffFade * surfaceMorphAmount
        const previewAlpha = panel.isDisposable ? 0 : handoffFade * contentRevealAmount
        const iconAlpha = handoffFade * (1 - morphAmount)
        const edgeAlpha = panel.isDisposable
          ? handoffFade * disposableFade * 0.72
          : handoffFade * (1 - easedPhase(progress, 0.46, 0.62) * 0.92)

        panel.faceMaterial.opacity = faceAlpha
        if (panel.surfaceMaterial) {
          panel.surfaceMaterial.opacity = surfaceAlpha
        }
        panel.iconMaterial.opacity = iconAlpha
        panel.edgeMaterial.opacity = edgeAlpha
        if (panel.previewMaterial) {
          panel.previewMaterial.opacity = previewAlpha
        }

        panel.group.visible = Math.max(faceAlpha, surfaceAlpha, previewAlpha, iconAlpha, edgeAlpha) > 0.001
      })

      renderer.render(scene, camera)
    }

    const scheduleRender = () => {
      if (!observerActive || rafId !== null) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null
        measureTargets()
        renderFrame()
      })
    }

    const onScroll = () => {
      scheduleRender()
    }

    const onResize = () => {
      if (window.innerWidth < 1024 || prefersReduced.matches) {
        stage.style.setProperty('--device-scene-opacity', '0')
        section.style.setProperty('--services-heading-opacity', '1')
        section.style.setProperty('--services-heading-y', '0px')
        section.style.setProperty('--services-cards-opacity', '1')
        section.style.setProperty('--services-cards-y', '0px')
        section.style.setProperty('--services-cards-scale', '1')
        section.classList.add('services-live')
        return
      }

      resize()
      measureTargets()
      renderFrame()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        observerActive = entry.isIntersecting
        if (observerActive) {
          resize()
          measureTargets()
          renderFrame()
        } else if (rafId !== null) {
          window.cancelAnimationFrame(rafId)
          rafId = null
        }
      },
      { threshold: 0 },
    )

    observer.observe(stage)
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })

    resize()
    measureTargets()
    renderFrame()

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }

      panelMeshes.forEach((panel) => {
        panel.faceMaterial.dispose()
        panel.surfaceTexture?.dispose()
        panel.surfaceMaterial?.dispose()
        panel.iconTexture.dispose()
        panel.iconMaterial.dispose()
        panel.previewTexture?.dispose()
        panel.previewMaterial?.dispose()
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
    <section ref={sectionRef} id="services" className="section device-services-transition">
      <div className="container">
        <div ref={stageRef} className="device-services-stage">
          <div className="device-cube-pin" aria-hidden="true">
            <div className="device-cube-visual">
              <div className="device-cube-ground" />
              <div ref={canvasRef} className="device-cube-canvas" />
            </div>
          </div>

          <div className="device-grid device-grid-mobile" aria-label="Supported devices">
            <DeviceCard kind="phone" label="Phone repair" />
            <DeviceCard kind="laptop" label="Laptop repair" />
            <DeviceCard kind="tablet" label="Tablet repair" />
            <DeviceCard kind="watch" label="Smartwatch repair" />
          </div>

          <div className="device-services-copy">
            <div ref={headingRef} className="section-head transition-services-head">
              <div>
                <h2>Services</h2>
                <p>Start with the category that matches your issue. If you&apos;re unsure, use Tech Helper and we&apos;ll route you.</p>
              </div>
            </div>

            <div className="grid3 device-services-grid">
              {SERVICE_CARDS.map((card, index) => (
                <div
                  key={card.id}
                  ref={(node) => {
                    serviceSlotRefs.current[index] = node
                  }}
                  className="transition-service-slot"
                >
                  <HoverBeamFrame as="article" className="card service-card transition-service-card" radius={18}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <div className="pills">
                      {card.pills.map((pill) => (
                        <span key={pill} className="pill">{pill}</span>
                      ))}
                    </div>
                    <div className="actions" style={{ marginTop: '0.9rem' }}>
                      <Link className="btn btn-primary" href={card.ctaHref}>{card.ctaLabel}</Link>
                    </div>
                  </HoverBeamFrame>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
