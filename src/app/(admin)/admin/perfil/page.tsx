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
    telefone: "",
    cargo: "",
    biografia: "",
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
          telefone: (profile as any).telefone || "",
          cargo: (profile as any).cargo || "Administrador",
          biografia: (profile as any).biografia || "",
          darkMode: profile.darkMode || false,
          avatar: (profile as any).avatar || ""
        });
        
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
        alert("Perfil atualizado com sucesso!");
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
           <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Gerencie seus dados pessoais, cargo e aparência do sistema.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
        >
           {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
           {saving ? "Gravando..." : "Salvar Perfil"}
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
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">{formData.cargo || "Administrador Master"}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Aparência</h4>
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
                  <h3 className="font-black text-xl text-slate-900 dark:text-white">Dados Profissionais</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nome Completo</label>
                     <input 
                        type="text" 
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/20 outline-none transition-all text-slate-900 dark:text-white font-bold" 
                      />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Cargo / Função</label>
                     <input 
                        type="text" 
                        value={formData.cargo}
                        onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                        placeholder="Ex: Diretor Técnico"
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/20 outline-none transition-all text-slate-900 dark:text-white font-bold" 
                      />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">E-mail Corporativo</label>
                     <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/20 outline-none transition-all text-slate-900 dark:text-white font-bold" 
                      />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Telefone / WhatsApp</label>
                     <input 
                        type="text" 
                        value={formData.telefone}
                        onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                        placeholder="(61) 99999-9999"
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/20 outline-none transition-all text-slate-900 dark:text-white font-bold" 
                      />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Biografia / Observações</label>
                  <textarea 
                     rows={4}
                     value={formData.biografia}
                     onChange={(e) => setFormData({...formData, biografia: e.target.value})}
                     placeholder="Breve descrição sobre sua atuação na Piscinas Evolution..."
                     className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/20 outline-none transition-all text-slate-900 dark:text-white font-bold resize-none" 
                  />
               </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-8">
               <div className="flex items-center gap-3 pb-6 border-b border-slate-50 dark:border-slate-800">
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-xl">
                    <Zap size={22} />
                  </div>
                  <h3 className="font-black text-xl text-slate-900 dark:text-white">Preferências do Sistema</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                     <div>
                        <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">Notificações WhatsApp</p>
                        <p className="text-[10px] text-slate-400 font-bold">Avisos automáticos de agenda</p>
                     </div>
                     <div className="w-12 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between opacity-50">
                     <div>
                        <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">Relatórios Diários</p>
                        <p className="text-[10px] text-slate-400 font-bold">Resumo por e-mail (Em breve)</p>
                     </div>
                     <div className="w-12 h-6 bg-slate-200 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                  </div>
               </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-8">
               <div className="flex items-center gap-3 pb-6 border-b border-slate-50 dark:border-slate-800">
                  <div className="p-2 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-xl">
                    <Lock size={22} />
                  </div>
                  <h3 className="font-black text-xl text-slate-900 dark:text-white">Segurança</h3>
               </div>
               
               <div className="flex flex-col gap-4">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nova Senha de Acesso (Deixe em branco para não alterar)</label>
                     <input 
                        type="password" 
                        value={(formData as any).senha || ""}
                        onChange={(e) => setFormData({...formData, senha: e.target.value} as any)}
                        placeholder="••••••••"
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/20 outline-none transition-all text-slate-900 dark:text-white font-bold" 
                      />
                  </div>
                  <button className="w-full md:w-1/2 px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all mt-4">
                     Ativar 2FA (Segurança Dupla)
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
