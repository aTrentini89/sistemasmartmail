'use client'

import { AlertTriangle, Lock, Bell, History } from 'lucide-react'
import { HEADER_HEIGHT } from './Header'
import AnimatedSection from './AnimatedSection'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { AnimatedItem } from './AnimatedItem'
import { useTimedEffect } from '../hooks/useTimedEffect'

interface ProblemaProps {
  currentSection?: string;
}

export default function Problema({ currentSection }: ProblemaProps) {
  const desafios = [
    { icon: AlertTriangle, title: "Processos Manuais Ineficientes", description: "Sujeitos a erros humanos e atrasos desnecessários" },
    { icon: Lock, title: "Segurança Comprometida", description: "Risco de extravio e acesso não autorizado às correspondências" },
    { icon: Bell, title: "Notificação Ineficaz", description: "Dificuldade em avisar os moradores sobre chegada de itens" },
    { icon: History, title: "Falta de Rastreabilidade", description: "Ausência de registro histórico confiável de entregas" }
  ]

  const { activeCards, toggle } = useTimedEffect(desafios.length)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <AnimatedSection id="problema" className="pt-16 pb-16 bg-white" style={{scrollMarginTop: `${HEADER_HEIGHT}px`}} softFade={true}>
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedItem duration={0.8}>
          <h2 className="text-3xl font-bold text-center mb-8">
            Desafios Atuais
          </h2>
        </AnimatedItem>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {desafios.map((item, index) => (
            <AnimatedItem key={index} delay={index * 0.2}>
              <div 
                className="bg-white p-4 md:p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col relative overflow-hidden cursor-pointer"
                onClick={() => toggle(index)}
              >
                <div 
                  className={`absolute inset-0 bg-blue-600 transition-opacity duration-800 ease-in-out ${
                    activeCards[index] ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <svg className="absolute inset-0" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`tech-grid-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                          <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                        </path>
                      </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill={`url(#tech-grid-${index})`} />
                  </svg>
                </div>
                <div 
                  className={`absolute inset-0 transition-opacity duration-800 ${
                    activeCards[index] ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="absolute inset-0 border-2 border-blue-300 rounded-lg animate-pulse"></div>
                  <div className="absolute inset-0 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse"></div>
                </div>
                <div className="flex-grow relative z-10">
                  <item.icon className={`w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-4 transition-colors duration-300 ${
                    activeCards[index] ? 'text-white' : 'text-red-500'
                  }`} />
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    activeCards[index] ? 'text-white' : ''
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    activeCards[index] ? 'text-white' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

