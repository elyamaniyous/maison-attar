"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"

interface HorizontalScrollProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export default function HorizontalScroll({
  children,
  className,
  containerClassName,
}: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  const rawX = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"])
  const x = useSpring(rawX, { stiffness: 80, damping: 30, restDelta: 0.001 })

  return (
    <div
      ref={targetRef}
      className={`relative ${containerClassName ?? ""}`}
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 overflow-hidden h-screen flex items-center">
        <motion.div
          style={{ x }}
          className={`flex gap-8 pl-[max(2rem,calc((100vw-80rem)/2))] pr-24 will-change-transform ${className ?? ""}`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
