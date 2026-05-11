"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Wrench,
  AlertCircle,
  Loader2,
  X,
  Calendar,
  DollarSign,
  Droplets,
  Beaker,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getClientes, createMedicao, updateCliente, deleteCliente } from "@/app/actions/admin";
import { toast } from "react-hot-toast";

export default function ClientsPage() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [analysisData, setAnalysisData] = useState({ ph: "", cloro: "", alcalinidade: "" });
  const [clientForm, setClientForm] = useState<any>({});

  useEffect(() => {
    if (selectedClient) {
      setClientForm(selectedClient);
    }
  }, [selectedClient]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        console.error("Failed to load clients:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredClientes = clientes.filter(c => 
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.telefone?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome, email ou telefone..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm text-slate-900"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={18} />
            Filtros
          </button>
          <Link href="/admin/clientes/novo" className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-6 py-2 bg-secondary text-white rounded-xl text-sm font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-all">
            <Plus size={18} />
            Novo Cliente
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
           <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
             <Users size={24} />
           </div>
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total de Clientes</p>
             <h3 className="text-2xl font-black text-slate-900">{clientes.length}</h3>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
           <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
             <Wrench size={24} />
           </div>
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ativos (Manutenção)</p>
             <h3 className="text-2xl font-black text-slate-900">{clientes.filter(c => c.frequenciaManutencao && c.frequenciaManutencao !== "avulsa").length}</h3>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
           <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
             <AlertCircle size={24} />
           </div>
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Leads em Negociação</p>
             <h3 className="text-2xl font-black text-slate-900">0</h3>
           </div>
        </div>
      </div>

      {/* Customers List */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contato</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Localização</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status / Tipo</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center">
                    <Loader2 className="animate-spin text-slate-300 mx-auto" size={32} />
                  </td>
                </tr>
              ) : filteredClientes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-500 font-medium">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                filteredClientes.map((c, i) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={c.id} 
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                    onClick={() => setSelectedClient(c)}
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
                          {c.nome.split(" ").map((n: string) => n[0]).join("").substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{c.nome}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Último serviço: {c.agendas?.[0] ? new Date(c.agendas[0].data).toLocaleDateString('pt-BR') : "Nenhum"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                          <Phone size={14} className="text-slate-400" />
                          {c.telefone || "N/I"}
                        </div>
                        {c.email && (
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Mail size={12} />
                            {c.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="truncate max-w-[200px]">{c.endereco || "Não informado"}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col items-start gap-2">
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                          Ativo
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          {c.tipoPiscina || "Piscina Padrão"}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setSelectedClient(c);
                              setIsEditing(false);
                            }}
                            className="px-4 py-2 bg-primary/5 text-primary text-xs font-bold rounded-xl hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100"
                          >
                            Ver Perfil
                          </button>
                          <a 
                            href={`https://wa.me/55${c.telefone?.replace(/\D/g, '')}`}
                            target="_blank"
                            className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
                            title="WhatsApp"
                          >
                            <MessageCircle size={18} />
                          </a>
                          <button 
                            onClick={async () => {
                              if(confirm(`Deseja realmente excluir ${c.nome}?`)) {
                                const res = await deleteCliente(c.id);
                                if(res.success) {
                                  toast.success("Cliente excluído");
                                  setClientes(clientes.filter(cl => cl.id !== c.id));
                                }
                              }
                            }}
                            className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                            title="Excluir"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Detail Modal */}
      <AnimatePresence>
        {selectedClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClient(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center text-xl font-black shadow-lg shadow-primary/20">
                      {selectedClient.nome.split(" ").map((n: string) => n[0]).join("").substring(0, 2)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 leading-tight">{selectedClient.nome}</h2>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{selectedClient.tipoPiscina || "Piscina Padrão"}</p>
                        <button 
                          onClick={() => setIsEditing(!isEditing)}
                          className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-lg transition-all ${isEditing ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400 hover:text-primary hover:bg-primary/5'}`}
                        >
                          {isEditing ? "Cancelando Edição" : "Editar Perfil"}
                        </button>
                        <button 
                          onClick={async () => {
                             if(confirm("Deseja realmente excluir este cliente?")) {
                               const res = await deleteCliente(selectedClient.id);
                               if(res.success) {
                                 toast.success("Cliente removido");
                                 setClientes(clientes.filter(c => c.id !== selectedClient.id));
                                 setSelectedClient(null);
                               }
                             }
                          }}
                          className="text-[10px] font-black uppercase tracking-tighter px-3 py-1 bg-rose-50 text-rose-400 hover:text-rose-600 rounded-lg transition-all"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedClient(null)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                   <div className="space-y-4">
                       {isEditing ? (
                         <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                           <div className="space-y-1">
                             <label className="text-[9px] font-bold text-slate-400 uppercase">Nome Completo</label>
                             <input 
                               value={clientForm.nome} 
                               onChange={(e) => setClientForm({...clientForm, nome: e.target.value})}
                               className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold"
                             />
                           </div>
                           <div className="space-y-1">
                             <label className="text-[9px] font-bold text-slate-400 uppercase">Endereço</label>
                             <input 
                               value={clientForm.endereco} 
                               onChange={(e) => setClientForm({...clientForm, endereco: e.target.value})}
                               className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold"
                             />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-1">
                               <label className="text-[9px] font-bold text-slate-400 uppercase">E-mail</label>
                               <input 
                                 value={clientForm.email} 
                                 onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                                 className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold"
                               />
                             </div>
                             <div className="space-y-1">
                               <label className="text-[9px] font-bold text-slate-400 uppercase">Telefone</label>
                               <input 
                                 value={clientForm.telefone} 
                                 onChange={(e) => setClientForm({...clientForm, telefone: e.target.value})}
                                 className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold"
                               />
                             </div>
                           </div>
                           <button 
                             onClick={async () => {
                               setSaving(true);
                               const res = await updateCliente(selectedClient.id, clientForm);
                               if (res.success) {
                                 toast.success("Dados atualizados!");
                                 setClientes(clientes.map(c => c.id === selectedClient.id ? res.cliente : c));
                                 setSelectedClient(res.cliente);
                                 setIsEditing(false);
                               } else {
                                 toast.error("Erro ao atualizar");
                               }
                               setSaving(false);
                             }}
                             disabled={saving}
                             className="w-full py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                           >
                             {saving ? <Loader2 size={16} className="animate-spin" /> : "Salvar Alterações"}
                           </button>
                         </div>
                       ) : (
                         <>
                           <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="flex items-center gap-3 text-slate-400 mb-1">
                                 <MapPin size={16} />
                                 <span className="text-[10px] font-black uppercase tracking-widest">Endereço</span>
                              </div>
                              <p className="text-sm font-bold text-slate-900">{selectedClient.endereco || "Não informado"}</p>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                 <div className="flex items-center gap-3 text-slate-400 mb-1">
                                    <Mail size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">E-mail</span>
                                 </div>
                                 <p className="text-sm font-bold text-slate-900 truncate">{selectedClient.email || "---"}</p>
                              </div>
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                 <div className="flex items-center gap-3 text-slate-400 mb-1">
                                    <Phone size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Telefone</span>
                                 </div>
                                 <p className="text-sm font-bold text-slate-900">{selectedClient.telefone || "---"}</p>
                              </div>
                           </div>
                         </>
                       )}
                      
                      {/* Formulário de Medição Química */}
                      <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50">
                         <div className="flex items-center gap-2 text-blue-600 mb-4">
                            <Droplets size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Análise de Qualidade</span>
                         </div>
                         <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-1">
                               <label className="text-[9px] font-bold text-slate-400 uppercase">pH</label>
                               <input 
                                 type="number" step="0.1" placeholder="7.2" 
                                 value={analysisData.ph}
                                 onChange={(e) => setAnalysisData({...analysisData, ph: e.target.value})}
                                 className="w-full px-3 py-2 rounded-xl bg-white border border-slate-100 text-xs font-bold" 
                               />
                            </div>
                            <div className="space-y-1">
                               <label className="text-[9px] font-bold text-slate-400 uppercase">Cloro</label>
                               <input 
                                 type="number" step="0.1" placeholder="2.0" 
                                 value={analysisData.cloro}
                                 onChange={(e) => setAnalysisData({...analysisData, cloro: e.target.value})}
                                 className="w-full px-3 py-2 rounded-xl bg-white border border-slate-100 text-xs font-bold" 
                               />
                            </div>
                            <div className="space-y-1">
                               <label className="text-[9px] font-bold text-slate-400 uppercase">Alcal.</label>
                               <input 
                                 type="number" placeholder="100" 
                                 value={analysisData.alcalinidade}
                                 onChange={(e) => setAnalysisData({...analysisData, alcalinidade: e.target.value})}
                                 className="w-full px-3 py-2 rounded-xl bg-white border border-slate-100 text-xs font-bold" 
                               />
                            </div>
                         </div>
                         <button 
                           onClick={async () => {
                             if (!analysisData.ph || !analysisData.cloro) return toast.error("Preencha ao menos pH e Cloro");
                             setSaving(true);
                             try {
                               const res = await createMedicao(selectedClient.id, { 
                                 ph: parseFloat(analysisData.ph), 
                                 cloro: parseFloat(analysisData.cloro), 
                                 alcalinidade: parseFloat(analysisData.alcalinidade || "100"), 
                                 temperatura: 28 
                               });
                               if (res.success) {
                                 toast.success("Análise registrada com sucesso!");
                                 setAnalysisData({ ph: "", cloro: "", alcalinidade: "" });
                               }
                             } catch (err) {
                               toast.error("Erro ao salvar análise.");
                             } finally {
                               setSaving(false);
                             }
                           }}
                           disabled={saving}
                           className="w-full mt-4 bg-blue-600 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                         >
                            {saving ? <Loader2 className="animate-spin" size={14} /> : "Gravar Análise"}
                         </button>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="flex items-center gap-3 text-slate-400 mb-1">
                            <Calendar size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Manutenção</span>
                         </div>
                         <p className="text-sm font-bold text-slate-900">{selectedClient.frequenciaManutencao || "Avulsa"} - {selectedClient.diaPreferencial || "A combinar"}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="flex items-center gap-3 text-slate-400 mb-1">
                            <DollarSign size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Financeiro</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Em Dia</p>
                            <Link href="/admin/financeiro" className="text-[9px] font-black text-primary hover:underline">VER DETALHES</Link>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex gap-4">
                   <button 
                    onClick={() => window.open(`https://wa.me/55${selectedClient.telefone?.replace(/\D/g, '')}`, '_blank')}
                    className="flex-1 bg-emerald-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all"
                   >
                     <MessageCircle size={20} /> WhatsApp
                   </button>
                   <button 
                    onClick={() => setSelectedClient(null)}
                    className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
                   >
                     Fechar Detalhes
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
