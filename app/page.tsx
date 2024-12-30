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
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      let newCurrentSection = 'hero';

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionRect = section.getBoundingClientRect();
          if (scrollPosition >= sectionRect.top + window.scrollY + sectionRect.height / 2) {
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

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections, snapToNearestSection]);

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
    </main>
  )
}

