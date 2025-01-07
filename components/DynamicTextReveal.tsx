'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Word {
  word: string
  x: number
  y: number
  width: number
  height: number
  isVisible: boolean
}

interface ExclusionZone {
  x: number
  y: number
  width: number
  height: number
}

interface DynamicTextRevealProps {
  containerRef: React.RefObject<HTMLDivElement>
}

const allKeywords = [
  'Eficiente', 'Seguro', 'Inteligente', 'Automatizado', 'Otimizado',
  'Inovador', 'Intuitivo', 'Rápido', 'Sustentável', 'Customizável',
  'Produtivo', 'Simplificado', 'Digital', 'Organizado', 'Gerenciável',
  'Prático', 'Moderno', 'Integrado', 'Preciso', 'Adaptável',
  'Centralizado', 'Ágil', 'Confiável', 'Flexível', 'Econômico',
  'Escalável', 'Versátil', 'Robusto', 'Conectado', 'Avançado',
  'Dinâmico', 'Colaborativo', 'Eficaz', 'Ecológico'
]

const DynamicTextReveal: React.FC<DynamicTextRevealProps> = ({ containerRef }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [words, setWords] = useState<Word[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [keywords, setKeywords] = useState<string[]>([])
  const [exclusionZones, setExclusionZones] = useState<ExclusionZone[]>([])

  const selectKeywords = useCallback(() => {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const area = screenWidth * screenHeight
    const wordCount = Math.max(15, Math.min(40, Math.floor(area / 25000)))
    setKeywords(allKeywords.slice(0, wordCount))
  }, [])

  const updateExclusionZones = useCallback(() => {
    if (containerRef.current) {
      const heroElements = containerRef.current.querySelectorAll('h1, p, a.bg-white')
      const newExclusionZones: ExclusionZone[] = []

      heroElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const containerRect = containerRef.current!.getBoundingClientRect()
        
        newExclusionZones.push({
          x: rect.left - containerRect.left - 2, // Alterado de 20 para 2
          y: rect.top - containerRect.top - 2, // Alterado de 20 para 2
          width: rect.width + 4, // Alterado de 40 para 4
          height: rect.height + 4 // Alterado de 40 para 4
        })
      })

      setExclusionZones(newExclusionZones)
    }
  }, [containerRef])

  const isInExclusionZone = useCallback((x: number, y: number, width: number, height: number) => {
    return exclusionZones.some(zone => 
      x < zone.x + zone.width &&
      x + width > zone.x &&
      y < zone.y + zone.height &&
      y + height > zone.y
    )
  }, [exclusionZones])

  const positionWords = useCallback(() => {
    if (containerRef.current && canvasRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) return

      ctx.font = 'bold 18px Arial'

      const newWords: Word[] = []
      const padding = 2; // Alterado de 20 para 2
      const gridSize = Math.ceil(Math.sqrt(keywords.length * 2))
      const cellWidth = width / gridSize
      const cellHeight = height / gridSize

      const grid: boolean[][] = Array(gridSize).fill(null).map(() => new Array(gridSize).fill(false));

      const isOverlapping = (x: number, y: number, w: number, h: number) => {
        return newWords.some(word => 
          x < word.x + word.width + padding &&
          x + w + padding > word.x &&
          y < word.y + word.height + padding &&
          y + h + padding > word.y
        )
      }

      const findEmptyCell = () => {
        const emptyCells = [];
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            if (grid[i] && grid[i][j] === false) {
              emptyCells.push({ i, j });
            }
          }
        }
        if (emptyCells.length === 0) return null;
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
      };

      const margin = 2;
      keywords.forEach((word) => {
        const metrics = ctx.measureText(word)
        let wordWidth = metrics.width + padding
        let wordHeight = 22 + padding

        let x: number, y: number
        let placed = false

        for (let attempts = 0; attempts < 100; attempts++) {
          const emptyCell = findEmptyCell()
          if (emptyCell) {
            const { i, j } = emptyCell
            x = (i * cellWidth) + (Math.random() * (cellWidth - wordWidth))
            y = (j * cellHeight) + (Math.random() * (cellHeight - wordHeight))
          } else {
            x = Math.random() * (width - wordWidth)
            y = Math.random() * (height - wordHeight)
          }

          if (!isOverlapping(x, y, wordWidth, wordHeight) && !isInExclusionZone(x, y, wordWidth, wordHeight)) {
            newWords.push({ 
              word, 
              x: Math.max(margin, Math.min(x, width - wordWidth - margin)),
              y: Math.max(margin, Math.min(y, height - wordHeight - margin)),
              width: wordWidth, 
              height: wordHeight, 
              isVisible: false 
            })
            const gridI = Math.floor(x / cellWidth)
            const gridJ = Math.floor(y / cellHeight)
            if (gridI >= 0 && gridI < gridSize && gridJ >= 0 && gridJ < gridSize) {
              grid[gridI][gridJ] = true;
            }
            placed = true
            break
          }
        }

        if (!placed) {
          console.warn(`Could not place word: ${word}`)
        }
      })

      setWords(newWords)
    }
  }, [containerRef, keywords, isInExclusionZone])

  useEffect(() => {
    selectKeywords()
    updateExclusionZones()
    const handleResize = () => {
      selectKeywords()
      updateExclusionZones()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [selectKeywords, updateExclusionZones])

  useEffect(() => {
    positionWords()
  }, [positionWords, keywords, exclusionZones])

  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      setMousePosition({ x, y })

      setWords(prevWords => prevWords.map(word => {
        const distance = Math.sqrt(
          Math.pow(x - (word.x + word.width / 2), 2) + 
          Math.pow(y - (word.y + word.height / 2), 2)
        )
        return {
          ...word,
          isVisible: distance < 120
        }
      }))
    }
  }, [containerRef])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => handleInteraction(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('touchmove', handleTouchMove)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('touchmove', handleTouchMove)
    }
  }, [containerRef, handleInteraction])

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {words.map((item, index) => (
            <motion.div
              key={`${item.word}-${index}`}
              className="absolute text-white font-bold text-lg pointer-events-none select-none"
              style={{ 
                left: item.x, 
                top: item.y, 
                width: item.width,
                height: item.height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: item.isVisible ? 0.15 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.word}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}

export default DynamicTextReveal

