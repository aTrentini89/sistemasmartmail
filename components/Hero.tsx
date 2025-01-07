'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import DynamicTextReveal from './DynamicTextReveal'

const shadowStyle = `
  @layer utilities {
    .text-shadow-lg {
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    .text-shadow-md {
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }
  }
`;

export default function Hero({ opacity }: { opacity: number }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const [isMounted, setIsMounted] = useState(false)
  const [imageError, setImageError] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const [key, setKey] = useState(0)

  useEffect(() => {
    setIsMounted(true)

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setKey(prev => prev + 1)
        }
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <style jsx global>
        {shadowStyle}
      </style>
      <section 
        id="hero" 
        className="relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center justify-center"
        ref={heroRef}
      >
        <motion.div 
          className="absolute inset-0 z-0 overflow-hidden"
          style={{ y }}
        >
          <Image
            src={imageError ? "/placeholder.svg" : "/hero-background.jpg"}
            alt="Hero Background"
            fill
            sizes="100vw"
            quality={90}
            priority
            className="object-cover object-center"
            onError={() => setImageError(true)}
            onLoadingComplete={(result) => {
              if (result.naturalWidth === 0) {
                setImageError(true);
              }
            }}
          />
        </motion.div>
        <DynamicTextReveal key={key} containerRef={heroRef} />
        <div 
          className="relative z-10 container mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col items-center justify-center transition-opacity duration-300 h-full"
          style={{ opacity: 1 - opacity }}
        >
          <div className="w-full text-center mb-8">
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-center text-shadow-lg text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Sistema Smart Mail
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl mb-8 text-center text-shadow-md text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Solução para Gestão de Correspondências
            </motion.p>
            <motion.a 
              href="#contato" 
              className="bg-white bg-opacity-20 text-white py-2 px-4 md:px-6 rounded-full text-sm md:text-base font-medium border border-white transition duration-300 inline-block hover:bg-white hover:text-blue-600 hover:shadow-lg transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Agende uma Demonstração
            </motion.a>
          </div>
        </div>
      </section>
    </>
  )
}

