"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  CheckCircle2, 
  Thermometer, 
  Sun, 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  Waves, 
  Wrench, 
  Droplets, 
  Settings, 
  Sparkles,
  Activity,
  Smartphone,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";

const serviceData: Record<string, any> = {
  "aquecimento-solar": {
    title: "Aquecimento Solar",
    subtitle: "Solar Inteligente",
    badge: "Eficiência Energética",
    description: "A solução mais sustentável e econômica para aproveitar sua piscina com o máximo conforto térmico o ano inteiro.",
    image: "/service_solar_heating_1778496123555.png",
    color: "from-orange-600/90 to-orange-900/40",
    features: [
      { title: "Energia Limpa", description: "Utilize a energia do sol sem custos adicionais de eletricidade.", icon: Sun },
      { title: "Economia Real", description: "Redução de até 90% no custo de aquecimento.", icon: Zap },
      { title: "Conforto", description: "Água aquecida em todas as estações do ano.", icon: Thermometer },
      { title: "Garantia", description: "Alta durabilidade e resistência dos coletores.", icon: ShieldCheck }
    ]
  },
  "trocador-de-calor": {
    title: "Trocador de Calor",
    subtitle: "Aquecimento Rápido",
    badge: "Alta Performance",
    description: "Tecnologia avançada para aquecer sua piscina com velocidade e precisão, independente do clima.",
    image: "/service_heat_exchanger_1778496140113.png",
    color: "from-blue-600/90 to-blue-900/40",
    features: [
      { title: "Velocidade", description: "Aquece grandes volumes de água em tempo recorde.", icon: Zap },
      { title: "Precisão", description: "Controle digital exato da temperatura desejada.", icon: Settings },
      { title: "Silencioso", description: "Operação de baixo ruído para seu total conforto.", icon: Activity },
      { title: "Resistência", description: "Condensadores em titânio para máxima vida útil.", icon: ShieldCheck }
    ]
  },
  "boiler": {
    title: "Sistema Boiler",
    subtitle: "Água Quente Sempre",
    badge: "Conforto Térmico",
    description: "Reservatórios térmicos de alta performance para garantir banho quente e conforto em toda a residência.",
    image: "/service_boiler_1778496152027.png",
    color: "from-slate-600/90 to-slate-900/40",
    features: [
      { title: "Inox 316", description: "Máxima resistência contra corrosão e pressão.", icon: ShieldCheck },
      { title: "Isolamento", description: "Conserva a temperatura por muito mais tempo.", icon: Thermometer },
      { title: "Automático", description: "Sistemas de controle que facilitam o dia a dia.", icon: Settings },
      { title: "Capacidade", description: "Dimensionamento sob medida para sua necessidade.", icon: Waves }
    ]
  },
  "limpeza-placas": {
    title: "Limpeza de Placas",
    subtitle: "Máximo Rendimento",
    badge: "Manutenção Técnica",
    description: "Mantenha seu sistema solar operando em 100% com a higienização técnica de coletores solares.",
    image: "/service_panel_cleaning_1778496165716.png",
    color: "from-cyan-600/90 to-cyan-900/40",
    features: [
      { title: "Desempenho", description: "Placas limpas absorvem até 40% mais radiação.", icon: Sun },
      { title: "Prevenção", description: "Evita o acúmulo de fungos e detritos corrosivos.", icon: ShieldCheck },
      { title: "Agilidade", description: "Serviço rápido realizado por técnicos treinados.", icon: Zap },
      { title: "Check-up", description: "Inclui inspeção de vazamentos e conexões.", icon: Wrench }
    ]
  },
  "manutencao": {
    title: "Manutenção",
    subtitle: "Cuidado de Elite",
    badge: "Premium Care",
    description: "Check-up técnico completo e tratamento especializado para manter seu sistema em estado de novo.",
    image: "/service_maintenance_replacement_1778496185283.png",
    color: "from-emerald-600/90 to-emerald-900/40",
    features: [
      { title: "Preventiva", description: "Evite quebras inesperadas com revisões periódicas.", icon: ShieldCheck },
      { title: "Peças Originais", description: "Substituição apenas por componentes de fábrica.", icon: Settings },
      { title: "Técnicos", description: "Mão de obra especializada em todas as marcas.", icon: Wrench },
      { title: "Relatório", description: "Checklist detalhado de cada visita realizada.", icon: Sparkles }
    ]
  },
  "banheira": {
    title: "Banheiras",
    subtitle: "Design e Relax",
    badge: "Home Spa",
    description: "Instalação e manutenção de banheiras de hidromassagem com acabamento impecável e sofisticação.",
    image: "/service_bathtub_1778496201534.png",
    color: "from-purple-600/90 to-purple-900/40",
    features: [
      { title: "Hidromassagem", description: "Sistemas potentes para relaxamento muscular.", icon: Waves },
      { title: "Acabamento", description: "Instalação técnica que valoriza o ambiente.", icon: Sparkles },
      { title: "Manutenção", description: "Limpeza de tubulações e revisão de motores.", icon: Wrench },
      { title: "Conforto", description: "Água na temperatura perfeita para seu descanso.", icon: Thermometer }
    ]
  },
  "spa-sauna": {
    title: "Spas e Saunas",
    subtitle: "Bem-estar Total",
    badge: "Wellness",
    description: "Projetos completos de ambientes de relaxamento que unem saúde, tecnologia e design exclusivo.",
    image: "/service_spa_1778496232497.png",
    color: "from-indigo-600/90 to-indigo-900/40",
    features: [
      { title: "Saúde", description: "Benefícios comprovados para o sistema vascular.", icon: Activity },
      { title: "Automação", description: "Controle de temperatura e vapor pelo celular.", icon: Smartphone },
      { title: "Design", description: "Integração perfeita com sua área de lazer.", icon: Sparkles },
      { title: "Durabilidade", description: "Materiais nobres resistentes à umidade e calor.", icon: ShieldCheck }
    ]
  },
  "cascata": {
    title: "Cascata",
    subtitle: "Movimento e Vida",
    badge: "Lazer Premium",
    description: "Agregue beleza sonora e visual à sua piscina com cascatas de design moderno e instalação técnica.",
    image: "/service_waterfall_1778496252259.png",
    color: "from-sky-600/90 to-sky-900/40",
    features: [
      { title: "Estética", description: "Destaque visual que valoriza o seu imóvel.", icon: Sparkles },
      { title: "Oxigenação", description: "Melhora a qualidade e a pureza da água.", icon: Droplets },
      { title: "Inox 304/316", description: "Material de alta resistência contra oxidação.", icon: ShieldCheck },
      { title: "Instalação", description: "Dimensionamento correto da bomba para fluxo ideal.", icon: Settings }
    ]
  },
  "iluminacao": {
    title: "Iluminação LED",
    subtitle: "Cenários Noturnos",
    badge: "Design",
    description: "Transforme sua piscina em um espetáculo de luzes e cores com sistemas de LED de alta performance.",
    image: "/service_lighting_led_1778496269987.png",
    color: "from-violet-600/90 to-violet-900/40",
    features: [
      { title: "Cores RGB", description: "Milhões de combinações para cada ocasião.", icon: Sun },
      { title: "Baixo Consumo", description: "Tecnologia LED de ultra eficiência energética.", icon: Zap },
      { title: "Controle Remoto", description: "Troque as cores e intensidades à distância.", icon: Smartphone },
      { title: "Segurança", description: "Instalação estanque com total isolamento elétrico.", icon: ShieldCheck }
    ]
  },
  "cerca-protecao": {
    title: "Cerca de Proteção",
    subtitle: "Segurança Familiar",
    badge: "Proteção",
    description: "Segurança essencial para crianças e pets com cercas removíveis de alta resistência e discrição.",
    image: "/service_safety_fence_1778496283580.png",
    color: "from-slate-700/90 to-slate-900/40",
    features: [
      { title: "Removível", description: "Praticidade para retirar e colocar quando desejar.", icon: Settings },
      { title: "Resistência", description: "Malha náutica que suporta grandes impactos.", icon: ShieldCheck },
      { title: "Discreta", description: "Design que não interfere na estética da piscina.", icon: Sparkles },
      { title: "Trava Dupla", description: "Sistema que impede a abertura por crianças.", icon: CheckCircle2 }
    ]
  },
  "casa-de-maquinas": {
    title: "Casa de Máquinas",
    subtitle: "Coração do Sistema",
    badge: "Engenharia",
    description: "Montagem, organização e manutenção completa do sistema hidráulico e elétrico da sua piscina.",
    image: "/service_machine_room_assembly_1778496296904.png",
    color: "from-blue-800/90 to-blue-950/40",
    features: [
      { title: "Organização", description: "Tubulação setorizada e identificada para fácil uso.", icon: Settings },
      { title: "Eficiência", description: "Bombas de alta vazão com baixo consumo.", icon: Zap },
      { title: "Painel Elétrico", description: "Quadro de comando seguro e automatizado.", icon: ShieldCheck },
      { title: "Acessibilidade", description: "Projeto focado na facilidade de manutenção.", icon: Wrench }
    ]
  },
  "higienizacao": {
    title: "Higienização",
    subtitle: "Água Pura",
    badge: "Saúde",
    description: "Tratamento profundo e higienização de sistemas para garantir água pura e livre de contaminantes.",
    image: "/service_system_sanitization_1778496318090.png",
    color: "from-cyan-500/90 to-cyan-800/40",
    features: [
      { title: "Tratamento", description: "Eliminação total de bactérias e micro-organismos.", icon: Droplets },
      { title: "Cristalina", description: "Tecnologia de floculação para brilho intenso.", icon: Sparkles },
      { title: "Seguro", description: "Dosagem exata de produtos para não irritar a pele.", icon: ShieldCheck },
      { title: "Análise", description: "Monitoramento constante dos níveis químicos.", icon: Activity }
    ]
  },
  "aquecimento": {
    title: "Aquecimento Geral",
    subtitle: "Conforto Total",
    badge: "Soluções Híbridas",
    description: "Projetos sob medida combinando diferentes tecnologias para o aquecimento ideal da sua água.",
    image: "/service_pool_heating_gen_1778496330203.png",
    color: "from-amber-600/90 to-amber-900/40",
    features: [
      { title: "Híbrido", description: "Solar + Trocador para calor 365 dias por ano.", icon: Thermometer },
      { title: "Inteligente", description: "Sistema que escolhe a fonte mais barata.", icon: Smartphone },
      { title: "Customizado", description: "Projeto feito para o volume da sua piscina.", icon: Settings },
      { title: "Economia", description: "Foco no menor custo operacional possível.", icon: Zap }
    ]
  },
  "reforma-casa-maquinas": {
    title: "Reforma Técnica",
    subtitle: "Modernização",
    badge: "Renovação",
    description: "Atualize sistemas antigos para tecnologias modernas, ganhando eficiência e economia.",
    image: "/service_machine_room_renovation_1778496346069.png",
    color: "from-zinc-700/90 to-zinc-900/40",
    features: [
      { title: "Upgrade", description: "Troca de motores antigos por modelos inverter.", icon: Zap },
      { title: "Silêncio", description: "Redução drástica de ruído e vibração.", icon: Activity },
      { title: "Automação", description: "Inclusão de controles inteligentes via app.", icon: Smartphone },
      { title: "Garantia", description: "Sistema renovado com garantia total Evolution.", icon: ShieldCheck }
    ]
  },
  "automacao": {
    title: "Automação",
    subtitle: "Smart Pool",
    badge: "Tecnologia",
    description: "Controle total de bombas, luzes e aquecimento diretamente pelo seu smartphone, de onde estiver.",
    image: "/service_system_automation_1778496360462.png",
    color: "from-blue-600/90 to-blue-900/40",
    features: [
      { title: "App Control", description: "Gerencie tudo pela tela do seu celular.", icon: Smartphone },
      { title: "Programação", description: "Agende horários para filtragem e luzes.", icon: Clock },
      { title: "Monitoramento", description: "Saiba o status do sistema em tempo real.", icon: Activity },
      { title: "Expansível", description: "Adicione novos módulos conforme desejar.", icon: Settings }
    ]
  }
};

