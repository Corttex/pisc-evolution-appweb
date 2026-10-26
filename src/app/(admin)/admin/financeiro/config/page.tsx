"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, trend, trendType, icon: Icon, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 ${color}/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />
    <div className="relative z-10">
      <div className={`w-12 h-12 rounded-2xl ${color}/10 ${color.replace('bg-', 'text-')} flex items-center justify-center mb-4`}>
        <Icon size={24} />
      </div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-black text-slate-900">{value}</h3>
        {trend && (
          <span className={`text-[10px] font-black flex items-center gap-0.5 ${trendType === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trendType === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trend}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

export default function FinanceReportPage() {
  const [period, setPeriod] = useState("month");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function load() {
      try {
        const { getDashboardStats } = await import("@/app/actions/admin");
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalRevenue = stats?.revenueMonth || 0;
  const pendingRevenue = stats?.pendingRevenue || 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-black text-slate-900 tracking-tight">Relatório Financeiro Estratégico</h1>
           <p className="text-sm text-slate-500 font-medium">Análise de fluxos, conversão e saúde financeira em tempo real.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex">
            {["week", "month", "year"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  period === p ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {p === 'week' ? 'Semana' : p === 'month' ? 'Mês' : 'Ano'}
              </button>
            ))}
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} /> Exportar BI
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Faturamento Bruto" 
          value={loading ? "..." : `R$ ${totalRevenue.toLocaleString('pt-BR')}`} 
          trend="+18.4%" 
          trendType="up" 
          icon={DollarSign} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Ticket Médio" 
          value={loading ? "..." : `R$ ${(totalRevenue / (stats?.activeClients || 1)).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`} 
          trend="Performance" 
          trendType="up" 
          icon={TrendingUp} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Receita Pendente" 
          value={loading ? "..." : `R$ ${pendingRevenue.toLocaleString('pt-BR')}`} 
          trend="A Receber" 
          trendType="down" 
          icon={Clock} 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Eficiência Operacional" 
          value={loading ? "..." : `${Math.round(((totalRevenue) / (totalRevenue + pendingRevenue || 1)) * 100)}%`} 
          icon={CheckCircle2} 
          color="bg-indigo-500" 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" /> Performance Mensal
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Realizado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-200 rounded-full" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Projetado</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end gap-2 md:gap-4 px-2">
            {[40, 60, 45, 90, 65, 80, 100, 70, 85, 95, 110, 120].map((h, i) => (
              <div key={i} className="flex-grow flex flex-col items-center gap-2 group">
                <div className="w-full relative">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="w-full bg-slate-100 rounded-t-lg group-hover:bg-primary/10 transition-colors"
                  />
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h * 0.7}%` }}
                    className="absolute bottom-0 w-full bg-primary rounded-t-lg shadow-lg shadow-primary/20"
                  />
                </div>
                <span className="text-[8px] font-bold text-slate-400 uppercase">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/20 flex flex-col justify-between">
          <div>
            <h3 className="font-bold mb-6 flex items-center gap-2 text-white">
              <AlertCircle size={18} className="text-amber-500" /> Cobranças Pendentes
            </h3>
            <div className="space-y-4">
              {[
                { name: "Carlos Andrade", val: "R$ 450,00", days: "5 dias" },
                { name: "Marina Silva", val: "R$ 320,00", days: "2 dias" },
                { name: "Roberto Souza", val: "R$ 280,00", days: "12 dias" }
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                  <div>
                    <p className="text-sm font-bold">{c.name}</p>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-1">Atraso: {c.days}</p>
                  </div>
                  <span className="text-sm font-black text-amber-500">{c.val}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full py-4 mt-8 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
            Ver Todas Pendências
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Clock size={18} className="text-primary" /> Transações Recentes
          </h3>
          <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">Ver Histórico Completo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Serviço</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <td className="px-8 py-5 font-bold text-slate-700 text-sm">João Pedro Oliveira</td>
                  <td className="px-8 py-5 text-sm text-slate-500">Manutenção Preventiva</td>
                  <td className="px-8 py-5 text-sm text-slate-500">12/05/2026</td>
                  <td className="px-8 py-5 font-black text-slate-900 text-sm">R$ 350,00</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full w-fit">
                      <CheckCircle2 size={12} /> Pago
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

