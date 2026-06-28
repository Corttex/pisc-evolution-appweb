import type { Metadata } from "next";
import "./globals.css";

import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: {
    template: '%s | Piscinas Evolution',
    default: 'Piscinas Evolution — Engenharia e Conforto Térmico de Elite',
  },
  description: 'Projetos, instalação e manutenção completa para piscinas, spa e sistemas térmicos em Brasília e Entorno. Engenharia aquática de alto padrão e sustentabilidade.',
  keywords: ['Piscinas', 'Aquecimento Solar', 'Casa de Máquinas', 'Manutenção de Piscinas', 'Brasília', 'Conforto Térmico', 'Sustentabilidade', 'Automação para Piscinas'],
  authors: [{ name: 'Piscinas Evolution' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://pisc-evolution-appweb.vercel.app/',
    siteName: 'Piscinas Evolution',
    title: 'Piscinas Evolution — Engenharia e Conforto Térmico',
    description: 'A mais alta tecnologia em aquecimento, manutenção e construção de piscinas e spas em Brasília.',
  },
  icons: {
    icon: "/Logo/FavIcon.svg",
    apple: "/Logo/FavIcon.svg",
  },
};

import { Toaster } from "react-hot-toast";
import { DarkModeToggle } from "@/components/DarkModeToggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text transition-colors duration-300">
        <Toaster position="top-right" reverseOrder={false} />
        {children}
        <DarkModeToggle />
        <GoogleAnalytics gaId="G-XYZ1234567" />
      </body>
    </html>
  );
}

