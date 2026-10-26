import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getConfig } from "../actions/config";
import Image from "next/image";
import { Waves, Ruler, ShieldCheck, Gem } from "lucide-react";

export default async function PiscinasPage() {
  const config = await getConfig();

  return (
    <main className="min-h-screen bg-background">
      <Navbar config={config} />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/luxury_pool_design_brasilia_1777262096773.png"
          alt="Construção de Piscinas de Luxo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center text-white px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Engenharia de Piscinas</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-body leading-relaxed">
            Projetos exclusivos que unem estética impecável e solidez estrutural. Transformamos sua área de lazer em um oásis de luxo.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-8 max-w-[1280px] mx-auto">
        <div className="text-center mb-20">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Excelência em cada detalhe</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary">Nossa Abordagem na Construção</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-white p-10 rounded-[2rem] pool-shadow border border-black/5 hover:-translate-y-3 transition-all duration-500">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 text-secondary">
              <Ruler className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Projetos Customizados</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Cada terreno e cada cliente são únicos. Desenvolvemos projetos arquitetônicos e estruturais que otimizam seu espaço e refletem seu estilo de vida.
            </p>
          </div>

          <div className="bg-primary text-white p-10 rounded-[2rem] shadow-2xl hover:-translate-y-3 transition-all duration-500">
            <div className="w-16 h-16 bg-tertiary/20 rounded-2xl flex items-center justify-center mb-8 text-tertiary">
              <Gem className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Acabamentos Premium</h3>
            <p className="text-white/80 leading-relaxed">
              Trabalhamos com os melhores revestimentos do mercado: pedras naturais, pastilhas de vidro e bordas atérmicas que elevam o padrão visual e o conforto.
            </p>
          </div>

          <div className="bg-white p-10 rounded-[2rem] pool-shadow border border-black/5 hover:-translate-y-3 transition-all duration-500">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 text-secondary">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Garantia Estrutural</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Nossa engenharia foca na durabilidade. Utilizamos técnicas avançadas de impermeabilização e reforço estrutural para garantir zero problemas futuros.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Construction Section */}
      <section className="bg-surface py-24 px-8 overflow-hidden">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
            <div className="relative rounded-[3rem] overflow-hidden pool-shadow rotate-2 hover:rotate-0 transition-all duration-700 aspect-video">
              <Image 
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop" 
                alt="Obra de Piscina Evolution" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-primary mb-8 leading-tight">Da Escavação ao Primeiro Mergulho: Entrega Turn-key</h2>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
              Gerenciamos todas as etapas da obra para que você não precise se preocupar com nada. Nossas equipes são especializadas e treinadas para seguir o padrão de qualidade Evolution, garantindo prazos e resultados impecáveis.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-secondary text-2xl mb-1">150+</h4>
                <p className="text-sm text-on-surface-variant font-medium uppercase tracking-wider">Piscinas Entregues</p>
              </div>
              <div>
                <h4 className="font-bold text-secondary text-2xl mb-1">0</h4>
                <p className="text-sm text-on-surface-variant font-medium uppercase tracking-wider">Problemas Estruturais</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <Waves className="w-16 h-16 text-secondary mx-auto mb-8 animate-bounce" />
          <h2 className="text-5xl font-bold text-primary mb-6 tracking-tight">Comece a Planejar seu Oásis Hoje</h2>
          <p className="text-on-surface-variant text-xl mb-12 font-body">
            Agende uma visita técnica sem compromisso para analisarmos seu terreno e necessidades.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a href="/agendamento" className="bg-primary text-white px-12 py-5 rounded-3xl font-bold hover:scale-105 transition-all shadow-2xl shadow-primary/30 text-lg">
              Fazer Agendamento
            </a>
            <a href={`https://wa.me/${config?.site_whatsapp.replace(/\D/g, '')}`} className="bg-white border-2 border-primary text-primary px-12 py-5 rounded-3xl font-bold hover:bg-primary hover:text-white transition-all text-lg">
              Consultoria via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer config={config} />
    </main>
  );
}
