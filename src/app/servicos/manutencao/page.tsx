"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Calendar, Droplets, Settings, ClipboardCheck, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ManutencaoPreventivaPage() {
  const steps = [
    {
      title: "Análise Química",
      description: "Medição precisa de pH, cloro e alcalinidade para garantir água cristalina e saudável.",
      icon: Droplets
    },
    {
      title: "Limpeza Física",
      description: "Aspiração total, escovação de bordas e limpeza de filtros e pré-filtros.",
      icon: Sparkles
    },
    {
      title: "Vistoria Técnica",
      description: "Checagem preventiva de bombas, motores e sistemas de automação.",
      icon: Settings
    },
    {
      title: "Relatório de Visita",
      description: "Você recebe um checklist digital com tudo o que foi realizado na sua piscina.",
      icon: ClipboardCheck
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar config={{}} />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/pool_maintenance_preventive_elite_1777287592940.png" 
            alt="Manutenção de Elite" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-900/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Manutenção de Elite
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Cuidado <br />
              <span className="text-emerald-400">Preventivo Total</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8 font-body">
              Proteja seu patrimônio e garanta a saúde da sua família com o 
              programa de manutenção mais rigoroso de Brasília.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/agendamento"
                className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-emerald-600/30"
              >
                Contratar Manutenção
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Grid */}
      <section className="py-24">
        <div className="container mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-primary mb-6">Nosso Padrão de Qualidade</h2>
            <p className="text-slate-500 leading-relaxed">
              Não fazemos apenas limpeza. Realizamos uma engenharia de manutenção completa 
              para que sua única preocupação seja aproveitar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <s.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Details */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto bg-slate-50 rounded-[60px] overflow-hidden border border-slate-100 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-20 bg-emerald-600 text-white">
                <ShieldCheck size={60} className="mb-8 text-emerald-200" />
                <h2 className="text-4xl font-bold mb-6">Por que ser um Cliente Evolution?</h2>
                <ul className="space-y-6">
                  {[
                    "Visitas técnicas pontuais e uniformizadas",
                    "Uso de produtos de alta performance inclusos",
                    "Atendimento prioritário para emergências",
                    "Portal do cliente com histórico de medições",
                    "Descontos exclusivos em equipamentos"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-emerald-50 font-medium">
                      <CheckCircle2 size={20} className="text-emerald-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-12 md:p-20 flex flex-col justify-center items-start">
                <Calendar className="text-emerald-600 mb-6" size={40} />
                <h3 className="text-3xl font-bold text-primary mb-4">Planos Flexíveis</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Oferecemos planos semanais, quinzenais ou mensais, 
                  ajustados à intensidade de uso e tamanho da sua piscina.
                </p>
                <Link 
                  href="/agendamento"
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-center hover:bg-emerald-700 transition-colors shadow-xl shadow-primary/20"
                >
                  Agendar Primeira Visita
                </Link>
                <p className="w-full text-center text-xs text-slate-400 mt-4 font-bold uppercase tracking-widest">
                  Avaliação técnica gratuita para novos contratos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer config={{}} />
    </main>
  );
}
