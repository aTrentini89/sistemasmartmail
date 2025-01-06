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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-100`}>
        <div id="root">{children}</div>
        <div id="final"></div>
        <Script id="scroll-to-bottom">
          {`
            if (window.location.hash === '#final') {
              window.scrollTo(0, document.body.scrollHeight);
            }
          `}
        </Script>
      </body>
    </html>
  )
}

