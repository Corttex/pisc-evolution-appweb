"use client";

import React, { useState, useEffect } from "react";
import { 
  Building, 
  Truck, 
  Wrench, 
  Plus, 
  Search,
  ShieldCheck,
  Calendar,
  AlertCircle,
  Users,
  Settings,
  ArrowRight,
  Loader2,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getPatrimonios, getClientes } from "@/app/actions/admin";

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState<"company" | "clients">("company");
  const [patrimonios, setPatrimonios] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const [pats, clis] = await Promise.all([getPatrimonios(), getClientes()]);
        setPatrimonios(pats);
        setClientes(clis);
      } catch (err) {
        console.error("Failed to load assets:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredCompanyAssets = patrimonios.filter(p => 
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clientEquipments = clientes.flatMap(c => 
    (c.equipamentos || []).map((e: any) => ({
      ...e,
      clienteNome: c.nome,
      clienteEndereco: c.endereco || "Não informado",
      clienteTelefone: c.telefone || "Não informado"
    }))
  ).filter(e => 
    e.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.clienteNome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDetail = (item: any) => {
    setSelectedItem(item);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Patrimônio e Equipamentos</h1>
           <p className="text-sm text-slate-600">Gestão de ativos da empresa e equipamentos instalados em clientes.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => alert("Módulo de Cronograma em desenvolvimento.")}
            className="bg-slate-100 text-slate-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-all"
          >
             <Calendar size={18} /> Cronograma
          </button>
          <button 
            onClick={() => alert("Novo Registro em desenvolvimento.")}
            className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all"
          >
             <Plus size={18} /> Novo Registro
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-200 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab("company")}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === "company" ? "bg-white text-primary shadow-sm" : "text-slate-600 hover:text-slate-800"
          }`}
        >
          <Building size={16} /> Ativos da Empresa
        </button>
        <button 
          onClick={() => setActiveTab("clients")}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === "clients" ? "bg-white text-primary shadow-sm" : "text-slate-600 hover:text-slate-800"
          }`}
        >
          <Users size={16} /> Equipamentos de Clientes
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
         {/* Stats Sidebar */}
         <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                     <ShieldCheck size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-900">Status Geral</span>
               </div>
               <p className="text-2xl font-bold text-primary">100% Operacional</p>
               <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">Sistemas Monitorados</p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 shadow-sm">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                     <AlertCircle size={20} />
                  </div>
                  <span className="text-sm font-bold text-amber-900">Próximas Trocas</span>
               </div>
               <p className="text-2xl font-bold text-amber-600">0 Pendentes</p>
               <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest mt-1">Filtros e Revisões</p>
            </div>
         </div>

         {/* Content Area */}
         <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
               <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={activeTab === "company" ? "Buscar no patrimônio..." : "Buscar por cliente ou equipamento..."} 
                    className="w-full pl-12 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                  />
               </div>
               <div className="flex gap-2">
                 <button 
                   onClick={() => alert("Configurações do módulo em desenvolvimento.")}
                   className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-50 rounded-xl"
                 >
                    <Settings size={20} />
                 </button>
               </div>
            </div>

            <div className="divide-y divide-slate-100">
              {loading ? (
                <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-slate-300" size={32} /></div>
              ) : (
                <AnimatePresence mode="wait">
                  {activeTab === "company" ? (
                    <motion.div
                      key="company"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {filteredCompanyAssets.length === 0 ? (
                        <div className="p-10 text-center text-slate-500">Nenhum patrimônio cadastrado.</div>
                      ) : (
                        filteredCompanyAssets.map((asset) => (
                          <div 
                            key={asset.id}
                            onClick={() => handleOpenDetail(asset)}
                            className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 transition-all cursor-pointer group"
                          >
                             <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                                   {asset.tipo.toLowerCase().includes("veículo") ? <Truck size={28} /> : <Wrench size={28} />}
                                </div>
                                <div>
                                   <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{asset.nome}</h3>
                                   <div className="flex items-center gap-4 mt-1">
                                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{asset.tipo}</span>
                                      <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                        {asset.valor ? `R$ ${asset.valor}` : "N/I"}
                                      </span>
                                   </div>
                                </div>
                             </div>

                             <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                                <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                                   asset.status === "ativo" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                                }`}>
                                   {asset.status}
                                </div>
                                <button className="p-2 border border-slate-100 rounded-xl hover:bg-white hover:shadow-sm transition-all group">
                                   <ArrowRight size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                                </button>
                             </div>
                          </div>
                        ))
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="clients"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {clientEquipments.length === 0 ? (
                        <div className="p-10 text-center text-slate-500">Nenhum equipamento cadastrado nos clientes.</div>
                      ) : (
                        clientEquipments.map((item, idx) => (
                          <div 
                            key={idx}
                            onClick={() => handleOpenDetail(item)}
                            className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 transition-all cursor-pointer group"
                          >
                             <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                   <Wrench size={28} />
                                </div>
                                <div>
                                   <div className="flex items-center gap-2">
                                     <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{item.clienteNome}</h3>
                                     <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold uppercase truncate max-w-[150px]">{item.clienteEndereco}</span>
                                   </div>
                                   <p className="text-sm text-slate-700">{item.nome}</p>
                                   <div className="flex items-center gap-4 mt-2">
                                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                        Marca: {item.marca || "N/I"} • Modelo: {item.modelo || "N/I"}
                                      </span>
                                   </div>
                                </div>
                             </div>

                             <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                                <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                                   item.status === "operacional" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                                }`}>
                                   {item.status}
                                </div>
                                <button className="p-2 border border-slate-100 rounded-xl hover:bg-white hover:shadow-sm transition-all group">
                                   <ArrowRight size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                                </button>
                             </div>
                          </div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
         </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
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
                    {selectedItem.tipo ? <Building size={32} /> : <Wrench size={32} />}
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                    <X size={20} />
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {selectedItem.nome || selectedItem.clienteNome}
                </h2>
                <p className="text-slate-600 mb-8 font-medium">
                  {selectedItem.tipo ? `Patrimônio: ${selectedItem.tipo}` : `Equipamento do Cliente`}
                </p>

                <div className="space-y-4">
                  {selectedItem.clienteNome && (
                    <div className="flex justify-between py-3 border-b border-slate-50">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cliente</span>
                      <span className="text-sm font-bold text-slate-900">{selectedItem.clienteNome}</span>
                    </div>
                  )}
                  {selectedItem.marca && (
                    <div className="flex justify-between py-3 border-b border-slate-50">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Marca</span>
                      <span className="text-sm font-bold text-slate-900">{selectedItem.marca}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</span>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase">
                      {selectedItem.status}
                    </span>
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={() => alert("Editar registro entrará na próxima fase!")}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
                    >
                      Editar Registro
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
