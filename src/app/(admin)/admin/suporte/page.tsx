"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  Ticket, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Send,
  User,
  Paperclip,
  Smile
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ticketsMock = [
  { id: "#TK-1024", cliente: "João Silva", assunto: "Bomba não liga", status: "Aberto", prioridade: "Alta", data: "10 min atrás" },
  { id: "#TK-1025", cliente: "Maria Oliveira", assunto: "Vazamento no filtro", status: "Em Andamento", prioridade: "Média", data: "1h atrás" },
  { id: "#TK-1026", cliente: "Cond. Solar", assunto: "Troca de areia", status: "Resolvido", prioridade: "Baixa", data: "Ontem" },
];

const messagesMock = [
  { id: 1, sender: "Cliente", text: "Olá, minha piscina está ficando verde.", time: "09:41" },
  { id: 2, sender: "Admin", text: "Bom dia! Vamos verificar. Qual o nível de cloro atual?", time: "09:45" },
  { id: 3, sender: "Cliente", text: "Acho que está baixo, usei o teste ontem.", time: "09:46" },
];

export default function SuportePage() {
  const [activeTab, setActiveTab] = useState("tickets");
  const [selectedChat, setSelectedChat] = useState(1);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-6">
      <div className="flex justify-between items-center shrink-0">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Central de Suporte</h1>
           <p className="text-sm text-slate-500">Gerencie tickets e conversas em tempo real.</p>
        </div>
        <div className="bg-white p-1 rounded-2xl border border-slate-100 flex gap-1 shadow-sm">
           <button 
             onClick={() => setActiveTab("tickets")}
             className={`px-6 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === "tickets" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:text-slate-600"}`}
           >
              <Ticket size={16} /> Tickets
           </button>
           <button 
             onClick={() => setActiveTab("chat")}
             className={`px-6 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === "chat" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:text-slate-600"}`}
           >
              <MessageSquare size={16} /> Chat Ao Vivo
           </button>
        </div>
      </div>

      <div className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "tickets" ? (
            <motion.div 
              key="tickets"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full space-y-6"
            >
               {/* Filters */}
               <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex gap-4">
                  <div className="relative flex-grow">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                     <input type="text" placeholder="Buscar tickets por ID ou cliente..." className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary/20 outline-none text-sm transition-all" />
                  </div>
                  <button className="px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-slate-100">
                     <Filter size={18} /> Filtros
                  </button>
               </div>

               {/* Tickets Table */}
               <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                           <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ticket ID</th>
                           <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                           <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assunto</th>
                           <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                           <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prioridade</th>
                           <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Ação</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {ticketsMock.map((ticket) => (
                           <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-900 text-sm">{ticket.id}</td>
                              <td className="px-6 py-4 text-slate-600 text-sm">{ticket.cliente}</td>
                              <td className="px-6 py-4 text-slate-600 text-sm">{ticket.assunto}</td>
                              <td className="px-6 py-4">
                                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                    ticket.status === "Aberto" ? "bg-red-50 text-red-600" :
                                    ticket.status === "Resolvido" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                 }`}>
                                    {ticket.status}
                                 </span>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${
                                       ticket.prioridade === "Alta" ? "bg-red-500" :
                                       ticket.prioridade === "Média" ? "bg-amber-500" : "bg-blue-500"
                                    }`}></div>
                                    <span className="text-xs text-slate-600">{ticket.prioridade}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <button className="p-2 text-slate-400 hover:text-primary"><MoreVertical size={18} /></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </motion.div>
          ) : (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex gap-6"
            >
               {/* Chat List */}
               <div className="w-80 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-slate-50">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                        <input type="text" placeholder="Buscar conversas..." className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl text-xs outline-none" />
                     </div>
                  </div>
                  <div className="flex-grow overflow-y-auto">
                     {[1, 2, 3].map((chat) => (
                        <button 
                          key={chat}
                          onClick={() => setSelectedChat(chat)}
                          className={`w-full p-4 flex items-center gap-3 hover:bg-slate-50 transition-all ${selectedChat === chat ? "bg-slate-50 border-r-4 border-primary" : ""}`}
                        >
                           <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shrink-0">
                              <User size={24} />
                           </div>
                           <div className="text-left overflow-hidden">
                              <h4 className="text-sm font-bold text-slate-900 truncate">João Silva</h4>
                              <p className="text-[10px] text-slate-400 truncate">O cloro está baixo...</p>
                           </div>
                           <div className="ml-auto text-[8px] font-bold text-slate-300">09:46</div>
                        </button>
                     ))}
                  </div>
               </div>

               {/* Chat Conversation */}
               <div className="flex-grow bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col overflow-hidden relative">
                  <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                           <User size={20} />
                        </div>
                        <div>
                           <h3 className="text-sm font-bold text-slate-900">João Silva</h3>
                           <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Online</span>
                           </div>
                        </div>
                     </div>
                     <button className="p-2 text-slate-400 hover:text-slate-600"><MoreVertical size={20} /></button>
                  </div>

                  <div className="flex-grow p-6 overflow-y-auto bg-slate-50/30 space-y-4">
                     {messagesMock.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === "Admin" ? "justify-end" : "justify-start"}`}>
                           <div className={`max-w-[70%] p-4 rounded-2xl text-sm shadow-sm ${
                              msg.sender === "Admin" ? "bg-primary text-white" : "bg-white text-slate-600"
                           }`}>
                              {msg.text}
                              <div className={`text-[8px] mt-1 font-bold ${msg.sender === "Admin" ? "text-white/60" : "text-slate-400"}`}>
                                 {msg.time}
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="p-6 border-t border-slate-50 bg-white">
                     <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl">
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Smile size={20} /></button>
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Paperclip size={20} /></button>
                        <input type="text" placeholder="Digite sua mensagem..." className="flex-grow bg-transparent border-none outline-none text-sm text-slate-600 px-2" />
                        <button className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                           <Send size={18} />
                        </button>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
