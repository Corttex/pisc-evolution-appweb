import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getConfig } from "../actions/config";

export default async function PrivacidadePage() {
  const config = await getConfig();

  return (
    <main className="min-h-screen bg-white">
      <Navbar config={config} />
      
      <div className="pt-32 pb-24 px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-12">Política de Privacidade</h1>
        
        <div className="prose prose-slate max-w-none space-y-8 text-on-surface-variant font-body">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Introdução</h2>
            <p>
              A Piscinas Evolution está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações pessoais ao utilizar nosso site e serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Coleta de Dados</h2>
            <p>
              Coletamos informações que você nos fornece diretamente, como nome, CPF, telefone e endereço, especialmente ao solicitar orçamentos, agendar manutenções ou utilizar o portal do cliente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Uso das Informações</h2>
            <p>
              As informações coletadas são utilizadas para:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prestação de serviços de engenharia e manutenção;</li>
              <li>Processamento de agendamentos e pagamentos;</li>
              <li>Comunicação sobre atualizações de serviços;</li>
              <li>Melhoria da experiência do usuário em nosso portal.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. Segurança</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou alteração. O acesso ao portal do cliente é protegido por autenticação via CPF e senha.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. Seus Direitos</h2>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de acessar, corrigir ou solicitar a exclusão de seus dados pessoais a qualquer momento através de nossos canais de atendimento.
            </p>
          </section>
        </div>
      </div>

      <Footer config={config} />
    </main>
  );
}
