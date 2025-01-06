'use client'

import { motion, useInView } from 'framer-motion'
import { ReactNode, forwardRef, useRef, MutableRefObject } from 'react'

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  softFade?: boolean;
  style?: React.CSSProperties;
}

const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(({ 
  children, 
  className, 
  id,
  softFade = false,
  style
}, ref) => {
  const internalRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(internalRef as MutableRefObject<HTMLElement | null>, { 
    once: false, 
    amount: softFade ? 0.05 : 0.2 
  })

  return (
    <motion.section
      ref={(node: HTMLElement | null) => {
        internalRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          (ref as MutableRefObject<HTMLElement | null>).current = node
        }
      }}
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: softFade ? 0 : 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: softFade ? 0.5 : 0, y: softFade ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  )
})

AnimatedSection.displayName = 'AnimatedSection'

export default AnimatedSection

