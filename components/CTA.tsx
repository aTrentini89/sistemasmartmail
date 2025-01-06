'use client'

import React, { useState, useEffect, useRef, memo, useCallback, forwardRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { FaWhatsapp } from 'react-icons/fa'
import { sendEmail } from '../app/actions/sendEmail'
import { motion, AnimatePresence, useMotionValue, useTransform, useInView, MotionValue } from 'framer-motion'
import { HEADER_HEIGHT } from './Header'
import AnimatedSection from './AnimatedSection'
import { FormProvider, useForm } from '../contexts/FormContext'
import { AnimatedItem } from './AnimatedItem'

const SHOW_EMAIL_BUTTON = process.env.NEXT_PUBLIC_SHOW_EMAIL_BUTTON === 'true'

interface CTAProps {
  currentSection?: string;
  isLastSection?: boolean;
}

const CTA = forwardRef<HTMLDivElement, CTAProps>(({ currentSection, isLastSection }, ref) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  const phoneNumber = '+5511964495331'
  const message = encodeURIComponent('Olá! Tenho interesse no Sistema Smart Mail para gestão de correspondências do meu condomínio. Poderia me auxiliar?')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  const handleExpansionToggle = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const cardVariants = {
    collapsed: {
      width: '100%',
      height: '60px',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    expanded: {
      width: '100%',
      height: '400px',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  }

  const contentVariants = {
    collapsed: { 
      opacity: 0,
      y: -20,
    },
    expanded: { 
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
      }
    }
  }

  return (
    <FormProvider>
      <AnimatedSection 
        id="contato" 
        className="relative pt-16 pb-16 min-h-[75vh] flex items-start overflow-hidden flex-grow" 
        style={{scrollMarginTop: `${HEADER_HEIGHT + 16}px`}}
        ref={ref}
        softFade={true}
      >
        <MemoizedIntelligentSystemBackground />
        <motion.div 
          ref={containerRef} 
          className={`container relative z-10 mx-auto px-4 md:px-6 flex flex-col justify-start items-center ${isLastSection ? 'h-full' : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AnimatedItem>
            <h2 className="text-3xl font-bold text-center mb-4 text-white">
              Contato
            </h2>
          </AnimatedItem>
          <AnimatedItem delay={0.2}>
            <p className="text-xl text-center mb-8 text-white">
              Pronto para Revolucionar a Gestão de Correspondências?
            </p>
          </AnimatedItem>
          <div className={`flex flex-col md:flex-row justify-center items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 w-full ${SHOW_EMAIL_BUTTON ? 'max-w-4xl' : 'max-w-xl'}`}>
            {SHOW_EMAIL_BUTTON && (
              <AnimatedItem delay={0.3} className="w-full max-w-sm md:w-2/5">
                <motion.div 
                  ref={cardRef}
                  className="relative w-full md:w-2/5 bg-white bg-opacity-10 backdrop-blur-sm p-2 rounded-lg shadow-md transition-all duration-500 ease-in-out overflow-hidden cursor-pointer"
                  variants={cardVariants}
                  initial="collapsed"
                  animate={isExpanded ? "expanded" : "collapsed"}
                  onClick={handleExpansionToggle}
                  style={{
                    position: 'relative',
                    zIndex: 20,
                  }}
                  whileHover={!isExpanded ? { scale: 1.05 } : {}}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isExpanded ? 'expanded' : 'collapsed'}
                      variants={contentVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="relative z-10 h-full"
                    >
                      {isExpanded ? (
                        <ContactForm />
                      ) : (
                        <h3 className="text-lg font-bold text-white text-center h-full flex items-center justify-center">
                          Contate-nos por email
                        </h3>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </AnimatedItem>
            )}
            <AnimatedItem delay={0.4} className="w-full md:w-3/5 flex flex-col items-center">
              <motion.div 
                className="w-full md:w-3/5 flex flex-col items-center"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full max-w-xs">
                  <motion.a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 md:px-4 rounded-full font-semibold transition duration-300 flex items-center justify-center mb-4 text-sm md:text-base whitespace-nowrap"
                    style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1rem)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaWhatsapp className="mr-2 flex-shrink-0" />
                    <span className="flex-shrink-0">Contate via WhatsApp</span>
                  </motion.a>
                </div>
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-lg mb-4 cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <QRCodeSVG value={whatsappUrl} size={150} />
                </motion.a>
                <AnimatedItem delay={0.5}>
                  <p className="text-sm mt-4 text-center text-white">
                    Clique no botão ou escaneie o QR Code para falar conosco via WhatsApp
                  </p>
                </AnimatedItem>
              </motion.div>
            </AnimatedItem>
          </div>
        </motion.div>
      </AnimatedSection>
    </FormProvider>
  )
})

CTA.displayName = 'CTA'

export default CTA

const IntelligentSystemBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const nodeCount = 30
  const lineCount = 40

  let seedValue = 123;
  const random = (min: number, max: number) => {
    const x = Math.sin(seedValue++) * 10000;
    return Number(((x - Math.floor(x)) * (max - min) + min).toFixed(4));
  };

  const formatCoordinate = (value: number) => Number(value.toFixed(4));

  const nodes = [...Array(nodeCount)].map((_, i) => ({
    x: formatCoordinate(random(0, 100)),
    y: formatCoordinate(random(0, 100)),
    radius: formatCoordinate(random(2, 5)),
  }));

  const lines = [...Array(lineCount)].map((_, i) => ({
    x1: formatCoordinate(random(0, 100)),
    y1: formatCoordinate(random(0, 100)),
    x2: formatCoordinate(random(0, 100)),
    y2: formatCoordinate(random(0, 100)),
  }));

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (event: MouseEvent) => {
      const container = containerRef.current
      if (container) {
        const rect = container.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  const calculateDistance = useCallback((nodeX: number, nodeY: number) => {
    const dx = mouseX.get() - (nodeX / 100) * dimensions.width;
    const dy = mouseY.get() - (nodeY / 100) * dimensions.height;
    return Math.sqrt(dx * dx + dy * dy);
  }, [dimensions.width, dimensions.height, mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#1e3a8a] via-[#0B1437] to-[#050A1C]">
      <svg className="w-full h-full">
        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </radialGradient>
        </defs>
        {lines.map((line, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="rgba(59, 130, 246, 0.4)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
        {nodes.map((node, i) => (
          <Node key={`node-${i}`} node={node} mouseX={mouseX} mouseY={mouseY} calculateDistance={calculateDistance} />
        ))}
      </svg>
    </div>
  )
}

interface NodeProps {
  node: { x: number; y: number; radius: number };
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  calculateDistance: (x: number, y: number) => number;
}

const Node: React.FC<NodeProps> = ({ node, mouseX, mouseY, calculateDistance }) => {
  const distance = useMotionValue(0);
  const scale = useTransform(distance, [0, 300], [1.5, 1]);
  const opacity = useTransform(distance, [0, 300], [1, 0.3]);

  useEffect(() => {
    const updateDistance = () => {
      distance.set(calculateDistance(node.x, node.y));
    };
    const unsubscribeX = mouseX.onChange(updateDistance);
    const unsubscribeY = mouseY.onChange(updateDistance);
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [node.x, node.y, distance, mouseX, mouseY, calculateDistance]);

  return (
    <motion.circle
      cx={`${node.x}%`}
      cy={`${node.y}%`}
      r={node.radius}
      fill="url(#nodeGradient)"
      style={{ scale, opacity }}
      animate={{
        cx: [`${node.x}%`, `${node.x + 1}%`],
        cy: [`${node.y}%`, `${node.y + 1}%`],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  );
};

IntelligentSystemBackground.displayName = 'IntelligentSystemBackground'

const MemoizedIntelligentSystemBackground = memo(IntelligentSystemBackground)

const ContactForm = memo(() => {
  const { formData, handleChange } = useForm()

  return (
    <motion.form 
      action={sendEmail}
      onClick={(e) => e.stopPropagation()}
      className="space-y-4"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <label htmlFor="name" className="block text-white font-semibold mb-1 text-sm">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white bg-opacity-30 placeholder-gray-500 text-sm"
          required
          maxLength={50}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <label htmlFor="email" className="block text-white font-semibold mb-1 text-sm">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white bg-opacity-30 placeholder-gray-500 text-sm"
          required
          maxLength={100}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <label htmlFor="message" className="block text-white font-semibold mb-1 text-sm">Mensagem</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white bg-opacity-30 placeholder-gray-500 text-sm"
          rows={3}
          required
          maxLength={500}
        ></textarea>
      </motion.div>
      <motion.div variants={itemVariants}>
        <motion.button 
          type="submit" 
          className="w-full bg-blue-600 bg-opacity-70 text-white py-1 px-3 rounded-md hover:bg-blue-700 hover:bg-opacity-90 transition duration-300 disabled:opacity-50 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enviar E-mail
        </motion.button>
      </motion.div>
    </motion.form>
  )
})

ContactForm.displayName = 'ContactForm'

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

