"use client";

import React, { useEffect, useState } from "react";
import { 
  Globe, 
  ArrowRight,
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Save, 
  Loader2,
  CheckCircle2,
  Award,
  ShieldCheck,
  Users,
  MapPin,
  Sun,
  Thermometer,
  Waves,
  Settings,
  Wrench,
  Droplets,
  Leaf,
  Zap,
  Star,
  HelpCircle,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSections, updateSection } from "@/app/actions/sections";
import { toast } from "react-hot-toast";

// Icon mapping dictionary
const ICON_MAP: Record<string, any> = {
  Sun,
  Thermometer,
  Waves,
  Settings,
  Wrench,
  Droplets,
  CheckCircle2,
  Award,
  ShieldCheck,
  Users,
  MapPin,
  Leaf,
  Zap
};

export default function EditorPage() {
  const [sections, setSections] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    async function load() {
      const data = await getSections();
      setSections(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSaveSection = async (key: string) => {
    setSaving(true);
    const res = await updateSection(key, sections[key]);
    setSaving(false);
    if (res.success) {
      toast.success(`Seção ${key.toUpperCase()} salva com sucesso!`);
    } else {
      toast.error(`Erro ao salvar: ${res.error}`);
    }
  };

  const handleImageChange = (sectionKey: string, fieldPath: string[], file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSections((prev: any) => {
        const copy = JSON.parse(JSON.stringify(prev));
        let current = copy[sectionKey];
        for (let i = 0; i < fieldPath.length - 1; i++) {
          current = current[fieldPath[i]];
        }
        current[fieldPath[fieldPath.length - 1]] = reader.result as string;
        return copy;
      });
    };
    reader.readAsDataURL(file);
  };

  const updateField = (sectionKey: string, fieldPath: string[], value: any) => {
    setSections((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      let current = copy[sectionKey];
      for (let i = 0; i < fieldPath.length - 1; i++) {
        current = current[fieldPath[i]];
      }
      current[fieldPath[fieldPath.length - 1]] = value;
      return copy;
    });
  };

  const updateListItem = (sectionKey: string, listKey: string, index: number, field: string, value: any) => {
    setSections((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[sectionKey][listKey][index][field] = value;
      return copy;
    });
  };

  const removeListItem = (sectionKey: string, listKey: string, index: number) => {
    setSections((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[sectionKey][listKey].splice(index, 1);
      return copy;
    });
  };

  const addListItem = (sectionKey: string, listKey: string, defaultItem: any) => {
    setSections((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[sectionKey][listKey].push(defaultItem);
      return copy;
    });
  };

  if (loading || !sections) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-slate-400 font-bold animate-pulse">Carregando Editor de Telas...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "hero", label: "Hero (Início)", icon: Globe },
    { id: "services", label: "Serviços", icon: Settings },
    { id: "differentials", label: "Diferenciais", icon: Award },
    { id: "sustainability", label: "Sustentabilidade", icon: Leaf },
    { id: "testimonials", label: "Depoimentos", icon: Star },
    { id: "faq", label: "Perguntas (FAQ)", icon: HelpCircle },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editor Visual de Telas</h1>
          <p className="text-sm text-slate-500 font-medium">Controle os textos, imagens e listas da Landing Page com salvamento independente por seção.</p>
        </div>
        <button 
          onClick={() => handleSaveSection(activeTab)}
          disabled={saving}
          className="w-full md:w-auto bg-cta text-primary px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-cta/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          {saving ? "Salvando..." : `Salvar Seção ${activeTab.toUpperCase()}`}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Tabs Sidebar */}
        <div className="space-y-3 lg:col-span-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                  activeTab === tab.id 
                    ? "bg-white border-primary/20 text-primary shadow-lg shadow-primary/5 font-black" 
                    : "bg-white/40 border-transparent text-slate-500 hover:bg-white hover:text-slate-800"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === "hero" && (
              <motion.div 
                key="hero"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                  <h3 className="font-black text-xl text-slate-900 border-b pb-4">Hero Principal</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Headline (Título Principal)</label>
                      <input 
                        type="text" 
                        value={sections.hero.headline}
                        onChange={(e) => updateField("hero", ["headline"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subheadline (Subtítulo)</label>
                      <textarea 
                        rows={3} 
                        value={sections.hero.subheadline}
                        onChange={(e) => updateField("hero", ["subheadline"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900 resize-none" 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp de Contato</label>
                        <input 
                          type="text" 
                          value={sections.hero.whatsapp}
                          onChange={(e) => updateField("hero", ["whatsapp"], e.target.value)}
                          className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Imagem de Fundo (Upload)</label>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-bold cursor-pointer hover:bg-primary/95 transition-all text-xs">
                            <ImageIcon size={16} />
                            Selecionar Imagem
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*" 
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageChange("hero", ["bgImage"], file);
                              }}
                            />
                          </label>
                          {sections.hero.bgImage && (
                            <img src={sections.hero.bgImage} alt="Preview Hero" className="h-12 w-20 object-cover rounded-lg border" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "services" && (
              <motion.div 
                key="services"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                  <h3 className="font-black text-xl text-slate-900 border-b pb-4">Textos Gerais da Seção</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título</label>
                      <input 
                        type="text" 
                        value={sections.services.title}
                        onChange={(e) => updateField("services", ["title"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subtítulo (Caps)</label>
                      <input 
                        type="text" 
                        value={sections.services.subtitle}
                        onChange={(e) => updateField("services", ["subtitle"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição</label>
                    <textarea 
                      rows={2}
                      value={sections.services.description}
                      onChange={(e) => updateField("services", ["description"], e.target.value)}
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900 resize-none" 
                    />
                  </div>
                </div>

                {/* Featured Service Card */}
                <div className="bg-[#0F172A] text-white p-8 rounded-[2.5rem] space-y-6 relative overflow-hidden">
                  <h3 className="font-black text-xl border-b border-white/10 pb-4">Serviço Premium Destacado (Banner)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tag Superior</label>
                      <input 
                        type="text" 
                        value={sections.services.featured?.tag || ""}
                        onChange={(e) => updateField("services", ["featured", "tag"], e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-cta/30 transition-all font-bold text-sm" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Título do Serviço</label>
                      <input 
                        type="text" 
                        value={sections.services.featured?.title || ""}
                        onChange={(e) => updateField("services", ["featured", "title"], e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-cta/30 transition-all font-bold text-sm" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Descrição</label>
                    <textarea 
                      rows={3}
                      value={sections.services.featured?.description || ""}
                      onChange={(e) => updateField("services", ["featured", "description"], e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-cta/30 transition-all font-bold text-sm resize-none" 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Link do Botão (ex: WhatsApp/URL)</label>
                      <input 
                        type="text" 
                        value={sections.services.featured?.buttonLink || ""}
                        onChange={(e) => updateField("services", ["featured", "buttonLink"], e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-cta/30 transition-all font-bold text-sm" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Upload da Imagem</label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-3 bg-white/10 text-white rounded-xl font-bold cursor-pointer hover:bg-white/15 transition-all text-xs border border-white/10">
                          <ImageIcon size={16} />
                          Selecionar Imagem
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageChange("services", ["featured", "image"], file);
                            }}
                          />
                        </label>
                        {sections.services.featured?.image && (
                          <img src={sections.services.featured.image} alt="Featured Preview" className="h-12 w-20 object-cover rounded-lg border border-white/10" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Grid Items */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="font-black text-xl text-slate-900">Itens de Serviço ({sections.services.items?.length || 0})</h3>
                    <button 
                      onClick={() => addListItem("services", "items", {
                        title: "Novo Serviço",
                        description: "Descrição rápida do serviço.",
                        icon: "Settings",
                        image: "/res_pool_1.png",
                        link: "/servicos"
                      })}
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-all"
                    >
                      <Plus size={14} /> Adicionar Serviço
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sections.services.items?.map((item: any, idx: number) => (
                      <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 relative group">
                        <button 
                          onClick={() => removeListItem("services", "items", idx)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>
                        
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Título do Serviço</label>
                          <input 
                            type="text" 
                            value={item.title} 
                            onChange={(e) => updateListItem("services", "items", idx, "title", e.target.value)}
                            className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-bold"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Descrição</label>
                          <textarea 
                            rows={2}
                            value={item.description} 
                            onChange={(e) => updateListItem("services", "items", idx, "description", e.target.value)}
                            className="w-full px-3 py-2 bg-white border rounded-lg text-xs font-semibold resize-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Link / Rota</label>
                          <input 
                            type="text" 
                            value={item.link} 
                            onChange={(e) => updateListItem("services", "items", idx, "link", e.target.value)}
                            className="w-full px-3 py-2 bg-white border rounded-lg text-xs font-bold"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Selecionar Ícone</label>
                          <div className="flex flex-wrap gap-1 p-1.5 bg-white rounded-xl border border-slate-200">
                            {Object.keys(ICON_MAP).map(iconName => {
                              const Icon = ICON_MAP[iconName];
                              const isSelected = item.icon === iconName;
                              return (
                                <button
                                  key={iconName}
                                  type="button"
                                  onClick={() => updateListItem("services", "items", idx, "icon", iconName)}
                                  className={`p-1.5 rounded-lg border transition-all ${
                                    isSelected 
                                      ? "bg-primary text-white border-primary shadow-sm" 
                                      : "bg-transparent text-slate-400 border-transparent hover:text-slate-700 hover:bg-slate-100"
                                  }`}
                                  title={iconName}
                                >
                                  <Icon size={14} />
                                </button>
                              );
                            })}
                          </div>
                        </div>


                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Imagem do Serviço</label>
                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-1.5 px-3 py-2 bg-primary text-white rounded-lg font-bold cursor-pointer text-[10px]">
                              <ImageIcon size={12} /> Upload
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*" 
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      updateListItem("services", "items", idx, "image", reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                            {item.image && (
                              <img src={item.image} alt="Service Preview" className="h-8 w-12 object-cover rounded border" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "differentials" && (
              <motion.div 
                key="differentials"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                  <h3 className="font-black text-xl text-slate-900 border-b pb-4">Diferenciais Gerais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título</label>
                      <input 
                        type="text" 
                        value={sections.differentials.title}
                        onChange={(e) => updateField("differentials", ["title"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subtítulo</label>
                      <input 
                        type="text" 
                        value={sections.differentials.subtitle}
                        onChange={(e) => updateField("differentials", ["subtitle"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição</label>
                      <textarea 
                        rows={2}
                        value={sections.differentials.description}
                        onChange={(e) => updateField("differentials", ["description"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900 resize-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Texto do Botão de Ação</label>
                      <input 
                        type="text" 
                        value={sections.differentials.buttonText}
                        onChange={(e) => updateField("differentials", ["buttonText"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                      />
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="font-black text-xl text-slate-900">Lista de Diferenciais</h3>
                    <button 
                      onClick={() => addListItem("differentials", "items", {
                        title: "Novo Diferencial",
                        description: "Descrição rápida.",
                        icon: "CheckCircle2"
                      })}
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-all"
                    >
                      <Plus size={14} /> Adicionar Item
                    </button>
                  </div>

                  <div className="space-y-4">
                    {sections.differentials.items?.map((item: any, idx: number) => (
                      <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4 relative group">
                        <button 
                          onClick={() => removeListItem("differentials", "items", idx)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>

                        <div className="w-full md:w-auto">
                          <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Ícone</label>
                          <div className="flex flex-wrap gap-1 p-1.5 bg-white rounded-xl border border-slate-200">
                            {Object.keys(ICON_MAP).map(iconName => {
                              const Icon = ICON_MAP[iconName];
                              const isSelected = item.icon === iconName;
                              return (
                                <button
                                  key={iconName}
                                  type="button"
                                  onClick={() => updateListItem("differentials", "items", idx, "icon", iconName)}
                                  className={`p-1.5 rounded-lg border transition-all ${
                                    isSelected 
                                      ? "bg-primary text-white border-primary shadow-sm" 
                                      : "bg-transparent text-slate-400 border-transparent hover:text-slate-700 hover:bg-slate-100"
                                  }`}
                                  title={iconName}
                                >
                                  <Icon size={14} />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase block">Título</label>
                            <input 
                              type="text" 
                              value={item.title} 
                              onChange={(e) => updateListItem("differentials", "items", idx, "title", e.target.value)}
                              className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase block">Descrição</label>
                            <input 
                              type="text" 
                              value={item.description} 
                              onChange={(e) => updateListItem("differentials", "items", idx, "description", e.target.value)}
                              className="w-full px-3 py-2 bg-white border rounded-lg text-xs font-semibold"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "sustainability" && (
              <motion.div 
                key="sustainability"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                  <h3 className="font-black text-xl text-slate-900 border-b pb-4">Sustentabilidade Evolution</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título</label>
                      <input 
                        type="text" 
                        value={sections.sustainability.title}
                        onChange={(e) => updateField("sustainability", ["title"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subtítulo</label>
                      <input 
                        type="text" 
                        value={sections.sustainability.subtitle}
                        onChange={(e) => updateField("sustainability", ["subtitle"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Citação/Frase de Impacto</label>
                    <input 
                      type="text" 
                      value={sections.sustainability.quote}
                      onChange={(e) => updateField("sustainability", ["quote"], e.target.value)}
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Imagem Lateral (Sustentável)</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-bold cursor-pointer hover:bg-primary/95 transition-all text-xs">
                        <ImageIcon size={16} />
                        Upload Imagem
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageChange("sustainability", ["image"], file);
                          }}
                        />
                      </label>
                      {sections.sustainability.image && (
                        <img src={sections.sustainability.image} alt="Sustainability Preview" className="h-12 w-20 object-cover rounded-lg border" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="font-black text-xl text-slate-900">Pilares Sustentáveis</h3>
                    <button 
                      onClick={() => addListItem("sustainability", "items", {
                        title: "Novo Pilar",
                        description: "Descrição detalhada.",
                        icon: "Leaf"
                      })}
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-all"
                    >
                      <Plus size={14} /> Adicionar Item
                    </button>
                  </div>

                  <div className="space-y-4">
                    {sections.sustainability.items?.map((item: any, idx: number) => (
                      <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4 relative group">
                        <button 
                          onClick={() => removeListItem("sustainability", "items", idx)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>

                        <div className="w-full md:w-auto">
                          <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Ícone</label>
                          <div className="flex flex-wrap gap-1 p-1.5 bg-white rounded-xl border border-slate-200">
                            {Object.keys(ICON_MAP).map(iconName => {
                              const Icon = ICON_MAP[iconName];
                              const isSelected = item.icon === iconName;
                              return (
                                <button
                                  key={iconName}
                                  type="button"
                                  onClick={() => updateListItem("sustainability", "items", idx, "icon", iconName)}
                                  className={`p-1.5 rounded-lg border transition-all ${
                                    isSelected 
                                      ? "bg-primary text-white border-primary shadow-sm" 
                                      : "bg-transparent text-slate-400 border-transparent hover:text-slate-700 hover:bg-slate-100"
                                  }`}
                                  title={iconName}
                                >
                                  <Icon size={14} />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase block">Título</label>
                            <input 
                              type="text" 
                              value={item.title} 
                              onChange={(e) => updateListItem("sustainability", "items", idx, "title", e.target.value)}
                              className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase block">Descrição</label>
                            <input 
                              type="text" 
                              value={item.description} 
                              onChange={(e) => updateListItem("sustainability", "items", idx, "description", e.target.value)}
                              className="w-full px-3 py-2 bg-white border rounded-lg text-xs font-semibold"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "testimonials" && (
              <motion.div 
                key="testimonials"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                  <h3 className="font-black text-xl text-slate-900 border-b pb-4">Depoimentos Gerais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título</label>
                      <input 
                        type="text" 
                        value={sections.testimonials.title}
                        onChange={(e) => updateField("testimonials", ["title"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subtítulo</label>
                      <input 
                        type="text" 
                        value={sections.testimonials.subtitle}
                        onChange={(e) => updateField("testimonials", ["subtitle"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="font-black text-xl text-slate-900">Lista de Depoimentos</h3>
                    <button 
                      onClick={() => addListItem("testimonials", "items", {
                        name: "Novo Cliente",
                        role: "Lago Sul",
                        text: "Ficamos muito satisfeitos com o serviço prestado.",
                        stars: 5
                      })}
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-all"
                    >
                      <Plus size={14} /> Adicionar Depoimento
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sections.testimonials.items?.map((item: any, idx: number) => (
                      <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 relative group">
                        <button 
                          onClick={() => removeListItem("testimonials", "items", idx)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase">Nome</label>
                            <input 
                              type="text" 
                              value={item.name} 
                              onChange={(e) => updateListItem("testimonials", "items", idx, "name", e.target.value)}
                              className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase">Localização / Subtítulo</label>
                            <input 
                              type="text" 
                              value={item.role} 
                              onChange={(e) => updateListItem("testimonials", "items", idx, "role", e.target.value)}
                              className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-bold"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Texto do Depoimento</label>
                          <textarea 
                            rows={3}
                            value={item.text} 
                            onChange={(e) => updateListItem("testimonials", "items", idx, "text", e.target.value)}
                            className="w-full px-3 py-2 bg-white border rounded-lg text-xs font-semibold resize-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Estrelas (1 a 5)</label>
                          <input 
                            type="number" 
                            min={1} 
                            max={5} 
                            value={item.stars} 
                            onChange={(e) => updateListItem("testimonials", "items", idx, "stars", parseInt(e.target.value) || 5)}
                            className="w-full px-3 py-2 bg-white border rounded-lg text-xs font-bold"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "faq" && (
              <motion.div 
                key="faq"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                  <h3 className="font-black text-xl text-slate-900 border-b pb-4">Configuração do FAQ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título</label>
                      <input 
                        type="text" 
                        value={sections.faq.title}
                        onChange={(e) => updateField("faq", ["title"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subtítulo</label>
                      <input 
                        type="text" 
                        value={sections.faq.subtitle}
                        onChange={(e) => updateField("faq", ["subtitle"], e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-900" 
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="font-black text-xl text-slate-900">Perguntas & Respostas</h3>
                    <button 
                      onClick={() => addListItem("faq", "items", {
                        question: "Nova Pergunta?",
                        answer: "Resposta para a pergunta aqui."
                      })}
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-all"
                    >
                      <Plus size={14} /> Adicionar Pergunta
                    </button>
                  </div>

                  <div className="space-y-4">
                    {sections.faq.items?.map((item: any, idx: number) => (
                      <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 relative group">
                        <button 
                          onClick={() => removeListItem("faq", "items", idx)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>

                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Pergunta</label>
                          <input 
                            type="text" 
                            value={item.question} 
                            onChange={(e) => updateListItem("faq", "items", idx, "question", e.target.value)}
                            className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-bold text-primary"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Resposta</label>
                          <textarea 
                            rows={3}
                            value={item.answer} 
                            onChange={(e) => updateListItem("faq", "items", idx, "answer", e.target.value)}
                            className="w-full px-3 py-2 bg-white border rounded-lg text-xs font-semibold text-slate-600 resize-none"
                          />
                        </div>
                      </div>
                    ))}
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
