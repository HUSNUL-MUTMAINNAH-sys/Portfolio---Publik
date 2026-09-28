import { useCallback, useEffect, useRef, useState } from 'react'
import { photos } from '../lib/photos'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

type GazeDirection = 'depan' | 'kiri' | 'kanan' | 'atas' | 'bawah'

const GAZE_IMAGES: Record<GazeDirection, string> = {
  depan: photos.front,
  kiri: photos.left,
  kanan: photos.right,
  atas: photos.up,
  bawah: photos.down,
}
const BLINK_IMAGE = photos.blink

interface InteractiveAvatarProps {
  alt: string
  className?: string
}

/**
 * A photo-based "eye tracking" avatar.
 * Instead of morphing a single image, it crossfades between real photos
 * (front / left / right / up / down / blink) chosen by cursor position,
 * while the whole head gets a tiny, spring-eased parallax offset + tilt
 * so it feels alive without ever distorting the face.
 */
export default function InteractiveAvatar({ alt, className = '' }: InteractiveAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [gaze, setGaze] = useState<GazeDirection>('depan')
  const [isBlinking, setIsBlinking] = useState(false)
  const [isIdle, setIsIdle] = useState(true)
  // devices without a real mouse (touch phones/tablets) never get an
  // accurate "cursor" position, so tracking stays off and they just get
  // the smooth idle sway instead
  const [hasFineCursor, setHasFineCursor] = useState(true)

  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine) and (hover: hover)')
    setHasFineCursor(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setHasFineCursor(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const blinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const blinkFlashTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // raw, un-eased targets driven by the cursor / idle loop
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rawRotate = useMotionValue(0)

  // slightly-lagged, smoothed versions actually applied to the head —
  // this is what makes the head feel like it's "catching up" to the eyes
  const headX = useSpring(rawX, { stiffness: 55, damping: 14, mass: 0.7 })
  const headY = useSpring(rawY, { stiffness: 55, damping: 14, mass: 0.7 })
  const headRotate = useSpring(rawRotate, { stiffness: 45, damping: 12, mass: 0.6 })

  // natural, irregular blinking
  const scheduleBlink = useCallback(() => {
    if (blinkTimer.current) clearTimeout(blinkTimer.current)
    const nextIn = 2600 + Math.random() * 3400
    blinkTimer.current = setTimeout(() => {
      setIsBlinking(true)
      blinkFlashTimer.current = setTimeout(() => setIsBlinking(false), 130)
      scheduleBlink()
    }, nextIn)
  }, [])

  useEffect(() => {
    scheduleBlink()
    return () => {
      if (blinkTimer.current) clearTimeout(blinkTimer.current)
      if (blinkFlashTimer.current) clearTimeout(blinkFlashTimer.current)
    }
  }, [scheduleBlink])

  const handlePointer = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // generous radius so the photo reacts to the cursor anywhere on
      // the screen, not only while hovering directly over it
      const radius = Math.max(window.innerWidth, window.innerHeight) * 0.6
      let dx = (clientX - centerX) / radius
      let dy = (clientY - centerY) / radius
      dx = Math.max(-1, Math.min(1, dx))
      dy = Math.max(-1, Math.min(1, dy))

      setIsIdle(false)
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => setIsIdle(true), 3200)

      const deadzone = 0.08
      if (Math.abs(dx) < deadzone && Math.abs(dy) < deadzone) {
        setGaze('depan')
      } else if (Math.abs(dx) > Math.abs(dy)) {
        setGaze(dx > 0 ? 'kanan' : 'kiri')
      } else {
        setGaze(dy > 0 ? 'bawah' : 'atas')
      }

      // small, clamped head parallax + tilt — kept subtle so the face
      // never looks stretched or distorted
      rawX.set(dx * 9)
      rawY.set(dy * 6)
      rawRotate.set(dx * 3.5)
    },
    [rawX, rawY, rawRotate]
  )

  useEffect(() => {
    if (!hasFineCursor) return
    const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [handlePointer, hasFineCursor])

  // gentle idle "breathing" sway when the cursor has been still for a
  // while — and always, on touch devices that have no cursor to track
  useEffect(() => {
    if (!isIdle && hasFineCursor) return
    let raf = 0
    const start = performance.now()
    const loop = (now: number) => {
      const t = (now - start) / 1000
      rawX.set(Math.sin(t * 0.55) * 3)
      rawY.set(Math.cos(t * 0.45) * 2)
      rawRotate.set(Math.sin(t * 0.35) * 1)
      raf = requestAnimationFrame(loop)
    }
    setGaze('depan')
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [isIdle, hasFineCursor, rawX, rawY, rawRotate])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div style={{ x: headX, y: headY, rotate: headRotate }} className="relative h-full w-full">
        <AnimatePresence initial={false}>
          <motion.img
            key={gaze}
            src={GAZE_IMAGES[gaze]}
            alt={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
            draggable={false}
          />
        </AnimatePresence>
        <motion.img
          src={BLINK_IMAGE}
          alt=""
          aria-hidden
          animate={{ opacity: isBlinking ? 1 : 0 }}
          transition={{ duration: isBlinking ? 0.05 : 0.1 }}
          className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
          draggable={false}
        />
      </motion.div>
    </div>
  )
}
