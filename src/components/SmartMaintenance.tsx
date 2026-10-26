"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Smartphone, BarChart3, Clock } from "lucide-react";
import Link from "next/link";

export const SmartMaintenance = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center flex-row-reverse">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl order-2 md:order-1"
          >
            <Image 
              src="/pool_dashboard_ui_mockup_1777262116743.png" 
              alt="Dashboard Evolution" 
              fill 
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Tecnologia Exclusiva</span>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-slate-900">Gestão na Palma da Mão (Em Breve).</h2>
            <p className="text-slate-600 text-lg mb-12">
              Esqueça as planilhas e o caderninho. Com a Plataforma Evolution, você tem o controle total do seu oásis de qualquer lugar do mundo.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <Smartphone className="text-secondary w-8 h-8" />
                <h4 className="font-bold text-slate-900">App Exclusivo</h4>
                <p className="text-sm text-slate-500">Acompanhe medições de pH e cloro em tempo real pelo celular.</p>
              </div>
              
              <div className="space-y-4">
                <Clock className="text-secondary w-8 h-8" />
                <h4 className="font-bold text-slate-900">Histórico Completo</h4>
                <p className="text-sm text-slate-500">Acesse todas as manutenções e trocas de produtos realizadas.</p>
              </div>

              <div className="space-y-4">
                <BarChart3 className="text-secondary w-8 h-8" />
                <h4 className="font-bold text-slate-900">Relatórios</h4>
                <p className="text-sm text-slate-500">Gráficos de evolução da saúde da sua piscina mês a mês.</p>
              </div>
              
              <div className="space-y-4">
                <ShieldCheck className="text-secondary w-8 h-8" />
                <h4 className="font-bold text-slate-900">Segurança</h4>
                <p className="text-sm text-slate-500">Alertas automáticos para trocas de filtro e manutenções preventivas.</p>
              </div>
            </div>

            <Link 
              href="/login"
              className="inline-block bg-primary text-white px-10 py-5 rounded-2xl font-bold hover:bg-secondary transition-all shadow-xl shadow-primary/20"
            >
              Acessar Minha Piscina
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
