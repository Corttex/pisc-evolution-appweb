"use client";

import React, { useEffect, useState } from "react";
import { ShieldAlert, AlertTriangle, Trash2, Plus, Lock } from "lucide-react";
import { 
  getAdvancedConfig, 
  updateAdvancedConfig, 
  getBlockedIps, 
  blockIp, 
  unblockIp, 
  getSecurityLogs 
} from "@/app/actions/webmaster";

export default function SegurancaPage() {
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<any>({});
  const [blockedIps, setBlockedIps] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [newIp, setNewIp] = useState("");
  const [newReason, setNewReason] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [cfg, ips, lg] = await Promise.all([
      getAdvancedConfig(),
      getBlockedIps(),
      getSecurityLogs()
    ]);
    if (cfg) setConfig(cfg);
    if (ips) setBlockedIps(ips);
    if (lg) setLogs(lg);
    setLoading(false);
  }

  async function handleSaveConfig() {
    const res = await updateAdvancedConfig(config);
    if (res.success) {
      alert("Configurações salvas.");
    } else {
      alert("Erro ao salvar.");
    }
  }

  async function handleAddIp(e: React.FormEvent) {
    e.preventDefault();
    if (!newIp) return;
    const res = await blockIp(newIp, newReason || "Bloqueio manual");
    if (res.success) {
      setNewIp("");
      setNewReason("");
      loadData();
    } else {
      alert("Erro: " + res.error);
    }
  }

  async function handleRemoveIp(id: string) {
    if (!confirm("Remover este IP da lista negra?")) return;
    const res = await unblockIp(id);
    if (res.success) {
      loadData();
    }
  }

  if (loading) {
    return <div className="p-8 text-slate-500">Carregando módulo de segurança...</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <ShieldAlert className="text-primary dark:text-blue-400" /> Segurança
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Monitoramento de acessos, bloqueio de IPs e regras de firewall.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna Esquerda: Config e IPs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Regras Básicas */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Lock size={18} className="text-slate-400" /> Políticas de Acesso
            </h3>
            
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Limite de Falhas de Login
                </label>
                <input
                  type="number"
                  value={config.maxFailedLogins || 5}
                  onChange={e => setConfig({ ...config, maxFailedLogins: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-primary"
                />
              </div>
              <button 
                onClick={handleSaveConfig}
                className="px-6 py-2.5 bg-slate-800 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl"
              >
                Salvar Regra
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Quantidade máxima de tentativas erradas de senha antes do bloqueio automático temporário.
            </p>
          </div>

          {/* Blocked IPs */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <ShieldAlert size={18} className="text-red-500" /> IPs Bloqueados (Blacklist)
            </h3>

            <form onSubmit={handleAddIp} className="flex gap-3 mb-6">
              <input
                type="text"
                placeholder="Endereço IP"
                value={newIp}
                onChange={e => setNewIp(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-red-500"
              />
              <input
                type="text"
                placeholder="Motivo (opcional)"
                value={newReason}
                onChange={e => setNewReason(e.target.value)}
                className="flex-[2] bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-red-500"
              />
              <button type="submit" className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-colors">
                <Plus size={20} />
              </button>
            </form>

            <div className="space-y-2">
              {blockedIps.length === 0 ? (
                <div className="text-center p-6 text-sm text-slate-500 bg-slate-50 dark:bg-white/5 rounded-xl">
                  Nenhum IP bloqueado no momento.
                </div>
              ) : (
                blockedIps.map(ip => (
                  <div key={ip.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#111111] border border-slate-100 dark:border-slate-800 rounded-xl">
                    <div>
                      <p className="font-bold text-red-500 dark:text-red-400">{ip.ip}</p>
                      <p className="text-xs text-slate-500">{ip.reason}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveIp(ip.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Coluna Direita: Auditoria */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-orange-500" /> Auditoria Recente
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Mostrando apenas alertas e erros do sistema de logs.
          </p>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {logs.length === 0 ? (
              <div className="text-center p-6 text-sm text-slate-500 bg-slate-50 dark:bg-white/5 rounded-xl">
                Nenhum alerta recente.
              </div>
            ) : (
              logs.map(log => (
                <div key={log.id} className="p-3 border-l-2 border-orange-500 bg-orange-50 dark:bg-orange-500/10 rounded-r-xl text-sm">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-orange-700 dark:text-orange-400">{log.acao}</span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(log.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs">{log.mensagem}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
