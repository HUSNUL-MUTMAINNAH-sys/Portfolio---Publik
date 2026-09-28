import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MouseFollower() {
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [visible, x, y])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="h-6 w-6 rounded-full border border-accent/50 mix-blend-difference" />
    </motion.div>
  )
}
