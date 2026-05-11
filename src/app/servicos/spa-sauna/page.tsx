"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Wind, Waves, Coffee, Heart, Star, ShieldCheck, ChevronRight, CheckCircle2, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SpaSaunaPage() {
  const categories = [
    {
      title: "Spas de Luxo",
      description: "Sistemas de hidromassagem personalizados com jatos terapêuticos e cromoterapia integrada.",
      icon: Waves,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Saunas a Vapor",
      description: "Geradores de vapor de alta performance com controle digital de temperatura e essências.",
      icon: Droplets,
      color: "bg-cyan-50 text-cyan-600"
    },
    {
      title: "Saunas Secas",
      description: "Revestimentos em madeira nobre e fornos potentes para o máximo relaxamento detox.",
      icon: Wind,
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar config={{}} />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/luxury_spa_sauna_home_1777287558066.png" 
            alt="Spa e Sauna" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-orange-900/30 backdrop-blur-[1px]" />
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-orange-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Bem-Estar & Saúde
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Spa & <br />
              <span className="text-orange-400">Sauna de Luxo</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8 font-body">
              Transforme sua residência em um refúgio de relaxamento com nossos 
              projetos exclusivos de spa e sauna sob medida.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/agendamento"
                className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-orange-600/30"
              >
                Solicitar Projeto Wellness
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="container mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-primary mb-6">A Experiência Evolution Wellness</h2>
            <p className="text-slate-500 leading-relaxed">
              Desenvolvemos ambientes que unem design sofisticado e benefícios terapêuticos comprovados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((c, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group"
              >
                <div className={`w-16 h-16 ${c.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <c.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{c.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8">{c.description}</p>
                <ul className="space-y-3">
                  {["Material Premium", "Controle Automático", "Design Exclusivo"].map((t, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-tighter">
                      <Star size={14} className="text-orange-400" />
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="bg-slate-900 rounded-[60px] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/10 blur-[120px] -z-0" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Saúde e relaxamento no <span className="text-orange-400">conforto da sua casa</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { t: "Desintoxicação Natural", d: "A sauna auxilia na eliminação de toxinas e melhora a saúde da pele." },
                    { t: "Alívio Muscular", d: "A hidromassagem do spa reduz tensões e acelera a recuperação pós-treino." },
                    { t: "Melhora do Sono", d: "Sessões regulares de relaxamento combatem a insônia e reduzem o estresse." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 bg-orange-600/20 text-orange-400 rounded-xl flex items-center justify-center">
                        <Heart size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1">{item.t}</h4>
                        <p className="text-white/60 text-sm leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" 
                  alt="Spa Detail" 
                  className="rounded-3xl h-64 w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2070&auto=format&fit=crop" 
                  alt="Sauna Detail" 
                  className="rounded-3xl h-64 w-full object-cover mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer config={{}} />
    </main>
  );
}
