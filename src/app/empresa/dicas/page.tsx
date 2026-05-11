"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookOpen, Clock, ArrowRight, Tag, Share2, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DicasPage() {
  const posts = [
    {
      title: "Como manter sua piscina aquecida no inverno de Brasília",
      category: "Aquecimento",
      date: "20 Abr, 2024",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop",
      excerpt: "Dicas fundamentais para otimizar seu trocador de calor e reduzir o consumo de energia nos meses mais frios."
    },
    {
      title: "Tratamento a Sal vs Cloro: Qual a melhor opção?",
      category: "Tratamento",
      date: "15 Abr, 2024",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
      excerpt: "Entenda as diferenças químicas, os custos de manutenção e os benefícios para a saúde de cada sistema."
    },
    {
      title: "Automação: Controle sua piscina pelo smartphone",
      category: "Tecnologia",
      date: "10 Abr, 2024",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=2070&auto=format&fit=crop",
      excerpt: "Saiba como a domótica pode facilitar a rotina de manutenção e criar cenários de iluminação incríveis."
    },
    {
      title: "5 erros comuns que destroem sua bomba",
      category: "Manutenção",
      date: "05 Abr, 2024",
      readTime: "4 min",
      image: "/pool_care_tips_v3_1777287728028.png",
      excerpt: "Muitos proprietários cometem falhas simples que reduzem a vida útil dos equipamentos. Veja como evitar."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar config={{}} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Dicas Evolution
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-8 leading-tight">
              Conhecimento para <br />
              <span className="text-secondary italic">sua Piscina de Elite</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-body">
              Aprenda com nossos engenheiros e especialistas como manter sua piscina 
              sempre impecável com tecnologia e eficiência.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-[60px] overflow-hidden shadow-xl border border-slate-100 flex flex-col lg:flex-row"
          >
            <div className="lg:w-1/2 h-[400px] lg:h-auto overflow-hidden">
              <img 
                src={posts[0].image} 
                alt="Post Destaque" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest rounded-full border border-secondary/20">
                  {posts[0].category}
                </span>
                <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                  <Clock size={14} /> {posts[0].readTime} de leitura
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight group-hover:text-secondary transition-colors">
                {posts[0].title}
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8 text-lg">
                {posts[0].excerpt}
              </p>
              <Link 
                href="/empresa/dicas"
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
              >
                Ler artigo completo <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.slice(1).map((post, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{post.date}</span>
                    <button className="text-slate-300 hover:text-secondary transition-colors"><Bookmark size={18} /></button>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <Link 
                      href="/empresa/dicas"
                      className="text-primary font-bold text-sm hover:text-secondary transition-colors flex items-center gap-2"
                    >
                      Ler mais <ArrowRight size={16} />
                    </Link>
                    <button className="text-slate-300 hover:text-primary transition-colors"><Share2 size={18} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <button className="px-8 py-4 bg-white border border-slate-200 text-primary font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
              Carregar mais artigos
            </button>
          </div>
        </div>
      </section>

      <Footer config={{}} />
    </main>
  );
}
