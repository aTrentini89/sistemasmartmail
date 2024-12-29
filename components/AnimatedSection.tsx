'use client'

import { motion, useInView } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  softFade?: boolean;
}

export default function AnimatedSection({ 
  children, 
  className, 
  id,
  softFade = false
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: softFade ? 0.1 : 0.3 })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: softFade ? 0 : 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: softFade ? 0.5 : 0, y: softFade ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  )
}

