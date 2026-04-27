"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

interface TextRevealProps {
  text: string
  className?: string
}

export default function TextReveal({ text, className }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.4"],
  })

  const words = text.split(" ")

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <p className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight flex flex-wrap gap-x-[0.25em]">
        {words.map((word, i) => {
          const start = i / words.length
          const end = (i + 1) / words.length

          return (
            <Word
              key={`${word}-${i}`}
              word={word}
              scrollYProgress={scrollYProgress}
              start={start}
              end={end}
            />
          )
        })}
      </p>
    </div>
  )
}

interface WordProps {
  word: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scrollYProgress: any
  start: number
  end: number
}

function Word({ word, scrollYProgress, start, end }: WordProps) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1])
  const y = useTransform(scrollYProgress, [start, end], [8, 0])

  return (
    <motion.span
      style={{ opacity, y, display: "inline-block" }}
      className="text-ink"
    >
      {word}
    </motion.span>
  )
}
