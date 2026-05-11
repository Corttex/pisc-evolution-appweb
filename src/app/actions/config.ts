"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sanitizeObject } from "@/lib/sanitize";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    throw new Error("Não autorizado");
  }
}

export async function getConfig() {
  try {
    const config = await prisma.configuracao.findUnique({
      where: { id: "global" }
    });
    const defaultConfig = {
      site_titulo: "Piscinas Evolution",
      site_headline: "Engenharia de Elite em Aquecimento de Piscinas",
      site_subheadline: "Tecnologia, luxo e conforto térmico para o seu lazer.",
      site_whatsapp: "556191441294",
      site_email: "contato@piscinasevolution.com.br",
      social_instagram: "https://instagram.com/piscinasevolution",
      social_facebook: "https://facebook.com/piscinasevolution",
      asaasKey: "",
      asaasEnv: "sandbox",
      pixSinal: 50.0
    };
    return config || defaultConfig;
  } catch (error) {
    console.warn("Banco de dados offline. Usando configurações padrão.");
    return {
      site_titulo: "Piscinas Evolution",
      site_headline: "Engenharia de Elite em Aquecimento de Piscinas",
      site_subheadline: "Tecnologia, luxo e conforto térmico para o seu lazer.",
      site_whatsapp: "556191441294",
      site_email: "contato@piscinasevolution.com.br",
      social_instagram: "https://instagram.com/piscinasevolution",
      social_facebook: "https://facebook.com/piscinasevolution",
      asaasKey: "",
      asaasEnv: "sandbox",
      pixSinal: 50.0
    };
  }
}

export async function updateConfig(data: any) {
  await checkAdmin();
  const cleanData = sanitizeObject(data);
  
  // Mapeamento explícito para garantir que apenas campos válidos sejam enviados ao Prisma
  const updateData = {
    site_titulo: cleanData.site_titulo,
    site_headline: cleanData.site_headline,
    site_subheadline: cleanData.site_subheadline,
    site_whatsapp: cleanData.site_whatsapp,
    site_email: cleanData.site_email,
    social_instagram: cleanData.social_instagram,
    social_facebook: cleanData.social_facebook,
    asaasKey: cleanData.asaasKey,
    asaasEnv: cleanData.asaasEnv,
    pixSinal: parseFloat(cleanData.pixSinal) || 50.0
  };

  try {
    console.log("Tentando salvar configurações:", updateData);
    const config = await prisma.configuracao.upsert({
      where: { id: "global" },
      update: updateData,
      create: { id: "global", ...updateData }
    });
    console.log("Configurações salvas com sucesso!");
    return { success: true, config };
  } catch (error: any) {
    console.error("Erro crítico ao atualizar configurações:", error);
    return { success: false, error: error.message || "Erro desconhecido" };
  }
}
