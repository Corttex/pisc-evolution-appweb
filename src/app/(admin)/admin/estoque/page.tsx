"use client";

import React, { useState, useEffect } from "react";
import { 
  Package, 
  Plus, 
  Search, 
  Filter,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Settings,
  X,
  Edit2,
  Trash2,
  Loader2,
  Minus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getEstoque, 
  createEstoqueItem, 
  updateEstoqueItem, 
  deleteEstoqueItem,
  adjustEstoqueQuantity 
} from "@/app/actions/estoque";

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    item: "",
    categoria: "",
    quantidade: 0,
    unidade: "un",
    minimo: 0
  });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    const data = await getEstoque();
    setItems(data);
    setLoading(false);
  }

  const openModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        item: item.item,
        categoria: item.categoria,
        quantidade: item.quantidade,
        unidade: item.unidade,
        minimo: item.minimo
      });
    } else {
      setEditingItem(null);
      setFormData({
        item: "",
        categoria: "",
        quantidade: 0,
        unidade: "un",
        minimo: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (editingItem) {
      await updateEstoqueItem(editingItem.id, formData);
    } else {
      await createEstoqueItem(formData);
    }
    
    await fetchItems();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este item?")) {
      setLoading(true);
      await deleteEstoqueItem(id);
      await fetchItems();
    }
  };

  const handleAdjust = async (id: string, delta: number) => {
    await adjustEstoqueQuantity(id, delta);
    fetchItems();
  };

  const filteredItems = items.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const criticalItems = items.filter(item => item.quantidade <= item.minimo).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Gestão de Estoque</h1>
           <p className="text-sm text-slate-500">Controle de equipamentos e insumos técnicos.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-secondary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-secondary/20 hover:scale-105 transition-all"
        >
           <Plus size={18} /> Adicionar Item
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
               <Package size={24} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">Total de Itens</p>
               <p className="text-xl font-bold text-slate-900">{items.length}</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
               <AlertTriangle size={24} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">Estoque Crítico</p>
               <p className="text-xl font-bold text-amber-600">{criticalItems} Itens</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
               <ArrowUpRight size={24} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">Unidades em Estoque</p>
               <p className="text-xl font-bold text-emerald-600">
                 {items.reduce((acc, curr) => acc + curr.quantidade, 0)}
               </p>
            </div>
         </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Filtrar estoque..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-12 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20" 
               />
            </div>
            <div className="flex items-center gap-2">
               <button className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"><Filter size={18} className="text-slate-500" /></button>
               <button className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"><Settings size={18} className="text-slate-500" /></button>
            </div>
         </div>

         <div className="overflow-x-auto">
            {loading && items.length === 0 ? (
              <div className="p-12 flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-secondary" size={32} />
                <p className="text-slate-500 font-medium">Carregando estoque...</p>
              </div>
            ) : (
              <table className="w-full text-left">
                 <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <tr>
                       <th className="px-8 py-4">Item</th>
                       <th className="px-8 py-4">Categoria</th>
                       <th className="px-8 py-4 text-center">Qtd. Atual</th>
                       <th className="px-8 py-4 text-center">Mínimo</th>
                       <th className="px-8 py-4 text-right">Ações</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {filteredItems.map((item) => (
                       <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-8 py-4">
                             <p className="font-bold text-slate-900">{item.item}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.unidade}</p>
                          </td>
                          <td className="px-8 py-4">
                             <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                {item.categoria}
                             </span>
                          </td>
                          <td className="px-8 py-4 text-center">
                             <div className="flex items-center justify-center gap-3">
                               <button 
                                 onClick={() => handleAdjust(item.id, -1)}
                                 className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 transition-colors"
                               >
                                 <Minus size={12} />
                               </button>
                               <span className={`font-bold min-w-[20px] ${item.quantidade <= item.minimo ? 'text-rose-600' : 'text-slate-900'}`}>
                                  {item.quantidade}
                               </span>
                               <button 
                                 onClick={() => handleAdjust(item.id, 1)}
                                 className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
                               >
                                 <Plus size={12} />
                               </button>
                             </div>
                          </td>
                          <td className="px-8 py-4 text-center font-medium text-slate-400">{item.minimo}</td>
                          <td className="px-8 py-4 text-right">
                             <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => openModal(item)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDelete(item.id)}
                                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                    {filteredItems.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-8 py-12 text-center text-slate-500 font-medium">
                          Nenhum item encontrado.
                        </td>
                      </tr>
                    )}
                 </tbody>
              </table>
            )}
         </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingItem ? "Editar Item" : "Novo Item no Estoque"}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nome do Item</label>
                  <input 
                    required
                    type="text" 
                    value={formData.item}
                    onChange={(e) => setFormData({...formData, item: e.target.value})}
                    placeholder="Ex: Bomba Jacuzzi 1HP" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Categoria</label>
                    <select 
                      value={formData.categoria}
                      onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    >
                      <option value="">Selecionar...</option>
                      <option value="Bombas">Bombas</option>
                      <option value="Filtros">Filtros</option>
                      <option value="Químicos">Químicos</option>
                      <option value="Aquecimento">Aquecimento</option>
                      <option value="Iluminação">Iluminação</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Unidade</label>
                    <select 
                      value={formData.unidade}
                      onChange={(e) => setFormData({...formData, unidade: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    >
                      <option value="un">Unidade (un)</option>
                      <option value="kg">Quilograma (kg)</option>
                      <option value="l">Litro (l)</option>
                      <option value="m">Metro (m)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quantidade Atual</label>
                    <input 
                      required
                      type="number" 
                      value={formData.quantidade}
                      onChange={(e) => setFormData({...formData, quantidade: Number(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estoque Mínimo</label>
                    <input 
                      required
                      type="number" 
                      value={formData.minimo}
                      onChange={(e) => setFormData({...formData, minimo: Number(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-secondary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "Salvar Item"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
