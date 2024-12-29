'use client'

import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

export default function Footer() {
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
              <li><a href="#" className="hover:text-blue-300 allow-select">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-blue-300 allow-select">Privacidade</a></li>
              <li><a href="#" className="hover:text-blue-300 allow-select">Contato</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="text-white hover:text-blue-300"><FaFacebook size={24} /></a>
              <a href="#" className="text-white hover:text-blue-300"><FaTwitter size={24} /></a>
              <a href="#" className="text-white hover:text-blue-300"><FaLinkedin size={24} /></a>
              <a href="#" className="text-white hover:text-blue-300"><FaInstagram size={24} /></a>
            </div>
            <p className="mt-4 allow-select">&copy; 2023 Sistema Smart Mail. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

