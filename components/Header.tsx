'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const HEADER_HEIGHT = 64; // in pixels

interface HeaderProps {
  currentSection: string;
  heroOpacity: number;
  onNavClick: (sectionId: string) => void;
}

export default function Header({ currentSection, heroOpacity, onNavClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 0) {
        setHasScrolled(true);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hasScrolled]);

  const getLinkStyle = (sectionId: string, isMobile: boolean) => {
    const baseStyle = "flex items-center transition-all duration-300 whitespace-nowrap";
    const mobileStyle = isMobile ? "px-4 py-2 text-sm" : "px-4 h-full";
    const activeStyle = isMobile 
      ? "bg-blue-100 text-blue-600 font-semibold" 
      : "bg-blue-600 text-white font-semibold";
    const inactiveStyle = isMobile 
      ? "text-gray-800 hover:bg-blue-50" 
      : "text-gray-600 hover:text-blue-600 hover:bg-blue-100";

    const isActive = currentSection === sectionId;
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
    hidden: { 
      opacity: 0,
      y: -8,
      scaleY: 0,
      transformOrigin: 'top',
    },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm w-full">
      <nav className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          <div 
            className="text-sm md:text-xl font-semibold text-gray-800 px-2 md:px-6 cursor-pointer transition-opacity duration-300"
            style={{ opacity: heroOpacity }}
            onClick={() => onNavClick('hero')}
          >
            Sistema Smart Mail
          </div>
          <div className="md:hidden flex items-center justify-end px-2">
            <span className="text-xs font-medium text-gray-700 mr-2">
              {menuItems.find(item => item.id === currentSection)?.label || ''}
            </span>
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="absolute right-0 bg-white bg-opacity-75"
                    style={{ 
                      width: 'max-content', 
                      minWidth: '160px',
                      boxShadow: 'none'
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                  >
                    <div className="py-1">
                      {menuItems.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={getLinkStyle(item.id, true)}
                          onClick={(e) => { 
                            e.preventDefault(); 
                            onNavClick(item.id); 
                            setIsOpen(false); 
                          }}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
    </header>
  )
}

