"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import Image from "next/image"

interface ParallaxImageProps {
  src?: string
  alt: string
  speed?: number
  className?: string
  placeholder?: boolean
  children?: React.ReactNode
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className,
  placeholder = false,
  children,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const rawY = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `-${speed * 100}%`])
  const y = useSpring(rawY, { stiffness: 80, damping: 30, restDelta: 0.001 })

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        style={{ y, scale: 1.15 }}
        className="absolute inset-[-15%] w-[130%] h-[130%]"
      >
        {placeholder || !src ? (
          <div className="w-full h-full bg-warm-gray" aria-label={alt} />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}
      </motion.div>

      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}
