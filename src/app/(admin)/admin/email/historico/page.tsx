"use client";

import React, { useEffect, useState } from "react";
import { Mail, Search, CheckCircle, XCircle } from "lucide-react";
import { getEmailLogs } from "@/app/actions/emails";

export default function HistoricoEmailPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    setLoading(true);
    const data = await getEmailLogs();
    setLogs(data);
    setLoading(false);
  }

  const filtered = logs.filter(l => 
    l.to.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8 text-slate-500">Carregando caixa de e-mail...</div>;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Mail className="text-primary dark:text-blue-400" /> Caixa de E-mail (Enviados)
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Histórico completo de disparos de e-mails feitos pelo sistema.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Buscar destinatário ou assunto..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-primary shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center p-12 text-slate-500">
            <Mail size={48} className="mx-auto mb-4 opacity-20" />
            <p>Nenhum e-mail encontrado no histórico.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase font-bold">
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Destinatário</th>
                  <th className="px-6 py-4">Assunto</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                      {log.to}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {log.subject}
                    </td>
                    <td className="px-6 py-4">
                      {log.status === 'ENVIADO' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400">
                          <CheckCircle size={14} /> Enviado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400" title={log.error}>
                          <XCircle size={14} /> Falha
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
