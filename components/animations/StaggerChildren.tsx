"use client"

import { Children } from "react"
import { motion, AnimatePresence, type Variants } from "motion/react"

interface StaggerChildrenProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
  once?: boolean
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export default function StaggerChildren({
  children,
  staggerDelay = 0.1,
  className,
  once = true,
}: StaggerChildrenProps) {
  const containerVars = {
    ...containerVariants,
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        className={className}
        variants={containerVars}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "0px 0px -60px 0px" }}
      >
        {Children.map(children, (child, i) => (
          <motion.div key={i} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
