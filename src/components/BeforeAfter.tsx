"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const transformations = [
  {
    before: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop",
    title: "Reforma Completa Casa de Máquinas",
    location: "Lago Sul, DF"
  }
];

export const BeforeAfter = () => {
  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl text-left">
            <span className="font-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">Transformação Real</span>
            <h2 className="text-4xl md:text-5xl text-primary font-bold">Engenharia que valoriza seu imóvel</h2>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-bold text-sm uppercase tracking-widest">
            <span className="w-12 h-0.5 bg-secondary"></span> Galeria de Projetos
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Antes */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl border border-slate-100"
          >
            <Image 
              src="/messy_pool_pump_room_old_1777262313099.png" 
              alt="Antes da Reforma"
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest">ANTES</div>
          </motion.div>

          {/* Depois */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl border border-slate-100"
          >
            <Image 
              src="/pool_pump_machine_room_modern_1777262079827.png" 
              alt="Depois da Reforma"
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-secondary text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest">DEPOIS (PADRÃO EVOLUTION)</div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 flex justify-center">
          <div className="bg-background px-8 py-6 rounded-3xl shadow-xl flex flex-wrap gap-8 items-center border border-slate-100 justify-center">
            <div className="flex flex-col items-center">
              <span className="text-primary font-bold text-2xl">150+</span>
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Projetos Entregues</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-slate-200"></div>
            <div className="hidden md:block w-px h-10 bg-slate-200"></div>
            <div className="flex flex-col items-center">
              <span className="text-primary font-bold text-2xl">Suporte</span>
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Pós-Obra</span>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-200"></div>
            <div className="flex flex-col items-center">
              <span className="text-primary font-bold text-2xl">12 Anos</span>
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">De Experiência</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
