"use client";

import React, { useEffect, useState } from "react";
import { Settings, Save, Server, Mail, Database } from "lucide-react";
import { getAdvancedConfig, updateAdvancedConfig } from "@/app/actions/webmaster";

export default function ConfiguracoesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<any>({
    maintenanceMode: false,
    cacheEnabled: true,
    smtpHost: "",
    smtpPort: "",
    smtpUser: "",
    smtpPass: "",
  });

  useEffect(() => {
    loadConfig();
  }, []);

  async function loadConfig() {
    setLoading(true);
    const data = await getAdvancedConfig();
    if (data) setConfig(data);
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    const result = await updateAdvancedConfig(config);
    if (result.success) {
      alert("Configurações salvas com sucesso!");
    } else {
      alert("Erro ao salvar: " + result.error);
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        Carregando configurações...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Settings className="text-primary dark:text-blue-400" /> Configurações Avançadas
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Ajustes de servidor, cache e integrações de baixo nível.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Infraestrutura */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Server size={20} />
            </div>
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">Estado do Servidor</h3>
          </div>

          <div className="space-y-6">
            <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-200">Modo de Manutenção</p>
                <p className="text-xs text-slate-500 mt-1">Desativa o acesso público ao site e exibe uma tela de manutenção.</p>
              </div>
              <input
                type="checkbox"
                checked={config.maintenanceMode}
                onChange={e => setConfig({ ...config, maintenanceMode: e.target.checked })}
                className="w-5 h-5 accent-orange-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-200">Cache Global (Next.js)</p>
                <p className="text-xs text-slate-500 mt-1">Ativa o cache agressivo para componentes do servidor.</p>
              </div>
              <input
                type="checkbox"
                checked={config.cacheEnabled}
                onChange={e => setConfig({ ...config, cacheEnabled: e.target.checked })}
                className="w-5 h-5 accent-primary"
              />
            </label>
          </div>
        </div>

        {/* E-mail (SMTP) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Mail size={20} />
            </div>
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">Servidor de E-mail (SMTP)</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">SMTP Host</label>
              <input
                type="text"
                value={config.smtpHost || ""}
                onChange={e => setConfig({ ...config, smtpHost: e.target.value })}
                placeholder="ex: smtp.gmail.com"
                className="w-full bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Porta</label>
                <input
                  type="text"
                  value={config.smtpPort || ""}
                  onChange={e => setConfig({ ...config, smtpPort: e.target.value })}
                  placeholder="ex: 587"
                  className="w-full bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Usuário</label>
                <input
                  type="text"
                  value={config.smtpUser || ""}
                  onChange={e => setConfig({ ...config, smtpUser: e.target.value })}
                  placeholder="ex: contato@..."
                  className="w-full bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Senha SMTP</label>
              <input
                type="password"
                value={config.smtpPass || ""}
                onChange={e => setConfig({ ...config, smtpPass: e.target.value })}
                placeholder="********"
                className="w-full bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
