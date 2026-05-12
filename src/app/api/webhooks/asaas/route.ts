import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { event, payment } = body;

    console.log(`[Webhook Asaas] Evento recebido: ${event}`, payment.id);

    if (event === "PAYMENT_CONFIRMED" || event === "PAYMENT_RECEIVED") {
      // Atualizar o status da Agenda vinculada ao asaasId
      await prisma.agenda.updateMany({
        where: { asaasId: payment.id },
        data: {
          pagamentoStatus: "pago",
          status: "confirmado"
        }
      });
      
      console.log(`[Webhook Asaas] Pagamento ${payment.id} confirmado e Agenda atualizada.`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Webhook Asaas] Erro ao processar webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
