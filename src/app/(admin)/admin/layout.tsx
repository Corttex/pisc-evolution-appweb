"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Calendar,
  DollarSign,
  Package,
  Users,
  Settings,
  LogOut,
  Building,
  LifeBuoy,
  Delete,
  Layout,
  FileText
} from "lucide-react";
import { verifyAdminPin } from "@/app/actions/admin";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Calendar, label: "Agenda", href: "/admin/agenda" },
  { icon: Users, label: "Clientes", href: "/admin/clientes" },
  { icon: LifeBuoy, label: "Central de Chamados", href: "/admin/chamados" },
  { icon: DollarSign, label: "Financeiro", href: "/admin/financeiro" },
  { icon: Package, label: "Estoque", href: "/admin/estoque" },
  { icon: Building, label: "Patrimônio", href: "/admin/patrimonio" },
  { icon: Layout, label: "Editor de Telas", href: "/admin/editor" },
  { icon: FileText, label: "Logs de Sistema", href: "/admin/logs" },
  { icon: Settings, label: "Configurações", href: "/admin/configuracoes" },
];


const PIN_SESSION_KEY = "admin_pin_ok";

function PinOverlay({ onUnlock }: { onUnlock: () => void }) {
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
      const result = await verifyAdminPin(next.join(""));
      if (result.success) {
        sessionStorage.setItem(PIN_SESSION_KEY, "1");
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
        {/* Logo */}
        <img src="/Logo/Logo negativa White.svg" alt="Evolution" className="h-10 w-auto mb-2" />

        <div className="text-center">
          <h2 className="text-white text-2xl font-black tracking-tight">Área Restrita</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">Digite o PIN de acesso</p>
        </div>

        {/* Dots */}
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
            PIN incorreto
          </p>
        )}

        {/* Numpad */}
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen] = React.useState(true);
  const [pinUnlocked, setPinUnlocked] = React.useState(false);

  React.useEffect(() => {
    if (sessionStorage.getItem(PIN_SESSION_KEY) === "1") {
      setPinUnlocked(true);
    }
  }, []);

  if (!pinUnlocked) {
    return <PinOverlay onUnlock={() => setPinUnlocked(true)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-500">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-24"
        } bg-primary dark:bg-slate-900 text-white transition-all duration-500 ease-[0.16,1,0.3,1] flex flex-col z-50 border-r border-white/5 dark:border-white/10 shadow-2xl`}
      >
        <div className="p-8 flex items-center justify-between">
          {isSidebarOpen ? (
            <img
              src="/Logo/Logo negativa White.svg"
              alt="Logo Evolution"
              className="h-8 w-auto"
            />
          ) : (
            <img
              src="/Logo/FavIcon.svg"
              alt="Logo Evolution"
              className="h-10 w-auto"
            />
          )}
        </div>

        <nav className="flex-grow px-4 space-y-3 mt-8">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                  isActive
                    ? "bg-cta text-primary shadow-2xl shadow-cta/30"
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={22} className={`${isActive ? "scale-110" : "group-hover:scale-110 transition-transform"}`} />
                {isSidebarOpen && <span className="font-bold text-sm tracking-tight">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 dark:border-white/10">
          <button
            onClick={() => {
              sessionStorage.removeItem(PIN_SESSION_KEY);
              signOut({ callbackUrl: '/login' });
            }}
            className="flex items-center gap-4 p-4 w-full text-white/40 hover:text-red-400 transition-all hover:bg-red-400/5 rounded-2xl"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="font-bold text-sm tracking-tight">Sair do ERP</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-hidden bg-[#F5F5F4] dark:bg-[#0B0F19] transition-colors duration-500">
        {/* Header */}
        <header className="h-20 glass-premium dark:bg-slate-900/90 dark:border-white/10 flex items-center justify-between px-10 shrink-0 z-40">
          <div className="flex items-center gap-4">
             <h1 className="text-primary dark:text-white font-h1 font-bold text-2xl tracking-tighter">
                {menuItems.find(m => m.href === pathname)?.label || "Gestão Master"}
             </h1>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-primary dark:text-slate-200">Engenharia Evolution</span>
                <span className="text-[10px] font-bold text-cta uppercase tracking-widest px-2 py-0.5 bg-cta/10 rounded-full">Painel Master</span>
             </div>
             <DarkModeToggle variant="inline" />
             <Link
               href="/admin/perfil"
               className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group"
             >
                <Settings size={22} className="text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors" />
             </Link>
          </div>
        </header>

        {/* Page Area */}
        <div className="flex-grow overflow-y-auto p-8">
          {children}
        </div>
      </main>

    </div>
  );
}
