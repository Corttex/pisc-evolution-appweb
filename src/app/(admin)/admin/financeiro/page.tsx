"use client";

import React, { useState, useMemo } from "react";
import { 
  Search,
  Filter,
  MoreVertical,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Download,
  AlertCircle,
  Zap,
  QrCode,
  Copy,
  Loader2,
  PieChart as PieChartIcon
} from "lucide-react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { gerarCobrancaPix } from "@/app/actions/asaas";
import { getDashboardStats } from "@/app/actions/admin";

// --- Mock Data with more "Premium" feel ---
// --- Fallback Data ---
const defaultVendas = [
  { name: "Dom", vendas: 0, meta: 1000 },
  { name: "Seg", vendas: 0, meta: 1000 },
  { name: "Ter", vendas: 0, meta: 1000 },
  { name: "Qua", vendas: 0, meta: 1000 },
  { name: "Qui", vendas: 0, meta: 1000 },
  { name: "Sex", vendas: 0, meta: 1000 },
  { name: "Sáb", vendas: 0, meta: 1000 },
];

const defaultDistribuicao = [
  { name: "Manutenção", value: 0, color: "#3B82F6" },
  { name: "Instalação", value: 0, color: "#10B981" },
  { name: "Produtos", value: 0, color: "#F59E0B" },
];

