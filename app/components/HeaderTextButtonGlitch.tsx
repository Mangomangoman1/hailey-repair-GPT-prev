'use client'

import { useEffect, useRef, useState } from 'react'

const ORIGINAL_LABEL = 'TEXT ME'
const TARGET_LABEL = '(208) 366-6111'
const SCRAMBLE_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEF'

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

export default function HeaderTextButtonGlitch() {
  const [label, setLabel] = useState(ORIGINAL_LABEL)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [hacking, setHacking] = useState(false)
  const hoveringRef = useRef(false)
  const animatingRef = useRef(false)
  const idleIntervalRef = useRef<number | null>(null)
  const restoreTimeoutRef = useRef<number | null>(null)
  const activeTimersRef = useRef<number[]>([])
  const labelRef = useRef(ORIGINAL_LABEL)

  const clearAnimationTimers = () => {
    for (const timer of activeTimersRef.current) {
      window.clearTimeout(timer)
      window.clearInterval(timer)
    }
    activeTimersRef.current = []
  }

  const clearIdleTimers = () => {
    if (idleIntervalRef.current !== null) {
      window.clearInterval(idleIntervalRef.current)
      idleIntervalRef.current = null
    }

    if (restoreTimeoutRef.current !== null) {
      window.clearTimeout(restoreTimeoutRef.current)
      restoreTimeoutRef.current = null
    }
  }

  useEffect(() => {
    labelRef.current = label
  }, [label])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)

    updateMotionPreference()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMotionPreference)
      return () => mediaQuery.removeEventListener('change', updateMotionPreference)
    }

    mediaQuery.addListener(updateMotionPreference)
    return () => mediaQuery.removeListener(updateMotionPreference)
  }, [])

  useEffect(() => {
    clearIdleTimers()

    if (reducedMotion) return undefined

    idleIntervalRef.current = window.setInterval(() => {
      if (hoveringRef.current || animatingRef.current || labelRef.current !== ORIGINAL_LABEL) return
      if (Math.random() <= 0.7) return

      const position = Math.floor(Math.random() * ORIGINAL_LABEL.length)
      const next = ORIGINAL_LABEL.split('')
      next[position] = randomChar()
      setLabel(next.join(''))

      restoreTimeoutRef.current = window.setTimeout(() => {
        if (!hoveringRef.current && !animatingRef.current) {
          setLabel(ORIGINAL_LABEL)
        }
      }, 80)
    }, 2000)

    return () => clearIdleTimers()
  }, [reducedMotion])

  useEffect(() => {
    return () => {
      clearAnimationTimers()
      clearIdleTimers()
    }
  }, [])

  const animateTo = (targetText: string, callback?: () => void) => {
    clearAnimationTimers()
    animatingRef.current = true
    setHacking(true)

    if (reducedMotion) {
      setLabel(targetText)
      animatingRef.current = false
      if (!hoveringRef.current) setHacking(false)
      callback?.()
      return
    }

    const maxLength = Math.max(targetText.length, ORIGINAL_LABEL.length)
    const paddedTarget = targetText.padEnd(maxLength)
    let scrambleCount = 0
    let revealed = 0

    const scrambleInterval = window.setInterval(() => {
      let next = ''
      for (let i = 0; i < maxLength; i += 1) {
        next += randomChar()
      }
      setLabel(next)
      scrambleCount += 1

      if (scrambleCount <= 6) return

      window.clearInterval(scrambleInterval)

      const revealInterval = window.setInterval(() => {
        let next = ''
        for (let i = 0; i < maxLength; i += 1) {
          next += i < revealed ? paddedTarget[i] : randomChar()
        }

        setLabel(next.trimEnd())
        revealed += 1

        if (revealed <= maxLength) return

        window.clearInterval(revealInterval)
        setLabel(targetText)
        animatingRef.current = false
        if (!hoveringRef.current && targetText === ORIGINAL_LABEL) {
          setHacking(false)
        }
        callback?.()
      }, 45)

      activeTimersRef.current.push(revealInterval)
    }, 35)

    activeTimersRef.current.push(scrambleInterval)
  }

  const handleEnter = () => {
    hoveringRef.current = true
    setHovered(true)
    if (animatingRef.current) return
    animateTo(TARGET_LABEL)
  }

  const handleLeave = () => {
    hoveringRef.current = false
    setHovered(false)

    if (animatingRef.current) {
      const waitForFinish = window.setInterval(() => {
        if (animatingRef.current) return
        window.clearInterval(waitForFinish)
        animateTo(ORIGINAL_LABEL)
      }, 50)
      activeTimersRef.current.push(waitForFinish)
      return
    }

    animateTo(ORIGINAL_LABEL)
  }

  return (
    <a
      className={`btn btn-call btn-call--glitch${hacking ? ' is-hacking' : ''}`}
      href="sms:+12083666111"
      aria-label="Text Hailey Device Repair"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="btn-call-label btn-call-label--glitch">{label}</span>
      <span
        className={`btn-call-cursor${hovered || hacking ? ' is-visible' : ''}`}
        aria-hidden="true"
      />
    </a>
  )
}
