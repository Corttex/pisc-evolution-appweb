"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  LogOut,
  Delete,
  FileText,
  Home
} from "lucide-react";
import { checkWebmaster, verifyWebmasterPin } from "@/app/actions/admin";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const menuItems = [
  { icon: LayoutDashboard, label: "Painel Webmaster", href: "/webmaster" },
  { icon: FileText, label: "Logs de Sistema", href: "/webmaster/logs" },
];

function WebmasterPinOverlay({ onUnlock }: { onUnlock: () => void }) {
  const [digits, setDigits] = React.useState<string[]>([]);
  const [error, setError] = React.useState(false);
  const [shake, setShake] = React.useState(false);
  const [checking, setChecking] = React.useState(false);

  const MAX = 6;

  async function handleDigit(d: string) {
    if (digits.length >= MAX || checking) return;
    const next = [...digits, d];
    setDigits(next);

    if (next.length === MAX) {
      setChecking(true);
      const result = await verifyWebmasterPin(next.join(""));
      if (result.success) {
        onUnlock();
      } else {
        setShake(true);
        setError(true);
        setTimeout(() => {
          setDigits([]);
          setError(false);
          setShake(false);
          setChecking(false);
        }, 700);
      }
    }
  }

  function handleBackspace() {
    if (checking) return;
    setDigits(prev => prev.slice(0, -1));
    setError(false);
  }

  const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F172A]">
      <div className="flex flex-col items-center gap-8 px-6">
        <img src="/Logo/Logo negativa White.svg" alt="Evolution" className="h-10 w-auto mb-2" />
        <div className="text-center">
          <h2 className="text-white text-2xl font-black tracking-tight">Acesso Webmaster</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">Insira a chave de manutenção</p>
        </div>

        <div className={`flex gap-4 ${shake ? "animate-shake" : ""}`}>
          {Array.from({ length: MAX }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
                i < digits.length
                  ? error
                    ? "bg-red-500 border-red-500"
                    : "bg-cta border-cta"
                  : "border-white/20 bg-transparent"
              }`}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-xs font-bold uppercase tracking-widest -mt-4">
            CHAVE INCORRETA
          </p>
        )}

        <div className="grid grid-cols-3 gap-3 w-64">
          {keys.map((key, i) => {
            if (key === "") return <div key={i} />;
            return (
              <button
                key={i}
                onClick={() => key === "⌫" ? handleBackspace() : handleDigit(key)}
                className={`h-16 rounded-2xl font-bold text-lg transition-all active:scale-95 ${
                  key === "⌫"
                    ? "text-slate-400 hover:text-white hover:bg-white/10"
                    : "bg-white/5 text-white hover:bg-white/15 border border-white/10"
                }`}
              >
                {key === "⌫" ? <Delete className="mx-auto" size={20} /> : key}
              </button>
            );
          })}
        </div>
      </div>
      <style jsx global>{`
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}

export default function WebmasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the cookie is set
    checkWebmaster().then(res => {
      if (res.success) setUnlocked(true);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950" />;

  if (!unlocked) {
    return <WebmasterPinOverlay onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-[#111111] border-r border-slate-200 dark:border-white/5 flex flex-col shadow-sm fixed h-full z-20">
        <div className="h-20 flex items-center px-8 border-b border-slate-100 dark:border-white/5">
          <Link href="/webmaster" className="flex items-center gap-2 group">
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">
              Webmaster
            </span>
            <span className="bg-primary/10 text-primary text-[10px] uppercase font-black px-2 py-0.5 rounded-full tracking-widest">
              PRO
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="px-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 mt-2">
            Ferramentas
          </p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group relative overflow-hidden ${
                  isActive
                    ? "text-primary dark:text-white bg-primary/5 dark:bg-white/5"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                )}
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-colors ${isActive ? "text-primary dark:text-blue-400" : "group-hover:text-primary dark:group-hover:text-white"}`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-white/5">
          <Link
            href="/"
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
          >
            <Home size={20} />
            Site Público
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex w-full items-center gap-3 px-4 py-3 mt-1 rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 flex flex-col min-h-screen">
        <header className="h-20 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <DarkModeToggle variant="inline" />
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                WM
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
