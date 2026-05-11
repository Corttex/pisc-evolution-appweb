"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Maximize2, ExternalLink, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjetosPage() {
  const projects = [
    {
      title: "Residência Lago Sul I",
      location: "Lago Sul, Brasília",
      description: "Projeto de automação total, aquecimento solar e iluminação cênica integrada.",
      image: "/portfolio_pool_infinity_edge_1777287658185.png",
      tags: ["Automação", "Solar", "Iluminação"]
    },
    {
      title: "Mansão Park Way",
      location: "Park Way, Brasília",
      description: "Instalação de trocador de calor de alta performance e tratamento a sal.",
      image: "/portfolio_pool_modern_courtyard_1777287675063.png",
      tags: ["Trocador de Calor", "Sal", "Sauna"]
    },
    {
      title: "Condomínio Solar de Brasília",
      location: "Jardim Botânico, Brasília",
      description: "Retrofit completo de casa de máquinas e sistema de filtragem ultra-eficiente.",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop",
      tags: ["Retrofit", "Filtragem", "Engenharia"]
    },
    {
      title: "Piscina Suspensa Sudoeste",
      location: "Sudoeste, Brasília",
      description: "Desafio de engenharia para piscina em cobertura com aquecimento inteligente.",
      image: "https://images.unsplash.com/photo-1565031491910-e57fac031c41?q=80&w=2070&auto=format&fit=crop",
      tags: ["Cobertura", "Aquecimento", "Vidro"]
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar config={{}} />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Portfólio de Elite
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-8 leading-tight">
              Projetos que Redefinem <br />
              <span className="text-secondary italic">o Lazer de Luxo</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-body">
              Explore uma seleção de nossos trabalhos mais recentes em Brasília, 
              onde tecnologia e design se encontram.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-[400px] overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-8 right-8 flex gap-2">
                    {p.tags.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-10">
                  <div className="flex items-center gap-2 text-secondary mb-4">
                    <MapPin size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">{p.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{p.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8">{p.description}</p>
                  <Link 
                    href="/contato"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
                  >
                    Ver detalhes do projeto <ChevronRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <div className="inline-block p-1 bg-slate-200 rounded-full mb-8">
              <p className="px-6 py-2 text-sm font-bold text-slate-500 italic">
                Temos mais de 1.200 projetos entregues. Deseja ver um específico para sua necessidade?
              </p>
            </div>
            <br />
            <Link 
              href="/contato"
              className="inline-block bg-primary text-white px-12 py-5 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
              Falar com um Consultor Técnico
            </Link>
          </div>
        </div>
      </section>

      <Footer config={{}} />
    </main>
  );
}
