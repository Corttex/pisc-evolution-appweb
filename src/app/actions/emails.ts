"use server";

import { prisma } from "@/lib/db";
import { checkAdmin } from "./admin";

export async function getEmailTemplates() {
  try {
    const auth = await checkAdmin();
    if (!auth?.user) throw new Error("Unauthorized");

    return await prisma.emailTemplate.findMany({
      orderBy: { nome: 'asc' }
    });
  } catch (error) {
    return [];
  }
}

export async function getEmailTemplate(id: string) {
  try {
    const auth = await checkAdmin();
    if (!auth?.user) throw new Error("Unauthorized");

    return await prisma.emailTemplate.findUnique({ where: { id } });
  } catch (error) {
    return null;
  }
}

export async function saveEmailTemplate(data: any) {
  try {
    const auth = await checkAdmin();
    if (!auth?.user) throw new Error("Unauthorized");

    let template;
    if (data.id) {
      template = await prisma.emailTemplate.update({
        where: { id: data.id },
        data: {
          nome: data.nome,
          assunto: data.assunto,
          html: data.html,
          variaveis: data.variaveis
        }
      });
      await prisma.systemLog.create({
        data: { nivel: "INFO", acao: "Email Template Update", mensagem: `Template '${data.nome}' foi editado.` }
      });
    } else {
      template = await prisma.emailTemplate.create({
        data: {
          chave: data.chave,
          nome: data.nome,
          assunto: data.assunto,
          html: data.html,
          variaveis: data.variaveis
        }
      });
      await prisma.systemLog.create({
        data: { nivel: "INFO", acao: "Email Template Create", mensagem: `Novo template '${data.nome}' foi criado.` }
      });
    }

    return { success: true, template };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getEmailLogs() {
  try {
    const auth = await checkAdmin();
    if (!auth?.user) throw new Error("Unauthorized");

    return await prisma.emailLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    });
  } catch (error) {
    return [];
  }
}
