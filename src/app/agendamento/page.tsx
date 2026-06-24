"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar, Clock, User, Phone, ClipboardList, CheckCircle2 } from "lucide-react";
import { criarAgendamento } from "../actions/agenda";

export default function AgendamentoPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get("nome")?.toString() || "",
      telefone: formData.get("telefone")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      documento: formData.get("documento")?.toString() || "",
      servico: formData.get("servico")?.toString() || "",
      data: `${formData.get("dia")}T${formData.get("horario")}:00.000Z`,
      valorTotal: 49.90 // Taxa de marcação de horário
    };

    const res = await criarAgendamento(data);
    setLoading(false);
    
    if (res.success) {
      setSuccess(true);
      setResult(res);
    } else {
      alert("Erro ao agendar: " + res.error);
    }
  };

  if (success) {
    const agenda = result?.agenda;
    return (
      <main className="min-h-screen bg-[#F1F5F9]">
        <div className="max-w-2xl mx-auto py-24 px-8 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">Agendamento Realizado!</h1>
          <p className="text-slate-600 text-lg mb-12">
            {agenda?.pixQrCode 
              ? <>Recebemos seu pedido. Para confirmar sua visita, realize o pagamento do sinal de <strong>R$ {agenda?.valorSinal?.toFixed(2)}</strong> via PIX.</>
              : result?.message || "Seu agendamento foi registrado com sucesso. Nossa equipe entrará em contato em breve."}
          </p>

          
          <div className="bg-white p-8 rounded-3xl pool-shadow border border-slate-200 mb-8">
            {agenda?.pixQrCode ? (
              <div className="flex flex-col items-center">
                <img src={`data:image/png;base64,${agenda.pixQrCode}`} alt="QR Code Pix" className="w-64 h-64 mb-6" />
                <p className="text-sm text-slate-500 mb-4 font-mono break-all">{agenda.pixCopiaECola}</p>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(agenda.pixCopiaECola);
                    alert("Código PIX copiado!");
                  }}
                  className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold"
                >
                  Copiar Código PIX
                </button>
              </div>
            ) : (
              <p className="text-amber-600">Aguardando geração do QR Code pelo sistema Asaas...</p>
            )}
          </div>
          
          <a href="/" className="text-secondary font-bold hover:underline">Voltar para o Início</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F1F5F9]">
      <Navbar config={null} />
      <div className="max-w-[1200px] mx-auto py-20 px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Info Side */}
          <div>
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Agendamento Online</span>
            <h1 className="text-5xl font-bold text-primary mb-8 leading-tight tracking-tight">Reserve sua Visita Técnica</h1>
            <p className="text-slate-600 text-lg mb-12 leading-relaxed">
              Nossos especialistas estão prontos para diagnosticar seu sistema de aquecimento ou realizar a manutenção da sua piscina. Escolha o melhor horário para você.
            </p>
            
            <div className="space-y-6 mb-12">
              {[
                { icon: Clock, title: "Horário de Atendimento", desc: "Segunda a Sexta, das 08h às 17h." },
                { icon: Calendar, title: "Praticidade", desc: "Escolha o dia e hora direto no sistema." },
                { icon: CheckCircle2, title: "Confirmação via WhatsApp", desc: "Nossa equipe entrará em contato para confirmar." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl pool-shadow flex items-center justify-center text-secondary shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-blue-600 text-white rounded-[2.5rem] shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                  <ClipboardList size={80} />
               </div>
               <h4 className="text-xl font-bold mb-2">Já agendou?</h4>
               <p className="text-blue-100 text-sm mb-6 font-medium">Acompanhe o status da sua visita técnica em tempo real usando seu CPF.</p>
               <a href="/acompanhar" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold text-sm hover:scale-105 transition-all">
                  Acompanhar Visita
               </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-10 rounded-[2.5rem] pool-shadow border border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input required name="nome" type="text" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all" placeholder="Seu nome" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Telefone / WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input required name="telefone" type="tel" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all" placeholder="(61) 99999-9999" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">CPF para Consulta / Acompanhamento</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input required name="documento" type="text" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-mono" placeholder="000.000.000-00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Serviço Desejado</label>
                  <div className="relative">
                    <ClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select required name="servico" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 appearance-none transition-all">
                      <option value="">Selecione o serviço</option>
                      <option value="Aquecimento Solar">Aquecimento Solar</option>
                      <option value="Trocador de Calor">Trocador de Calor</option>
                      <option value="Boiler">Boiler</option>
                      <option value="Limpeza de Placas">Limpeza de Placas</option>
                      <option value="Manutenção e Trocas">Manutenção e Trocas</option>
                      <option value="Banheiras">Banheiras</option>
                      <option value="Saunas">Saunas</option>
                      <option value="Spas">Spas</option>
                      <option value="Cascata">Cascata</option>
                      <option value="Iluminação LED">Iluminação LED</option>
                      <option value="Cerca de Proteção">Cerca de Proteção</option>
                      <option value="Casa de Máquinas">Casa de Máquinas</option>
                      <option value="Higienização">Higienização</option>
                      <option value="Aquecimento de Piscina">Aquecimento de Piscina</option>
                      <option value="Reforma Técnica">Reforma Técnica</option>
                      <option value="Automação">Automação</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Data</label>
                  <input required name="dia" type="date" min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Horário (08h às 17h)</label>
                  <select required name="horario" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all">
                    <option value="">Selecione</option>
                    {["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:scale-100"
              >
                {loading ? "Processando..." : "Confirmar Agendamento"}
              </button>
              <p className="text-[11px] text-center text-slate-500 font-medium px-8">
                Ao agendar, será cobrado um valor de marcação de horário de <strong>R$ 49,90</strong>. O pagamento deverá ser realizado via PIX gerado na próxima tela.
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer config={null} />
    </main>
  );
}
