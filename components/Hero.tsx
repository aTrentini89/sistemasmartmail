'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero({ opacity }: { opacity: number }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <section id="hero" className="relative bg-blue-600 text-white overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <Image
          src="/placeholder.svg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </motion.div>
      <div 
        className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center justify-center transition-opacity duration-300"
        style={{ opacity: 1 - opacity }}
      >
        <div className="w-full text-center mb-8">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sistema Smart Mail
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Solução para Gestão de Correspondências
          </motion.p>
          <motion.a 
            href="#contato" 
            className="bg-white bg-opacity-20 text-white py-2 px-6 rounded-full text-base font-medium border border-white transition duration-300 inline-block hover:bg-white hover:text-blue-600 hover:shadow-lg transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Agende uma Demonstração
          </motion.a>
        </div>
      </div>
    </section>
  )
}

