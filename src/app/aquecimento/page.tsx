import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getConfig } from "../actions/config";
import Image from "next/image";
import { Thermometer, Sun, Zap, CheckCircle2 } from "lucide-react";

export default async function AquecimentoPage() {
  const config = await getConfig();

  return (
    <main className="min-h-screen bg-background">
      <Navbar config={config} />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/pool_heating_solar_panels_1777262062510.png"
          alt="Aquecimento de Piscinas Evolution"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Aquecimento Inteligente</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-body leading-relaxed">
            Sua piscina na temperatura perfeita, 365 dias por ano. Engenharia de alta performance para o clima de Brasília.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-8 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Por que aquecer sua piscina?</span>
            <h2 className="text-4xl font-bold text-primary mb-8">Conforto Térmico sem Comprometer o seu Bolso</h2>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
              Trabalhamos com sistemas híbridos que combinam a economia do aquecimento solar com a confiabilidade dos trocadores de calor (bombas de calor). Essa integração garante que você aproveite sua piscina mesmo em dias nublados ou noites frias, mantendo a eficiência energética.
            </p>
            <ul className="space-y-4">
              {[
                "Redução de até 80% nos custos de energia com painéis solares",
                "Trocadores de calor ultra-silenciosos com tecnologia inverter",
                "Automação completa via smartphone",
                "Instalação técnica com garantia Evolution"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-primary font-medium">
                  <CheckCircle2 className="text-secondary w-6 h-6" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-8 rounded-3xl pool-shadow border border-black/5 flex flex-col items-center text-center">
              <Sun className="w-12 h-12 text-secondary mb-4" />
              <h3 className="font-bold text-primary mb-2">Solar High-Flow</h3>
              <p className="text-xs text-on-surface-variant">Painéis de alta absorção térmica.</p>
            </div>
            <div className="bg-primary text-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center translate-y-8">
              <Thermometer className="w-12 h-12 text-tertiary mb-4" />
              <h3 className="font-bold mb-2">Trocadores Inverter</h3>
              <p className="text-xs text-white/70">Temperatura constante com baixo consumo.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl pool-shadow border border-black/5 flex flex-col items-center text-center">
              <Zap className="w-12 h-12 text-secondary mb-4" />
              <h3 className="font-bold text-primary mb-2">Automação</h3>
              <p className="text-xs text-on-surface-variant">Controle a temperatura de qualquer lugar.</p>
            </div>
            <div className="bg-secondary text-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center translate-y-8">
              <CheckCircle2 className="w-12 h-12 text-white mb-4" />
              <h3 className="font-bold mb-2">Garantia Total</h3>
              <p className="text-xs text-white/70">Suporte técnico especializado Evolution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-24 px-8 text-center text-white">
        <h2 className="text-4xl font-bold mb-8">Pronto para ter sua piscina aquecida?</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="/agendamento" className="bg-secondary text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-black/20">
            Fazer Agendamento Técnico
          </a>
          <a href={`https://wa.me/${config?.site_whatsapp.replace(/\D/g, '')}`} className="bg-white text-primary px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-black/20">
            Falar no WhatsApp
          </a>
        </div>
      </section>

      <Footer config={config} />
    </main>
  );
}
