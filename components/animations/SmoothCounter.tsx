"use client"

import { useRef, useEffect, useState } from "react"
import { useSpring, useInView, useTransform, motion } from "motion/react"

interface SmoothCounterProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function SmoothCounter({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
}: SmoothCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" })
  const [hasStarted, setHasStarted] = useState(false)

  const springValue = useSpring(0, {
    stiffness: 30 / duration,
    damping: 15,
    restDelta: 0.5,
  })

  const rounded = useTransform(springValue, (v) => Math.round(v))

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true)
      springValue.set(target)
    }
  }, [isInView, hasStarted, springValue, target])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
