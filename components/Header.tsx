'use client'

import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const HEADER_HEIGHT = 64; // in pixels

interface HeaderProps {
  currentSection: string;
  heroOpacity: number;
  onNavClick: (sectionId: string) => void;
}

export default function Header({ currentSection, heroOpacity, onNavClick }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 0) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const getLinkStyle = (sectionId: string, isMobile: boolean) => {
    const baseStyle = "flex items-center px-4 transition-all duration-300 whitespace-nowrap";
    const mobileStyle = isMobile ? "h-10 w-full text-sm" : "h-full";
    const activeStyle = isMobile 
      ? "bg-blue-600 text-white font-semibold" 
      : "bg-blue-600 text-white";
    const inactiveStyle = isMobile 
      ? "text-gray-800 hover:bg-blue-50" 
      : "text-gray-600 hover:text-blue-600 hover:bg-blue-100";

    const isActive = hasScrolled && currentSection === sectionId;
    return `${baseStyle} ${mobileStyle} ${isActive ? activeStyle : inactiveStyle}`;
  };

  const menuItems = [
    { id: 'problema', label: 'Desafios' },
    { id: 'solucao', label: 'Nossa Solução' },
    { id: 'beneficios', label: 'Benefícios' },
    { id: 'implementacao', label: 'Suporte' },
    { id: 'contato', label: 'Contato' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.035, 
        duration: 0.14, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 7 }, 
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.14, 
      }
    },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          <div 
            className="text-xl font-semibold text-gray-800 px-6 cursor-pointer transition-opacity duration-300 hidden md:block"
            style={{ opacity: heroOpacity }}
            onClick={() => onNavClick('hero')}
          >
            Sistema Smart Mail
          </div>
          <div className="md:hidden flex items-center justify-between w-full px-4">
            <div 
              className="text-sm font-semibold text-gray-800 cursor-pointer transition-opacity duration-300"
              style={{ opacity: heroOpacity }}
              onClick={() => onNavClick('hero')}
            >
              Sistema Smart Mail
            </div>
            <div className="flex items-center">
              {hasScrolled && (
                <span className="text-sm font-medium text-gray-700 mr-2">
                  {menuItems.find(item => item.id === currentSection)?.label || ''}
                </span>
              )}
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 ml-2">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          <div className="hidden md:flex h-full">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={getLinkStyle(item.id, false)}
                onClick={(e) => { 
                  e.preventDefault(); 
                  onNavClick(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full right-0 bg-white border border-gray-200 rounded-bl-lg shadow-md"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            <div className="py-2">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className={getLinkStyle(item.id, true)}
                  onClick={(e) => { 
                    e.preventDefault(); 
                    onNavClick(item.id); 
                    setIsOpen(false); 
                  }}
                  variants={itemVariants}
                  custom={index}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

