"use client";

import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Key, 
  ArrowLeft, 
  Save, 
  Loader2,
  CheckCircle2,
  Waves,
  Plus,
  Trash2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createCliente } from "@/app/actions/admin";

export default function NovoClientePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    documento: "",
    endereco: "",
    pin: "",
    tipoPiscina: "",
    volumePiscina: "",
    frequenciaManutencao: "",
    diaPreferencial: "",
    observacoes: "",
    equipamentos: [
      { nome: "Bomba Principal", status: "ATIVO", marca: "", modelo: "" }
    ]
  });

  const handleAddEquipamento = () => {
    setFormData({
      ...formData,
      equipamentos: [...formData.equipamentos, { nome: "", status: "ATIVO", marca: "", modelo: "" }]
    });
  };

  const handleRemoveEquipamento = (index: number) => {
    const newEquips = [...formData.equipamentos];
    newEquips.splice(index, 1);
    setFormData({ ...formData, equipamentos: newEquips });
  };

  const handleEquipChange = (index: number, val: string) => {
    const newEquips = [...formData.equipamentos];
    newEquips[index].nome = val;
    setFormData({ ...formData, equipamentos: newEquips });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.pin.length !== 6) {
      alert("O PIN deve ter exatamente 6 dígitos numéricos.");
      return;
    }
    setLoading(true);
    const res = await createCliente(formData);
    setLoading(false);
    
    if (res.success) {
      alert("Cliente cadastrado com sucesso!");
      router.push("/admin/clientes");
    } else {
      alert("Erro ao cadastrar cliente: " + res.error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/clientes"
          className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Novo Cliente</h1>
          <p className="text-sm text-slate-500">Preencha o cadastro completo para iniciar o monitoramento.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lado Esquerdo: Dados Pessoais */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40"
          >
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-slate-50">
              <User size={18} className="text-primary" />
              <h2 className="font-bold text-slate-900">Dados Principais</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    placeholder="Ex: João Silva"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="cliente@email.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text"
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    placeholder="(00) 00000-0000"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">CPF ou CNPJ</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text"
                    required
                    value={formData.documento}
                    onChange={(e) => setFormData({...formData, documento: e.target.value})}
                    placeholder="000.000.000-00"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Endereço da Piscina</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text"
                    required
                    value={formData.endereco}
                    onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                    placeholder="Rua, Número, Bairro, Cidade - UF"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tipo de Piscina</label>
                  <select 
                    value={formData.tipoPiscina}
                    onChange={(e) => setFormData({...formData, tipoPiscina: e.target.value})}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm appearance-none"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="Alvenaria">Alvenaria</option>
                    <option value="Vinil">Vinil</option>
                    <option value="Fibra">Fibra</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Volume (Litros)</label>
                  <input 
                    type="number"
                    value={formData.volumePiscina}
                    onChange={(e) => setFormData({...formData, volumePiscina: e.target.value})}
                    placeholder="Ex: 30000"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Frequência de Manutenção</label>
                  <select 
                    value={formData.frequenciaManutencao}
                    onChange={(e) => setFormData({...formData, frequenciaManutencao: e.target.value})}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm appearance-none"
                  >
                    <option value="">Selecione a frequência</option>
                    <option value="Semanal">Semanal</option>
                    <option value="Quinzenal">Quinzenal</option>
                    <option value="Mensal">Mensal</option>
                    <option value="Avulso">Avulso</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Dia Preferencial</label>
                  <select 
                    value={formData.diaPreferencial}
                    onChange={(e) => setFormData({...formData, diaPreferencial: e.target.value})}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm appearance-none"
                  >
                    <option value="">Selecione o dia</option>
                    <option value="Segunda-feira">Segunda-feira</option>
                    <option value="Terça-feira">Terça-feira</option>
                    <option value="Quarta-feira">Quarta-feira</option>
                    <option value="Quinta-feira">Quinta-feira</option>
                    <option value="Sexta-feira">Sexta-feira</option>
                    <option value="Sábado">Sábado</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Observações Técnicas</label>
                <textarea 
                  value={formData.observacoes}
                  onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                  placeholder="Informações adicionais sobre a piscina ou o cliente..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all text-sm min-h-[100px]"
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
              <div className="flex items-center gap-2">
                <Waves size={18} className="text-primary" />
                <h2 className="font-bold text-slate-900">Equipamentos e Inventário</h2>
              </div>
              <button 
                type="button"
                onClick={handleAddEquipamento}
                className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
              >
                <Plus size={14} /> Adicionar
              </button>
            </div>

            <div className="space-y-6">
              {formData.equipamentos.map((equip, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 relative group">
                  <button 
                    type="button"
                    onClick={() => handleRemoveEquipamento(idx)}
                    className="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Equipamento</label>
                      <input 
                        type="text"
                        value={equip.nome}
                        onChange={(e) => {
                          const newEquips = [...formData.equipamentos];
                          newEquips[idx].nome = e.target.value;
                          setFormData({ ...formData, equipamentos: newEquips });
                        }}
                        placeholder="Ex: Bomba Principal"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-transparent focus:border-primary/20 outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Marca</label>
                      <input 
                        type="text"
                        value={equip.marca || ""}
                        placeholder="Ex: Jacuzzi"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-transparent focus:border-primary/20 outline-none transition-all text-sm"
                        onChange={(e) => {
                          const newEquips = [...formData.equipamentos];
                          newEquips[idx].marca = e.target.value;
                          setFormData({ ...formData, equipamentos: newEquips });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modelo</label>
                      <input 
                        type="text"
                        value={equip.modelo || ""}
                        placeholder="Ex: 1.5cv"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-transparent focus:border-primary/20 outline-none transition-all text-sm"
                        onChange={(e) => {
                          const newEquips = [...formData.equipamentos];
                          newEquips[idx].modelo = e.target.value;
                          setFormData({ ...formData, equipamentos: newEquips });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Lado Direito: Segurança e Ações */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-primary p-8 rounded-3xl shadow-xl shadow-primary/20 text-white"
          >
            <div className="flex items-center gap-2 mb-6">
              <Key size={20} className="text-tertiary" />
              <h2 className="font-bold">Acesso do Cliente</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">PIN de 6 Dígitos</label>
                <input 
                  type="password"
                  maxLength={6}
                  required
                  value={formData.pin}
                  onChange={(e) => setFormData({...formData, pin: e.target.value.replace(/\D/g, '')})}
                  placeholder="Ex: 123456"
                  className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/10 focus:bg-white/20 outline-none transition-all text-xl font-mono tracking-[0.5em] text-center"
                />
                <p className="text-[10px] text-white/40 leading-relaxed">
                  Este código será solicitado no login do cliente junto ao documento cadastrado.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40"
          >
            <h3 className="font-bold text-slate-900 mb-4">Revisão do Cadastro</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <CheckCircle2 size={14} className={formData.nome ? "text-emerald-500" : "text-slate-200"} />
                Identificação Completa
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <CheckCircle2 size={14} className={formData.documento ? "text-emerald-500" : "text-slate-200"} />
                Documento Válido
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <CheckCircle2 size={14} className={formData.pin.length === 6 ? "text-emerald-500" : "text-slate-200"} />
                PIN de Segurança
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-primary py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-secondary/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              Finalizar Cadastro
            </button>
          </motion.div>
        </div>
      </form>
    </div>
  );
}
