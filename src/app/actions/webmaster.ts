"use server";

import { prisma } from "@/lib/db";
import { checkWebmaster } from "./admin";

export async function getAdvancedConfig() {
  try {
    const auth = await checkWebmaster();
    if (!auth.success) throw new Error("Unauthorized");

    let config = await prisma.configuracao.findUnique({
      where: { id: "global" }
    });

    if (!config) {
      config = await prisma.configuracao.create({
        data: { id: "global" }
      });
    }
    return config;
  } catch (error) {
    console.error("Error fetching advanced config:", error);
    return null;
  }
}

export async function updateAdvancedConfig(data: any) {
  try {
    const auth = await checkWebmaster();
    if (!auth.success) throw new Error("Unauthorized");

    const updated = await prisma.configuracao.update({
      where: { id: "global" },
      data: {
        maintenanceMode: data.maintenanceMode,
        cacheEnabled: data.cacheEnabled,
        smtpHost: data.smtpHost,
        smtpPort: data.smtpPort,
        smtpUser: data.smtpUser,
        smtpPass: data.smtpPass,
        maxFailedLogins: data.maxFailedLogins ? parseInt(data.maxFailedLogins) : 5,
        moduleEmailEnabled: data.moduleEmailEnabled !== undefined ? data.moduleEmailEnabled : true
      }
    });

    await prisma.systemLog.create({ 
      data: { 
        nivel: "WARNING", 
        acao: "Update Advanced Config", 
        mensagem: "Configurações de infraestrutura (Webmaster) foram alteradas." 
      } 
    });

    return { success: true, config: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getBlockedIps() {
  try {
    const auth = await checkWebmaster();
    if (!auth.success) throw new Error("Unauthorized");

    return await prisma.blockedIp.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    return [];
  }
}

export async function blockIp(ip: string, reason: string) {
  try {
    const auth = await checkWebmaster();
    if (!auth.success) throw new Error("Unauthorized");

    const blocked = await prisma.blockedIp.create({
      data: { ip, reason }
    });

    await prisma.systemLog.create({ 
      data: { 
        nivel: "WARNING", 
        acao: "Block IP", 
        mensagem: `IP ${ip} foi bloqueado manualmente.`,
        detalhes: reason
      } 
    });

    return { success: true, blocked };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function unblockIp(id: string) {
  try {
    const auth = await checkWebmaster();
    if (!auth.success) throw new Error("Unauthorized");

    const record = await prisma.blockedIp.findUnique({ where: { id }});
    if (record) {
      await prisma.blockedIp.delete({ where: { id } });
      
      await prisma.systemLog.create({ 
        data: { 
          nivel: "INFO", 
          acao: "Unblock IP", 
          mensagem: `IP ${record.ip} foi removido da lista de bloqueio.`
        } 
      });
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSecurityLogs() {
  try {
    const auth = await checkWebmaster();
    if (!auth.success) throw new Error("Unauthorized");

    return await prisma.systemLog.findMany({
      where: {
        nivel: { in: ["WARNING", "ERROR"] }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  } catch (error) {
    return [];
  }
}
