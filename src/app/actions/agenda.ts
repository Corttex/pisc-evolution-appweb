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

import { gerarPixCobranca } from "@/lib/pix";

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

    // 1. Configurar valor de sinal fixo de R$ 49,90 conforme solicitado
    const valorSinal = 49.90;

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

    // 4. Gerar QR Code via Padrão PIX Banco Central
    try {
      const config = await prisma.configuracao.findUnique({ where: { id: "global" } }).catch(() => null);
      // Chave PIX da empresa (usando o telefone se não configurado)
      const chavePixEmpresa = config?.site_whatsapp || "5561991441294"; 
      
      const pixData = await gerarPixCobranca(
        chavePixEmpresa,
        "Piscinas Evolution",
        "Brasilia",
        valorSinal
      );

      // 5. Atualizar agendamento com dados do Pix
      const updatedAgenda = await prisma.agenda.update({
        where: { id: agendamento.id },
        data: {
          pixCopiaECola: pixData.pixCopiaECola,
          pixQrCode: pixData.pixQrCode
        }
      });

      return { success: true, agenda: updatedAgenda };
    } catch (pixError: any) {
      console.error("Erro ao gerar Pix estático:", pixError);
      return { 
        success: true, 
        agenda: agendamento, 
        message: "Agendamento realizado, mas houve um problema ao gerar o QR Code de pagamento." 
      };
    }

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
