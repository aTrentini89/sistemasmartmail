'use client'

import { Package, ScanBarcode, Building2, BoxSelect, Send, QrCode, MapPin, Truck } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

interface FluxoGestaoCorrespondenciasProps {
  className?: string;
}

const AnimatedItem = ({ children, delay = 0, isDesktop = false }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: isDesktop ? delay : 0 }}
    >
      {children}
    </motion.div>
  )
}

export default function FluxoGestaoCorrespondencias({ className = '' }: FluxoGestaoCorrespondenciasProps) {
  const containerRef = useRef(null)
  const lineRef = useRef(null)
  const isContainerInView = useInView(containerRef, { once: false, amount: 0.3 })
  const isLineInView = useInView(lineRef, { once: false, amount: 0.3 })
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    
    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
    
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  const steps = [
    {
      title: "Recebimento",
      color: "yellow",
      items: [
        { icon: Package, text: "Cadastro do Entregador" },
        { icon: ScanBarcode, text: "Leitura de Códigos" },
        { icon: Building2, text: "Identificação de Bloco/Apto" },
      ],
    },
    {
      title: "Alocação",
      color: "blue",
      items: [
        { icon: BoxSelect, text: "Associação ao Bloco/Apto" },
        { icon: MapPin, text: "Designação do Local Físico" },
        { icon: Send, text: "Notificação via WhatsApp" },
      ],
    },
    {
      title: "Entrega",
      color: "green",
      items: [
        { icon: QrCode, text: "Morador Apresenta QR Code" },
        { icon: ScanBarcode, text: "Leitura do QR Code" },
        { icon: Truck, text: "Registro da Entrega" },
      ],
    },
  ]

  return (
    <div ref={containerRef} className={className}>
      <AnimatedItem isDesktop={isDesktop}>
        <h3 className="text-2xl font-semibold text-center mb-6">
          Fluxo de Gestão de Correspondências
        </h3>
      </AnimatedItem>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
        {/* Linha vertical para smartphones */}
        <motion.div 
          ref={lineRef}
          className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500 via-blue-500 to-green-500 md:hidden"
          initial={{ scaleY: 0 }}
          animate={isLineInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />

        {steps.map((step, stepIndex) => (
          <AnimatedItem key={step.title} delay={stepIndex * 0.3} isDesktop={isDesktop}>
            <div 
              className={`${
                step.title === "Recebimento" ? "bg-yellow-50" :
                step.title === "Alocação" ? "bg-blue-50" :
                "bg-green-50"
              } p-4 md:p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col relative ml-6 md:ml-0`}
            >
              <AnimatedItem delay={stepIndex * 0.3 + 0.1} isDesktop={isDesktop}>
                <h3 className={`text-xl font-semibold mb-4 ${
                  step.title === "Recebimento" ? "text-yellow-700" :
                  step.title === "Alocação" ? "text-blue-700" :
                  "text-green-700"
                }`}>
                  {step.title}
                </h3>
              </AnimatedItem>
              <ul className="space-y-4 flex-grow">
                {step.items.map((item, itemIndex) => (
                  <AnimatedItem 
                    key={item.text} 
                    delay={stepIndex * 0.3 + (itemIndex * 0.1) + 0.2} 
                    isDesktop={isDesktop}
                  >
                    <li className="flex items-center">
                      <AnimatedItem 
                        delay={stepIndex * 0.3 + (itemIndex * 0.1) + 0.3} 
                        isDesktop={isDesktop}
                      >
                        <item.icon className={`w-6 h-6 mr-2 ${
                          step.title === "Recebimento" ? "text-yellow-500" :
                          step.title === "Alocação" ? "text-blue-500" :
                          "text-green-500"
                        }`} />
                      </AnimatedItem>
                      <AnimatedItem 
                        delay={stepIndex * 0.3 + (itemIndex * 0.1) + 0.4} 
                        isDesktop={isDesktop}
                      >
                        <span>{item.text}</span>
                      </AnimatedItem>
                    </li>
                  </AnimatedItem>
                ))}
              </ul>
            </div>
          </AnimatedItem>
        ))}

        {/* Linha horizontal para telas maiores */}
        <div className="hidden md:block absolute -bottom-4 left-0 right-0">
          <div className="relative h-[3px] mx-0">
            <motion.div
              ref={lineRef}
              className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500"
              initial={{ scaleX: 0 }}
              animate={isLineInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ originX: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

