"use server";

import { prisma } from "@/lib/db";
import { createAsaasPayment, getPixQrCode } from "@/lib/asaas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sanitize, sanitizeObject } from "@/lib/sanitize";
import { checkAdmin } from "./admin";

export async function createAgendamento(data: any) {
  try {
    await checkAdmin();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function criarAgendamento(formData: any) {
  const cleanData = sanitizeObject(formData);
  try {
    const { 
      nome, 
      email, 
      telefone, 
      documento, 
      servico, 
      data, 
      valorTotal 
    } = cleanData;

    // 1. Pegar configurações do banco (com fallback seguro)
    const config = await prisma.configuracao.findUnique({ where: { id: "global" } }).catch(() => null);
    const apiKey = config?.asaasKey || process.env.ASAAS_API_KEY || "";
    const valorSinal = config?.pixSinal ?? 50.0;

    // 2. Criar ou encontrar cliente de forma segura
    const cleanDocumento = documento ? sanitize(documento).replace(/\D/g, '') : null;
    
    let cliente;
    if (cleanDocumento) {
      cliente = await prisma.cliente.upsert({
        where: { documento: cleanDocumento },
        update: { 
          nome: nome || undefined, 
          email: email || undefined, 
          telefone: telefone || undefined 
        },
        create: { 
          nome: nome || "Cliente Padrão", 
          email: email || null, 
          telefone: telefone || "", 
          documento: cleanDocumento 
        },
      });
    } else {
      // Se não tem documento, tenta pelo telefone (que não é único no schema, mas usaremos findFirst)
      const existingCliente = await prisma.cliente.findFirst({
        where: { telefone }
      });
      
      if (existingCliente) {
        cliente = await prisma.cliente.update({
          where: { id: existingCliente.id },
          data: { 
            nome: nome || undefined, 
            email: email || undefined 
          }
        });
      } else {
        cliente = await prisma.cliente.create({
          data: { 
            nome: nome || "Cliente Padrão", 
            email: email || null, 
            telefone: telefone || "" 
          }
        });
      }
    }

    // 3. Criar Agendamento no Banco
    const agendamento = await prisma.agenda.create({
      data: {
        data: new Date(data),
        servico,
        clienteId: cliente.id,
        valorTotal: parseFloat(valorTotal) || 0,
        valorSinal: valorSinal,
        status: "pendente",
        pagamentoStatus: "aguardando_sinal"
      }
    });

    // 4. Gerar Cobrança no Asaas (Sinal)
    const isMockKey = !apiKey || apiKey === "SUA_CHAVE_AQUI";
    
    if (!isMockKey) {
      try {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 1); // Vence em 1 dia

        const payment = await createAsaasPayment({
          customer: cliente.id, 
          billingType: "PIX",
          value: valorSinal,
          dueDate: dueDate.toISOString().split('T')[0],
          description: `Sinal: ${servico} - Piscinas Evolution`,
          externalReference: agendamento.id
        }, apiKey);

        // 5. Buscar QR Code do Pix
        const pixData = await getPixQrCode(payment.id, apiKey);

        // 6. Atualizar agendamento com dados do Pix
        const updatedAgenda = await prisma.agenda.update({
          where: { id: agendamento.id },
          data: {
            asaasId: payment.id,
            pixCopiaECola: pixData.payload,
            pixQrCode: pixData.encodedImage
          }
        });

        return { success: true, agenda: updatedAgenda };
      } catch (asaasError: any) {
        console.error("Erro no Asaas, mas agendamento criado:", asaasError);
        // Se der erro no Asaas, ainda retornamos sucesso do agendamento, mas sem o Pix
        return { 
          success: true, 
          agenda: agendamento, 
          message: "Agendamento realizado, mas houve um problema ao gerar o QR Code de pagamento." 
        };
      }
    }

    // Se for mock, retorna sucesso direto
    return { 
      success: true, 
      agenda: agendamento,
      message: "Modo Simulação: Agendamento salvo sem cobrança Asaas."
    };

  } catch (error: any) {
    console.error("Erro ao criar agendamento:", error);
    return { success: false, error: error.message };
  }
}

export async function buscarAgendamentoPorCpf(cpf: string) {
  const cleanCpf = sanitize(cpf).replace(/\D/g, '');
  try {
    const agendamentos = await prisma.agenda.findMany({
      where: {
        cliente: {
          documento: cleanCpf
        }
      },
      include: {
        cliente: true
      },
      orderBy: {
        data: 'desc'
      }
    });
    return { success: true, agendamentos };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function listarAgendas() {
  await checkAdmin();
  try {
    const agendamentos = await prisma.agenda.findMany({
      include: {
        cliente: true
      },
      orderBy: {
        data: 'desc'
      }
    });
    return { success: true, agendamentos };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
