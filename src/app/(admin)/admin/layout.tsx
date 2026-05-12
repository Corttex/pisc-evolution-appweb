"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  DollarSign, 
  Package, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Building,
  MessageSquare,
  LifeBuoy
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Calendar, label: "Agenda", href: "/admin/agenda" },
  { icon: Users, label: "Clientes", href: "/admin/clientes" },
  { icon: LifeBuoy, label: "Central de Chamados", href: "/admin/chamados" },
  { icon: DollarSign, label: "Financeiro", href: "/admin/financeiro" },
  { icon: Package, label: "Estoque", href: "/admin/estoque" },
  { icon: Building, label: "Patrimônio", href: "/admin/patrimonio" },
  { icon: Settings, label: "Configurações", href: "/admin/configuracoes" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-24"
        } bg-primary text-white transition-all duration-500 ease-[0.16,1,0.3,1] flex flex-col z-50 border-r border-white/5 shadow-2xl`}
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

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-4 p-4 w-full text-white/40 hover:text-red-400 transition-all hover:bg-red-400/5 rounded-2xl"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="font-bold text-sm tracking-tight">Sair do ERP</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-hidden bg-[#F5F5F4]">
        {/* Header */}
        <header className="h-20 glass-premium flex items-center justify-between px-10 shrink-0 z-40">
          <div className="flex items-center gap-4">
             <h1 className="text-primary font-h1 font-bold text-2xl tracking-tighter">
                {menuItems.find(m => m.href === pathname)?.label || "Gestão Master"}
             </h1>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-primary">Engenharia Evolution</span>
                <span className="text-[10px] font-bold text-cta uppercase tracking-widest px-2 py-0.5 bg-cta/10 rounded-full">Painel Master</span>
             </div>
             <Link 
               href="/admin/perfil"
               className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group"
             >
                <Settings size={22} className="text-slate-400 group-hover:text-primary transition-colors" />
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
