"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sanitize } from "@/lib/sanitize";

export async function gerarCobrancaPix(amount: number, description: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Não autorizado");
  
  const cleanDescription = sanitize(description);
  try {
    const config = await prisma.configuracao.findUnique({ where: { id: "global" } });
    const profile = await prisma.adminProfile.findFirst();
    
    const asaasKey = config?.asaasKey || profile?.asaasKey;
    const asaasEnv = config?.asaasEnv || "sandbox";

    if (!asaasKey) {
      return { success: false, error: "Chave do Asaas não configurada." };
    }

    // Implementação Real do Asaas
    const asaasUrl = asaasEnv === "production" 
      ? "https://www.asaas.com/api/v3" 
      : "https://sandbox.asaas.com/api/v3";

    try {
      const response = await fetch(`${asaasUrl}/payments`, {
        method: "POST",
        headers: {
          "access_token": asaasKey as string,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          billingType: "PIX",
          value: amount,
          description: cleanDescription || "Manutenção de Piscina - Evolution",
          dueDate: new Date().toISOString().split('T')[0]
        })
      });

      const paymentData = await response.json();

      if (!response.ok) {
        return { success: false, error: paymentData.errors?.[0]?.description || "Erro na API do Asaas." };
      }

      // Buscar o QR Code do pagamento gerado
      const qrResponse = await fetch(`${asaasUrl}/payments/${paymentData.id}/pixQrCode`, {
        headers: { "access_token": asaasKey as string }
      });
      const qrData = await qrResponse.json();

      return { 
        success: true, 
        payload: {
          id: paymentData.id,
          invoiceUrl: paymentData.invoiceUrl,
          pixQrCode: qrData.payload || qrData.encodedImage, // Asaas retorna payload ou imagem
          encodedImage: qrData.encodedImage
        }
      };
    } catch (apiError) {
      console.error("Asaas API Connection Error:", apiError);
      return { success: false, error: "Falha de conexão com o provedor de pagamentos." };
    }

  } catch (error) {
    console.error("Erro ao gerar cobrança:", error);
    return { success: false, error: "Erro interno ao processar cobrança." };
  }
}
