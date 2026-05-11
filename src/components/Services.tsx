"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sun, Thermometer, Waves, Settings, Wrench, ArrowRight, Droplets, Activity } from "lucide-react";
import Link from "next/link";



const services = [
  {
    title: "Aquecimento Inteligente",
    description: "Sistemas híbridos (Solar + Trocador) que garantem banho quente 365 dias por ano com máxima economia.",
    icon: Thermometer,
    image: "/res_pool_2.png",
    link: "/aquecimento"
  },
  {
    title: "Engenharia de Piscinas",
    description: "Construção e reforma de alto padrão com acabamentos exclusivos e soluções estruturais definitivas.",
    icon: Waves,
    image: "/res_pool_1.png",
    link: "/piscinas"
  },
  {
    title: "Manutenção de Elite",
    description: "Check-up técnico completo e tratamento químico especializado para manter sua água cristalina.",
    icon: Wrench,
    image: "/maintenance_tech.png",
    link: "/agendamento"
  },
  {
    title: "Iluminação LED Design",
    description: "Crie cenários incríveis e valorize sua piscina com sistemas de LED de alta performance e cores vibrantes.",
    icon: Sun,
    image: "/luxury_pool_design_brasilia_1777262096773.png",
    link: "/iluminacao"
  },
  {
    title: "Minha Piscina",
    description: "Dashboard exclusivo: acompanhe a saúde da água e o status dos seus equipamentos em tempo real.",
    icon: Activity,
    image: "/pool_dashboard_ui_mockup_1777262116743.png",
    link: "/minha-piscina"
  }
];



export const Services = () => {
  return (
    <section className="py-24 px-8 max-w-[1280px] mx-auto" id="servicos">
      <div className="text-center mb-16">
        <span className="font-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">Expertise Evolution</span>
        <h2 className="text-4xl md:text-6xl text-primary font-bold tracking-tight">Soluções de Engenharia Aquática</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto mt-4 text-lg">
          Elevamos o padrão de lazer em Brasília com tecnologia de ponta e execução impecável.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">


        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl pool-shadow border border-black/5 group hover:-translate-y-2 transition-all flex flex-col overflow-hidden"
          >
            <div className="h-48 w-full relative overflow-hidden">
              <Image 
                src={service.image} 
                alt={service.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white flex items-center gap-2">
                <service.icon className="w-5 h-5" />
                <span className="font-bold text-sm uppercase tracking-wider">{service.title}</span>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-on-surface-variant font-body mb-6 text-sm leading-relaxed">
                {service.description}
              </p>
              <a href={service.link} className="text-secondary font-bold flex items-center gap-2 group-hover:gap-3 transition-all text-xs uppercase tracking-widest mt-auto">
                Explorar Solução <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
        
        {/* Featured Service Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary text-white p-8 rounded-2xl shadow-2xl lg:col-span-4 group relative overflow-hidden mt-8"
        >
          <div className="absolute right-[-5%] bottom-[-10%] opacity-10 rotate-12">
            <Settings className="w-64 h-64" />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bg-tertiary text-primary px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block uppercase tracking-widest">
                Serviço Premium
              </span>
              <h3 className="text-3xl font-bold text-white mb-4">Casa de Máquinas</h3>
              <p className="text-white/80 font-body text-lg mb-8 leading-relaxed">
                Projetamos e executamos casas de máquinas organizadas, seguras e com equipamentos de última geração. Automação completa para sua piscina residencial com o padrão Evolution.
              </p>
              <Link 
                href="https://wa.me/556191441294?text=Olá, gostaria de solicitar um projeto técnico para minha casa de máquinas."
                target="_blank"
                className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-tertiary transition-all shadow-xl shadow-black/20 inline-block"
              >
                Solicitar Projeto Técnico
              </Link>

            </div>
            <div className="rounded-2xl overflow-hidden h-64 border border-white/10 shadow-2xl relative">
              <Image
                src="/pool_pump_machine_room_modern_1777262079827.png"
                alt="Casa de Máquinas Moderna"
                fill
                className="object-cover group-hover:scale-105 transition-all duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
