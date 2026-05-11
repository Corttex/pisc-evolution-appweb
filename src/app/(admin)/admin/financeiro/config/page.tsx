"use client";

import React from "react";
import { 
  Save, 
  Key, 
  DollarSign, 
  ShieldCheck,
  ExternalLink,
  Info
} from "lucide-react";
import { motion } from "framer-motion";

export default function FinanceConfigPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Configuração de Pagamentos</h1>
           <p className="text-sm text-slate-500">Integração com a API do Asaas e regras de cobrança.</p>
        </div>
      </div>

      <div className="grid gap-8">
        {/* API Credentials */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
               <Key size={20} />
            </div>
            <div>
               <h2 className="text-lg font-bold text-slate-900">API Asaas</h2>
               <p className="text-xs text-slate-400">Insira suas credenciais para ativar o Pix.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Ambiente</label>
               <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-medium text-slate-700">
                  <option value="sandbox">Sandbox (Testes)</option>
                  <option value="production">Produção (Real)</option>
               </select>
            </div>
            
            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Access Token (API Key)</label>
               <div className="relative">
                  <input 
                    type="password" 
                    placeholder="$aach_..." 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-mono text-slate-700"
                  />
                  <ShieldCheck size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" />
               </div>
               <p className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                 <Info size={12} /> Você encontra sua API Key no painel do Asaas em Configurações &gt; Integrações.
               </p>
            </div>
          </div>
        </motion.div>

        {/* Business Rules */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-secondary/5 text-secondary flex items-center justify-center">
               <DollarSign size={20} />
            </div>
            <div>
               <h2 className="text-lg font-bold text-slate-900">Regras de Sinal</h2>
               <p className="text-xs text-slate-400">Valores cobrados no ato do agendamento.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Valor do Sinal (Pix)</label>
               <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                  <input 
                    type="number" 
                    placeholder="50,00" 
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-bold text-slate-700"
                  />
               </div>
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Validade do Pix (Minutos)</label>
               <input 
                 type="number" 
                 placeholder="30" 
                 className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-bold text-slate-700"
               />
            </div>
          </div>
        </motion.div>

        {/* Save Bar */}
        <div className="flex items-center justify-between p-6 bg-slate-900 rounded-3xl shadow-2xl text-white">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                 <ShieldCheck className="text-tertiary" size={24} />
              </div>
              <div>
                 <p className="text-sm font-bold">Configurações Seguras</p>
                 <p className="text-[10px] text-white/50 uppercase tracking-widest">Seus dados são protegidos por criptografia.</p>
              </div>
           </div>
           <button className="bg-tertiary text-primary px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-all flex items-center gap-2">
              <Save size={18} /> Salvar Alterações
           </button>
        </div>
      </div>
    </div>
  );
}
