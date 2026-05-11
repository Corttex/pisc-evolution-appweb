"use client";

import React, { useState } from "react";
import { 
  ChevronRight, 
  CreditCard, 
  MapPin, 
  Calendar,
  Clock,
  Copy,
  Search,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Smartphone,
  Wallet
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buscarAgendamentoPorCpf } from "@/app/actions/agenda";

// --- Design Tokens & Components ---
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-blue-500/10 ${className}`}
  >
    {children}
  </motion.div>
);

const PremiumBadge = ({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "green" | "gold" }) => {
  const colors = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    gold: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border ${colors[color]}`}>
      {children}
    </span>
  );
};

export default function TrackingPage() {
  const [step, setStep] = useState(1); // 1: Search, 2: Result
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await buscarAgendamentoPorCpf(cpf);
      if (response.success && response.agendamentos && response.agendamentos.length > 0) {
        setSelectedAgenda(response.agendamentos[0]);
        setStep(2);
      } else {
        alert("Nenhum agendamento encontrado para este documento.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar agendamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center justify-center p-6 selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Premium Tracking</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            PISCINAS EVOLUTION
          </h1>
          <p className="text-slate-400 font-medium">Acompanhe seu projeto em tempo real com transparência total.</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard className="relative overflow-hidden">
                {/* Search Decorative Icon */}
                <div className="absolute -right-8 -top-8 text-white/5 rotate-12">
                  <Search size={160} />
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-2">Acesso do Cliente</h2>
                  <p className="text-slate-400 text-sm mb-8">Insira seu CPF ou CNPJ para localizar seus serviços agendados.</p>
                  
                  <form onSubmit={handleSearch} className="space-y-6">
                    <div className="group">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1 group-focus-within:text-blue-400 transition-colors">
                        Identificação Nacional
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="000.000.000-00" 
                          value={cpf}
                          onChange={(e) => setCpf(e.target.value)}
                          className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono text-lg"
                          required
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600">
                          <Smartphone size={20} />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full relative group h-16 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:scale-105 transition-transform duration-500" />
                      <div className="relative flex items-center justify-center gap-3 text-white font-black text-lg">
                        {loading ? "LOCALIZANDO..." : "BUSCAR AGENDAMENTO"}
                        {!loading && <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />}
                      </div>
                    </button>
                  </form>

                  <div className="mt-10 flex items-center justify-center gap-6 border-t border-white/5 pt-8">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="text-emerald-500" size={18} />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dados Seguros</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-blue-500" size={18} />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocolo SSL</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Main Service Info */}
              <GlassCard className="!p-0 overflow-hidden">
                <div className="bg-gradient-to-br from-blue-600/20 to-transparent p-8 border-b border-white/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <PremiumBadge color={selectedAgenda?.pagamentoStatus === 'pago' ? 'green' : 'gold'}>
                        {selectedAgenda?.pagamentoStatus === 'pago' ? 'Agendamento Confirmado' : 'Aguardando Pagamento'}
                      </PremiumBadge>
                      <h2 className="text-3xl font-black text-white mt-4 tracking-tight">{selectedAgenda?.servico}</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Cód. Rastreio</p>
                      <p className="font-mono font-black text-blue-400 text-lg">#EV-{selectedAgenda?.id.slice(-6).toUpperCase()}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 border border-white/10 shrink-0">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Data Prevista</p>
                        <p className="text-lg font-bold text-white">
                          {new Date(selectedAgenda?.data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 border border-white/10 shrink-0">
                        <Clock size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Janela de Horário</p>
                        <p className="text-lg font-bold text-white">Das 08:30 às 10:30</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Localização</p>
                        <p className="text-lg font-bold text-white leading-tight">
                          {selectedAgenda?.cliente?.endereco || "Endereço cadastrado"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-amber-400 border border-white/10 shrink-0">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Responsável</p>
                        <p className="text-lg font-bold text-white">Equipe Técnica Evolution</p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Payment Section (Conditional) */}
              {selectedAgenda?.pagamentoStatus !== 'pago' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl opacity-90" />
                  <div className="relative z-10 p-8 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                        <Wallet className="text-white" size={28} />
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">Pagamento de Sinal</h3>
                      </div>
                      <p className="text-blue-100 mb-6 text-sm">Realize o pagamento do sinal para confirmar definitivamente sua agenda.</p>
                      
                      <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                        <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1">Total do Sinal</p>
                        <p className="text-4xl font-black text-white">
                          <span className="text-lg font-medium mr-1 text-blue-200">R$</span>
                          {selectedAgenda?.valorSinal?.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 space-y-4 w-full md:w-auto">
                      <div className="bg-white p-3 rounded-2xl shadow-2xl mx-auto md:mx-0 w-max group-hover:scale-105 transition-transform duration-500">
                        {selectedAgenda?.pixQrCode ? (
                          <img 
                            src={`data:image/png;base64,${selectedAgenda.pixQrCode}`} 
                            alt="QR Code Pix"
                            className="w-32 h-32"
                          />
                        ) : (
                          <div className="w-32 h-32 bg-slate-200 animate-pulse rounded-lg flex items-center justify-center text-slate-400">
                            QR CODE
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(selectedAgenda?.pixCopiaECola || "");
                          alert("Copiado com sucesso!");
                        }}
                        className="w-full bg-white text-blue-900 py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-slate-50 transition-all active:scale-95"
                      >
                        <Copy size={18} /> Copia e Cola
                      </button>
                    </div>
                  </div>
                  
                  {/* Decorative Logo */}
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo%E2%80%94Pix.svg" 
                    alt="Logo Pix" 
                    className="absolute -bottom-4 -right-4 h-24 opacity-5 pointer-events-none -rotate-12" 
                  />
                </motion.div>
              )}

              {/* Status Message */}
              <div className="text-center py-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
                  {selectedAgenda?.pagamentoStatus === 'pago' 
                    ? "✓ Seu serviço está na fila de execução" 
                    : "⚠ Confirmação pendente de pagamento"}
                </p>
              </div>

              <button 
                onClick={() => setStep(1)}
                className="w-full group py-6 flex items-center justify-center gap-2 text-slate-500 font-bold text-sm uppercase tracking-widest hover:text-white transition-colors"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                Nova Pesquisa
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">
            Powered by Evolution Intelligence © 2024
          </p>
        </div>
      </div>
    </div>
  );
}

