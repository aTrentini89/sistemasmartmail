import React from 'react';
import Link from 'next/link';

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Termos de Uso</h1>
          <div className="space-y-6 text-gray-600">
            <p className="text-base leading-relaxed">
              Bem-vindo aos Termos de Uso do Sistema Smart Mail. Ao utilizar nosso serviço, você concorda com estes termos. Por favor, leia-os cuidadosamente.
            </p>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">1. Uso do Serviço</h2>
              <p className="text-base leading-relaxed">
                O Sistema Smart Mail é uma solução para gestão de correspondências em condomínios. Você concorda em usar este serviço apenas para fins legais e de acordo com estes termos.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">2. Privacidade</h2>
              <p className="text-base leading-relaxed">
                Sua privacidade é importante para nós. Por favor, consulte nossa{' '}
                <Link href="/privacidade" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Política de Privacidade
                </Link>{' '}
                para entender como coletamos e usamos suas informações.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">3. Contas</h2>
              <p className="text-base leading-relaxed">
                Você é responsável por manter a confidencialidade de sua conta e senha. Notifique-nos imediatamente se houver uso não autorizado de sua conta.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">4. Modificações do Serviço</h2>
              <p className="text-base leading-relaxed">
                Reservamo-nos o direito de modificar ou descontinuar o serviço a qualquer momento, com aviso prévio de 3 meses.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">5. Limitação de Responsabilidade</h2>
              <p className="text-base leading-relaxed">
                O Sistema Smart Mail não será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">6. Contato</h2>
              <p className="text-base leading-relaxed">
                Se você tiver alguma dúvida sobre estes Termos, por favor{' '}
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

