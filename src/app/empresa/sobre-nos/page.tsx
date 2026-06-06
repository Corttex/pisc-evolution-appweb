"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Target, Users, Award, Briefcase, History, TrendingUp, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SobreNosPage() {
  const stats = [
    { label: "Anos de Experiência", value: "5+" },
    { label: "Projetos Entregues", value: "400+" },
    { label: "Clientes Ativos", value: "283+" },
    { label: "Técnicos Especializados", value: "8" }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar config={{}} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                Nossa História
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-primary leading-tight">
                Engenharia <br />
                <span className="text-secondary italic">de Excelência</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed font-body">
                Na Piscinas Evolution, não construímos apenas áreas de lazer. 
                Projetamos experiências memoráveis através de engenharia rigorosa e design inovador.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/empresa/projetos"
                  className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/30"
                >
                  Conheça Nossos Projetos
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
              <img 
                src="/piscinasevolution_team_hq.png" 
                alt="Equipe Evolution" 
                className="rounded-[60px] shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm"
              >
                <p className="text-4xl font-bold text-primary mb-2">{s.value}</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Missão",
                desc: "Proporcionar lazer e bem-estar com segurança e tecnologia, superando as expectativas dos nossos clientes através da excelência técnica.",
                icon: Target
              },
              {
                title: "Visão",
                desc: "Ser a referência absoluta em engenharia e manutenção de piscinas de alto padrão em Brasília e região até 2028.",
                icon: TrendingUp
              },
              {
                title: "Valores",
                desc: "Ética inegociável, inovação constante, compromisso com o meio ambiente e obsessão pela satisfação do cliente.",
                icon: Award
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-12 bg-white rounded-[50px] border border-slate-100 shadow-xl hover:-translate-y-4 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-6">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer config={{}} />
    </main>
  );
}
