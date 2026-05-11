import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getConfig } from "../actions/config";

export default async function TermosPage() {
  const config = await getConfig();

  return (
    <main className="min-h-screen bg-white">
      <Navbar config={config} />
      
      <div className="pt-32 pb-24 px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-12">Termos de Uso</h1>
        
        <div className="prose prose-slate max-w-none space-y-8 text-on-surface-variant font-body">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar o site da Piscinas Evolution, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nosso site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Uso do Portal do Cliente</h2>
            <p>
              O portal 'Minha Piscina' é para uso exclusivo de clientes cadastrados. Você é responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorrem sob sua conta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Agendamentos e Cancelamentos</h2>
            <p>
              Os agendamentos realizados pelo site estão sujeitos à disponibilidade técnica. Cancelamentos devem ser realizados com pelo menos 24 horas de antecedência para evitar taxas administrativas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo deste site, incluindo textos, gráficos, logotipos e imagens, é de propriedade da Piscinas Evolution e está protegido pelas leis de direitos autorais brasileiras e internacionais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. Limitação de Responsabilidade</h2>
            <p>
              A Piscinas Evolution não será responsável por quaisquer danos diretos, indiretos, incidentais ou consequentes resultantes do uso ou da incapacidade de usar este site ou nossos serviços online.
            </p>
          </section>
        </div>
      </div>

      <Footer config={config} />
    </main>
  );
}
