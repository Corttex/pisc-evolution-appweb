"use client";

import React, { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Loader2,
  X,
  MapPin,
  Phone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getAgendas, updateAgendaStatus } from "@/app/actions/admin";
import { toast } from "react-hot-toast";

export default function AgendaPage() {
  const [agendas, setAgendas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAgendas();
        setAgendas(data);
      } catch (err) {
        console.error("Failed to load agendas:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleUpdate = async () => {
    const { updateAgendamento } = await import("@/app/actions/admin");
    const res = await updateAgendamento(selectedApp.id, editData);
    if (res.success) {
      toast.success("Agendamento atualizado!");
      setAgendas(agendas.map(a => a.id === selectedApp.id ? { ...a, ...res.agendamento } : a));
      setSelectedApp({ ...selectedApp, ...res.agendamento });
      setIsEditing(false);
    } else {
      toast.error("Erro ao atualizar");
    }
  };

  const normalizeDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const filteredAgendas = agendas.filter(app => {
    const appDate = new Date(app.data);
    const matchesDate = normalizeDate(appDate) === normalizeDate(selectedDate);
    const matchesSearch = app.cliente?.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.servico.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesSearch;
  });

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth());
  const monthName = selectedDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  const handleDateClick = (day: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setSelectedDate(newDate);
  };

  const getStatusIcon = (status: string) => {
    if (status.toLowerCase() === "confirmado" || status.toLowerCase() === "concluido" || status.toLowerCase() === "realizado") 
      return <CheckCircle2 size={14} className="text-emerald-500" />;
    return <Clock size={14} className="text-amber-500" />;
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar agendamento ou cliente..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm text-slate-900"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={18} />
            Filtros
          </button>
          <Link 
            href="/admin/agenda/novo"
            className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-6 py-2 bg-secondary text-white rounded-xl text-sm font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-all"
          >
            <Plus size={18} />
            Novo Agendamento
          </Link>
        </div>
      </div>

      {/* Calendar Grid & List View */}
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 h-fit">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 capitalize">{monthName}</h3>
            <div className="flex gap-2">
               <button onClick={() => changeMonth(-1)} className="p-1.5 border border-slate-100 rounded-lg hover:bg-slate-50 text-slate-600">{"<"}</button>
               <button onClick={() => changeMonth(1)} className="p-1.5 border border-slate-100 rounded-lg hover:bg-slate-50 text-slate-600">{">"}</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-slate-400 uppercase">
            <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDate.getDate() === day;
              const hasApp = agendas.some(a => {
                const d = new Date(a.data);
                return d.getFullYear() === selectedDate.getFullYear() && 
                       d.getMonth() === selectedDate.getMonth() && 
                       d.getDate() === day;
              });

              return (
                <button 
                  key={i} 
                  onClick={() => handleDateClick(day)}
                  className={`relative p-2 rounded-xl transition-all font-bold ${
                    isSelected ? 'bg-primary text-white shadow-lg' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {day}
                  {hasApp && !isSelected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-secondary rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-900">Programação de {selectedDate.toLocaleDateString('pt-BR')}</h2>
          </div>

          {loading ? (
            <div className="flex justify-center p-10"><Loader2 className="animate-spin text-slate-300" size={32} /></div>
          ) : filteredAgendas.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-500 font-medium">Nenhum agendamento para esta data.</p>
            </div>
          ) : (
            filteredAgendas.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-secondary/30 transition-colors group cursor-pointer"
                onClick={() => setSelectedApp(app)}
              >
                <div className="flex items-center gap-6">
                  <div className="text-center min-w-[70px]">
                    <span className="block text-xl font-black text-primary">
                      {new Date(app.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Horário</span>
                  </div>
                  <div className="w-px h-12 bg-slate-100 hidden md:block"></div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-secondary transition-colors text-lg">
                      {app.cliente?.nome || "Cliente Removido"}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium">{app.servico}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-bold uppercase">
                      <MapPin size={12} className="text-slate-400" /> {app.cliente?.endereco || "Sem endereço"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-700 text-xs font-bold border border-slate-100 capitalize">
                     {getStatusIcon(app.status)}
                     {app.status}
                  </div>
                  <button className="text-xs font-bold text-primary hover:underline px-4 py-2 bg-primary/5 rounded-xl">
                    Ver Detalhes
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Agenda Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedApp(null); setIsEditing(false); }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-primary/5 rounded-2xl text-primary">
                    <CalendarIcon size={32} />
                  </div>
                  <button onClick={() => { setSelectedApp(null); setIsEditing(false); }} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                    <X size={20} />
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {selectedApp.cliente?.nome}
                </h2>
                
                {!isEditing ? (
                  <>
                    <p className="text-slate-600 font-bold uppercase text-[10px] tracking-[0.2em]">
                      {selectedApp.servico}
                    </p>

                    <div className="mt-8 space-y-6">
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="p-3 bg-white rounded-xl text-primary shadow-sm"><Clock size={20} /></div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Data e Hora</p>
                          <p className="text-sm font-bold text-slate-900">
                            {new Date(selectedApp.data).toLocaleDateString('pt-BR')} às {new Date(selectedApp.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="p-3 bg-white rounded-xl text-primary shadow-sm"><MapPin size={20} /></div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Localização</p>
                          <p className="text-sm font-bold text-slate-900">{selectedApp.cliente?.endereco || "N/A"}</p>
                        </div>
                      </div>

                      <div className="pt-4 flex flex-col gap-4">
                        <div className="flex gap-4">
                          <button 
                            onClick={async () => {
                              const res = await updateAgendaStatus(selectedApp.id, "Realizado", "pago");
                              if (res.success) {
                                toast.success("Serviço concluído e pago!");
                                setAgendas(agendas.map(a => a.id === selectedApp.id ? { ...a, status: "Realizado", pagamentoStatus: "pago" } : a));
                                setSelectedApp(null);
                              }
                            }}
                            className="flex-1 bg-emerald-500 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                          >
                            <CheckCircle2 size={18} /> Concluir e Pago
                          </button>
                          <button 
                            onClick={async () => {
                              const res = await updateAgendaStatus(selectedApp.id, "Cancelado");
                              if (res.success) {
                                toast.error("Serviço cancelado!");
                                setAgendas(agendas.map(a => a.id === selectedApp.id ? { ...a, status: "Cancelado" } : a));
                                setSelectedApp(null);
                              }
                            }}
                            className="flex-1 bg-rose-50 text-rose-500 py-4 rounded-2xl font-bold hover:bg-rose-100 transition-all flex items-center justify-center gap-2"
                          >
                            <X size={18} /> Cancelar
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => {
                            setEditData({
                              servico: selectedApp.servico,
                              data: new Date(selectedApp.data).toISOString().slice(0, 16),
                              valorTotal: selectedApp.valorTotal
                            });
                            setIsEditing(true);
                          }}
                          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
                        >
                          Editar Detalhes
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mt-8 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Serviço</label>
                        <input 
                          type="text"
                          value={editData.servico}
                          onChange={e => setEditData({...editData, servico: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Data e Hora</label>
                        <input 
                          type="datetime-local"
                          value={editData.data}
                          onChange={e => setEditData({...editData, data: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valor do Serviço (R$)</label>
                        <input 
                          type="number"
                          value={editData.valorTotal}
                          onChange={e => setEditData({...editData, valorTotal: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        onClick={handleUpdate}
                        className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all"
                      >
                        Salvar Alterações
                      </button>
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                      >
                        Voltar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
