'use client'

import { useEffect } from 'react'

const DESKTOP_MIN_WIDTH = 981
const MAX_SCROLL_PX = 360

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function HomeScrollMotion() {
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
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

    const updateEnabled = () => {
      const nextEnabled = window.innerWidth >= DESKTOP_MIN_WIDTH && !prefersReduced.matches

      if (nextEnabled === enabled) {
        if (enabled) applyProgress()
        return
      }

      enabled = nextEnabled

      if (!enabled) {
        clearVars()
        return
      }

      body.setAttribute('data-home-scroll', 'active')
      applyProgress()
    }

    const onScroll = () => {
      if (!enabled) return
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(applyProgress)
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
    }
  }, [])

  return null
}
