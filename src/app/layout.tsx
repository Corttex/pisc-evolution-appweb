import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piscinas Evolution — Engenharia e Conforto Térmico de Elite",
  description: "Projetos, instalação e manutenção completa para piscinas, spa e sistemas térmicos em Brasília e Entorno. Engenharia aquática de alto padrão.",
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
      </body>
    </html>
  );
}

