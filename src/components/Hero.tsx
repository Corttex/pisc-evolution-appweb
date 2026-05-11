"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Image as ImageIcon } from "lucide-react";

export const Hero = ({ config }: { config: any }) => {
  const headline = "Engenharia e Conforto Térmico de Elite";
  const subheadline = "Projetos exclusivos de aquecimento, construção e automação para piscinas de alto padrão em Brasília.";
  const whatsapp = config?.site_whatsapp || "5561999999999";

  return (
    <section className="relative h-[95vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/res_pool_1.png"
          alt="Piscina Residencial Evolution"

          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-white"
        >
          <span className="text-cta font-bold uppercase tracking-[0.3em] text-sm mb-6 block drop-shadow-lg">
            Brasília & Entorno
          </span>
          
          <h1 className="font-h1 text-6xl md:text-8xl mb-8 text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
            {headline}
          </h1>
          <p className="font-body text-lg md:text-xl mb-12 text-white/80 leading-relaxed max-w-2xl font-light">
            {subheadline}
          </p>
          
          <div className="flex flex-wrap gap-5">
            <a 
              href="/agendamento"
              className="bg-cta text-white flex items-center gap-3 px-10 py-5 rounded-2xl font-body font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-cta/40 group"
            >
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Agendar Visita Técnica
            </a>
            <button 
              onClick={() => {
                const el = document.getElementById('servicos');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glass-premium text-white flex items-center gap-3 px-10 py-5 rounded-2xl font-body font-bold text-lg hover:bg-white/10 transition-all border border-white/20"
            >
              <ImageIcon className="w-6 h-6" />
              Nossas Soluções
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
         <div className="w-px h-12 bg-white"></div>
         <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white">Scroll</span>
      </div>
    </section>
  );
};
