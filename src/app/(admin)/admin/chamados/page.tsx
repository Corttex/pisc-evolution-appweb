"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  User,
  ChevronRight,
  Loader2,
  Paperclip
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTickets, getTicketDetails, sendAdminMessage, updateTicketStatus } from "@/app/actions/admin";
import { toast } from "react-hot-toast";

export default function ChamadosPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getTickets();
      setTickets(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSelectTicket = async (ticket: any) => {
    setSelectedTicket(ticket);
    setLoadingChat(true);
    const details = await getTicketDetails(ticket.id);
    if (details) {
      setMessages(details.mensagens);
    }
    setLoadingChat(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedTicket) return;

    setSending(true);
    const res = await sendAdminMessage(selectedTicket.id, newMessage);
    if (res.success) {
      setMessages([...messages, res.mensagem]);
      setNewMessage("");
      // Atualiza lista de tickets para refletir nova mensagem
      const updatedTickets = await getTickets();
      setTickets(updatedTickets);
    } else {
      toast.error("Erro ao enviar mensagem");
    }
    setSending(false);
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedTicket) return;
    const res = await updateTicketStatus(selectedTicket.id, status);
    if (res.success) {
      toast.success(`Status atualizado para ${status}`);
      setSelectedTicket({ ...selectedTicket, status });
      const updatedTickets = await getTickets();
      setTickets(updatedTickets);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 overflow-hidden">
      {/* Sidebar de Tickets */}
      <div className="w-96 flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden shrink-0">
        <div className="p-6 border-b border-slate-50">
          <h2 className="text-xl font-black text-slate-900 mb-4">Tickets Ativos</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar chamado..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-40 gap-3">
              <Loader2 className="animate-spin text-primary" size={24} />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sincronizando...</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-10">
              <MessageSquare className="mx-auto text-slate-200 mb-2" size={32} />
              <p className="text-xs text-slate-400 font-bold">Nenhum chamado aberto</p>
            </div>
          ) : tickets.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelectTicket(t)}
              className={`w-full text-left p-4 rounded-2xl transition-all ${
                selectedTicket?.id === t.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                  : "hover:bg-slate-50 text-slate-600"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  selectedTicket?.id === t.id ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"
                }`}>
                  {t.prioridade}
                </span>
                <span className="text-[9px] font-bold opacity-60">
                  {new Date(t.updatedAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <p className={`font-bold truncate ${selectedTicket?.id === t.id ? "text-white" : "text-slate-900"}`}>
                {t.assunto}
              </p>
              <p className={`text-[10px] truncate opacity-80 ${selectedTicket?.id === t.id ? "text-white" : "text-slate-500"}`}>
                {t.cliente?.nome}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Janela de Chat */}
      <div className="flex-grow flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
        {selectedTicket ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 leading-none">{selectedTicket.cliente?.nome}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${selectedTicket.status === 'Aberto' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedTicket.status.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {selectedTicket.status !== 'Resolvido' && (
                  <button 
                    onClick={() => handleUpdateStatus('Resolvido')}
                    className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100"
                  >
                    Encerrar Chamado
                  </button>
                )}
                <button 
                  onClick={() => handleUpdateStatus('Em_Andamento')}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all border border-blue-100"
                >
                  Em Andamento
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto p-8 space-y-6 flex flex-col">
              {loadingChat ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <Loader2 className="animate-spin text-primary" size={32} />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Carregando histórico...</p>
                </div>
              ) : messages.map((m, i) => (
                <div 
                  key={m.id} 
                  className={`flex flex-col ${m.sender === 'Admin' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[70%] p-5 rounded-[1.5rem] shadow-sm ${
                    m.sender === 'Admin' 
                      ? "bg-slate-900 text-white rounded-tr-none" 
                      : "bg-slate-100 text-slate-800 rounded-tl-none"
                  }`}>
                    <p className="text-sm font-medium leading-relaxed">{m.texto}</p>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 mt-2 px-2 uppercase">
                    {new Date(m.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 bg-slate-50/50 border-t border-slate-50">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <button type="button" className="p-4 bg-white border border-slate-100 text-slate-400 rounded-2xl hover:text-primary transition-all">
                  <Paperclip size={20} />
                </button>
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escreva sua resposta..." 
                  className="flex-grow bg-white border border-slate-100 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-slate-900"
                />
                <button 
                  type="submit" 
                  disabled={sending || !newMessage.trim()}
                  className="bg-primary text-white p-4 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center p-20 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
              <MessageSquare size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Selecione um chamado</h3>
            <p className="text-slate-500 max-w-sm">Escolha uma conversa na lista lateral para visualizar o histórico completo e responder ao cliente.</p>
          </div>
        )}
      </div>
    </div>
  );
}
