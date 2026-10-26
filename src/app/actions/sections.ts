"use server";

import { prisma } from "@/lib/db";
import { checkAdmin } from "./admin";
import { revalidatePath } from "next/cache";

// Default content for all sections to seed or return when DB is empty/offline
const DEFAULT_SECTIONS: Record<string, any> = {
  hero: {
    headline: "Engenharia e Conforto Térmico de Elite",
    subheadline: "Projetos exclusivos de aquecimento, construção e automação para piscinas de alto padrão em Brasília.",
    whatsapp: "5561999999999",
    bgImage: "/res_pool_1.png"
  },
  services: {
    title: "Soluções de Engenharia Aquática",
    subtitle: "Expertise Evolution",
    description: "Elevamos o padrão de lazer em Brasília com tecnologia de ponta e execução impecável.",
    items: [
      {
        title: "Aquecimento Solar",
        description: "Economia e sustentabilidade com água quente o ano todo através de coletores solares de alta performance.",
        icon: "Sun",
        image: "/service_solar_heating_1778496123555.png",
        link: "/servicos/aquecimento-solar"
      },
      {
        title: "Trocador de Calor",
        description: "Aquecimento rápido e eficiente para sua piscina ou spa, independente das condições climáticas.",
        icon: "Thermometer",
        image: "/service_heat_exchanger_1778496140113.png",
        link: "/servicos/trocador-de-calor"
      },
      {
        title: "Boiler",
        description: "Sistemas de reservatório térmico que garantem água quente para banho com máximo conforto e segurança.",
        icon: "Droplets",
        image: "/service_boiler_1778496152027.png",
        link: "/servicos/boiler"
      },
      {
        title: "Limpeza de Placas",
        description: "Serviço especializado de limpeza de placas solares para garantir o máximo rendimento do seu sistema.",
        icon: "Settings",
        image: "/service_panel_cleaning_1778496165716.png",
        link: "/servicos/limpeza-placas"
      },
      {
        title: "Manutenção e Trocas",
        description: "Manutenção preventiva e corretiva com substituição de peças originais e garantia de qualidade.",
        icon: "Wrench",
        image: "/service_maintenance_replacement_1778496185283.png",
        link: "/servicos/manutencao"
      },
      {
        title: "Banheiras",
        description: "Instalação e manutenção de banheiras de hidromassagem com acabamento impecável e sofisticação.",
        icon: "Waves",
        image: "/service_bathtub_1778496201534.png",
        link: "/servicos/banheira"
      },
      {
        title: "Saunas",
        description: "Projetos completos de saunas secas e úmidas para momentos de pura tranquilidade e bem-estar.",
        icon: "Thermometer",
        image: "/service_sauna_1778496215122.png",
        link: "/servicos/spa-sauna"
      },
      {
        title: "Spas",
        description: "Spas residenciais de luxo com sistemas avançados de hidromassagem e controle térmico.",
        icon: "Waves",
        image: "/service_spa_1778496232497.png",
        link: "/servicos/spa-sauna"
      },
      {
        title: "Cascata",
        description: "Design e instalação de cascatas em aço inox ou alvenaria, agregando beleza e movimento à sua piscina.",
        icon: "Waves",
        image: "/service_waterfall_1778496252259.png",
        link: "/servicos/cascata"
      },
      {
        title: "Iluminação LED",
        description: "Projetos luminotécnicos subaquáticos que transformam sua piscina em um cenário espetacular à noite.",
        icon: "Sun",
        image: "/service_lighting_led_1778496269987.png",
        link: "/servicos/iluminacao"
      },
      {
        title: "Cerca de Proteção",
        description: "Segurança essencial para crianças e pets com cercas removíveis de alta resistência e discrição.",
        icon: "Settings",
        image: "/service_safety_fence_1778496283580.png",
        link: "/servicos/cerca-protecao"
      },
      {
        title: "Casa de Máquinas",
        description: "Montagem técnica e organização completa de sistemas hidráulicos e elétricos com padrão Evolution.",
        icon: "Settings",
        image: "/service_machine_room_assembly_1778496296904.png",
        link: "/servicos/casa-de-maquinas"
      },
      {
        title: "Higienização",
        description: "Tratamento profundo e higienização de sistemas para garantir água pura e livre de contaminantes.",
        icon: "Droplets",
        image: "/service_system_sanitization_1778496318090.png",
        link: "/servicos/higienizacao"
      },
      {
        title: "Aquecimento de Piscina",
        description: "Soluções sob medida para manter sua piscina na temperatura ideal durante todas as estações.",
        icon: "Thermometer",
        image: "/service_pool_heating_gen_1778496330203.png",
        link: "/servicos/aquecimento"
      },
      {
        title: "Reforma Técnica",
        description: "Modernização completa de casas de máquinas e sistemas antigos para maior eficiência energética.",
        icon: "Settings",
        image: "/service_machine_room_renovation_1778496346069.png",
        link: "/servicos/reforma-casa-maquinas"
      },
      {
        title: "Automação",
        description: "Controle inteligente de bombas, luzes e aquecimento diretamente pelo seu smartphone.",
        icon: "Settings",
        image: "/service_system_automation_1778496360462.png",
        link: "/servicos/automacao"
      }
    ],
    featured: {
      tag: "Serviço Premium",
      title: "Casa de Máquinas",
      description: "Projetos e executamos casas de máquinas organizadas, seguras e com equipamentos de última geração. Automação completa para sua piscina residencial com o padrão Evolution.",
      image: "/pool_pump_machine_room_modern_1777262079827.png",
      buttonText: "Solicitar Projeto Técnico",
      buttonLink: "https://wa.me/556191441294?text=Olá, gostaria de solicitar um projeto técnico para minha casa de máquinas."
    }
  },
  differentials: {
    title: "Compromisso com o Conforto Térmico",
    subtitle: "Por que escolher a Evolution?",
    description: "Mais que uma empresa de piscinas, somos parceiros do seu lazer. Nossa engenharia é focada em economia de energia e máximo prazer térmico.",
    buttonText: "Fale com um Especialista",
    items: [
      {
        title: "Atendimento Técnico",
        description: "Especialistas qualificados para diagnosticar e solucionar seu problema com precisão.",
        icon: "CheckCircle2"
      },
      {
        title: "Projetos Personalizados",
        description: "Cada piscina é única. Criamos soluções que se adaptam ao seu espaço e estilo de vida.",
        icon: "Award"
      },
      {
        title: "Equipamentos Certificados",
        description: "Trabalhamos apenas com as melhores marcas do mercado, garantindo durabilidade e eficiência.",
        icon: "ShieldCheck"
      },
      {
        title: "Equipe Própria",
        description: "Não terceirizamos. Nossa equipe é treinada e segue rigorosos padrões de qualidade Evolution.",
        icon: "Users"
      },
      {
        title: "Brasília e Entorno",
        description: "Logística ágil e atendimento dedicado para toda a capital federal e cidades satélites.",
        icon: "MapPin"
      }
    ]
  },
  sustainability: {
    title: "Lazer que cuida do planeta e do seu bolso.",
    subtitle: "Sustentabilidade Evolution",
    image: "/pool_solar_sustainability_1777481012223.png",
    quote: "\"Nossa missão é integrar tecnologia de ponta com responsabilidade ambiental, criando espaços de lazer infinitos.\"",
    items: [
      {
        title: "Energia Limpa e Gratuita",
        description: "Aproveite o sol de Brasília para aquecer sua piscina o ano todo sem aumentar sua conta de luz.",
        icon: "Sun"
      },
      {
        title: "Respeito ao Ecossistema",
        description: "Sistemas de filtragem inteligentes que reduzem o desperdício de água e o uso excessivo de químicos.",
        icon: "Leaf"
      },
      {
        title: "Máxima Eficiência",
        description: "Trocadores de calor com tecnologia inverter que consomem até 70% menos energia que sistemas convencionais.",
        icon: "Zap"
      }
    ]
  },
  testimonials: {
    title: "O que nossos clientes dizem",
    subtitle: "Avaliações de Elite",
    items: [
      {
        name: "Ricardo Mendes",
        role: "Lago Sul",
        text: "O aquecimento solar mudou nossa forma de usar a piscina. Agora as crianças aproveitam até no inverno. Atendimento técnico impecável!",
        stars: 5
      },
      {
        name: "Carolina Santos",
        role: "Alphaville",
        text: "A manutenção da Evolution é muito profissional. Eles deixaram minha casa de máquinas impecável e silenciosa. Recomendo muito.",
        stars: 5
      },
      {
        name: "Pedro Henrique",
        role: "Sudoeste",
        text: "Instalei o trocador de calor e o sistema de automação. Tudo funciona pelo celular. A tecnologia deles é de outro nível.",
        stars: 5
      },
      {
        name: "Maria Eduarda",
        role: "Lago Norte",
        text: "A reforma da minha piscina ficou incrível. O acabamento em pedras naturais superou minhas expectativas. Equipe muito caprichosa.",
        stars: 5
      }
    ]
  },
  faq: {
    title: "Perguntas Comuns",
    subtitle: "Dúvidas Frequentes",
    items: [
      {
        question: "Quanto tempo leva para aquecer uma piscina?",
        answer: "Depende da tecnologia. Um trocador de calor de alta performance pode aquecer a piscina em 24h a 48h. Já o sistema solar mantém a temperatura constante durante o dia. Em projetos híbridos, unimos o melhor dos dois mundos para aquecimento imediato e econômico."
      },
      {
        question: "O tratamento de sal é realmente melhor que o cloro?",
        answer: "Sim! A eletrólise de sal produz cloro natural de forma automática. A água fica muito mais leve, não irrita os olhos, não resseca a pele e não tem aquele cheiro forte de produtos químicos. Além disso, a manutenção diária é drasticamente reduzida."
      },
      {
        question: "É possível automatizar uma piscina já existente?",
        answer: "Com certeza. A Piscinas Evolution é especialista em retrofit. Podemos instalar sistemas de controle por aplicativo, sensores de temperatura e iluminação LED em quase qualquer estrutura de piscina já construída."
      },
      {
        question: "Qual o custo de manutenção mensal?",
        answer: "Com nossos sistemas de automação e tratamento de sal, o custo operacional cai significativamente. A economia de energia com bombas de velocidade variável e aquecimento solar costuma pagar o investimento em poucos meses."
      }
    ]
  }
};

export async function getSections() {
  try {
    const records = await prisma.paginaSection.findMany();
    const data: Record<string, any> = {};

    // Map database records
    records.forEach(rec => {
      data[rec.section] = rec.content;
    });

    // Merge with defaults for missing keys
    const merged: Record<string, any> = {};
    for (const key in DEFAULT_SECTIONS) {
      merged[key] = data[key] || DEFAULT_SECTIONS[key];
    }

    return merged;
  } catch (error) {
    console.error("Erro ao obter seções do site:", error);
    return DEFAULT_SECTIONS;
  }
}

export async function updateSection(section: string, content: any) {
  try {
    await checkAdmin();

    const record = await prisma.paginaSection.upsert({
      where: { section },
      update: { content },
      create: { section, content }
    });

    revalidatePath("/");
    return { success: true, record };
  } catch (error: any) {
    console.error(`Erro ao atualizar a seção ${section}:`, error);
    return { success: false, error: error.message || "Erro desconhecido" };
  }
}
