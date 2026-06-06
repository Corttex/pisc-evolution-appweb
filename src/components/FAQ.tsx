"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
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
];

export const FAQ = ({ content }: { content?: any }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const subtitle = content?.subtitle || "Dúvidas Frequentes";
  const title = content?.title || "Perguntas Comuns";
  const itemsList = content?.items || faqs;

  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">{subtitle}</span>
          <h2 className="text-4xl md:text-5xl text-primary font-bold tracking-tight">{title}</h2>
        </div>

        <div className="space-y-4">
          {itemsList.map((faq: any, index: number) => (
            <motion.div
              key={index}

              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left bg-white hover:bg-slate-50/50 transition-colors"
              >
                <span className="text-lg font-bold text-primary pr-8">{faq.question}</span>
                <div className={`p-2 rounded-full ${openIndex === index ? 'bg-secondary text-white' : 'bg-slate-100 text-primary'} transition-all`}>
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 text-on-surface-variant font-body leading-relaxed border-t border-slate-50 bg-slate-50/30 text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
