"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ config }: { config: any }) => {
  const whatsapp = config?.site_whatsapp || "556191441294";
  const title = config?.site_titulo || "Piscinas Evolution";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Início", href: "/" },
    { 
      name: "Serviços", 
      submenu: [
        { name: "Aquecimento Solar", href: "/servicos/aquecimento-solar" },
        { name: "Trocador de Calor", href: "/servicos/trocador-de-calor" },
        { name: "Boiler", href: "/servicos/boiler" },
        { name: "Limpeza de Placas", href: "/servicos/limpeza-de-placas" },
        { name: "Manutenção e Trocas", href: "/servicos/manutencao-e-trocas" },
        { name: "Banheiras", href: "/servicos/banheiras" },
        { name: "Saunas", href: "/servicos/saunas" },
        { name: "Spas", href: "/servicos/spas" },
        { name: "Cascata", href: "/servicos/cascata" },
        { name: "Iluminação LED", href: "/servicos/iluminacao-led" },
        { name: "Cerca de Proteção", href: "/servicos/cerca-de-protecao" },
        { name: "Casa de Máquinas", href: "/servicos/casa-de-maquinas" },
        { name: "Higienização", href: "/servicos/higienizacao" },
        { name: "Aquecimento de Piscina", href: "/servicos/aquecimento-de-piscina" },
        { name: "Reforma Técnica", href: "/servicos/reforma-tecnica" },
        { name: "Automação", href: "/servicos/automacao" }
      ]
    },
    { 
      name: "Empresa", 
      submenu: [
        { name: "Sobre Nós", href: "/empresa/sobre-nos" }
      ]
    },
    { name: "Contato", href: "/contato" }
  ];

  return (
    <header className="glass-premium z-50 sticky top-0 border-b border-slate-100/50">
      <nav className="flex justify-between items-center px-8 py-3 max-w-[1400px] mx-auto w-full">
        <Link href="/" className="hover:opacity-80 transition-all block dark:bg-white/90 dark:backdrop-blur-sm dark:p-2 dark:-m-2 dark:rounded-xl dark:shadow-sm">
          <img 
            src="/Logo/Logo Horizontal.svg" 
            alt={title} 
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-body text-sm font-medium tracking-tight">
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative group">
              {item.submenu ? (
                <>
                  <button className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors py-4">
                    {item.name} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="space-y-1">
                      {item.submenu.map((sub, sIdx) => (
                        <Link 
                          key={sIdx} 
                          href={sub.href}
                          className="block px-4 py-2.5 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link className="text-slate-500 hover:text-primary transition-colors py-4" href={item.href}>
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          
          <Link 
            className="px-4 py-2 bg-secondary/10 text-secondary rounded-xl font-bold hover:bg-secondary hover:text-white transition-all duration-300 ml-4" 
            href="/minha-piscina"
          >
            Portal do Cliente
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/agendamento"
            className="hidden xl:block bg-primary text-white px-6 py-2.5 rounded-2xl font-body font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 text-xs uppercase tracking-wider"
          >
            Fazer Agendamento
          </Link>
          <Link 
            href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} 
            target="_blank"
            className="hidden sm:flex bg-cta text-white px-6 py-2.5 rounded-2xl font-body font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-cta/20 items-center gap-2 text-xs uppercase tracking-wider"
          >
            WhatsApp
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-primary hover:bg-slate-100 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl p-8 space-y-6 z-50 overflow-y-auto max-h-[80vh]"
          >
            {menuItems.map((item, idx) => (
              <div key={idx} className="space-y-4">
                {item.submenu ? (
                  <>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.name}</p>
                    <div className="grid grid-cols-1 gap-4 pl-4 border-l-2 border-slate-100">
                      {item.submenu.map((sub, sIdx) => (
                        <Link 
                          key={sIdx} 
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-primary font-bold text-lg"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-2xl font-bold text-primary"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-8 flex flex-col gap-4">
              <Link 
                href="/minha-piscina"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-secondary/10 text-secondary py-4 rounded-2xl font-bold text-center"
              >
                Portal do Cliente
              </Link>
              <Link 
                href="/agendamento"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-center"
              >
                Agendamento Online
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
