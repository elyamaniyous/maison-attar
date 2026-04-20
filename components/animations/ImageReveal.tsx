"use client"

import { useRef } from "react"
import { motion, useInView, type TargetAndTransition } from "motion/react"
import Image from "next/image"

interface ImageRevealProps {
  src?: string
  alt: string
  className?: string
  direction?: "left" | "right" | "up" | "down"
  placeholder?: boolean
  children?: React.ReactNode
}

type CurtainEntry = {
  initial: TargetAndTransition
  animate: TargetAndTransition
}

const curtainVariants: Record<NonNullable<ImageRevealProps["direction"]>, CurtainEntry> = {
  left:  { initial: { scaleX: 1, originX: "0%"   }, animate: { scaleX: 0 } },
  right: { initial: { scaleX: 1, originX: "100%" }, animate: { scaleX: 0 } },
  up:    { initial: { scaleY: 1, originY: "0%"   }, animate: { scaleY: 0 } },
  down:  { initial: { scaleY: 1, originY: "100%" }, animate: { scaleY: 0 } },
}

export default function ImageReveal({
  src,
  alt,
  className,
  direction = "left",
  placeholder = false,
  children,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" })

  const { initial, animate } = curtainVariants[direction]

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      {/* The image / placeholder */}
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.01, delay: 0.2 }}
      >
        {placeholder || !src ? (
          <div className="w-full h-full bg-warm-gray" aria-label={alt} />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </motion.div>

      {/* Gold curtain overlay */}
      <motion.div
        className="absolute inset-0 z-10 bg-gold"
        initial={initial}
        animate={isInView ? animate : initial}
        transition={{
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
          delay: 0.1,
        }}
      />

      {/* Optional overlay content */}
      {children && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}
