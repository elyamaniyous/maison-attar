"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring } from "motion/react"

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const isTouchDevice = useRef(false)

  const springConfig = { stiffness: 200, damping: 28, restDelta: 0.001 }
  const x = useSpring(-100, springConfig)
  const y = useSpring(-100, springConfig)

  useEffect(() => {
    // Detect touch device — don't render cursor on touch
    isTouchDevice.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (isTouchDevice.current) return

    function onMouseMove(e: MouseEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    function onMouseEnter() {
      setIsVisible(true)
    }

    function onMouseLeave() {
      setIsVisible(false)
    }

    // Track hover over interactive elements
    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label")
      setIsHovering(!!interactive)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseover", onMouseOver)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseover", onMouseOver)
    }
  }, [x, y, isVisible])

  // Don't render anything on touch devices or SSR
  if (typeof window !== "undefined" && isTouchDevice.current) return null

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-gold mix-blend-multiply"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 40 : 10,
          height: isHovering ? 40 : 10,
          opacity: isVisible ? (isHovering ? 0.35 : 0.75) : 0,
        }}
        transition={{
          width: { type: "spring", stiffness: 220, damping: 24 },
          height: { type: "spring", stiffness: 220, damping: 24 },
          opacity: { duration: 0.2 },
        }}
      />

      {/* Subtle ring that follows with more lag */}
      <RingCursor x={x} y={y} isVisible={isVisible} isHovering={isHovering} />
    </>
  )
}

interface RingCursorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  x: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y: any
  isVisible: boolean
  isHovering: boolean
}

function RingCursor({ x, y, isVisible, isHovering }: RingCursorProps) {
  const ringSpring = { stiffness: 80, damping: 20, restDelta: 0.001 }
  const ringX = useSpring(x, ringSpring)
  const ringY = useSpring(y, ringSpring)

  return (
    <motion.div
      className="pointer-events-none fixed z-[9998] rounded-full border border-gold/40"
      style={{
        x: ringX,
        y: ringY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        width: isHovering ? 60 : 28,
        height: isHovering ? 60 : 28,
        opacity: isVisible ? 0.5 : 0,
      }}
      transition={{
        width: { type: "spring", stiffness: 180, damping: 22 },
        height: { type: "spring", stiffness: 180, damping: 22 },
        opacity: { duration: 0.25 },
      }}
    />
  )
}
