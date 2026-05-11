"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Users, Award, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const differentials = [
  {
    title: "Atendimento Técnico",
    description: "Especialistas qualificados para diagnosticar e solucionar seu problema com precisão.",
    icon: CheckCircle2,
  },
  {
    title: "Projetos Personalizados",
    description: "Cada piscina é única. Criamos soluções que se adaptam ao seu espaço e estilo de vida.",
    icon: Award,
  },
  {
    title: "Equipamentos Certificados",
    description: "Trabalhamos apenas com as melhores marcas do mercado, garantindo durabilidade e eficiência.",
    icon: ShieldCheck,
  },
  {
    title: "Equipe Própria",
    description: "Não terceirizamos. Nossa equipe é treinada e segue rigorosos padrões de qualidade Evolution.",
    icon: Users,
  },
  {
    title: "Brasília e Entorno",
    description: "Logística ágil e atendimento dedicado para toda a capital federal e cidades satélites.",
    icon: MapPin,
  },
];

export const Differentials = () => {
  return (
    <section className="bg-primary py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary opacity-5 -skew-x-12 translate-x-1/2"></div>
      
      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-label-caps text-tertiary mb-2 block uppercase tracking-widest font-bold">Por que escolher a Evolution?</span>
            <h2 className="text-4xl md:text-5xl text-white font-bold mb-8">Compromisso com o Conforto Térmico</h2>
            <p className="text-white/70 font-body text-lg mb-12 leading-relaxed max-w-lg">
              Mais que uma empresa de piscinas, somos parceiros do seu lazer. Nossa engenharia é focada em economia de energia e máximo prazer térmico.
            </p>
            
            <button className="bg-tertiary text-primary px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-tertiary/10 hover:scale-105 transition-all">
              Fale com um Especialista
            </button>
          </div>
          
          <div className="grid gap-4">
            {differentials.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-start gap-6 group hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 bg-tertiary rounded-xl flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <diff.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{diff.title}</h3>
                  <p className="text-white/60 font-body text-sm leading-relaxed">{diff.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
