"use server";

import { sanitizeObject } from "@/lib/sanitize";

export async function sendContactMessage(formData: any) {
  const cleanData = sanitizeObject(formData);
  
  try {
    // Aqui você integraria com um serviço de e-mail (SendGrid, Resend, etc.)
    console.log("Mensagem de contato recebida e sanitizada:", cleanData);
    
    // Simulação de delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    return { success: true, message: "Mensagem enviada com sucesso!" };
  } catch (error) {
    console.error("Erro ao enviar contato:", error);
    return { success: false, error: "Falha ao enviar mensagem." };
  }
}
