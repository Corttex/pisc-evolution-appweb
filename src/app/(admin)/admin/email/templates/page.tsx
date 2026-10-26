"use client";

import React, { useEffect, useState } from "react";
import { PenTool, Save, Plus, Mail } from "lucide-react";
import { getEmailTemplates, saveEmailTemplate } from "@/app/actions/emails";

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    setLoading(true);
    const data = await getEmailTemplates();
    setTemplates(data);
    setLoading(false);
  }

  function handleNew() {
    setSelected({
      chave: "",
      nome: "",
      assunto: "",
      html: "<div style=\"font-family: Arial, sans-serif; padding: 20px;\">\n  <h1>Olá {{nome}}!</h1>\n  <p>Escreva sua mensagem aqui.</p>\n</div>",
      variaveis: "{{nome}}"
    });
  }

  async function handleSave() {
    if (!selected.chave || !selected.nome || !selected.assunto) {
      alert("Preencha chave, nome e assunto.");
      return;
    }
    const res = await saveEmailTemplate(selected);
    if (res.success) {
      alert("Arte salva com sucesso!");
      setSelected(res.template);
      loadTemplates();
    } else {
      alert("Erro ao salvar: " + res.error);
    }
  }

  if (loading) return <div className="p-8 text-slate-500">Carregando editor...</div>;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <PenTool className="text-primary dark:text-blue-400" /> Artes de E-mail
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Personalize o design e o texto dos e-mails enviados pelo sistema.
          </p>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold transition-all hover:opacity-90"
        >
          <Plus size={18} /> Novo Template
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar com Templates */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-4 px-2">Templates</h3>
          <div className="space-y-2">
            {templates.length === 0 && (
              <p className="text-sm text-slate-500 px-2">Nenhuma arte cadastrada.</p>
            )}
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => setSelected(t)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  selected?.id === t.id 
                    ? "bg-primary/10 text-primary font-bold" 
                    : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                <Mail size={16} /> {t.nome}
              </button>
            ))}
          </div>
        </div>

        {/* Editor Principal */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
          {selected ? (
            <>
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome de Exibição</label>
                    <input 
                      type="text" 
                      value={selected.nome} 
                      onChange={e => setSelected({...selected, nome: e.target.value})}
                      placeholder="Ex: Boas Vindas"
                      className="w-full bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Chave (Interna)</label>
                    <input 
                      type="text" 
                      value={selected.chave} 
                      onChange={e => setSelected({...selected, chave: e.target.value})}
                      disabled={!!selected.id}
                      placeholder="Ex: welcome_email"
                      className="w-full bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 outline-none disabled:opacity-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Assunto do E-mail</label>
                  <input 
                    type="text" 
                    value={selected.assunto} 
                    onChange={e => setSelected({...selected, assunto: e.target.value})}
                    placeholder="Bem-vindo à Piscinas Evolution!"
                    className="w-full bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 outline-none"
                  />
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col gap-2">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Código HTML (Arte)</label>
                <textarea
                  value={selected.html}
                  onChange={e => setSelected({...selected, html: e.target.value})}
                  className="w-full h-64 font-mono text-sm bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-slate-800 rounded-xl p-4 outline-none focus:border-primary resize-y"
                ></textarea>
                <p className="text-xs text-slate-500 mt-2">
                  Variáveis disponíveis (insira no HTML): <strong className="text-primary">{selected.variaveis || "Nenhuma cadastrada"}</strong>
                </p>
                <input 
                  type="text" 
                  placeholder="Editar variáveis (ex: {{nome}}, {{link}})"
                  value={selected.variaveis || ""}
                  onChange={e => setSelected({...selected, variaveis: e.target.value})}
                  className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 text-sm py-1 outline-none focus:border-primary mt-2"
                />
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/30 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-8 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all"
                >
                  <Save size={18} /> Salvar Arte
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-12">
              <PenTool size={48} className="mb-4 opacity-20" />
              <p>Selecione um template ao lado ou crie uma nova arte.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
