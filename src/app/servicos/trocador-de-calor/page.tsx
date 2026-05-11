"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Snowflake, Thermometer, Wind, Zap, Gauge, ShieldCheck, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TrocadorCalorPage() {
  const features = [
    {
      title: "Independência Climática",
      description: "Aqueça sua piscina mesmo em dias nublados ou durante a noite com eficiência máxima.",
      icon: Wind
    },
    {
      title: "Tecnologia Inverter",
      description: "Consumo inteligente de energia que se ajusta à necessidade de aquecimento real.",
      icon: Zap
    },
    {
      title: "Controle por Aplicativo",
      description: "Gerencie a temperatura da sua piscina de qualquer lugar através do seu smartphone.",
      icon: Gauge
    },
    {
      title: "Silencioso e Discreto",
      description: "Equipamentos de última geração com baixo nível de ruído e design compacto.",
      icon: Snowflake
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar config={{}} />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/pool_heat_pump_modern_1777287519811.png" 
            alt="Trocador de Calor" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 backdrop-blur-[1px]" />
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Performance Térmica
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Trocador de <br />
              <span className="text-blue-400">Calor Profissional</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8 font-body">
              A potência necessária para manter sua piscina aquecida em qualquer 
              condição climática com a tecnologia mais avançada do mercado.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/agendamento"
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-blue-600/30"
              >
                Orçamento de Instalação
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24">
        <div className="container mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-primary mb-6">Por que um Trocador de Calor?</h2>
            <p className="text-slate-500 leading-relaxed">
              Ideal para quem busca rapidez no aquecimento e controle total da temperatura, 
              independente da incidência solar.
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
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold leading-tight">
                A tecnologia <span className="text-blue-400">Heat-Pump Inverter</span> de alta performance
              </h2>
              <p className="text-white/70 leading-relaxed text-lg">
                Diferente dos sistemas convencionais, nossos trocadores de calor utilizam o princípio 
                da termodinâmica para retirar o calor do ar e transferi-lo para a água, gerando 
                até 5x mais energia do que consomem.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  "COP de alta eficiência",
                  "Gás refrigerante ecológico R32",
                  "Condensador em Titânio",
                  "Degelo automático",
                  "Baixo nível de vibração",
                  "Proteção contra surtos"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="text-blue-400 shrink-0" size={18} />
                    <span className="text-sm font-medium text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[100px] -z-10" />
               <img 
                 src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" 
                 alt="Spa e Piscina Aquecida" 
                 className="rounded-[40px] shadow-2xl border border-white/10"
               />
            </div>
          </div>
        </div>
      </section>

      <Footer config={{}} />
    </main>
  );
}
