import '../styles/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sistema Smart Mail - Gestão de Correspondências',
  description: 'Solução completa para gestão de correspondências em condomínios',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.className} bg-gray-100 overflow-x-hidden w-full`}>
        <div id="root" className="relative w-full overflow-x-hidden">
          {children}
        </div>
        <div id="final"></div>
        <Script id="scroll-to-bottom" strategy="afterInteractive">
          {`
            function scrollToBottom() {
              const finalElement = document.getElementById('final');
              if (finalElement) {
                setTimeout(() => {
                  window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                  });
                }, 100);
              }
            }

            if (window.location.hash === '#final') {
              // Tenta rolar algumas vezes para garantir que funcione após o carregamento completo
              scrollToBottom();
              setTimeout(scrollToBottom, 500);
              setTimeout(scrollToBottom, 1000);
            }

            // Adiciona listener para mudanças no hash
            window.addEventListener('hashchange', function() {
              if (window.location.hash === '#final') {
                scrollToBottom();
              }
            });
          `}
        </Script>
      </body>
    </html>
  )
}

