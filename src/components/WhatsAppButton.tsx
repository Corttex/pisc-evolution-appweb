"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const WhatsAppButton = ({ config }: { config: any }) => {
  const whatsapp = config?.site_whatsapp || "556191441294";

  return (
    <a
      href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center group"
    >
      <motion.div
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
        <div className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-500 relative z-10 border border-white/20">
          <MessageCircle className="w-8 h-8 fill-current" />
        </div>
        
        {/* Tooltip */}
        <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 glass-premium px-5 py-2.5 rounded-2xl text-xs font-bold shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none text-primary border border-white/50">
          Engenharia de Elite no WhatsApp
        </span>
      </motion.div>
    </a>
  );
};
