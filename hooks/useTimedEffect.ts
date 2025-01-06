import { useState, useCallback } from 'react'

export function useTimedEffect(count: number, duration: number = 3000, fadeDuration: number = 1000) {
  const [activeCards, setActiveCards] = useState<boolean[]>(new Array(count).fill(false))
  const [fadingCards, setFadingCards] = useState<boolean[]>(new Array(count).fill(false))

  const deactivate = useCallback((index: number) => {
    setActiveCards(prev => {
      const newState = [...prev]
      newState[index] = false
      return newState
    })
    setFadingCards(prev => {
      const newState = [...prev]
      newState[index] = false
      return newState
    })
  }, [])

  const activate = useCallback((index: number) => {
    setActiveCards(prev => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
    setFadingCards(prev => {
      const newState = [...prev]
      newState[index] = false
      return newState
    })

    setTimeout(() => deactivate(index), duration)
  }, [duration, deactivate])

  const toggle = useCallback((index: number) => {
    if (activeCards[index]) {
      deactivate(index)
    } else {
      activate(index)
    }
  }, [activeCards, activate, deactivate])

  return { activeCards, fadingCards, toggle }
}

