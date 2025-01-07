import '../styles/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

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
    </body>
  </html>
)
}

