'use client'

import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import FluxoGestaoCorrespondencias from './FluxoGestaoCorrespondencias'
import { HEADER_HEIGHT } from './Header'
import AnimatedSection from './AnimatedSection'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { AnimatedItem } from './AnimatedItem'

interface SolucaoProps {
  currentSection?: string;
}

export default function Solucao({ currentSection }: SolucaoProps) {
  const recursos = [
    "Sistema integrado de gestão de correspondências",
    "Automação do processo de recebimento até a entrega",
    "Tecnologia avançada de códigos de barras e QR codes",
    "Notificações em tempo real para os moradores",
    "Interface intuitiva para funcionários do condomínio"
  ]

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  return (
    <AnimatedSection id="solucao" className="pt-16 pb-16 bg-gray-100" style={{scrollMarginTop: `${HEADER_HEIGHT}px`}} softFade={true}>
      <motion.div
        ref={containerRef}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 }
        }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 md:px-6"
      >
        <motion.div
          // ref={ref}
          // initial={{ opacity: 0, y: 20 }}
          // animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          // transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Nossa Solução
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center mb-12 md:mb-16">
          <AnimatedItem animate={controls} delay={0.2}>
            <div className="w-full h-auto aspect-video relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <Image
                src="/sistema-interface.jpg"
                alt="Interface do Sistema Smart Mail"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                priority
              />
            </div>
          </AnimatedItem>
          <div>
            <AnimatedItem animate={controls} delay={0.3}>
              <h3 className="text-2xl font-semibold mb-4">Recursos Principais</h3>
            </AnimatedItem>
            <ul className="space-y-3 md:space-y-4 flex flex-col h-full">
              {recursos.map((item, index) => (
                <AnimatedItem key={index} animate={controls} delay={0.4 + index * 0.1} className="flex-grow">
                  <li className="flex items-start h-full group transition-all duration-300 ease-in-out hover:scale-105">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1 transition-colors duration-300 group-hover:text-green-600" />
                    <span className="transition-colors duration-300 group-hover:text-green-600">{item}</span>
                  </li>
                </AnimatedItem>
              ))}
            </ul>
          </div>
        </div>
        <FluxoGestaoCorrespondencias className="mt-16" />
      </motion.div>
    </AnimatedSection>
  )
}

