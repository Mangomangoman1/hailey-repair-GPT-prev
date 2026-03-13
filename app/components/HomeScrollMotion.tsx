'use client'

import { useEffect } from 'react'

const DESKTOP_MIN_WIDTH = 981
const MAX_SCROLL_PX = 360

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function segment(value: number, start: number, end: number) {
  return clamp((value - start) / (end - start), 0, 1)
}

function easeInOut(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2
}

export default function HomeScrollMotion() {
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    const cubeStage = document.querySelector<HTMLElement>('.device-cube-stage')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    let enabled = false
    let frame = 0

    const clearVars = () => {
      body.removeAttribute('data-home-scroll')
      root.style.removeProperty('--home-header-opacity')
      root.style.removeProperty('--home-header-translate')
      root.style.removeProperty('--home-header-blur')
      root.style.removeProperty('--home-main-scale')
      root.style.removeProperty('--home-main-translate')
    }

    const clearCubeVars = () => {
      if (!cubeStage) return
      cubeStage.removeAttribute('data-cube-active')
      cubeStage.style.removeProperty('--cube-progress')
      cubeStage.style.removeProperty('--cube-gather')
      cubeStage.style.removeProperty('--cube-front')
      cubeStage.style.removeProperty('--cube-right')
      cubeStage.style.removeProperty('--cube-top')
      cubeStage.style.removeProperty('--cube-left')
      cubeStage.style.removeProperty('--cube-rear')
      cubeStage.style.removeProperty('--cube-bottom')
      cubeStage.style.removeProperty('--cube-shell')
      cubeStage.style.removeProperty('--cube-settle')
      cubeStage.style.removeProperty('--cube-fade')
    }

    const applyProgress = () => {
      if (!enabled) return

      const progress = clamp(window.scrollY / MAX_SCROLL_PX, 0, 1)
      const eased = 1 - Math.pow(1 - progress, 2.2)

      root.style.setProperty('--home-header-opacity', `${1 - eased * 0.94}`)
      root.style.setProperty('--home-header-translate', `${-18 * eased}px`)
      root.style.setProperty('--home-header-blur', `${4 * eased}px`)
      root.style.setProperty('--home-main-scale', `${0.985 + eased * 0.04}`)
      root.style.setProperty('--home-main-translate', `${-16 * eased}px`)
    }

    const applyCubeProgress = () => {
      if (!enabled || !cubeStage) return

      const rect = cubeStage.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const travel = Math.max(rect.height - viewportHeight * 0.38, 1)
      const progress = clamp((viewportHeight * 0.14 - rect.top) / travel, 0, 1)

      const gather = easeInOut(segment(progress, 0.02, 0.28))
      const front = easeInOut(segment(progress, 0.14, 0.42))
      const right = easeInOut(segment(progress, 0.22, 0.5))
      const top = easeInOut(segment(progress, 0.34, 0.62))
      const left = easeInOut(segment(progress, 0.44, 0.74))
      const rear = easeInOut(segment(progress, 0.52, 0.78))
      const bottom = easeInOut(segment(progress, 0.38, 0.68))
      const shell = easeInOut(segment(progress, 0.48, 0.78))
      const settle = easeInOut(segment(progress, 0.58, 0.86))
      const fade = easeInOut(segment(progress, 0.82, 1))

      cubeStage.setAttribute('data-cube-active', 'true')
      cubeStage.style.setProperty('--cube-progress', `${progress}`)
      cubeStage.style.setProperty('--cube-gather', `${gather}`)
      cubeStage.style.setProperty('--cube-front', `${front}`)
      cubeStage.style.setProperty('--cube-right', `${right}`)
      cubeStage.style.setProperty('--cube-top', `${top}`)
      cubeStage.style.setProperty('--cube-left', `${left}`)
      cubeStage.style.setProperty('--cube-rear', `${rear}`)
      cubeStage.style.setProperty('--cube-bottom', `${bottom}`)
      cubeStage.style.setProperty('--cube-shell', `${shell}`)
      cubeStage.style.setProperty('--cube-settle', `${settle}`)
      cubeStage.style.setProperty('--cube-fade', `${fade}`)
    }

    const updateEnabled = () => {
      const nextEnabled = window.innerWidth >= DESKTOP_MIN_WIDTH && !prefersReduced.matches

      if (nextEnabled === enabled) {
        if (enabled) {
          applyProgress()
          applyCubeProgress()
        }
        return
      }

      enabled = nextEnabled

      if (!enabled) {
        clearVars()
        clearCubeVars()
        return
      }

      body.setAttribute('data-home-scroll', 'active')
      applyProgress()
      applyCubeProgress()
    }

    const onScroll = () => {
      if (!enabled) return
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        applyProgress()
        applyCubeProgress()
      })
    }

    const onResize = () => updateEnabled()

    updateEnabled()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    prefersReduced.addEventListener('change', updateEnabled)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      prefersReduced.removeEventListener('change', updateEnabled)
      clearVars()
      clearCubeVars()
    }
  }, [])

  return null
}
