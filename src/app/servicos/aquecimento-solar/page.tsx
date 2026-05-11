"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Thermometer, Sun, Zap, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AquecimentoSolarPage() {
  const features = [
    {
      title: "Energia Limpa e Renovável",
      description: "Utilize a energia do sol para manter sua piscina aquecida sem custos adicionais de eletricidade.",
      icon: Sun
    },
    {
      title: "Economia de até 90%",
      description: "Redução drástica no custo de manutenção em comparação com aquecedores elétricos ou a gás.",
      icon: Zap
    },
    {
      title: "Conforto em Todas as Estações",
      description: "Prolongue o uso da sua piscina por muito mais meses no ano com temperatura ideal.",
      icon: Thermometer
    },
    {
      title: "Instalação Rápida e Segura",
      description: "Equipe técnica especializada que garante uma instalação limpa e eficiente.",
      icon: ShieldCheck
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar config={{}} />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/solar_heating_pool_system_1777287486569.png" 
            alt="Aquecimento Solar" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-secondary text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Serviços de Elite
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Aquecimento <br />
              <span className="text-secondary">Solar Inteligente</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8 font-body">
              A solução mais sustentável e econômica para aproveitar sua piscina 
              com o máximo conforto térmico o ano inteiro.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/agendamento"
                className="bg-secondary text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-secondary/30"
              >
                Solicitar Orçamento Grátis
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24">
        <div className="container mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-primary mb-6">Por que escolher o Aquecimento Solar?</h2>
            <p className="text-slate-500 leading-relaxed">
              Aliamos tecnologia de ponta com sustentabilidade para oferecer o melhor custo-benefício do mercado de Brasília.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Info */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1502343019212-cc6a097839ca?q=80&w=2070&auto=format&fit=crop" 
                alt="Instalação Técnica" 
                className="rounded-[40px] shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-3xl shadow-xl z-20 text-white max-w-[240px]">
                <p className="text-3xl font-bold mb-2">10 anos</p>
                <p className="text-sm text-white/70">De garantia média nos coletores solares instalados pela Evolution.</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-primary leading-tight">
                Eficiência máxima com as placas <span className="text-secondary">Evo-Solar Tech</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Nossos coletores solares são desenvolvidos com polímeros de alta resistência, 
                protegidos contra raios UV e projetados para absorver a máxima radiação mesmo em dias nublados.
              </p>
              <ul className="space-y-4">
                {[
                  "Material atóxico e resistente à corrosão",
                  "Baixa manutenção e alta durabilidade",
                  "Sistema automatizado de controle de temperatura",
                  "Compatível com todos os tipos de piscinas"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-secondary" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Link 
                  href="/contato"
                  className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
                >
                  Falar com um especialista agora <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer config={{}} />
    </main>
  );
}
