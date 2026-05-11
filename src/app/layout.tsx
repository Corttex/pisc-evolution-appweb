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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
