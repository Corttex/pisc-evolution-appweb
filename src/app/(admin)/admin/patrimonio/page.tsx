"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Wrench, 
  Building2,
  AlertCircle,
  X,
  Loader2,
  Save,
  Tag,
  DollarSign,
  User as UserIcon,
  Calendar,
  MapPin,
  FileText,
  Activity,
  Package,
  Zap,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getPatrimonios, 
  createPatrimonio, 
  updatePatrimonio, 
  deletePatrimonio, 
  getClientes, 
  updateEquipamento,
  createEquipamento,
  deleteEquipamento
} from "@/app/actions/admin";
import { toast } from "react-hot-toast";

export default function PatrimonioPage() {
  const [activeTab, setActiveTab] = useState("empresa");
  const [patrimonios, setPatrimonios] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    tipo: "Ferramenta",
    identificacao: "",
    status: "ativo",
    valor: "",
    dataAquisicao: "",
    localizacao: "",
    observacoes: ""
  });

  const [equipData, setEquipData] = useState({
    nome: "",
    marca: "",
    modelo: "",
    potencia: "",
    numeroSerie: "",
    status: "operacional",
    dataInstalacao: "",
    proximaTroca: "",
    observacoes: "",
    clienteId: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [pat, cli] = await Promise.all([
        getPatrimonios(),
        getClientes()
      ]);
      setPatrimonios(pat);
      setClientes(cli);
    } catch (error) {
      toast.error("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      if (activeTab === "empresa") {
        setFormData({
          nome: item.nome || "",
          tipo: item.tipo || "Ferramenta",
          identificacao: item.identificacao || "",
          status: item.status || "ativo",
          valor: item.valor?.toString() || "",
          dataAquisicao: item.dataAquisicao ? new Date(item.dataAquisicao).toISOString().split('T')[0] : "",
          localizacao: item.localizacao || "",
          observacoes: item.observacoes || ""
        });
      } else {
        setEquipData({
          nome: item.nome || "",
          marca: item.marca || "",
          modelo: item.modelo || "",
          potencia: item.potencia || "",
          numeroSerie: item.numeroSerie || "",
          status: item.status || "operacional",
          dataInstalacao: item.dataInstalacao ? new Date(item.dataInstalacao).toISOString().split('T')[0] : "",
          proximaTroca: item.proximaTroca ? new Date(item.proximaTroca).toISOString().split('T')[0] : "",
          observacoes: item.observacoes || "",
          clienteId: item.clienteId || ""
        });
      }
    } else {
      setEditingItem(null);
      setFormData({ 
        nome: "", 
        tipo: "Ferramenta", 
        identificacao: "",
        status: "ativo", 
        valor: "", 
        dataAquisicao: "",
        localizacao: "",
        observacoes: "" 
      });
      setEquipData({ 
        nome: "", 
        marca: "", 
        modelo: "", 
        potencia: "",
        numeroSerie: "",
        status: "operacional", 
        dataInstalacao: "",
        proximaTroca: "", 
        observacoes: "",
        clienteId: clientes.length > 0 ? clientes[0].id : "" 
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeTab === "empresa") {
        if (editingItem) {
          const res = await updatePatrimonio(editingItem.id, formData);
          if (res.success) toast.success("Patrimônio atualizado!");
          else toast.error(res.error || "Erro ao atualizar.");
        } else {
          const res = await createPatrimonio(formData);
          if (res.success) toast.success("Patrimônio registrado!");
          else toast.error(res.error || "Erro ao criar.");
        }
      } else {
        if (editingItem) {
          const res = await updateEquipamento(editingItem.id, equipData);
          if (res.success) toast.success("Equipamento atualizado!");
          else toast.error(res.error || "Erro ao atualizar.");
        } else {
          if (!equipData.clienteId) {
            toast.error("Selecione um cliente.");
            setLoading(false);
            return;
          }
          const res = await createEquipamento(equipData);
          if (res.success) toast.success("Equipamento registrado!");
          else toast.error(res.error || "Erro ao criar.");
        }
      }
      setShowModal(false);
      loadData();
    } catch (error) {
      toast.error("Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id: string, type: 'patrimonio' | 'equipamento') => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    try {
      const res = type === 'patrimonio' ? await deletePatrimonio(id) : await deleteEquipamento(id);
      if (res.success) {
        toast.success("Excluído com sucesso!");
        loadData();
      } else {
        toast.error(res.error || "Erro ao excluir.");
      }
    } catch (error) {
      toast.error("Erro ao excluir.");
    }
  };

  const filteredPatrimonios = patrimonios.filter(p => 
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.identificacao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestão de Ativos</h1>
           <p className="text-sm text-slate-500 font-medium">Controle total de equipamentos da empresa e infraestrutura dos clientes.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/30"
        >
          <Plus size={22} /> Novo Registro
        </button>
      </div>

      <div className="flex gap-8 border-b border-slate-100">
         {["empresa", "clientes"].map((tab) => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`pb-4 px-2 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${
               activeTab === tab ? "text-primary" : "text-slate-400 hover:text-slate-600"
             }`}
           >
             {tab === "empresa" ? "Ativos da Empresa" : "Equipamentos de Clientes"}
             {activeTab === tab && (
               <motion.div 
                 layoutId="activeTabPat"
                 className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary rounded-full" 
               />
             )}
           </button>
         ))}
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
        <div className="flex flex-col md:flex-row gap-4 mb-10">
           <div className="flex-grow relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Pesquisar por nome, identificação, marca ou modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-900 shadow-inner"
              />
           </div>
           <button className="px-8 py-4 bg-white text-slate-600 rounded-[1.5rem] font-black flex items-center gap-2 border border-slate-100 hover:bg-slate-50 transition-all shadow-sm">
              <Filter size={18} /> Filtros
           </button>
        </div>

        {activeTab === "empresa" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPatrimonios.map((item) => (
              <motion.div 
                key={item.id}
                layout
                className="group bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all relative overflow-hidden"
              >
                 <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl ${
                      item.tipo === 'Veículo' ? 'bg-blue-50 text-blue-500' :
                      item.tipo === 'Ferramenta' ? 'bg-amber-50 text-amber-500' :
                      item.tipo === 'Máquina' ? 'bg-purple-50 text-purple-500' :
                      'bg-slate-50 text-slate-500'
                    }`}>
                       {item.tipo === 'Veículo' ? <Zap size={24} /> : <Package size={24} />}
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => handleOpenModal(item)} className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit3 size={18} /></button>
                       <button onClick={() => handleDeleteItem(item.id, 'patrimonio')} className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 size={18} /></button>
                    </div>
                 </div>
                 
                 <h3 className="font-black text-xl text-slate-900 mb-1">{item.nome}</h3>
                 <div className="flex items-center gap-2 mb-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.tipo}</p>
                    <span className="text-slate-200">•</span>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">{item.identificacao || 'S/N'}</p>
                 </div>
                 
                 {item.localizacao && (
                   <div className="flex items-center gap-2 mb-4 text-slate-500">
                      <MapPin size={14} />
                      <span className="text-xs font-bold">{item.localizacao}</span>
                   </div>
                 )}

                 <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${item.status === 'ativo' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{item.status}</span>
                    </div>
                    <span className="text-lg font-black text-slate-900 tracking-tighter">R$ {item.valor?.toLocaleString('pt-BR') || '0,00'}</span>
                 </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
             {clientes.map((cliente) => (
               <div key={cliente.id} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/20">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-primary/5 rounded-[1.5rem] flex items-center justify-center border border-primary/10 text-primary text-2xl font-black shadow-inner">
                           {cliente.nome[0]}
                        </div>
                        <div>
                           <h4 className="font-black text-slate-900 text-2xl tracking-tight leading-none">{cliente.nome}</h4>
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-2">{cliente.documento || 'Sem Documento'}</p>
                        </div>
                     </div>
                     <button 
                        onClick={() => {
                           setEquipData({...equipData, clienteId: cliente.id});
                           setActiveTab("clientes");
                           handleOpenModal();
                        }}
                        className="px-6 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
                     >
                        <Plus size={16} /> Adicionar Equipamento
                     </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {cliente.equipamentos?.map((eq: any) => (
                       <div key={eq.id} className="bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-2xl hover:shadow-slate-200/40 transition-all relative">
                          <div className="flex items-center gap-5">
                             <div className="p-4 bg-white text-slate-400 rounded-2xl group-hover:text-primary group-hover:bg-primary/5 transition-all shadow-sm border border-slate-50">
                                <Wrench size={22} />
                             </div>
                             <div>
                                <p className="text-base font-black text-slate-900 tracking-tight leading-none">{eq.nome}</p>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">{eq.marca} • {eq.modelo}</p>
                                {eq.potencia && <p className="text-[9px] text-primary font-bold uppercase mt-1">Potência: {eq.potencia}</p>}
                             </div>
                          </div>
                          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
                             <button onClick={() => handleOpenModal(eq)} className="p-2 text-slate-400 hover:text-primary bg-white rounded-lg shadow-sm border border-slate-100 transition-all"><Edit3 size={16} /></button>
                             <button onClick={() => handleDeleteItem(eq.id, 'equipamento')} className="p-2 text-slate-400 hover:text-rose-500 bg-white rounded-lg shadow-sm border border-slate-100 transition-all"><Trash2 size={16} /></button>
                          </div>
                       </div>
                     ))}
                     
                     {(cliente.equipamentos || []).length === 0 && (
                        <div className="col-span-full py-12 border-2 border-dashed border-slate-100 rounded-[1.5rem] flex flex-col items-center justify-center text-center">
                           <AlertCircle size={40} className="text-slate-200 mb-4" />
                           <p className="text-sm font-bold text-slate-400">Nenhum equipamento técnico vinculado a este cliente.</p>
                        </div>
                     )}
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      {editingItem ? 'Editar Registro' : 'Novo Registro'}
                    </h2>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mt-1">
                      {activeTab === 'empresa' ? 'Patrimônio da Empresa' : 'Infraestrutura do Cliente'}
                    </p>
                 </div>
                 <button onClick={() => setShowModal(false)} className="p-3 hover:bg-slate-200 rounded-2xl transition-colors">
                    <X size={20} />
                 </button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                {activeTab === "empresa" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome do Ativo</label>
                      <div className="relative">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type="text" required
                          value={formData.nome}
                          onChange={(e) => setFormData({...formData, nome: e.target.value})}
                          placeholder="Ex: Bomba de Sucção Industrial"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipo de Patrimônio</label>
                      <select 
                        value={formData.tipo}
                        onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all appearance-none"
                      >
                        <option value="Ferramenta">Ferramenta</option>
                        <option value="Veículo">Veículo</option>
                        <option value="Máquina">Máquina</option>
                        <option value="Informática">Informática</option>
                        <option value="Mobiliário">Mobiliário</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identificação / Placa / Serial</label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type="text"
                          value={formData.identificacao}
                          onChange={(e) => setFormData({...formData, identificacao: e.target.value})}
                          placeholder="Ex: ABC-1234 ou SN9821"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Valor de Aquisição (R$)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type="text"
                          value={formData.valor}
                          onChange={(e) => setFormData({...formData, valor: e.target.value})}
                          placeholder="0,00"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data de Aquisição</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type="date"
                          value={formData.dataAquisicao}
                          onChange={(e) => setFormData({...formData, dataAquisicao: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Localização Atual</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type="text"
                          value={formData.localizacao}
                          onChange={(e) => setFormData({...formData, localizacao: e.target.value})}
                          placeholder="Ex: Veículo 02, Almoxarifado..."
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
                      <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all appearance-none"
                      >
                        <option value="ativo">Operacional / Ativo</option>
                        <option value="manutencao">Em Manutenção</option>
                        <option value="baixado">Baixado / Alienado</option>
                        <option value="danificado">Danificado</option>
                      </select>
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Observações / Histórico</label>
                      <textarea 
                        value={formData.observacoes}
                        onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                        placeholder="Detalhes adicionais sobre o ativo, histórico de revisões ou defeitos..."
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-medium text-slate-600 h-32 resize-none transition-all"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {!editingItem && (
                      <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Selecionar Cliente</label>
                        <div className="relative">
                           <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                           <select 
                             required
                             value={equipData.clienteId}
                             onChange={(e) => setEquipData({...equipData, clienteId: e.target.value})}
                             className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all appearance-none"
                           >
                             <option value="">Selecione um cliente cadastrado...</option>
                             {clientes.map(c => (
                               <option key={c.id} value={c.id}>{c.nome}</option>
                             ))}
                           </select>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome do Equipamento</label>
                      <div className="relative">
                        <Wrench className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type="text" required
                          value={equipData.nome}
                          onChange={(e) => setEquipData({...equipData, nome: e.target.value})}
                          placeholder="Ex: Bomba Jacuzzi 1.5cv"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Marca</label>
                      <input 
                        type="text"
                        value={equipData.marca}
                        onChange={(e) => setEquipData({...equipData, marca: e.target.value})}
                        placeholder="Ex: Jacuzzi, Nautilus..."
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Modelo / Especificação</label>
                      <input 
                        type="text"
                        value={equipData.modelo}
                        onChange={(e) => setEquipData({...equipData, modelo: e.target.value})}
                        placeholder="Ex: F-450, SuperPump..."
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Potência / Capacidade</label>
                      <div className="relative">
                        <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type="text"
                          value={equipData.potencia}
                          onChange={(e) => setEquipData({...equipData, potencia: e.target.value})}
                          placeholder="Ex: 1.5cv, 2000L/h..."
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Número de Série</label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type="text"
                          value={equipData.numeroSerie}
                          onChange={(e) => setEquipData({...equipData, numeroSerie: e.target.value})}
                          placeholder="SN: 000000"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data de Instalação</label>
                      <input 
                        type="date"
                        value={equipData.dataInstalacao}
                        onChange={(e) => setEquipData({...equipData, dataInstalacao: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Próxima Revisão / Troca</label>
                      <input 
                        type="date"
                        value={equipData.proximaTroca}
                        onChange={(e) => setEquipData({...equipData, proximaTroca: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all border-amber-100"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status Operacional</label>
                      <select 
                        value={equipData.status}
                        onChange={(e) => setEquipData({...equipData, status: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-bold text-slate-900 transition-all appearance-none"
                      >
                        <option value="operacional">Operacional / Perfeito</option>
                        <option value="manutencao">Necessita Manutenção</option>
                        <option value="defeito">Com Defeito / Parado</option>
                        <option value="troca">Agendado para Troca</option>
                      </select>
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Observações Técnicas</label>
                      <textarea 
                        value={equipData.observacoes}
                        onChange={(e) => setEquipData({...equipData, observacoes: e.target.value})}
                        placeholder="Detalhes sobre o estado do equipamento, ruídos, vazamentos ou peças trocadas..."
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/10 rounded-2xl outline-none font-medium text-slate-600 h-32 resize-none transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="pt-6">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/30 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Save size={22} />}
                    {editingItem ? 'Atualizar Dados' : 'Confirmar e Salvar'}
                  </button>
                  <p className="text-[9px] text-slate-400 text-center mt-4 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                     <Info size={12} /> Os dados serão processados e vinculados permanentemente ao sistema
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
