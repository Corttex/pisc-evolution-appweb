import React from "react";
import Link from "next/link";
import { FileText, Settings, ShieldAlert } from "lucide-react";

export default function WebmasterDashboard() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          Painel Webmaster
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Acesso exclusivo para manutenção e monitoramento do sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link href="/webmaster/logs" className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md hover:-translate-y-1 transition-all group">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileText size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">Logs de Sistema</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            Visualize registros de erros, atualizações e atividades de infraestrutura.
          </p>
        </Link>

        <Link href="/webmaster/configuracoes" className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md hover:-translate-y-1 transition-all group">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Settings size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">Configurações Avançadas</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            Ajustes de servidor, cache e integrações de baixo nível.
          </p>
        </Link>

        <Link href="/webmaster/seguranca" className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md hover:-translate-y-1 transition-all group">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShieldAlert size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">Segurança</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            Monitoramento de acessos e bloqueio de IPs.
          </p>
        </Link>
      </div>
    </div>
  );
}