// --- Components ---
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-8 ${className}`}
  >
    {children}
  </motion.div>
);

const StatCard = ({ label, value, change, positive, icon: Icon, color }: any) => (
  <GlassCard className="relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`} />
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-${color.replace('bg-', '')}`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider ${positive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
        {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
  </GlassCard>
);

export default function FinanceiroPage() {
  const [pixAmount, setPixAmount] = useState("");
  const [pixDesc, setPixDesc] = useState("");
  const [pixResult, setPixResult] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function load() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleGerarPix = async () => {
    if (!pixAmount) return;
    setGenerating(true);
    const res = await gerarCobrancaPix(Number(pixAmount), pixDesc);
    setGenerating(false);
    if (res.success) {
      setPixResult(res.payload);
    } else {
      alert(res.error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixResult.pixQrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inteligência Financeira</h1>
           <p className="text-slate-500 font-medium mt-1">Análise volumétrica e conversão de ativos em tempo real.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="h-14 px-6 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
              <CalendarIcon size={18} />
              Últimos 30 dias
           </button>
           <button className="h-14 px-8 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center gap-3 shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all">
              <Download size={18} />
              Exportar BI
           </button>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Receita Bruta" 
          value={loading ? "..." : `R$ ${stats?.revenueMonth.toLocaleString('pt-BR') || '0,00'}`} 
          change="+18.4%" 
          positive={true} 
          icon={DollarSign} 
          color="bg-blue-600" 
        />
        <StatCard 
          label="A Receber (Pendentes)" 
          value={loading ? "..." : `R$ ${stats?.agendas?.filter((a: any) => a.pagamentoStatus !== 'pago').reduce((acc: number, a: any) => acc + a.valorTotal, 0).toLocaleString('pt-BR') || '0,00'}`} 
          change={`${stats?.agendas?.filter((a: any) => a.pagamentoStatus !== 'pago').length || 0} faturas`} 
          positive={false} 
          icon={Clock} 
          color="bg-amber-600" 
        />
        <StatCard 
          label="Eficiência de Cobrança" 
          value={loading ? "..." : `${Math.round((stats?.agendas?.filter((a: any) => a.pagamentoStatus === 'pago').length / (stats?.agendas?.length || 1)) * 100)}%`} 
          change="Sincronizado" 
          positive={true} 
          icon={CheckCircle2} 
          color="bg-emerald-600" 
        />
        <StatCard 
          label="Tickets Financeiros" 
          value={loading ? "..." : stats?.openTickets || "0"} 
          change="Suporte Ativo" 
          positive={false} 
          icon={CreditCard} 
          color="bg-rose-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Chart */}
        <div className="lg:col-span-2">
          <GlassCard className="h-full">
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h3 className="text-xl font-black text-slate-900">Performance de Vendas</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Comparativo Real vs Meta</p>
               </div>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-blue-500" />
                     <span className="text-[10px] font-bold text-slate-400 uppercase">Realizado</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-slate-200" />
                     <span className="text-[10px] font-bold text-slate-400 uppercase">Meta</span>
                  </div>
               </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.dataVendas || defaultVendas}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px' }}
                  />
                  <Area type="monotone" dataKey="meta" stroke="#e2e8f0" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                  <Area type="monotone" dataKey="vendas" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* PIX Generator - Reimagined */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#0F172A] rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between border border-white/5 shadow-2xl shadow-blue-900/20"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px]" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
               <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <Zap size={24} className="text-white" />
               </div>
               <div>
                  <h3 className="text-xl font-black">Fast Payment</h3>
                  <p className="text-blue-400/60 text-[10px] font-bold uppercase tracking-widest">Geração Imediata PIX</p>
               </div>
            </div>

            <div className="space-y-6">
               <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-blue-400 transition-colors">Valor Nominal (R$)</label>
                  <input 
                    type="number" 
                    value={pixAmount}
                    onChange={(e) => setPixAmount(e.target.value)}
                    placeholder="0,00" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-black text-2xl text-white placeholder:text-white/10" 
                  />
               </div>
               <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-blue-400 transition-colors">Descrição Técnica</label>
                  <input 
                    type="text" 
                    value={pixDesc}
                    onChange={(e) => setPixDesc(e.target.value)}
                    placeholder="Ex: Aquecimento Solar" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all text-sm font-medium" 
                  />
               </div>

               <button 
                  onClick={handleGerarPix}
                  disabled={generating || !pixAmount}
                  className="w-full bg-white text-slate-900 h-16 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5 disabled:opacity-20"
               >
                  {generating ? <Loader2 className="animate-spin" /> : <QrCode size={20} />}
                  {generating ? "Processando..." : "Emitir Cobrança"}
               </button>
            </div>
          </div>

          <AnimatePresence>
            {pixResult && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-white rounded-3xl p-6 flex flex-col items-center gap-4 relative z-10"
              >
                <div className="p-2 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-32 h-32 bg-white flex items-center justify-center">
                    <QrCode size={100} className="text-slate-900" />
                  </div>
                </div>
                <div className="w-full space-y-3">
                  <button 
                    onClick={copyToClipboard}
                    className="w-full h-12 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                  >
                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    {copied ? "Copiado!" : "Copiar Chave Pix"}
                  </button>
                  <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Válido por 30 minutos</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Recent Transactions List */}
      <GlassCard>
        <div className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                 <Activity size={24} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg">Controle de Recebíveis</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest text-left">Acompanhamento de Pagamentos por Serviço</p>
              </div>
           </div>
           <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all">Todos</button>
              <button className="px-4 py-2 bg-rose-50 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-rose-100 hover:bg-rose-100 transition-all">Pendentes</button>
           </div>
        </div>
        
        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b border-slate-50">
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente / Serviço</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ação</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {loading ? (
                   <tr><td colSpan={5} className="py-8 text-center text-slate-400">Sincronizando dados...</td></tr>
                 ) : (stats?.agendas || []).length === 0 ? (
                   <tr><td colSpan={5} className="py-8 text-center text-slate-400">Nenhuma transação registrada.</td></tr>
                 ) : stats.agendas.map((item: any, i: number) => (
                   <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                      <td className="py-4">
                         <p className="font-bold text-slate-900">{item.cliente?.nome}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">{item.servico}</p>
                      </td>
                      <td className="py-4 text-sm font-medium text-slate-600">{new Date(item.data).toLocaleDateString('pt-BR')}</td>
                      <td className="py-4 font-black text-slate-900 text-sm">R$ {item.valorTotal.toLocaleString('pt-BR')}</td>
                      <td className="py-4">
                         <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            item.pagamentoStatus === 'pago' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                         }`}>
                            {item.pagamentoStatus}
                         </span>
                      </td>
                      <td className="py-4 text-right">
                         {item.pagamentoStatus !== 'pago' && (
                            <button 
                              onClick={async () => {
                                const { updateAgendaStatus } = await import("@/app/actions/admin");
                                const res = await updateAgendaStatus(item.id, item.status, "pago");
                                if (res.success) window.location.reload();
                              }}
                              className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
                            >
                               Baixar
                            </button>
                         )}
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
         </div>
       </GlassCard>
      </div>
    </div>
  );
}
