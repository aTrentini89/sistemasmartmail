'use client'

import React, { useEffect, useState } from 'react';
import { Building, Users, Shield, PiggyBank, Zap, FileCheck, Smile, Settings, Leaf } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { HEADER_HEIGHT } from './Header'
import AnimatedSection from './AnimatedSection'
import { useRef } from 'react'
import { AnimatedItem } from './AnimatedItem'
import { useTimedEffect } from '../hooks/useTimedEffect'

interface BeneficiosProps {
  currentSection?: string;
}

export default function Beneficios({ currentSection }: BeneficiosProps) {
  const beneficiosCondominio = [
    "Redução de erros e extravios",
    "Melhor utilização do espaço",
    "Registro digital para auditoria",
    "Aumento da satisfação dos moradores",
    "Economia de tempo e recursos"
  ]

  const beneficiosMoradores = [
    "Notificação em tempo real",
    "Processo de retirada mais rápido",
    "Maior segurança na entrega",
    "Rastreabilidade das correspondências",
    "Conveniência e praticidade"
  ]

  const caracteristicas = [
    { icon: Shield, title: "Segurança", description: "Dados protegidos e acesso restrito à rede local" },
    { icon: PiggyBank, title: "Economia", description: "Sem custos de nuvem ou servidores externos" },
    { icon: Zap, title: "Eficiência", description: "Rápido, intuitivo e com baixo consumo de recursos" },
    { icon: FileCheck, title: "Conformidade", description: "Atende à LGPD, com total privacidade" },
    { icon: Smile, title: "Facilidade", description: "Configuração e uso simples, sem necessidade de internet" },
    { icon: Settings, title: "Personalização Avançada", description: "Adaptável às regras e processos únicos de cada condomínio" }
  ]

  const { activeCards, toggle } = useTimedEffect(caracteristicas.length + 1)
  const cardRefs = useRef(caracteristicas.map(() => React.createRef<HTMLDivElement>()));
  const sustainabilityRef = useRef(null)
  const characteristicsRef = useRef(null)
  
  const [cardInViews, setCardInViews] = useState<boolean[]>(new Array(caracteristicas.length).fill(false));
  const characteristicsInView = useInView(characteristicsRef, { once: false, amount: 0.2 })
  const sustainabilityInView = useInView(sustainabilityRef, { once: false, amount: 0.3 })

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setCardInViews(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        },
        { threshold: 0.2 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach(observer => {
        observer.disconnect();
      });
    };
  }, []);

  return (
    <AnimatedSection id="beneficios" className="pt-16 pb-16 bg-white" style={{scrollMarginTop: `${HEADER_HEIGHT}px`}} softFade={true}>
      <div className="container mx-auto px-6 max-w-5xl">
        <AnimatedItem duration={0.8}>
          <h2 className="text-3xl font-bold text-center mb-8">
            Benefícios
          </h2>
        </AnimatedItem>
        <div className="grid md:grid-cols-2 gap-12 justify-items-center">
          <AnimatedItem delay={0.2} duration={0.8}>
            <div className="max-w-md w-full">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Building className="w-8 h-8 mr-2 text-blue-600" />
                Para o Condomínio
              </h3>
              <ul className="space-y-2">
                {beneficiosCondominio.map((item, index) => (
                  <AnimatedItem key={index} delay={0.4 + index * 0.1} direction="left" duration={0.6}>
                    <li className="flex items-center group transition-all duration-300 ease-in-out hover:scale-105">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 transition-colors duration-300 group-hover:bg-blue-700"></span>
                      <span className="transition-colors duration-300 group-hover:text-blue-600">{item}</span>
                    </li>
                  </AnimatedItem>
                ))}
              </ul>
            </div>
          </AnimatedItem>
          <AnimatedItem delay={0.7} duration={0.8}>
            <div className="max-w-md w-full">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Users className="w-8 h-8 mr-2 text-green-600" />
                Para os Moradores
              </h3>
              <ul className="space-y-2">
                {beneficiosMoradores.map((item, index) => (
                  <AnimatedItem key={index} delay={0.8 + index * 0.1} direction="right" duration={0.6}>
                    <li className="flex items-center group transition-all duration-300 ease-in-out hover:scale-105">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2 transition-colors duration-300 group-hover:bg-green-700"></span>
                      <span className="transition-colors duration-300 group-hover:text-green-600">{item}</span>
                    </li>
                  </AnimatedItem>
                ))}
              </ul>
            </div>
          </AnimatedItem>
        </div>
        <motion.div
          ref={characteristicsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={characteristicsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Características Exclusivas</h3>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {caracteristicas.map((item, index) => (
            <motion.div
              key={index}
              ref={cardRefs.current[index]}
              initial={{ opacity: 0, y: 20 }}
              animate={cardInViews[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
            >
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
                      <pattern id={`tech-grid-beneficios-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                          <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                        </path>
                      </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill={`url(#tech-grid-beneficios-${index})`} />
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
                  <item.icon className={`w-12 h-12 mx-auto text-blue-600 mb-4 transition-colors duration-300 ${activeCards[index] ? 'text-white' : ''}`} />
                  <h4 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${activeCards[index] ? 'text-white' : ''}`}>{item.title}</h4>
                  <p className={`text-gray-600 transition-colors duration-300 ${activeCards[index] ? 'text-white' : ''}`}>{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          ref={sustainabilityRef}
          initial={{ opacity: 0, y: 20 }}
          animate={sustainabilityInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.16 * (caracteristicas.length) }}
          className="mt-12"
        >
          <div 
            className="bg-green-100 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden cursor-pointer"
            onClick={() => toggle(caracteristicas.length)}
          >
            <div 
              className={`absolute inset-0 bg-blue-600 transition-opacity duration-800 ease-in-out ${
                activeCards[caracteristicas.length] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <svg className="absolute inset-0" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="tech-grid-beneficios-sustentabilidade" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                      <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                    </path>
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#tech-grid-beneficios-sustentabilidade)" />
              </svg>
            </div>
            <div 
              className={`absolute inset-0 transition-opacity duration-800 ${
                activeCards[caracteristicas.length] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 border-2 border-blue-300 rounded-lg animate-pulse"></div>
              <div className="absolute inset-0 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse"></div>
            </div>
            <div className="relative z-10">
              <h3 className={`text-2xl font-semibold mb-4 flex items-center transition-colors duration-300 ${activeCards[caracteristicas.length] ? 'text-white' : ''}`}>
                <Leaf className={`w-8 h-8 mr-2 transition-colors duration-300 ${activeCards[caracteristicas.length] ? 'text-white' : 'text-green-600'}`} />
                Compromisso com a Sustentabilidade
              </h3>
              <p className={`transition-colors duration-300 ${activeCards[caracteristicas.length] ? 'text-white' : 'text-gray-700'}`}>
                O Sistema Smart Mail é uma solução paperless que reduz significativamente o uso de papel, 
                alinhando-se com práticas ecológicas e contribuindo para a redução de custos operacionais e 
                do impacto ambiental do seu condomínio.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

