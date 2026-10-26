"use client";

import React, { useEffect, useState } from "react";
import { 
  Globe, 
  MessageCircle, 
  Image as ImageIcon, 
  Share2, 
  Save,
  Mail,
  Phone,
  Camera,
  Loader2,
  CreditCard,
  Zap,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getConfig, updateConfig } from "@/app/actions/config";
import { toast } from "react-hot-toast";

export default function ConfiguracoesPage() {
  const [formData, setFormData] = useState({
    site_titulo: "",
    site_headline: "",
    site_subheadline: "",
    site_whatsapp: "",
    site_email: "",
    social_instagram: "",
    social_facebook: "",
    asaasKey: "",
    asaasEnv: "sandbox",
    pixSinal: 50,
    pixChave: "",
    pixBeneficiario: "",
    moduleEmailEnabled: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("site");

  useEffect(() => {
    async function load() {
      const config = await getConfig();
      if (config) {
        setFormData({
          site_titulo: config.site_titulo || "",
          site_headline: config.site_headline || "",
          site_subheadline: config.site_subheadline || "",
          site_whatsapp: config.site_whatsapp || "",
          site_email: config.site_email || "",
          social_instagram: config.social_instagram || "",
          social_facebook: config.social_facebook || "",
          asaasKey: (config as any).asaasKey || "",
          asaasEnv: (config as any).asaasEnv || "sandbox",
          pixSinal: (config as any).pixSinal || 50,
          pixChave: (config as any).pixChave || "",
          pixBeneficiario: (config as any).pixBeneficiario || "",
          moduleEmailEnabled: (config as any).moduleEmailEnabled !== false
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await updateConfig(formData);
    setSaving(false);
    if (res.success) {
      toast.success("Configurações salvas com sucesso!");
    } else {
      toast.error("Erro ao salvar configurações.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const sections = [
    { id: "site", label: "Geral & Headlines", icon: Globe },
    { id: "payments", label: "Pagamentos & API", icon: CreditCard },
    { id: "social", label: "Redes Sociais", icon: Share2 },
    { id: "modules", label: "Módulos Adicionais", icon: Zap },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Configurações Globais</h1>
           <p className="text-sm text-slate-500">Controle o conteúdo, integrações e regras de negócio.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
        >
           {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
           {saving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="space-y-4">
            {sections.map((section) => (
              <button 
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                  activeTab === section.id 
                    ? "bg-white border-primary/20 text-primary shadow-lg shadow-primary/5 font-bold" 
                    : "bg-transparent border-transparent text-slate-400 hover:bg-slate-100"
                }`}
              >
                 <section.icon size={20} />
                 <span className="text-sm">{section.label}</span>
              </button>
            ))}
         </div>

         <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === "site" && (
                <motion.div 
                  key="site"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                    <div className="flex items-center gap-2 pb-4 border-b border-slate-50">
                        <Globe size={18} className="text-primary" />
                        <h3 className="font-bold text-slate-900">Geral & Headlines</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Título do Site</label>
                          <input 
                            type="text" 
                            value={formData.site_titulo}
                            onChange={(e) => setFormData({...formData, site_titulo: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Headline (Hero)</label>
                          <textarea 
                            rows={3} 
                            value={formData.site_headline}
                            onChange={(e) => setFormData({...formData, site_headline: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all resize-none" 
                          />
                        </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                    <div className="flex items-center gap-2 pb-4 border-b border-slate-50">
                        <MessageCircle size={18} className="text-primary" />
                        <h3 className="font-bold text-slate-900">WhatsApp & Contatos</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">WhatsApp</label>
                          <input 
                            type="text" 
                            value={formData.site_whatsapp}
                            onChange={(e) => setFormData({...formData, site_whatsapp: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                          <input 
                            type="text" 
                            value={formData.site_email}
                            onChange={(e) => setFormData({...formData, site_email: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all" 
                          />
                        </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "payments" && (
                <motion.div 
                  key="payments"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-[#0F172A] p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/20 space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
                    
                    <div className="flex items-center gap-4 pb-6 border-b border-white/5 relative z-10">
                        <div className="p-3 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/40">
                          <Zap size={24} />
                        </div>
                        <div>
                          <h3 className="font-black text-xl">Integração Asaas</h3>
                          <p className="text-blue-400/60 text-[10px] font-black uppercase tracking-widest">Configuração de Gateway e Webhooks</p>
                        </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">API Key (Asaas)</label>
                        <input 
                          type="password" 
                          value={formData.asaasKey}
                          onChange={(e) => setFormData({...formData, asaasKey: e.target.value})}
                          placeholder="$asaas_..."
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-mono text-sm" 
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Ambiente</label>
                          <select 
                            value={formData.asaasEnv}
                            onChange={(e) => setFormData({...formData, asaasEnv: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-sm"
                          >
                            <option value="sandbox" className="bg-slate-900 text-white">Sandbox (Testes)</option>
                            <option value="production" className="bg-slate-900 text-white">Produção (Real)</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Sinal Obrigatório (%)</label>
                          <input 
                            type="number" 
                            value={formData.pixSinal}
                            onChange={(e) => setFormData({...formData, pixSinal: Number(e.target.value)})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-start gap-4">
                       <ShieldCheck className="text-blue-400 shrink-0" size={20} />
                       <p className="text-xs text-blue-100/60 leading-relaxed font-medium">
                         Suas chaves de API são criptografadas em repouso. O ambiente de **Sandbox** permite simular pagamentos sem custos reais.
                       </p>
                    </div>

                    <div className="flex items-center gap-4 pb-6 border-b border-white/5 relative z-10 pt-4">
                        <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/40">
                          <CreditCard size={24} />
                        </div>
                        <div>
                          <h3 className="font-black text-xl">Pix Banco Central</h3>
                          <p className="text-emerald-400/60 text-[10px] font-black uppercase tracking-widest">Configuração de Chave Direta</p>
                        </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Chave PIX (CPF/CNPJ/E-mail/EVP)</label>
                        <input 
                          type="text" 
                          value={formData.pixChave}
                          onChange={(e) => setFormData({...formData, pixChave: e.target.value})}
                          placeholder="Sua chave PIX"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all font-bold text-sm" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Nome do Beneficiário</label>
                        <input 
                          type="text" 
                          value={formData.pixBeneficiario}
                          onChange={(e) => setFormData({...formData, pixBeneficiario: e.target.value})}
                          placeholder="PISCINAS EVOLUTION LTDA"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all font-bold text-sm" 
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex items-start gap-4">
                       <ShieldCheck className="text-emerald-400 shrink-0" size={20} />
                       <p className="text-xs text-emerald-100/60 leading-relaxed font-medium">
                         O Pix Banco Central utiliza a chave direta para geração de QRCodes dinâmicos com "Copia e Cola". O Webhook do Asaas é usado para confirmação automática.
                       </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "social" && (
                <motion.div 
                  key="social"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                    <div className="flex items-center gap-2 pb-4 border-b border-slate-50">
                        <Share2 size={18} className="text-primary" />
                        <h3 className="font-bold text-slate-900">Redes Sociais</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Instagram URL</label>
                          <input 
                            type="text" 
                            value={formData.social_instagram}
                            onChange={(e) => setFormData({...formData, social_instagram: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Facebook URL</label>
                          <input 
                            type="text" 
                            value={formData.social_facebook}
                            onChange={(e) => setFormData({...formData, social_facebook: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all" 
                          />
                        </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "modules" && (
                <motion.div 
                  key="modules"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                    <div className="flex items-center gap-2 pb-4 border-b border-slate-50">
                        <Zap size={18} className="text-primary" />
                        <h3 className="font-bold text-slate-900">Módulos do Sistema</h3>
                    </div>
                    <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                          <div>
                            <p className="font-bold text-slate-700">Módulo de E-mail</p>
                            <p className="text-xs text-slate-500 mt-1">Exibe os menus de Artes de E-mail e Caixa de E-mail.</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={formData.moduleEmailEnabled}
                            onChange={e => setFormData({ ...formData, moduleEmailEnabled: e.target.checked })}
                            className="w-5 h-5 accent-primary"
                          />
                        </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
