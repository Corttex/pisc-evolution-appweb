"use client";

import React, { useState } from "react";
import { loginCliente } from "@/app/actions/auth";
import { User, Lock, ArrowRight, Droplets } from "lucide-react";

export const ClienteLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const cpf = formData.get("cpf") as string;
    const senha = formData.get("senha") as string;

    const res = await loginCliente(cpf, senha);
    
    if (!res.success) {
      setError(res.error || "Erro ao fazer login.");
      setLoading(false);
    } else {
      window.location.reload(); // Recarregar para pegar a sessão no servidor
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] px-8">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] pool-shadow p-12 border border-slate-200">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-50 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Droplets className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Portal do Cliente</h1>
          <p className="text-slate-500 text-sm">Acesse os dados da sua piscina em tempo real.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">CPF</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required 
                name="cpf" 
                type="text" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all" 
                placeholder="000.000.000-00" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required 
                name="senha" 
                type="password" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

          <button 
            disabled={loading}
            className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
          >
            {loading ? "Acessando..." : <>Acessar Portal <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>
        
        <div className="mt-10 text-center">
          <p className="text-xs text-slate-400">
            Ainda não tem acesso? <br/>
            Entre em contato com nosso suporte técnico.
          </p>
        </div>
      </div>
    </div>
  );
};
