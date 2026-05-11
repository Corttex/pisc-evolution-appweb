"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Ticket, 
  Plus, 
  Settings, 
  TrendingUp, 
  ArrowRight, 
  MessageSquare, 
  ArrowUpRight, 
  Droplets, 
  Waves,
  Activity,
  Wallet,
  Zap,
  BarChart3,
  CreditCard,
  PieChart
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import Link from "next/link";
import { 
  getAdminProfile, 
  getDashboardStats 
} from "@/app/actions/admin";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    async function loadStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const cardData = [
    { label: "Clientes Ativos", value: stats?.activeClients || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-100", trend: "Total" },
    { label: "Agendas Hoje", value: stats?.agendasToday || 0, icon: Zap, color: "text-emerald-500", bg: "bg-emerald-100", trend: "Execução" },
    { label: "Receita Mês", value: `R$ ${(stats?.revenueMonth || 0).toLocaleString('pt-BR')}`, icon: TrendingUp, color: "text-cyan-500", bg: "bg-cyan-100", trend: "Crescimento" },
    { label: "Pendente (Receber)", value: `R$ ${(stats?.pendingRevenue || 0).toLocaleString('pt-BR')}`, icon: Wallet, color: "text-amber-500", bg: "bg-amber-100", trend: "Fluxo" },
  ];

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <motion.h1 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="text-4xl font-black text-slate-900 tracking-tight"
           >
             Painel Administrativo
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="text-slate-500 font-medium"
           >
             Bem-vindo de volta! Aqui está o resumo das Piscinas Evolution.
           </motion.p>
        </div>
        <div className="flex gap-3">
           <Link href="/admin/perfil" className="bg-white text-slate-600 p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all">
              <Settings size={24} />
           </Link>
           <Link href="/admin/clientes/novo" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/30 hover:scale-[1.02] hover:shadow-2xl transition-all">
              <Plus size={20} /> Novo Cliente
           </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {cardData.map((stat, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden"
           >
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl"></div>
                  <div className="h-4 w-24 bg-slate-100 rounded"></div>
                  <div className="h-8 w-16 bg-slate-100 rounded"></div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start relative z-10">
                     <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl shadow-inner`}>
                        <stat.icon size={24} />
                     </div>
                     <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                           <div className={`w-1.5 h-1.5 rounded-full ${stat.color.replace('text', 'bg')} animate-pulse`} />
                           <span className={`text-[9px] font-black uppercase tracking-tighter ${stat.color}`}>
                              {stat.trend}
                           </span>
                        </div>
                     </div>
                  </div>
                  <div className="mt-8 relative z-10">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] ml-1">{stat.label}</p>
                    <h3 className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">{stat.value}</h3>
                  </div>
                </>
              )}
              <div className={`absolute -bottom-8 -right-8 w-32 h-32 ${stat.bg} rounded-full opacity-0 group-hover:opacity-30 transition-all blur-3xl`}></div>
           </motion.div>
         ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900">Fluxo de Operação</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Desempenho dos Últimos 7 Dias</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-primary"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Receita (R$)</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Agendamentos</span>
               </div>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            {mounted && !loading ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.chartData || []}>
                  <defs>
                    <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} 
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="receita" 
                    stroke="#0ea5e9" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorReceita)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visitas" 
                    stroke="#93c5fd" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-slate-50 rounded-3xl animate-pulse flex items-center justify-center">
                <p className="text-slate-300 font-bold uppercase tracking-widest text-xs">Carregando Gráficos...</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#0F172A] p-10 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 text-white relative overflow-hidden flex flex-col justify-between">
           <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full translate-x-32 -translate-y-32 blur-[100px]"></div>
           
           <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                <TrendingUp className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-3xl font-black mb-4 leading-tight">Inteligência Operacional</h3>
              <p className="text-slate-300 font-medium mb-10 max-w-xs leading-relaxed">
                Sua engenharia gerencia <span className="text-cyan-400 font-bold">{(stats?.totalVolume || 0).toLocaleString()}L</span> de água em <span className="text-cyan-400 font-bold">{stats?.activeClients || 0}</span> projetos ativos.
              </p>
           </div>
           
           <div className="space-y-4 relative z-10">
              <Link href="/admin/financeiro" className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-[1.5rem] border border-white/10 transition-all group">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-xl">
                       <DollarSign size={20} className="text-cyan-400" />
                    </div>
                    <span className="font-bold text-slate-100">Ver Relatório Financeiro</span>
                 </div>
                 <ArrowRight size={20} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link href="/admin/perfil" className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-[1.5rem] border border-white/10 transition-all group">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-xl">
                       <Settings size={20} className="text-cyan-400" />
                    </div>
                    <span className="font-bold text-slate-100">Configurações PIX/Asaas</span>
                 </div>
                 <ArrowRight size={20} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </Link>
           </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Support Preview */}
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                     <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">Chamados de Suporte</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Aguardando Resposta</p>
                  </div>
               </div>
               <Link href="/admin/chamados" className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                  <ArrowUpRight size={24} className="text-slate-300 hover:text-primary transition-colors" />
               </Link>
            </div>
            
            <div className="space-y-4">
               {loading ? (
                 <p className="text-center py-4 text-slate-400">Carregando chamados...</p>
               ) : (stats?.tickets || []).length === 0 ? (
                 <p className="text-center py-4 text-slate-400">Nenhum chamado aberto.</p>
               ) : (stats?.tickets || []).slice(0, 3).map((item: any, idx: number) => (
                 <div key={idx} className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-slate-50 hover:bg-white hover:shadow-lg border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 group-hover:border-primary/20 group-hover:text-primary transition-all">
                       <Ticket size={24} />
                    </div>
                    <div className="flex-grow">
                       <h4 className="text-sm font-bold text-slate-900">{item.assunto}</h4>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{item.cliente?.nome || "Cliente"} • {item.status}</p>
                    </div>
                    <div className="text-right">
                       <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase ${
                         item.prioridade === "Alta" ? "bg-red-100 text-red-600" : 
                         item.prioridade === "Média" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
                       }`}>
                         {item.prioridade}
                       </span>
                       <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">Há {Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 60000)} min</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Monitoring / Quality */}
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
                     <Droplets size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">Qualidade da Água</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Monitoramento em Tempo Real</p>
                  </div>
               </div>
               <Activity className="text-slate-200" size={24} />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">pH Médio</p>
                  <div className="flex items-end gap-2">
                     <span className="text-3xl font-black text-slate-900 tracking-tighter">7.2</span>
                     <span className="text-[10px] font-black text-emerald-500 mb-1 uppercase">Ideal</span>
                  </div>
               </div>
               <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Cloro Médio</p>
                  <div className="flex items-end gap-2">
                     <span className="text-3xl font-black text-slate-900 tracking-tighter">2.5</span>
                     <span className="text-[10px] font-black text-emerald-500 mb-1 uppercase">ppm</span>
                  </div>
               </div>
            </div>

            <div className="mt-6 p-10 rounded-[2rem] border-2 border-dashed border-slate-100 flex items-center justify-center text-center">
               <div>
                  <Waves className="mx-auto mb-4 text-primary opacity-20" size={40} />
                  <p className="text-sm font-bold text-slate-400 mb-2">Todas as piscinas monitoradas estão dentro dos parâmetros.</p>
                  <button className="text-primary font-black text-[10px] hover:underline uppercase tracking-[0.2em]">Ver Detalhes Técnicos</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
