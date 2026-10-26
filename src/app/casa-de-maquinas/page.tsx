import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getConfig } from "../actions/config";
import Image from "next/image";
import { Settings, Cpu, ShieldAlert, Activity, CheckCircle2 } from "lucide-react";

export default async function CasaDeMaquinasPage() {
  const config = await getConfig();

  return (
    <main className="min-h-screen bg-background">
      <Navbar config={config} />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/pool_pump_machine_room_modern_1777262079827.png"
          alt="Casa de Máquinas Evolution"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-md" />
        <div className="relative z-10 text-center text-white px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Casa de Máquinas</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-body leading-relaxed">
            O coração tecnológico da sua piscina. Engenharia de precisão, organização impecável e automação total.
          </p>
        </div>
      </section>

      {/* Engineering Focus Section */}
      <section className="py-24 px-8 max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div>
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Padrão de Qualidade Evolution</span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">Por que uma Casa de Máquinas Organizada é Vital?</h2>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  icon: ShieldAlert,
                  title: "Segurança Absoluta",
                  description: "Instalações elétricas dentro das normas ABNT, com proteção DR e aterramento correto para evitar acidentes."
                },
                {
                  icon: Activity,
                  title: "Vida Útil dos Equipamentos",
                  description: "Uma ventilação adequada e disposição correta dos filtros e bombas reduzem o desgaste e facilitam o resfriamento."
                },
                {
                  icon: Cpu,
                  title: "Automação Integrada",
                  description: "Controle bombas, aquecimento e iluminação pelo celular ou por voz, programando horários de funcionamento."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex-shrink-0 flex items-center justify-center text-secondary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-on-surface-variant">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-[3rem] pool-shadow relative">
            <div className="absolute -top-4 -right-4 bg-secondary text-white px-6 py-3 rounded-2xl font-bold shadow-xl z-20">
              Engenharia Real
            </div>
            <div className="rounded-[2.5rem] overflow-hidden relative aspect-square">
              <Image 
                src="https://images.unsplash.com/photo-1560749003-d4b1e1f9a1f5?q=80&w=2070&auto=format&fit=crop" 
                alt="Detalhe de Bomba de Piscina" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Automation Showcase */}
      <section className="bg-primary py-24 px-8">
        <div className="max-w-[1280px] mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Automação Inteligente Evolution</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Sua piscina trabalha para você, não o contrário.
          </p>
        </div>
        
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-8">
          <div className="glass-premium p-10 rounded-3xl text-white border-white/10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Settings className="text-tertiary" /> Painel de Controle
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3"><CheckCircle2 className="text-tertiary w-5 h-5" /> Programação de filtragem automática</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-tertiary w-5 h-5" /> Controle de aquecimento solar e elétrico</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-tertiary w-5 h-5" /> Acionamento de cascatas e hidromassagem</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-tertiary w-5 h-5" /> Gestão de iluminação RGB (Cromoterapia)</li>
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden pool-shadow relative h-full min-h-[300px]">
            <Image 
              src="/pool_dashboard_ui_mockup_1777262116743.png" 
              alt="Controle via App" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Maintenance CTA */}
      <section className="py-24 px-8 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-8">Sua Casa de Máquinas precisa de um Up?</h2>
          <p className="text-on-surface-variant text-xl mb-12">
            Realizamos reformas completas de casas de máquinas antigas, transformando o caos em organização e eficiência tecnológica.
          </p>
          <a href="/agendamento" className="bg-secondary text-white px-12 py-5 rounded-3xl font-bold hover:scale-105 transition-all shadow-2xl shadow-secondary/30 text-lg">
            Solicitar Auditoria Técnica
          </a>
        </div>
      </section>

      <Footer config={config} />
    </main>
  );
}
