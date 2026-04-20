"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

const directionOffsets: Record<NonNullable<ScrollRevealProps["direction"]>, { x: number; y: number }> = {
  up:    { x: 0,   y: 40  },
  down:  { x: 0,   y: -40 },
  left:  { x: 40,  y: 0   },
  right: { x: -40, y: 0   },
  none:  { x: 0,   y: 0   },
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "0px 0px -80px 0px" })

  const { x, y } = directionOffsets[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        // Respect prefers-reduced-motion via CSS media
        // motion library also respects this natively
      }}
    >
      {children}
    </motion.div>
  )
}
