'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Header, { HEADER_HEIGHT } from '../components/Header';
import Hero from '../components/Hero'
import Problema from '../components/Problema'
import Solucao from '../components/Solucao'
import Beneficios from '../components/Beneficios'
import Implementacao from '../components/Implementacao'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState('hero')
  const [heroOpacity, setHeroOpacity] = useState(0)
  const sections = useMemo(() => ['hero', 'problema', 'solucao', 'beneficios', 'implementacao', 'contato'], [])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const contatoRef = useRef<HTMLDivElement>(null);

  const getElementTop = useCallback((element: Element): number => {
    return element.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
  }, []);

  const snapToNearestSection = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const scrollPosition = window.scrollY;
      let closestSection: Element | null = null;
      let minDistance = Infinity;

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = getElementTop(section);
          const distance = Math.abs(scrollPosition - sectionTop);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        }
      });

      if (closestSection) {
        const sectionTop = getElementTop(closestSection);
        const distanceFromTop = Math.abs(scrollPosition - sectionTop);
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        
        if (distanceFromTop <= 80 && !isAtBottom) {
          window.scrollTo({ top: sectionTop, behavior: 'smooth' });
        }
      }
    }, 150);
  }, [getElementTop, sections]);

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 10); // 10ms de debounce

    window.addEventListener('scroll', debouncedHandleScroll);
    debouncedHandleScroll(); // Chama uma vez para definir o estado inicial
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [sections, snapToNearestSection]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 3; // Ajustado para 1/3 da altura da janela
    let newCurrentSection = 'hero';

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section) {
        const sectionTop = getElementTop(section);
        if (scrollPosition >= sectionTop) {
          newCurrentSection = sections[i];
          break;
        }
      }
    }

    if (contatoRef.current) {
      const contatoRect = contatoRef.current.getBoundingClientRect();
      if (contatoRect.top <= window.innerHeight / 2) {
        newCurrentSection = 'contato';
      }
    }

    setCurrentSection(newCurrentSection);

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const heroHeight = heroSection.getBoundingClientRect().height;
      const scrollPercentage = Math.min(window.scrollY / (heroHeight * 9/10), 1);
      setHeroOpacity(scrollPercentage);
    }

    snapToNearestSection();
  }

  const handleNavClick = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -HEADER_HEIGHT;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header 
        currentSection={currentSection} 
        heroOpacity={heroOpacity} 
        onNavClick={handleNavClick}
      />
      <Hero opacity={heroOpacity} />
      <Problema currentSection={currentSection} />
      <Solucao currentSection={currentSection} />
      <Beneficios currentSection={currentSection} />
      <Implementacao currentSection={currentSection} />
      <CTA currentSection={currentSection} isLastSection={true} ref={contatoRef} />
      <Footer />
      <div id="page-bottom"></div>
    </main>
  )
}

