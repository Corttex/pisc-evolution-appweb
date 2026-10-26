"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sun, Thermometer, Waves, Settings, Wrench, ArrowRight, Droplets, Activity } from "lucide-react";
import Link from "next/link";



const services = [
  {
    title: "Aquecimento Solar",
    description: "Economia e sustentabilidade com água quente o ano todo através de coletores solares de alta performance.",
    icon: Sun,
    image: "/service_solar_heating_1778496123555.png",
    link: "/servicos/aquecimento-solar"
  },
  {
    title: "Trocador de Calor",
    description: "Aquecimento rápido e eficiente para sua piscina ou spa, independente das condições climáticas.",
    icon: Thermometer,
    image: "/service_heat_exchanger_1778496140113.png",
    link: "/servicos/trocador-de-calor"
  },
  {
    title: "Boiler",
    description: "Sistemas de reservatório térmico que garantem água quente para banho com máximo conforto e segurança.",
    icon: Droplets,
    image: "/service_boiler_1778496152027.png",
    link: "/servicos/boiler"
  },
  {
    title: "Limpeza de Placas",
    description: "Serviço especializado de limpeza de placas solares para garantir o máximo rendimento do seu sistema.",
    icon: Settings,
    image: "/service_panel_cleaning_1778496165716.png",
    link: "/servicos/limpeza-placas"
  },
  {
    title: "Manutenção e Trocas",
    description: "Manutenção preventiva e corretiva com substituição de peças originais e garantia de qualidade.",
    icon: Wrench,
    image: "/service_maintenance_replacement_1778496185283.png",
    link: "/servicos/manutencao"
  },
  {
    title: "Banheiras",
    description: "Instalação e manutenção de banheiras de hidromassagem com acabamento impecável e sofisticação.",
    icon: Waves,
    image: "/service_bathtub_1778496201534.png",
    link: "/servicos/banheira"
  },
  {
    title: "Saunas",
    description: "Projetos completos de saunas secas e úmidas para momentos de pura tranquilidade e bem-estar.",
    icon: Thermometer,
    image: "/service_sauna_1778496215122.png",
    link: "/servicos/spa-sauna"
  },
  {
    title: "Spas",
    description: "Spas residenciais de luxo com sistemas avançados de hidromassagem e controle térmico.",
    icon: Waves,
    image: "/service_spa_1778496232497.png",
    link: "/servicos/spa-sauna"
  },
  {
    title: "Cascata",
    description: "Design e instalação de cascatas em aço inox ou alvenaria, agregando beleza e movimento à sua piscina.",
    icon: Waves,
    image: "/service_waterfall_1778496252259.png",
    link: "/servicos/cascata"
  },
  {
    title: "Iluminação LED",
    description: "Projetos luminotécnicos subaquáticos que transformam sua piscina em um cenário espetacular à noite.",
    icon: Sun,
    image: "/service_lighting_led_1778496269987.png",
    link: "/servicos/iluminacao"
  },
  {
    title: "Cerca de Proteção",
    description: "Segurança essencial para crianças e pets com cercas removíveis de alta resistência e discrição.",
    icon: Settings,
    image: "/service_safety_fence_1778496283580.png",
    link: "/servicos/cerca-protecao"
  },
  {
    title: "Casa de Máquinas",
    description: "Montagem técnica e organização completa de sistemas hidráulicos e elétricos com padrão Evolution.",
    icon: Settings,
    image: "/service_machine_room_assembly_1778496296904.png",
    link: "/servicos/casa-de-maquinas"
  },
  {
    title: "Higienização",
    description: "Tratamento profundo e higienização de sistemas para garantir água pura e livre de contaminantes.",
    icon: Droplets,
    image: "/service_system_sanitization_1778496318090.png",
    link: "/servicos/higienizacao"
  },
  {
    title: "Aquecimento de Piscina",
    description: "Soluções sob medida para manter sua piscina na temperatura ideal durante todas as estações.",
    icon: Thermometer,
    image: "/service_pool_heating_gen_1778496330203.png",
    link: "/servicos/aquecimento"
  },
  {
    title: "Reforma Técnica",
    description: "Modernização completa de casas de máquinas e sistemas antigos para maior eficiência energética.",
    icon: Settings,
    image: "/service_machine_room_renovation_1778496346069.png",
    link: "/servicos/reforma-casa-maquinas"
  },
  {
    title: "Automação",
    description: "Controle inteligente de bombas, luzes e aquecimento diretamente pelo seu smartphone.",
    icon: Settings,
    image: "/service_system_automation_1778496360462.png",
    link: "/servicos/automacao"
  }
];



// Mapeamento local para ícones dinâmicos do Lucide
const LOCAL_ICON_MAP: Record<string, any> = {
  Sun,
  Thermometer,
  Waves,
  Settings,
  Wrench,
  Droplets,
  Activity
};

export const Services = ({ content }: { content?: any }) => {
  const subtitle = content?.subtitle || "Expertise Evolution";
  const title = content?.title || "Soluções de Engenharia Aquática";
  const description = content?.description || "Elevamos o padrão de lazer em Brasília com tecnologia de ponta e execução impecável.";
  const itemsList = content?.items || services;
  const featured = content?.featured || {
    tag: "Serviço Premium",
    title: "Casa de Máquinas",
    description: "Projetos e executamos casas de máquinas organizadas, seguras e com equipamentos de última geração. Automação completa para sua piscina residencial com o padrão Evolution.",
    image: "/pool_pump_machine_room_modern_1777262079827.png",
    buttonText: "Solicitar Projeto Técnico",
    buttonLink: "https://wa.me/556191441294?text=Olá, gostaria de solicitar um projeto técnico para minha casa de máquinas."
  };

  return (
    <section className="py-24 px-8 max-w-[1280px] mx-auto" id="servicos">
      <div className="text-center mb-16">
        <span className="font-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">{subtitle}</span>
        <h2 className="text-4xl md:text-6xl text-primary font-bold tracking-tight">{title}</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto mt-4 text-lg">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {itemsList.map((service: any, index: number) => {
          // Resolve icon dynamic string or use fallback Settings component
          const IconComponent = typeof service.icon === "string" 
            ? (LOCAL_ICON_MAP[service.icon] || Settings) 
            : (service.icon || Settings);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl pool-shadow border border-black/5 group hover:-translate-y-2 transition-all flex flex-col overflow-hidden"
            >
              <div className="h-48 w-full relative overflow-hidden">
                <Image
                  src={service.image || "/res_pool_1.png"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white flex items-center gap-2">
                  <IconComponent className="w-5 h-5" />
                  <span className="font-bold text-sm uppercase tracking-wider">{service.title}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <p className="text-on-surface-variant font-body mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                <a href={service.link || "#"} className="text-secondary font-bold flex items-center gap-2 group-hover:gap-3 transition-all text-xs uppercase tracking-widest mt-auto">
                  Explorar Solução <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          );
        })}

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
                {featured.tag}
              </span>
              <h3 className="text-3xl font-bold text-white mb-4">{featured.title}</h3>
              <p className="text-white/80 font-body text-lg mb-8 leading-relaxed">
                {featured.description}
              </p>
              <Link
                href={featured.buttonLink}
                target="_blank"
                className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-tertiary transition-all shadow-xl shadow-black/20 inline-block"
              >
                {featured.buttonText}
              </Link>

            </div>
            <div className="rounded-2xl overflow-hidden h-64 border border-white/10 shadow-2xl relative">
              <Image
                src={featured.image || "/pool_pump_machine_room_modern_1777262079827.png"}
                alt={featured.title}
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