export default function DynamicServicePage() {
  const { slug } = useParams();
  const service = serviceData[slug as string];

  if (!service) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar config={{}} />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${service.color} backdrop-blur-[2px]`} />
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/30">
              {service.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {service.title.split(" ")[0]} <br />
              <span className="text-secondary bg-white px-4 py-1 rounded-2xl inline-block mt-2 shadow-sm">{service.subtitle}</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8 font-body max-w-2xl">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/agendamento"
                className="bg-secondary text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-secondary/30"
              >
                Solicitar Orçamento Grátis
              </Link>
              <Link 
                href="/contato"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all"
              >
                Falar com Especialista
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24">
        <div className="container mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-primary mb-6">Por que escolher a Evolution?</h2>
            <p className="text-slate-500 leading-relaxed">
              Aliamos tecnologia de ponta com atendimento personalizado para oferecer o melhor em engenharia de lazer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.features.map((f: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Standard Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
              <img 
                src={service.image} 
                alt="Instalação Técnica" 
                className="rounded-[40px] shadow-2xl relative z-10 aspect-video object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-3xl shadow-xl z-20 text-white max-w-[240px]">
                <p className="text-3xl font-bold mb-2">Elite</p>
                <p className="text-sm text-white/70">Padrão de qualidade Piscinas Evolution em cada detalhe.</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-primary leading-tight">
                Garantia de <span className="text-secondary">Excelência Técnica</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Nossa equipe é constantemente treinada para entregar soluções que unem durabilidade, 
                estética e tecnologia. Não vendemos apenas serviços, entregamos tranquilidade para o seu lazer.
              </p>
              <ul className="space-y-4">
                {[
                  "Profissionais uniformizados e identificados",
                  "Equipamentos de última geração",
                  "Suporte técnico prioritário",
                  "Compromisso com prazos e limpeza"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-secondary" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Link 
                  href="/agendamento"
                  className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
                >
                  Agendar visita técnica agora <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer config={{}} />
    </main>
  );
}
