import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Obrigado pelo seu contato!</h1>
        <p className="mb-4">Recebemos sua mensagem e entraremos em contato em breve.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}

