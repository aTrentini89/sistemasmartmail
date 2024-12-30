'use client'

import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import FluxoGestaoCorrespondencias from './FluxoGestaoCorrespondencias'
import { HEADER_HEIGHT } from './Header'
import AnimatedSection from './AnimatedSection'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
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

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <AnimatedSection id="solucao" className="pt-16 pb-16 bg-gray-100" style={{scrollMarginTop: `${HEADER_HEIGHT}px`}} softFade={true}>
      <div className="container mx-auto px-6">
        <AnimatedItem duration={0.8}>
          <h2 className="text-3xl font-bold text-center mb-8">
            Nossa Solução
          </h2>
        </AnimatedItem>
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <AnimatedItem delay={0.2}>
            <div className="relative">
              <div className="aspect-w-3 aspect-h-2 relative">
                <Image
                  src="/placeholder.svg"
                  alt="Interface do Sistema Smart Mail"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                />
              </div>
            </div>
          </AnimatedItem>
          <div>
            <AnimatedItem delay={0.3}>
              <h3 className="text-2xl font-semibold mb-4">Recursos Principais</h3>
            </AnimatedItem>
            <ul className="space-y-4 flex flex-col h-full">
              {recursos.map((item, index) => (
                <AnimatedItem key={index} delay={0.4 + index * 0.1} className="flex-grow">
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
      </div>
    </AnimatedSection>
  )
}

