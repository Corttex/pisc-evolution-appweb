"use client";

import React, { useState, useEffect } from "react";
import { 
  Droplets, 
  Thermometer, 
  Calendar, 
  Clock, 
  Activity, 
  Shield, 
  Wrench, 
  Settings, 
  LogOut, 
  Beaker,
  ShieldCheck,
  Zap,
  ArrowRight,
  Loader2,
  MessageCircle,
  MessageSquare,
  Sparkles,
  Navigation,
  CheckCircle2,
  Phone,
  X,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { logoutCliente, getSessionCliente } from "../actions/auth";
import { toast, Toaster } from "react-hot-toast";

const GlassCard = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    onClick={onClick}
    className={`bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group ${className}`}
  >
    {children}
  </motion.div>
);

export default function MinhaPiscinaPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const data = await getSessionCliente();
        setSession(data);
      } catch (err) {
        console.error("Session load failed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-secondary to-blue-600 flex items-center justify-center shadow-2xl shadow-secondary/40">
            <Droplets className="text-white" size={40} />
          </div>
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Evolution Experience</p>
        </motion.div>
      </div>
    );
  }

  if (!session || !session.cliente) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/5 border border-white/10 rounded-[3rem] p-12 text-center space-y-8 backdrop-blur-3xl shadow-2xl"
        >
          <div className="w-24 h-24 bg-rose-500/10 rounded-[2rem] flex items-center justify-center mx-auto text-rose-500 shadow-inner">
            <Activity size={48} />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-black text-white tracking-tighter">Sessão Expirada</h1>
            <p className="text-slate-400 font-medium leading-relaxed">
              Por favor, realize o login novamente para acessar sua piscina e o centro de controle inteligente.
            </p>
          </div>
          <a 
            href="/login" 
            className="flex items-center justify-center gap-3 w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
            Realizar Login <ArrowRight size={18} />
          </a>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">Piscinas Evolution • Segurança de Dados</p>
        </motion.div>
      </div>
    );
  }

  const { cliente, config } = session;
  const ultimaMedicao = cliente.medicoes?.[0] || { ph: 7.2, cloro: 2.0, temperatura: 28, alcalinidade: 100, data: new Date() };

  const [showSupport, setShowSupport] = useState(false);
  const [tickets, setTickets] = useState(cliente.tickets || []);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isOpeningTicket, setIsOpeningTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({ assunto: "", mensagem: "" });
  const [sending, setSending] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const handleOpenTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { createTicketCliente } = await import("../actions/auth");
    const res = await createTicketCliente(newTicket.assunto, newTicket.mensagem);
    if (res.success) {
      setTickets([res.ticket, ...tickets]);
      setIsOpeningTicket(false);
      setNewTicket({ assunto: "", mensagem: "" });
      toast.success("Chamado aberto com sucesso!");
    }
    setSending(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setSending(true);
    const { sendClienteMessage } = await import("../actions/auth");
    const res = await sendClienteMessage(selectedTicket.id, chatMessage);
    if (res.success) {
      setSelectedTicket({
        ...selectedTicket,
        mensagens: [...(selectedTicket.mensagens || []), res.mensagem]
      });
      setChatMessage("");
    }
    setSending(false);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-secondary selection:text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <Toaster position="top-right" />

      <nav className="relative z-50 px-8 py-8 flex justify-between items-center max-w-7xl mx-auto">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10">
            <Droplets className="text-secondary" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">Evolution</p>
            <p className="text-sm font-black tracking-tighter">CLIENT PORTAL</p>
          </div>
        </motion.div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setShowSupport(true)}
            className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all font-bold text-xs"
          >
            <MessageCircle size={18} className="text-secondary" />
            Central de Ajuda
          </button>
          <button 
            onClick={async () => {
              await logoutCliente();
              window.location.href = "/";
            }}
            className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-red-500/20 hover:text-red-500 transition-all flex items-center justify-center border border-white/10 group"
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </nav>

      <section className="relative z-40 px-8 pt-12 pb-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-secondary/10 rounded-full border border-secondary/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] font-black text-secondary uppercase tracking-widest">Sincronizado com Engenharia</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
              Olá, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">{cliente.nome.split(" ")[0]}!</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-lg mb-10 leading-relaxed">
              Bem-vindo ao seu centro de controle inteligente. Sua piscina está em <span className="text-white font-bold italic">equilíbrio absoluto</span>.
            </p>
            <div className="flex flex-wrap gap-4">
               <motion.a 
                href={`https://wa.me/${config?.site_whatsapp.replace(/\D/g, '')}?text=Olá! Sou o cliente ${cliente.nome} e gostaria de solicitar uma visita técnica.`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-slate-950 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-2xl shadow-white/10"
               >
                 <Sparkles size={18} /> Solicitar Visita
               </motion.a>
               <motion.button 
                onClick={() => setShowSupport(true)}
                whileHover={{ scale: 1.05 }}
                className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center gap-3"
               >
                 <MessageSquare size={18} /> Abrir Chamado
               </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="hidden lg:block relative"
          >
             <div className="absolute inset-0 bg-secondary/40 rounded-full blur-[120px] opacity-20" />
             <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-12 rounded-[4rem] backdrop-blur-3xl shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 p-8">
                   <ShieldCheck className="text-secondary/40" size={120} />
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">Water Intelligence v2.0</p>
                <div className="flex items-baseline gap-2 mb-8">
                   <h2 className="text-8xl font-black tracking-tighter">98</h2>
                   <span className="text-2xl font-black text-secondary">%</span>
                </div>
                <p className="text-xl font-bold text-white mb-2">Purity Score</p>
                <p className="text-slate-400 font-medium">Sua água está nos parâmetros ideais de balneabilidade.</p>
             </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-30 px-8 pb-32 max-w-7xl mx-auto -mt-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <GlassCard className="p-10 !bg-gradient-to-br !from-white/5 !to-white/[0.02]">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary shadow-lg shadow-secondary/10">
                    <Activity size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-white">Matriz Química</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                      Última Captura: {new Date(ultimaMedicao.data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-2xl border border-emerald-500/20">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Ativo</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "pH Nível", value: ultimaMedicao.ph.toFixed(1), icon: Droplets, color: "text-blue-400", unit: "pH", status: "Ideal" },
                  { label: "Cloro Livre", value: ultimaMedicao.cloro.toFixed(1), icon: Zap, color: "text-amber-400", unit: "ppm", status: "Protegida" },
                  { label: "Temperatura", value: ultimaMedicao.temperatura || "28", icon: Thermometer, color: "text-rose-400", unit: "°C", status: "Agradável" },
                  { label: "Alcalinid.", value: ultimaMedicao.alcalinidade || "100", icon: Beaker, color: "text-emerald-400", unit: "ppm", status: "Estável" }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl group hover:bg-white/10 transition-all text-center">
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-white group-hover:${item.color} transition-colors shadow-inner`}>
                      <item.icon size={26} />
                    </div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{item.label}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-black text-white">{item.value}</span>
                      <span className="text-[10px] font-bold text-slate-500">{item.unit}</span>
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${item.color} mt-4 block opacity-60`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="grid md:grid-cols-2 gap-8">
               <GlassCard className="p-8">
                  <div className="flex items-center justify-between mb-10">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                           <Settings size={22} />
                        </div>
                        <h4 className="text-lg font-black tracking-tight">Automação</h4>
                     </div>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hardware</span>
                  </div>
                  
                  <div className="space-y-4">
                    {(cliente.equipamentos || []).length > 0 ? (
                      (cliente.equipamentos || []).slice(0, 3).map((eq: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl group hover:bg-white/[0.08] transition-all">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-secondary transition-colors">
                                 <Zap size={18} />
                              </div>
                              <span className="text-sm font-bold">{eq.nome}</span>
                           </div>
                           <div className="w-8 h-4 bg-emerald-500/20 rounded-full flex items-center px-1">
                              <div className="w-2 h-2 rounded-full bg-emerald-500" />
                           </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-8 text-slate-600 font-medium text-sm italic">Nenhum equipamento vinculado.</p>
                    )}
                  </div>
               </GlassCard>

               <GlassCard className="!bg-gradient-to-br !from-blue-600 !to-primary p-10 flex flex-col justify-between group cursor-pointer" onClick={() => setShowSupport(true)}>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white mb-8">
                       <Wrench size={28} />
                    </div>
                    <h3 className="text-2xl font-black leading-tight mb-4 text-white">Central de Chamados</h3>
                    <p className="text-blue-100/70 text-sm font-medium mb-8">Dúvidas técnicas ou problemas operacionais? Abra um chamado e fale direto com a engenharia.</p>
                  </div>
                  <div className="relative z-10 flex items-center gap-3 text-white font-black uppercase tracking-[0.2em] text-[10px] group-hover:gap-5 transition-all">
                    Acessar Suporte Interno <ArrowRight size={16} />
                  </div>
               </GlassCard>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <GlassCard className="p-8 !bg-indigo-600/5">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                     <Calendar size={22} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tight">Próxima Visita</h4>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-0.5">Agendamento Confirmado</p>
                  </div>
               </div>

               {cliente.agendas?.[0] ? (
                 <div className="space-y-6">
                    <div className="p-6 bg-indigo-600/10 rounded-3xl border border-indigo-500/20">
                       <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-4xl font-black text-indigo-200">
                            {new Date(cliente.agendas[0].data).toLocaleDateString('pt-BR', { day: '2-digit' })}
                          </span>
                          <span className="text-lg font-bold text-indigo-400">
                            {new Date(cliente.agendas[0].data).toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()}
                          </span>
                       </div>
                       <p className="text-xs font-bold text-indigo-300/60 uppercase tracking-widest">
                         {new Date(cliente.agendas[0].data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} • {cliente.agendas[0].servico}
                       </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 px-2">
                       <Clock size={16} className="text-indigo-500" /> Técnico chegará no horário previsto.
                    </div>
                 </div>
               ) : (
                 <div className="py-10 text-center space-y-4">
                    <p className="text-slate-600 font-medium italic text-sm">Sem visitas programadas.</p>
                    <button className="text-xs font-black text-secondary hover:underline uppercase tracking-widest">Agendar Agora</button>
                 </div>
               )}
            </GlassCard>

            <GlassCard className="p-10 !bg-[#0F172A] border-white/5">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                     <ShieldCheck size={26} />
                  </div>
                  <h4 className="text-xl font-black tracking-tight">Privilégios Evolution</h4>
               </div>

               <div className="space-y-6">
                  {["Análise Laboratorial 24/7", "Prioridade Máxima de Atendimento", "Garantia Vitalícia em Peças", "Consultoria Direta com Engenharia"].map((p, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                       <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500/10 transition-colors">
                          <CheckCircle2 size={16} />
                       </div>
                       <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">{p}</span>
                    </div>
                  ))}
               </div>

               <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Status da Conta</p>
                    <p className="text-sm font-bold text-emerald-500 uppercase tracking-tighter">Membro Platinum+</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-emerald-500 flex items-center justify-center">
                     <span className="text-[10px] font-black">100%</span>
                  </div>
               </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showSupport && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSupport(false)}
              className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl h-[90vh] md:h-[80vh] bg-[#0F172A] rounded-t-[3rem] md:rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black">Central de Ajuda</h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Suporte Direto Evolution</p>
                  </div>
                </div>
                <button onClick={() => setShowSupport(false)} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow flex overflow-hidden">
                <div className="w-80 border-r border-white/5 overflow-y-auto p-6 space-y-4">
                  <button 
                    onClick={() => setIsOpeningTicket(true)}
                    className="w-full py-4 bg-secondary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all mb-6"
                  >
                    + Novo Chamado
                  </button>

                  {tickets.map((t: any) => (
                    <button 
                      key={t.id}
                      onClick={() => {
                        setSelectedTicket(t);
                        setIsOpeningTicket(false);
                      }}
                      className={`w-full text-left p-5 rounded-[1.5rem] border transition-all ${
                        selectedTicket?.id === t.id 
                          ? "bg-white/10 border-white/20 shadow-xl" 
                          : "bg-white/5 border-white/5 hover:bg-white/[0.07]"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">#{t.id.slice(0,4)}</span>
                        <div className={`w-2 h-2 rounded-full ${t.status === 'Aberto' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                      </div>
                      <p className="font-bold text-sm truncate mb-1">{t.assunto}</p>
                      <p className="text-[10px] text-slate-500 font-medium truncate">{t.mensagens?.[0]?.texto || "Sem mensagens"}</p>
                    </button>
                  ))}
                </div>

                <div className="flex-grow flex flex-col bg-black/20">
                  {isOpeningTicket ? (
                    <form onSubmit={handleOpenTicket} className="p-10 space-y-8 max-w-lg mx-auto w-full">
                      <h3 className="text-3xl font-black tracking-tighter">Como podemos ajudar?</h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Assunto do Chamado</label>
                          <input 
                            required
                            value={newTicket.assunto}
                            onChange={e => setNewTicket({...newTicket, assunto: e.target.value})}
                            placeholder="Ex: Problema no aquecimento"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-secondary/30 transition-all font-bold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Descrição Detalhada</label>
                          <textarea 
                            required
                            rows={5}
                            value={newTicket.mensagem}
                            onChange={e => setNewTicket({...newTicket, mensagem: e.target.value})}
                            placeholder="Descreva o que está acontecendo..."
                            className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 outline-none focus:ring-2 focus:ring-secondary/30 transition-all font-medium resize-none"
                          />
                        </div>
                        <button 
                          type="submit"
                          disabled={sending}
                          className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                          {sending ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                          Abrir Chamado Agora
                        </button>
                      </div>
                    </form>
                  ) : selectedTicket ? (
                    <>
                      <div className="flex-grow overflow-y-auto p-8 space-y-6 flex flex-col">
                        {(selectedTicket.mensagens || []).map((m: any) => (
                          <div key={m.id} className={`flex flex-col ${m.sender === 'Cliente' ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-[80%] p-5 rounded-[1.5rem] ${
                              m.sender === 'Cliente' 
                                ? "bg-secondary text-white rounded-tr-none" 
                                : "bg-white/10 text-white border border-white/10 rounded-tl-none"
                            }`}>
                              <p className="text-sm font-medium leading-relaxed">{m.texto}</p>
                            </div>
                            <span className="text-[9px] font-bold text-slate-600 mt-2 px-2 uppercase">
                              {new Date(m.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="p-6 border-t border-white/5">
                        <form onSubmit={handleSendMessage} className="flex gap-3">
                          <input 
                            value={chatMessage}
                            onChange={e => setChatMessage(e.target.value)}
                            placeholder="Escreva sua mensagem..."
                            className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-secondary/30 transition-all font-medium"
                          />
                          <button 
                            type="submit"
                            disabled={sending || !chatMessage.trim()}
                            className="bg-secondary text-white p-4 rounded-2xl shadow-lg shadow-secondary/20 hover:scale-105 transition-all disabled:opacity-50"
                          >
                            <Send size={20} />
                          </button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-10 opacity-40">
                      <MessageSquare size={64} className="mb-6" />
                      <h3 className="text-xl font-black">Selecione uma conversa</h3>
                      <p className="text-sm font-medium">Suas interações aparecerão aqui.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setShowSupport(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 12 }}
        className="fixed bottom-10 right-10 z-[100] w-20 h-20 bg-secondary text-white rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(3,169,244,0.4)] border-4 border-[#020617] group"
      >
        <MessageSquare size={32} />
        <span className="absolute right-full mr-6 px-6 py-3 bg-white text-slate-950 rounded-2xl text-xs font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Suporte Direto
        </span>
      </motion.button>

      <footer className="relative z-20 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                 <Droplets className="text-secondary" size={24} />
                 <span className="font-black text-xl tracking-tighter">EVOLUTION</span>
              </div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-[0.3em]">Excellence in Pool Care & Intelligence</p>
           </div>
           <div className="flex items-center gap-8">
              <div className="text-right hidden md:block">
                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Central de Atendimento</p>
                 <p className="text-sm font-bold text-slate-400">{config?.site_whatsapp}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                 <Phone size={20} />
              </div>
           </div>
        </div>
        <div className="text-center mt-12">
           <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em]">© 2026 PISCINAS EVOLUTION • ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </main>
  );
}
