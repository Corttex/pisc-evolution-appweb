"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf, Sun, Zap } from "lucide-react";

export const Sustainability = () => {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary font-bold uppercase tracking-widest text-xs mb-4 block">Sustentabilidade Evolution</span>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Lazer que cuida do planeta e do seu bolso.</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="bg-secondary/20 p-4 rounded-2xl h-fit">
                  <Sun className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Energia Limpa e Gratuita</h4>
                  <p className="text-slate-400">Aproveite o sol de Brasília para aquecer sua piscina o ano todo sem aumentar sua conta de luz.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="bg-secondary/20 p-4 rounded-2xl h-fit">
                  <Leaf className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Respeito ao Ecossistema</h4>
                  <p className="text-slate-400">Sistemas de filtragem inteligentes que reduzem o desperdício de água e o uso excessivo de químicos.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-secondary/20 p-4 rounded-2xl h-fit">
                  <Zap className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Máxima Eficiência</h4>
                  <p className="text-slate-400">Trocadores de calor com tecnologia inverter que consomem até 70% menos energia que sistemas convencionais.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10"
          >
            <Image 
              src="/pool_solar_sustainability_1777481012223.png" 
              alt="Piscina Sustentável" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <p className="text-sm italic text-white/90">"Nossa missão é integrar tecnologia de ponta com responsabilidade ambiental, criando espaços de lazer infinitos."</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
