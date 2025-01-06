'use client'

import { motion, useInView, AnimationControls } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  direction?: 'left' | 'right' | 'up';
  className?: string;
  duration?: number;
  animate?: AnimationControls;
}

export const AnimatedItem: React.FC<AnimatedItemProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '',
  duration = 0.5,
  animate
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: false, 
    amount: 0.2 
  })

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={animate || (isInView ? "visible" : "hidden")}
      variants={variants}
      transition={{ 
        duration, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 12
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

