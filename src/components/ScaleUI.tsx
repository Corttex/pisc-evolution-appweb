"use client";

import { useEffect } from "react";

export function ScaleUI({ scale = 85 }: { scale?: number }) {
  useEffect(() => {
    // Salva o valor original
    const original = document.documentElement.style.fontSize;
    
    // Aplica a escala (Tailwind usa REM baseado na fonte do HTML)
    document.documentElement.style.fontSize = `${scale}%`;

    return () => {
      // Restaura ao sair da área restrita
      document.documentElement.style.fontSize = original;
    };
  }, [scale]);

  return null;
}
