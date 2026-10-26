"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, Send, Camera, Share2, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { sendContactMessage } from "@/app/actions/contact";

export default function ContatoPage() {
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const res = await sendContactMessage(data);
    
    if (res.success) {
      setSent(true);
    } else {
      setError(res.error || "Erro ao enviar.");
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      title: "WhatsApp",
      value: "61 91441-2940",
      desc: "Atendimento comercial e suporte técnico imediato.",
      icon: Phone,
      link: "https://wa.me/556191441294"
    },
    {
      title: "E-mail",
      value: "contato@piscinasevolution.com.br",
      desc: "Envie seu projeto para análise técnica.",
      icon: Mail,
      link: "mailto:contato@piscinasevolution.com.br"
    },
    {
      title: "Instagram",
      value: "@piscinasevolution",
      desc: "Acompanhe nossos projetos e novidades.",
      icon: Camera,
      link: "https://instagram.com/piscinasevolution"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar config={{}} />
      
      {/* Header */}
      <section className="relative pt-32 pb-20 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/luxury_pool_design_brasilia_1777262096773.png" 
            alt="Pool Design" 
            className="w-full h-full object-cover opacity-[0.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50" />
        </div>
        <div className="container mx-auto px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Fale Conosco
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-8 leading-tight">
              Estamos Prontos para <br />
              <span className="text-secondary italic">Elevar seu Projeto</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-body">
              Seja para um novo aquecimento, automação ou manutenção de elite, 
              nossa equipe está à disposição.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((info, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
                  <info.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{info.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{info.desc}</p>
                <Link 
                  href={info.link}
                  className="text-lg font-bold text-primary hover:text-secondary transition-colors"
                >
                  {info.value}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-[60px] overflow-hidden shadow-2xl border border-slate-100 flex flex-col lg:flex-row">
            {/* Form Side */}
            <div className="lg:w-1/2 p-12 md:p-20">
              <h2 className="text-3xl font-bold text-primary mb-10">Envie uma mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nome Completo</label>
                    <input required name="nome" type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all" placeholder="Seu nome..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Telefone/WhatsApp</label>
                    <input required name="telefone" type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all" placeholder="(61) 99999-9999" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assunto do Interesse</label>
                  <select name="assunto" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all">
                    <option>Aquecimento Solar</option>
                    <option>Trocador de Calor</option>
                    <option>Manutenção de Elite</option>
                    <option>Projeto de Automação</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sua Mensagem</label>
                  <textarea required name="mensagem" rows={4} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all" placeholder="Conte-nos como podemos ajudar..."></textarea>
                </div>
                
                {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
                
                {sent ? (
                  <div className="bg-emerald-50 text-emerald-600 p-6 rounded-2xl flex items-center gap-4 border border-emerald-100">
                    <CheckCircle2 size={24} />
                    <div>
                      <p className="font-bold">Mensagem enviada!</p>
                      <p className="text-sm">Retornaremos seu contato em breve.</p>
                    </div>
                  </div>
                ) : (
                  <button 
                    disabled={loading}
                    className="w-full bg-primary text-white py-5 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={20} /> Enviar Solicitação</>}
                  </button>
                )}
              </form>
            </div>
            
            {/* Map/Info Side */}
            <div className="lg:w-1/2 bg-primary p-12 md:p-20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                 <img src="https://images.unsplash.com/photo-1540331547168-8b6402fb1331?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-10">Informações Adicionais</h3>
                <div className="space-y-8 flex-1">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Clock size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Horário de Atendimento</h4>
                      <p className="text-white/60 text-sm">Segunda a Sexta: 08:00 às 18:00</p>
                      <p className="text-white/60 text-sm">Sábado: 08:00 às 12:00</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Camera size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-4">Nossas Redes</h4>
                      <div className="flex gap-3">
                        <Link href="https://instagram.com/piscinasevolution" target="_blank" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"><Camera size={18} /></Link>
                        <Link href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"><Share2 size={18} /></Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 p-8 bg-white/5 rounded-[40px] border border-white/10">
                  <p className="text-sm italic text-white/70">
                    "O atendimento da Piscinas Evolution em Brasília é diferenciado. 
                    Equipe técnica extremamente preparada e pontual."
                  </p>
                  <p className="mt-4 font-bold text-secondary">— Ricardo S., Lago Sul</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer config={{}} />
    </main>
  );
}
