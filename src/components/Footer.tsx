"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin, Share2 } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);


export const Footer = ({ config }: { config: any }) => {
  const title = config?.site_titulo || "Piscinas Evolution";
  const whatsapp = config?.site_whatsapp || "556191441294";
  const email = config?.site_email || "contato@piscinasevolution.com.br";
  const instagram = config?.social_instagram || "https://instagram.com/piscinasevolution";
  const facebook = config?.social_facebook || "#";


  const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('55')) {
      return `(${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9, 13)}`;
    }
    return phone;
  };

  return (
    <footer className="bg-primary text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(202,138,4,0.1),transparent)] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-8">
            <img
              src="/Logo/Logo%20negativa%20White.svg"
              alt={title}
              className="h-16 w-auto"
            />
            <p className="text-white/50 font-body leading-relaxed text-sm">
              Engenharia especializada em aquecimento de piscinas e soluções térmicas de alto padrão. Tecnologia e luxo para seu lazer.
            </p>
            <div className="flex gap-4">
              <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href={instagram} target="_blank" className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href={facebook} target="_blank" className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Serviços</h3>
            <ul className="space-y-4 font-body text-white/60 text-sm">
              <li><Link href="/servicos/aquecimento-solar" className="hover:text-secondary transition-colors">Aquecimento Solar</Link></li>
              <li><Link href="/servicos/trocador-de-calor" className="hover:text-secondary transition-colors">Trocador de Calor</Link></li>
              <li><Link href="/servicos/spa-sauna" className="hover:text-secondary transition-colors">Spa & Sauna</Link></li>
              <li><Link href="/servicos/manutencao" className="hover:text-secondary transition-colors">Manutenção Preventiva</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Empresa</h3>
            <ul className="space-y-4 font-body text-white/60 text-sm">
              <li><Link href="/empresa/sobre-nos" className="hover:text-secondary transition-colors">Sobre Nós</Link></li>
              <li><Link href="/contato" className="hover:text-secondary transition-colors">Contato</Link></li>
              <li>
                <Link href="/acompanhar" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-bold hover:bg-slate-100 transition-all text-xs shadow-xl shadow-white/5">
                  Acompanhar Visita
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Atendimento</h3>
            <div className="flex items-start gap-4 text-sm text-white/60">
              <MapPin className="w-5 h-5 text-secondary shrink-0" />
              <p>Brasília - DF e Entorno<br />Atendimento Residencial e Comercial</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <Phone className="w-5 h-5 text-secondary shrink-0" />
              <p>{formatPhone(whatsapp)}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <Mail className="w-5 h-5 text-secondary shrink-0" />
              <p>{email}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <InstagramIcon className="w-5 h-5 text-secondary shrink-0" />
              <a href={instagram} target="_blank" className="hover:text-secondary transition-colors">
                @piscinasevolution
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {title} — Todos os direitos reservados.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
            <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
