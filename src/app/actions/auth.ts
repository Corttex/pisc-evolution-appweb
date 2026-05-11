"use server";

import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { sanitize } from "@/lib/sanitize";

export async function loginCliente(cpf: string, senha: string) {
  try {
    const cleanCpf = sanitize(cpf).replace(/\D/g, '');
    const cleanSenha = sanitize(senha);
    
    const user = await prisma.user.findFirst({
      where: {
        role: 'CLIENTE',
        cliente: {
          documento: cleanCpf
        }
      },
      include: { cliente: true }
    });
    if (!user) {
      return { success: false, error: "CPF ou senha inválidos." };
    }

    // Comparar senha usando bcrypt
    const isValid = user.password ? await require("bcryptjs").compare(cleanSenha, user.password) : false;
    
    if (!isValid) {
      return { success: false, error: "CPF ou senha inválidos." };
    }

    const cliente = user.cliente;
    if (!cliente) {
      return { success: false, error: "Perfil de cliente não encontrado." };
    }


    // Definir cookie de sessão simples
    const cookieStore = await cookies();
    cookieStore.set("cliente_id", cliente.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hora (auto-expiração curta conforme solicitado)
      path: "/",
    });

    return { success: true, cliente };
  } catch (error: any) {
    console.error("Erro ao fazer login:", error);
    return { success: false, error: "Erro interno ao processar login." };
  }
}

export async function logoutCliente() {
  const cookieStore = await cookies();
  cookieStore.delete("cliente_id");
}

export async function getSessionCliente() {
  try {
    const cookieStore = await cookies();
    const clienteId = cookieStore.get("cliente_id")?.value;

    if (!clienteId) return null;

    const [cliente, config] = await Promise.all([
      (prisma.cliente as any).findUnique({
        where: { id: clienteId },
        include: {
          medicoes: {
            orderBy: { data: 'desc' },
            take: 1
          },
          equipamentos: true,
          agendas: {
            where: { status: 'pendente' },
            orderBy: { data: 'asc' },
            take: 1
          },
          tickets: {
            orderBy: { updatedAt: 'desc' },
            include: { mensagens: { orderBy: { createdAt: 'desc' }, take: 1 } }
          }
        }
      }),
      prisma.configuracao.findFirst()
    ]);

    return { cliente, config };
  } catch (error) {
    return null;
  }
}

export async function createTicketCliente(assunto: string, mensagem: string) {
  try {
    const cookieStore = await cookies();
    const clienteId = cookieStore.get("cliente_id")?.value;
    if (!clienteId) throw new Error("Não autenticado");

    const ticket = await prisma.ticket.create({
      data: {
        clienteId,
        assunto,
        prioridade: "Media",
        mensagens: {
          create: {
            texto: mensagem,
            sender: "Cliente"
          }
        }
      }
    });

    return { success: true, ticket };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function sendClienteMessage(ticketId: string, texto: string) {
  try {
    const cookieStore = await cookies();
    const clienteId = cookieStore.get("cliente_id")?.value;
    if (!clienteId) throw new Error("Não autenticado");

    const mensagem = await prisma.mensagemChat.create({
      data: {
        ticketId,
        texto,
        sender: "Cliente"
      }
    });

    await prisma.ticket.update({
      where: { id: ticketId },
      data: { updatedAt: new Date() }
    });

    return { success: true, mensagem };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
