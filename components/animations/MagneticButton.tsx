"use client"

import { useRef } from "react"
import { motion, useSpring } from "motion/react"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export default function MagneticButton({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const springConfig = { stiffness: 200, damping: 20, restDelta: 0.001 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distX = (e.clientX - centerX) * strength
    const distY = (e.clientY - centerY) * strength

    // Clamp to max 14px movement for subtlety
    x.set(Math.max(-14, Math.min(14, distX)))
    y.set(Math.max(-14, Math.min(14, distY)))
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.div>
  )
}
