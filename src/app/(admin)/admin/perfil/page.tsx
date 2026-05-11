"use client";

import React, { useEffect, useState } from "react";
import { 
  User, 
  Lock, 
  Moon, 
  Sun, 
  CreditCard, 
  Save,
  Camera,
  ShieldCheck,
  Zap,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { getAdminProfile, updateAdminProfile } from "@/app/actions/admin";

export default function PerfilPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    asaasKey: "",
    pixKey: "",
    pixTipo: "E-mail",
    darkMode: false,
    avatar: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const profile = await getAdminProfile();
      if (profile) {
        setFormData({
          nome: profile.nome || "",
          email: profile.email || "",
          asaasKey: profile.asaasKey || "",
          pixKey: profile.pixKey || "",
          pixTipo: profile.pixTipo || "E-mail",
          darkMode: profile.darkMode || false,
          avatar: (profile as any).avatar || ""
        });
        
        // Aplica o tema inicial
        if (profile.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateAdminProfile(formData);
      if (res.success) {
        alert("Perfil e chaves de integração salvos com sucesso!");
      } else {
        alert("Erro ao salvar: " + res.error);
      }
    } catch (err) {
      alert("Erro de conexão ao salvar perfil.");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDarkMode = () => {
    const newValue = !formData.darkMode;
    setFormData({ ...formData, darkMode: newValue });
    if (newValue) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-slate-400 font-bold animate-pulse">Sincronizando Perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 transition-colors duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Meu Perfil</h1>
           <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Gerencie seus dados, aparência e chaves de integração.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
        >
           {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
           {saving ? "Gravando..." : "Salvar Tudo"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none text-center relative overflow-hidden group">
               <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-400 overflow-hidden border-2 border-slate-100 dark:border-slate-700">
                     {formData.avatar ? (
                       <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                     ) : (
                       <User size={50} />
                     )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 transition-all border-4 border-white dark:border-slate-900 cursor-pointer">
                     <Camera size={18} />
                     <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                  </label>
               </div>
               <h3 className="font-black text-xl text-slate-900 dark:text-white">{formData.nome || "Administrador"}</h3>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">Admin Master</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Preferências</h4>
               <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-xl ${formData.darkMode ? "bg-primary/20 text-primary" : "bg-amber-100 text-amber-500"}`}>
                        {formData.darkMode ? <Moon size={20} /> : <Sun size={20} />}
                     </div>
                     <span className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-tighter">Modo Escuro</span>
                  </div>
                  <button 
                    onClick={toggleDarkMode}
                    className={`w-14 h-8 rounded-full p-1.5 transition-all duration-300 ${formData.darkMode ? "bg-primary" : "bg-slate-200"}`}
                  >
                     <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${formData.darkMode ? "translate-x-6" : "translate-x-0"}`}></div>
                  </button>
               </div>
            </div>
         </div>

         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-8">
               <div className="flex items-center gap-3 pb-6 border-b border-slate-50 dark:border-slate-800">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl">
                    <ShieldCheck size={22} />
                  </div>
                  <h3 className="font-black text-xl text-slate-900 dark:text-white">Dados da Conta</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nome de Exibição</label>
                     <input 
                        type="text" 
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/20 outline-none transition-all text-slate-900 dark:text-white font-bold" 
                      />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">E-mail de Login</label>
                     <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/20 outline-none transition-all text-slate-900 dark:text-white font-bold" 
                      />
                  </div>
               </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-8">
               <div className="flex items-center gap-3 pb-6 border-b border-slate-50 dark:border-slate-800">
                  <div className="p-2 bg-primary/10 text-primary rounded-xl">
                    <Zap size={22} />
                  </div>
                  <h3 className="font-black text-xl text-slate-900 dark:text-white">Chaves de Integração</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-[2rem] bg-blue-50/30 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-900/30 space-y-6">
                     <div className="flex items-center gap-2">
                        <CreditCard size={20} className="text-blue-500" />
                        <h4 className="font-black text-blue-900 dark:text-blue-400 text-sm uppercase tracking-tighter">Asaas API</h4>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">API Key</label>
                        <input 
                          type="password" 
                          value={formData.asaasKey}
                          onChange={(e) => setFormData({...formData, asaasKey: e.target.value})}
                          placeholder="••••••••••••••••"
                          className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-900/30 outline-none text-xs font-mono dark:text-white" 
                        />
                     </div>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-emerald-50/30 dark:bg-emerald-900/10 border border-emerald-100/50 dark:border-emerald-900/30 space-y-6">
                     <div className="flex items-center gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo%E2%80%94Pix.svg" alt="Pix" className="h-4 brightness-110" />
                        <h4 className="font-black text-emerald-900 dark:text-emerald-400 text-sm uppercase tracking-tighter">PIX Banco Central</h4>
                     </div>
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Chave PIX</label>
                           <input 
                              type="text" 
                              value={formData.pixKey}
                              onChange={(e) => setFormData({...formData, pixKey: e.target.value})}
                              placeholder="Seu CPF, Email ou Chave" 
                              className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/30 outline-none text-xs font-bold dark:text-white" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Tipo</label>
                           <select 
                              value={formData.pixTipo}
                              onChange={(e) => setFormData({...formData, pixTipo: e.target.value})}
                              className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/30 outline-none text-xs font-bold dark:text-white"
                           >
                              <option>E-mail</option>
                              <option>CPF</option>
                              <option>CNPJ</option>
                              <option>Telefone</option>
                              <option>Chave Aleatória</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
