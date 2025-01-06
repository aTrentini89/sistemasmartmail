import React from 'react';
import Link from 'next/link';

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Política de Privacidade</h1>
          <div className="space-y-6 text-gray-600">
            <p className="text-base leading-relaxed">
              A sua privacidade é importante para nós. É política do Sistema Smart Mail respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar.
            </p>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">1. Informações que coletamos</h2>
              <p className="text-base leading-relaxed">
                Coletamos informações pessoais que você nos fornece diretamente, como nome, endereço de e-mail e informações de contato.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">2. Como usamos suas informações</h2>
              <p className="text-base leading-relaxed">
                Usamos as informações que coletamos de várias maneiras, incluindo para:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Fornecer, operar e manter nossos serviços</li>
                <li>Melhorar, personalizar e expandir nossos serviços</li>
                <li>Entender e analisar como você usa nossos serviços</li>
                <li>Comunicar-se com você, diretamente ou através de um de nossos parceiros</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">3. Segurança dos dados</h2>
              <p className="text-base leading-relaxed">
                A segurança de seus dados é importante para nós, mas lembre-se que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">4. Alterações nesta política de privacidade</h2>
              <p className="text-base leading-relaxed">
                Reservamo-nos o direito de atualizar nossa política de privacidade de tempos em tempos. Recomendamos que você revise esta página periodicamente para quaisquer alterações.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">5. Contato</h2>
              <p className="text-base leading-relaxed">
                Se você tiver alguma dúvida sobre esta Política de Privacidade, por favor{' '}
                <Link href="/contato" className="text-blue-600 hover:text-blue-800 hover:underline">
                  entre em contato conosco
                </Link>
                .
              </p>
            </div>
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

