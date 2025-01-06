import React from 'react';
import Link from 'next/link';

export default function Contato() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Contato</h1>
          <div className="space-y-6 text-gray-600">
            <p className="text-base leading-relaxed">
              Estamos aqui para ajudar! Se você tiver alguma dúvida, sugestão ou precisar de suporte, não hesite em entrar em contato conosco.
            </p>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Informações de Contato</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="font-medium mr-2">E-mail:</span>
                  <span>sistemasmartmail@gmail.com</span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium mr-2">Telefone:</span>
                  <span>(11) 96449-5331</span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium mr-2">Endereço:</span>
                  <span>R. Jose Maciel Neto, 215 - Taboão da Serra, SP</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Horário de Atendimento</h2>
              <ul className="space-y-2">
                <li>Segunda a Sexta: 9h às 18h</li>
                <li>Sábado: 9h às 13h</li>
              </ul>
            </div>
            
            {/* <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Formulário de Contato</h2>
              <p className="text-base leading-relaxed">
                Em breve, disponibilizaremos um formulário de contato nesta página para facilitar sua comunicação conosco.
              </p>
            </div> */}
            
            {/* <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Redes Sociais</h2>
              <p className="text-base leading-relaxed">
                Siga-nos em nossas redes sociais para ficar por dentro das novidades e atualizações do Sistema Smart Mail.
              </p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link href="/#final" className="text-blue-600 hover:text-blue-800 hover:underline">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}

