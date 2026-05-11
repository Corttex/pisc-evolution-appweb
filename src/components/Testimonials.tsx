"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
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
  },
  {
    name: "João Carlos",
    role: "Park Way",
    text: "O sistema de tratamento por sal foi a melhor escolha. Acabou a irritação nos olhos e a água está sempre cristalina. Show!",
    stars: 5
  },
  {
    name: "Beatriz Lima",
    role: "Jardim Botânico",
    text: "Empresa séria e comprometida com prazos. O projeto da nossa casa de máquinas ficou muito organizado e seguro.",
    stars: 5
  },
  {
    name: "Antônio Silva",
    role: "Guará",
    text: "Excelente pós-venda. Tive uma dúvida sobre a bomba e fui atendido rapidamente pelo WhatsApp. Muito confiáveis.",
    stars: 5
  },
  {
    name: "Fernanda Costa",
    role: "Águas Claras",
    text: "A iluminação LED que instalaram transformou o ambiente à noite. Ficou parecendo um resort. Muito satisfeita!",
    stars: 5
  },
  {
    name: "Marcos Oliveira",
    role: "Sobradinho",
    text: "Técnicos muito educados e limpos. Não deixaram nenhuma bagunça após a manutenção. Padrão diferenciado.",
    stars: 5
  },
  {
    name: "Luciana Rocha",
    role: "Octogonal",
    text: "O custo-benefício do aquecimento solar se pagou em poucos meses. Economia real na conta de energia.",
    stars: 5
  },
  {
    name: "Roberto Almeida",
    role: "Vicente Pires",
    text: "Minha piscina estava com vazamento e a Evolution resolveu de forma definitiva. Engenharia de verdade.",
    stars: 5
  },
  {
    name: "Cláudia Souza",
    role: "Cruzeiro",
    text: "O dashboard 'Minha Piscina' facilitou muito minha vida. Consigo ver o pH da água sem sair de casa.",
    stars: 5
  },
  {
    name: "Sérgio Ramos",
    role: "Noroeste",
    text: "Modernizamos todo o sistema de filtragem. A água nunca esteve tão limpa. Profissionais nota 10.",
    stars: 5
  },
  {
    name: "Patrícia Nunes",
    role: "Taguatinga",
    text: "Atendimento personalizado desde o primeiro contato. Entenderam exatamente o que eu precisava para a reforma.",
    stars: 5
  },
  {
    name: "Gabriel Ferraz",
    role: "Planaltina",
    text: "Instalamos o sistema de automação e agora a piscina liga o aquecimento sozinha. Praticidade total.",
    stars: 5
  },
  {
    name: "Vanessa Guedes",
    role: "Santa Maria",
    text: "Contratei a manutenção semanal e estou amando. A piscina está sempre pronta para o uso, sem estresse.",
    stars: 5
  },
  {
    name: "Jorge Amado",
    role: "Brazlândia",
    text: "Empresa nota dez em pontualidade. Cumpriram todo o cronograma da construção sem atrasos. Recomendo!",
    stars: 5
  },
  {
    name: "Helena Castro",
    role: "Ceilândia",
    text: "A equipe técnica explicou detalhadamente como cuidar do novo filtro. Muito didáticos e atenciosos.",
    stars: 5
  }
];


export const Testimonials = () => {
  const featured = testimonials.slice(0, 4);
  const others = testimonials.slice(4);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="font-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">Avaliações de Elite</span>
          <h2 className="text-4xl md:text-5xl text-primary font-bold">O que nossos clientes dizem</h2>
        </div>
        
        {/* Featured 4 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featured.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 relative group hover:-translate-y-1 transition-all"
            >
              <div className="flex gap-1 mb-4 text-tertiary">
                {[...Array(test.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <p className="text-on-surface-variant font-body italic mb-6 text-sm leading-relaxed">
                "{test.text}"
              </p>
              
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-primary font-bold text-base">{test.name}</h4>
                <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel for Others */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
            {others.map((test, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/40 snap-start"
              >
                <div className="flex gap-1 mb-3 text-tertiary/60">
                  {[...Array(test.stars)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-on-surface-variant text-xs italic mb-4">"{test.text}"</p>
                <div className="pt-3 border-t border-slate-200/50">
                  <h4 className="text-primary font-bold text-sm">{test.name}</h4>
                  <p className="text-[8px] uppercase tracking-tighter">{test.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="absolute right-0 top-0 bottom-8 w-32 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-100">
            <div className="flex gap-0.5">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-secondary" />)}
            </div>
            <span className="text-sm font-bold text-primary">Satisfação Máxima: +500 Piscinas Atendidas</span>
          </div>
        </div>
      </div>
    </section>
  );
};
