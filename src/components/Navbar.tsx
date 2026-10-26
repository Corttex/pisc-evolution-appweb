"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Droplet, Sun, Wind, Activity, Home, Lightbulb, Shield, Settings, Wrench, PaintBucket, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ config }: { config: any }) => {
  const whatsapp = config?.site_whatsapp || "5561991441294";
  const title = config?.site_titulo || "Piscinas Evolution";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Split services to map icons (simulated) for the mega menu
  const serviceItems = [
    { name: "Aquecimento Solar", href: "/servicos/aquecimento-solar", icon: Sun },
    { name: "Trocador de Calor", href: "/servicos/trocador-de-calor", icon: Activity },
    { name: "Boiler", href: "/servicos/boiler", icon: Droplet },
    { name: "Limpeza de Placas", href: "/servicos/limpeza-placas", icon: Wind },
    { name: "Manutenção e Trocas", href: "/servicos/manutencao", icon: Wrench },
    { name: "Banheiras", href: "/servicos/banheira", icon: Droplet },
    { name: "Saunas", href: "/servicos/spa-sauna", icon: Wind },
    { name: "Spas", href: "/servicos/spa-sauna", icon: Droplet },
    { name: "Cascata", href: "/servicos/cascata", icon: Droplet },
    { name: "Iluminação LED", href: "/servicos/iluminacao", icon: Lightbulb },
    { name: "Cerca de Proteção", href: "/servicos/cerca-protecao", icon: Shield },
    { name: "Casa de Máquinas", href: "/servicos/casa-de-maquinas", icon: Settings },
    { name: "Higienização", href: "/servicos/higienizacao", icon: PaintBucket },
    { name: "Aquecimento de Piscina", href: "/servicos/aquecimento", icon: Sun },
    { name: "Reforma Técnica", href: "/servicos/reforma-casa-maquinas", icon: Wrench },
    { name: "Automação", href: "/servicos/automacao", icon: Smartphone }
  ];

  const menuItems = [
    { name: "Início", href: "/" },
    { 
      name: "Serviços", 
      isMega: true,
      submenu: serviceItems
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
    <header className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm">
      <nav className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-[1400px] mx-auto w-full">
        {/* Logo Modern Pill */}
        <Link 
          href="/" 
          className="relative group flex items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-300"
        >
          <img 
            src="/Logo/Logo Horizontal.svg" 
            alt={title} 
            className="h-10 lg:h-12 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-2 font-body text-[15px] font-semibold tracking-tight">
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative group">
              {item.submenu ? (
                <>
                  <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary dark:hover:text-white transition-all duration-300">
                    {item.name} 
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 opacity-50 group-hover:opacity-100" />
                  </button>
                  
                  {/* Dropdown Container */}
                  <div className={`absolute top-[120%] left-1/2 -translate-x-1/2 ${item.isMega ? 'w-[640px]' : 'w-64'} bg-white dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 before:absolute before:-top-6 before:left-0 before:w-full before:h-6`}>
                    
                    {item.isMega ? (
                      <div className="grid grid-cols-2 gap-2 p-2">
                        {item.submenu.map((sub: any, sIdx) => {
                          const Icon = sub.icon || Activity;
                          return (
                            <Link 
                              key={sIdx} 
                              href={sub.href}
                              className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 group/link"
                            >
                              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover/link:bg-primary/10 group-hover/link:text-primary transition-colors">
                                <Icon size={16} />
                              </div>
                              <span className="font-medium text-sm">{sub.name}</span>
                            </Link>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {item.submenu.map((sub, sIdx) => (
                          <Link 
                            key={sIdx} 
                            href={sub.href}
                            className="block px-4 py-2.5 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 font-medium"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link 
                  className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary dark:hover:text-white transition-all duration-300" 
                  href={item.href}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2" />

          <Link 
            className="px-5 py-2.5 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light rounded-xl font-bold hover:bg-secondary hover:text-white transition-all duration-300 ml-2" 
            href="/minha-piscina"
          >
            Portal
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-3">
          <Link 
            href="/agendamento"
            className="hidden xl:block bg-primary text-white px-6 py-3 rounded-xl font-body font-bold transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-95 text-[13px] uppercase tracking-wider"
          >
            Agendar
          </Link>
          <Link 
            href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} 
            target="_blank"
            className="hidden sm:flex bg-cta text-white px-6 py-3 rounded-xl font-body font-bold transition-all duration-300 hover:shadow-xl hover:shadow-cta/30 hover:-translate-y-0.5 active:scale-95 items-center gap-2 text-[13px] uppercase tracking-wider"
          >
            WhatsApp
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-primary dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 shadow-2xl p-6 space-y-6 z-50 overflow-y-auto max-h-[85vh]"
          >
            {menuItems.map((item, idx) => (
              <div key={idx} className="space-y-3">
                {item.submenu ? (
                  <>
                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{item.name}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2 border-l-2 border-slate-100 dark:border-slate-800">
                      {item.submenu.map((sub, sIdx) => (
                        <Link 
                          key={sIdx} 
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="px-3 py-2 text-slate-700 dark:text-slate-300 font-semibold hover:text-primary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors"
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
                    className="block text-xl font-bold text-slate-900 dark:text-white"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <Link 
                href="/minha-piscina"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-secondary/10 dark:bg-secondary/20 text-secondary py-3.5 rounded-xl font-bold text-center text-sm uppercase tracking-wide"
              >
                Portal do Cliente
              </Link>
              <Link 
                href="/agendamento"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-center text-sm uppercase tracking-wide"
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
