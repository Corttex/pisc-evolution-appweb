"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, ShieldCheck, Ruler, Sparkles } from "lucide-react";

const steps = [
  {
    title: "Diagnóstico Técnico",
    description: "Análise profunda da estrutura e equipamentos atuais para identificar gargalos e oportunidades de melhoria.",
    icon: ClipboardCheck,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Projeto Personalizado",
    description: "Desenvolvimento de uma solução exclusiva focada em eficiência energética e estética refinada.",
    icon: Ruler,
    color: "bg-amber-50 text-amber-600"
  },
  {
    title: "Execução de Elite",
    description: "Nossa equipe de engenharia assume a obra com cronogramas rígidos e limpeza absoluta.",
    icon: Sparkles,
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "Entrega & Garantia",
    description: "Treinamento completo para uso dos sistemas e suporte técnico permanente com garantia Evolution.",
    icon: ShieldCheck,
    color: "bg-purple-50 text-purple-600"
  }
];

export const Process = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="text-center mb-20">
          <span className="font-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">Metodologia Evolution</span>
          <h2 className="text-4xl md:text-5xl text-primary font-bold tracking-tight">Como Transformamos seu Lazer</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 relative z-10 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">{step.title}</h3>
              <p className="text-on-surface-variant font-body text-sm leading-relaxed">
                {step.description}
              </p>
              
              {/* Step Number Badge */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-lg">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
