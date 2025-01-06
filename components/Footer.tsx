'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

interface SocialIcon {
  name: string;
  icon: React.ElementType;
}

const socialIcons: SocialIcon[] = [
  { name: 'facebook', icon: FaFacebook },
  { name: 'twitter', icon: FaTwitter },
  { name: 'linkedin', icon: FaLinkedin },
  { name: 'instagram', icon: FaInstagram },
];

export default function Footer() {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSocialClick = useCallback((iconName: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActiveIcon(iconName);
    timerRef.current = setTimeout(() => {
      setActiveIcon(null);
      timerRef.current = null;
    }, 2500);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Sistema Smart Mail</h3>
            <p className="text-sm">Solução para Gestão de Correspondências</p>
          </div>
          <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <ul className="inline-flex space-x-4">
              <li><Link href="/termos-de-uso" className="hover:text-blue-300 transition-colors duration-300">Termos de Uso</Link></li>
              <li><Link href="/privacidade" className="hover:text-blue-300 transition-colors duration-300">Privacidade</Link></li>
              <li><Link href="/contato" className="hover:text-blue-300 transition-colors duration-300">Contato</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-4">
              {socialIcons.map((social) => (
                <div key={social.name} className="relative">
                  {activeIcon === social.name && (
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs mb-2 whitespace-nowrap transition-all duration-300 ease-in-out">
                      Em breve
                    </span>
                  )}
                  <button
                    aria-label={`${social.name} (em breve)`}
                    className={`transition-all duration-300 ease-in-out transform ${
                      activeIcon === social.name
                        ? 'text-blue-500 !scale-120'
                        : 'text-white hover:text-blue-300 hover:scale-110'
                    }`}
                    style={{
                      transform: activeIcon === social.name ? 'scale(1.2)' : 'scale(1)',
                    }}
                    onClick={() => handleSocialClick(social.name)}
                  >
                    <social.icon size={24} />
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-4">&copy; {new Date().getFullYear()} Sistema Smart Mail. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

