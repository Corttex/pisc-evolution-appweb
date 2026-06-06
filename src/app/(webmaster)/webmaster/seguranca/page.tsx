import React from "react";
import { ShieldAlert } from "lucide-react";

export default function SegurancaPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <ShieldAlert className="text-primary dark:text-blue-400" /> Segurança
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Em breve. Monitoramento de acessos e bloqueio de IPs.
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mb-4">
          <ShieldAlert size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Módulo em Desenvolvimento</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2">
          Em breve você terá controle total sobre tentativas de intrusão, proteção DDoS básica, regras de firewall e geoblocking do painel.
        </p>
      </div>
    </div>
  );
}
