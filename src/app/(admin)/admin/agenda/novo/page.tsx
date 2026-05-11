"use client";

import React, { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  ArrowLeft, 
  Save, 
  Loader2,
  CheckCircle2,
  Wrench
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getClientes, createAgendamento } from "@/app/actions/admin";

export default function NovoAgendamentoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    clienteId: "",
    servico: "",
    data: "",
    hora: "",
    valorTotal: "",
    pagamentoStatus: "pendente",
    observacoes: ""
  });

  useEffect(() => {
    async function load() {
      const data = await getClientes();
      setClientes(data);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Combine data e hora
    const combinedDate = new Date(`${formData.data}T${formData.hora}:00`);
    
    const res = await createAgendamento({
      ...formData,
      data: combinedDate
    });
    
    setLoading(false);
    
    if (res.success) {
      alert("Agendamento criado com sucesso!");
      router.push("/admin/agenda");
    } else {
      alert("Erro ao criar agendamento: " + res.error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/agenda"
          className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Novo Agendamento</h1>
          <p className="text-sm text-slate-500">Marque um novo serviço para um cliente.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Selecionar Cliente</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select 
                required
                value={formData.clienteId}
                onChange={(e) => setFormData({...formData, clienteId: e.target.value})}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm appearance-none"
              >
                <option value="">Selecione o cliente</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Serviço</label>
            <div className="relative">
              <Wrench className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text"
                required
                value={formData.servico}
                onChange={(e) => setFormData({...formData, servico: e.target.value})}
                placeholder="Ex: Manutenção Mensal"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Data</label>
              <div className="relative">
                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="date"
                  required
                  value={formData.data}
                  onChange={(e) => setFormData({...formData, data: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Hora</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="time"
                  required
                  value={formData.hora}
                  onChange={(e) => setFormData({...formData, hora: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Valor do Serviço</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-sm">R$</span>
              <input 
                type="number"
                step="0.01"
                value={formData.valorTotal}
                onChange={(e) => setFormData({...formData, valorTotal: e.target.value})}
                placeholder="0,00"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Observações</label>
            <textarea 
              value={formData.observacoes}
              onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
              placeholder="Notas sobre o serviço..."
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm min-h-[100px]"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-primary py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-secondary/20 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            Agendar Serviço
          </button>
        </form>
      </motion.div>
    </div>
  );
}
