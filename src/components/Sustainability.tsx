"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf, Sun, Zap } from "lucide-react";

const LOCAL_SUST_ICONS: Record<string, any> = {
  Sun,
  Leaf,
  Zap
};

export const Sustainability = ({ content }: { content?: any }) => {
  const subtitle = content?.subtitle || "Sustentabilidade Evolution";
  const title = content?.title || "Lazer que cuida do planeta e do seu bolso.";
  const image = content?.image || "/pool_solar_sustainability_1777481012223.png";
  const quote = content?.quote || "\"Nossa missão é integrar tecnologia de ponta com responsabilidade ambiental, criando espaços de lazer infinitos.\"";
  
  const defaultItems = [
    {
      title: "Energia Limpa e Gratuita",
      description: "Aproveite o sol de Brasília para aquecer sua piscina o ano todo sem aumentar sua conta de luz.",
      icon: Sun
    },
    {
      title: "Respeito ao Ecossistema",
      description: "Sistemas de filtragem inteligentes que reduzem o desperdício de água e o uso excessivo de químicos.",
      icon: Leaf
    },
    {
      title: "Máxima Eficiência",
      description: "Trocadores de calor com tecnologia inverter que consomem até 70% menos energia que sistemas convencionais.",
      icon: Zap
    }
  ];

  const itemsList = content?.items || defaultItems;

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary font-bold uppercase tracking-widest text-xs mb-4 block">{subtitle}</span>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{title}</h2>
            
            <div className="space-y-8">
              {itemsList.map((item: any, index: number) => {
                const IconComponent = typeof item.icon === "string"
                  ? (LOCAL_SUST_ICONS[item.icon] || Sun)
                  : (item.icon || Sun);

                return (
                  <div key={index} className="flex gap-6">
                    <div className="bg-secondary/20 p-4 rounded-2xl h-fit">
                      <IconComponent className="text-secondary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10"
          >
            <Image 
              src={image} 
              alt="Piscina Sustentável" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <p className="text-sm italic text-white/90">{quote}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

