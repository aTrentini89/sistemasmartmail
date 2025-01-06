'use client'

import { Settings, Users, HeadphonesIcon, Clock } from 'lucide-react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { HEADER_HEIGHT } from './Header'
import AnimatedSection from './AnimatedSection'
import { useRef, useEffect } from 'react'
import { AnimatedItem } from './AnimatedItem'
import { useTimedEffect } from '../hooks/useTimedEffect'

interface ImplementacaoProps {
  currentSection?: string;
}

export default function Implementacao({ currentSection }: ImplementacaoProps) {
  const etapas = [
    { icon: Settings, title: "Instalação Simples", description: "Utiliza computadores e softwares já disponíveis, como Excel e Access, sem a necessidade de grandes investimentos" },
    { icon: Users, title: "Treinamento Completo", description: "Capacitação da equipe do condomínio para utilizar o sistema" },
    { icon: HeadphonesIcon, title: "Suporte Contínuo", description: "Assistência técnica e atendimento sempre que necessário" }
  ]

  const cronograma = [
    { icon: Clock, title: "Dia 1", description: "Instalação e Configuração" },
    { icon: Clock, title: "Dia 2-3", description: "Treinamento da Equipe" },
    { icon: Clock, title: "Dia 4", description: "Testes e Ajustes" },
    { icon: Clock, title: "Dia 5", description: "Lançamento e Acompanhamento" }
  ]

  const { activeCards, toggle } = useTimedEffect(etapas.length + 1)

  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  return (
    <AnimatedSection id="implementacao" className="pt-16 pb-16 bg-gray-100" style={{scrollMarginTop: `${HEADER_HEIGHT}px`}} softFade={true}>
      <motion.div
        ref={containerRef}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          hidden: { opacity: 0 }
        }}
        className="container mx-auto px-6"
      >
        <AnimatedItem duration={0.8} animate={controls}>
          <h2 className="text-3xl font-bold text-center mb-8">
            Implementação e Suporte
          </h2>
        </AnimatedItem>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {etapas.map((item, index) => (
            <AnimatedItem key={index} delay={index * 0.2} animate={controls}>
              <div 
                className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col justify-between relative overflow-hidden cursor-pointer"
                onClick={() => toggle(index)}
              >
                <div 
                  className={`absolute inset-0 bg-blue-600 transition-opacity duration-800 ease-in-out ${
                    activeCards[index] ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <svg className="absolute inset-0" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`tech-grid-implementacao-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                          <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                        </path>
                      </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill={`url(#tech-grid-implementacao-${index})`} />
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
                  <AnimatedItem delay={index * 0.2 + 0.1} animate={controls}>
                    <item.icon className={`w-12 h-12 mx-auto text-blue-600 mb-4 transition-colors duration-300 ${activeCards[index] ? 'text-white' : ''}`} />
                  </AnimatedItem>
                  <AnimatedItem delay={index * 0.2 + 0.2} animate={controls}>
                    <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${activeCards[index] ? 'text-white' : ''}`}>{item.title}</h3>
                  </AnimatedItem>
                  <AnimatedItem delay={index * 0.2 + 0.3} animate={controls}>
                    <p className={`transition-colors duration-300 ${activeCards[index] ? 'text-white' : 'text-gray-600'}`}>{item.description}</p>
                  </AnimatedItem>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>
        <AnimatedItem delay={0.6} animate={controls}>
          <div 
            className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden cursor-pointer"
            onClick={() => toggle(etapas.length)}
          >
            <div 
              className={`absolute inset-0 bg-blue-600 transition-opacity duration-800 ease-in-out ${
                activeCards[etapas.length] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <svg className="absolute inset-0" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="tech-grid-implementacao-cronograma" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                      <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                    </path>
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#tech-grid-implementacao-cronograma)" />
              </svg>
            </div>
            <div 
              className={`absolute inset-0 transition-opacity duration-800 ${
                activeCards[etapas.length] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 border-2 border-blue-300 rounded-lg animate-pulse"></div>
              <div className="absolute inset-0 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse"></div>
            </div>
            <div className="relative z-10">
              <h3 className={`text-2xl font-semibold mb-6 text-center transition-colors duration-300 ${activeCards[etapas.length] ? 'text-white' : ''}`}>
                Cronograma de Implementação
              </h3>
              <div className="flex flex-col md:flex-row justify-between items-center">
                {cronograma.map((item, index) => (
                  <AnimatedItem key={index} delay={0.7 + index * 0.1} animate={controls}>
                    <div className="flex flex-col items-center mb-4 md:mb-0 transition-all duration-300 hover:-translate-y-1">
                      <item.icon className={`w-10 h-10 mb-2 transition-colors duration-300 ${activeCards[etapas.length] ? 'text-white' : 'text-blue-600'}`} />
                      <h4 className={`font-semibold transition-colors duration-300 ${activeCards[etapas.length] ? 'text-white' : ''}`}>{item.title}</h4>
                      <p className={`text-sm text-center transition-colors duration-300 ${activeCards[etapas.length] ? 'text-white' : 'text-gray-600'}`}>{item.description}</p>
                    </div>
                  </AnimatedItem>
                ))}
              </div>
            </div>
          </div>
        </AnimatedItem>
      </motion.div>
    </AnimatedSection>
  )
}

