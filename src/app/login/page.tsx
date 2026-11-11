"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, User, ShieldCheck, ArrowRight, Loader2, Delete } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Decode the callbackUrl to avoid navigating to a literal encoded string
  const rawCallbackUrl = searchParams.get("callbackUrl") || "/admin";
  const callbackUrl = rawCallbackUrl.startsWith("/") ? rawCallbackUrl : decodeURIComponent(rawCallbackUrl);
  
  const [step, setStep] = useState<"identify" | "password" | "pin">("identify");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleIdentify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    if (email.includes("@")) {
      setStep("password");
    } else {
      setStep("pin");
    }
  };

  const handleLogin = async (e?: React.FormEvent, customPassword?: string) => {
    e?.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password: customPassword !== undefined ? customPassword : (step === "pin" ? pin.join("") : password),
        redirect: false,
      });

      if (res?.error) {
        setError("Credenciais inválidas. Tente novamente.");
        setLoading(false);
      } else {
        // Ensure we navigate to a proper path
        const dest = callbackUrl.startsWith("/") ? callbackUrl : "/admin";
        router.push(dest);
        router.refresh();
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar entrar.");
    } finally {
      setLoading(false);
    }
  };

  const handlePinChange = (index: number, value: string) => {
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeypadPress = (char: string) => {
    const emptyIndex = pin.findIndex(d => d === "");
    if (emptyIndex !== -1) {
      const newPin = [...pin];
      newPin[emptyIndex] = char;
      setPin(newPin);
      if (emptyIndex < 5) {
        const nextInput = document.getElementById(`pin-${emptyIndex + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeypadBackspace = () => {
    const lastFilledIndex = [...pin].reverse().findIndex(d => d !== "");
    if (lastFilledIndex !== -1) {
      const realIndex = 5 - lastFilledIndex;
      const newPin = [...pin];
      newPin[realIndex] = "";
      setPin(newPin);
      const prevInput = document.getElementById(`pin-${realIndex}`);
      prevInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="p-8 md:p-12 text-center relative">
      <div className="flex justify-center mb-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all"></div>
          <img 
            src="/Logo/Logo Horizontal.svg" 
            alt="Piscinas Evolution" 
            className="h-16 relative z-10 drop-shadow-xl"
          />
        </motion.div>
      </div>
      
      <h1 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Piscinas Evolution</h1>
      <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-10">Tecnologia em Gestão de Piscinas</p>

      <AnimatePresence mode="wait">
        {step === "identify" && (
          <motion.form 
            key="identify"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleIdentify}
            className="space-y-6 text-left"
          >
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Usuário ou CPF</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <User size={20} />
                </div>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all text-slate-900"
                  placeholder="admin@email.com ou CPF"
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Continuar <ArrowRight size={20} />
            </button>
          </motion.form>
        )}

        {step === "password" && (
          <motion.form 
            key="password"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleLogin}
            className="space-y-6 text-left"
          >
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Sua Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all text-slate-900"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Entrar"}
            </button>
            
            <button 
              type="button" 
              onClick={() => setStep("identify")}
              className="w-full text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors"
            >
              Voltar
            </button>
          </motion.form>
        )}

        {step === "pin" && (
          <motion.form 
            key="pin"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleLogin}
            className="space-y-6"
          >
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Digite seu código / PIN</label>
              <div className="flex justify-between gap-1.5 sm:gap-2">
                {pin.map((digit, i) => (
                  <input
                    key={i}
                    id={`pin-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-11 h-14 sm:w-13 sm:h-16 text-center text-xl sm:text-2xl font-bold bg-slate-50 border-2 border-slate-100 focus:border-primary/30 focus:bg-white rounded-2xl outline-none transition-all text-slate-900 shadow-sm"
                    autoFocus={i === 0}
                  />
                ))}
              </div>
            </div>

            {/* Teclado Numérico com @, 0 e # */}
            <div className="pt-2">
              <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleKeypadPress(num.toString())}
                    className="h-13 rounded-2xl bg-slate-50 hover:bg-primary/10 hover:text-primary active:scale-95 border border-slate-100 font-bold text-xl text-slate-800 transition-all shadow-sm flex items-center justify-center cursor-pointer"
                  >
                    {num}
                  </button>
                ))}
                {/* Linha 4: @ , 0 , # */}
                <button
                  type="button"
                  onClick={() => handleKeypadPress("@")}
                  className="h-13 rounded-2xl bg-slate-50 hover:bg-primary/10 hover:text-primary active:scale-95 border border-slate-100 font-black text-lg text-primary transition-all shadow-sm flex items-center justify-center cursor-pointer"
                  title="Caractere @"
                >
                  @
                </button>
                <button
                  type="button"
                  onClick={() => handleKeypadPress("0")}
                  className="h-13 rounded-2xl bg-slate-50 hover:bg-primary/10 hover:text-primary active:scale-95 border border-slate-100 font-bold text-xl text-slate-800 transition-all shadow-sm flex items-center justify-center cursor-pointer"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => handleKeypadPress("#")}
                  className="h-13 rounded-2xl bg-slate-50 hover:bg-primary/10 hover:text-primary active:scale-95 border border-slate-100 font-black text-lg text-primary transition-all shadow-sm flex items-center justify-center cursor-pointer"
                  title="Caractere #"
                >
                  #
                </button>
              </div>

              {/* Ação de Apagar Teclado */}
              <div className="flex justify-center mt-2">
                <button
                  type="button"
                  onClick={handleKeypadBackspace}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-red-500 active:scale-95 flex items-center gap-1.5 transition-all cursor-pointer rounded-xl hover:bg-red-50"
                >
                  <Delete size={16} /> Apagar dígito
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
            
            <button 
              type="submit"
              disabled={loading || pin.join("").length < 6}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Confirmar Senha / PIN"}
            </button>
            
            <div className="text-center mt-2">
              <p className="text-slate-400 text-xs mb-4">
                Digite os 6 dígitos numéricos ou caracteres especiais da sua senha.
              </p>
              <button 
                type="button" 
                onClick={() => setStep("identify")}
                className="text-primary text-sm font-bold hover:underline"
              >
                Usar outro método ou CPF
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-white overflow-hidden backdrop-blur-sm bg-white/95">
          <Suspense fallback={
            <div className="p-12 text-center">
              <Loader2 className="animate-spin mx-auto text-primary" size={40} />
              <p className="mt-4 text-slate-400 font-black tracking-widest uppercase text-[10px]">Carregando Segurança...</p>
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>
        
        <p className="mt-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          Piscinas Evolution &copy; {new Date().getFullYear()} • Tecnologia de Gestão
        </p>
      </motion.div>
    </div>
  );
}
