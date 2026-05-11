"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sanitizeObject } from "@/lib/sanitize";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    throw new Error("Não autorizado");
  }
}

export async function getEstoque() {
  await checkAdmin();
  try {
    return await prisma.estoque.findMany({
      orderBy: { item: 'asc' }
    });
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    return [];
  }
}

export async function createEstoqueItem(data: { 
  item: string; 
  categoria: string; 
  quantidade: number; 
  unidade: string; 
  minimo: number; 
}) {
  await checkAdmin();
  const cleanData = sanitizeObject(data);
  try {
    const novoItem = await prisma.estoque.create({
      data: {
        item: cleanData.item,
        categoria: cleanData.categoria,
        quantidade: cleanData.quantidade,
        unidade: cleanData.unidade,
        minimo: cleanData.minimo,
      }
    });
    revalidatePath("/admin/estoque");
    return { success: true, item: novoItem };
  } catch (error) {
    console.error("Erro ao criar item no estoque:", error);
    return { success: false, error: "Falha ao criar item" };
  }
}

export async function updateEstoqueItem(id: string, data: { 
  item?: string; 
  categoria?: string; 
  quantidade?: number; 
  unidade?: string; 
  minimo?: number; 
}) {
  await checkAdmin();
  const cleanData = sanitizeObject(data);
  try {
    const itemAtualizado = await prisma.estoque.update({
      where: { id },
      data: {
        item: cleanData.item,
        categoria: cleanData.categoria,
        quantidade: cleanData.quantidade,
        unidade: cleanData.unidade,
        minimo: cleanData.minimo,
      }
    });
    revalidatePath("/admin/estoque");
    return { success: true, item: itemAtualizado };
  } catch (error) {
    console.error("Erro ao atualizar item no estoque:", error);
    return { success: false, error: "Falha ao atualizar item" };
  }
}

export async function deleteEstoqueItem(id: string) {
  await checkAdmin();
  try {
    await prisma.estoque.delete({
      where: { id }
    });
    revalidatePath("/admin/estoque");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar item do estoque:", error);
    return { success: false, error: "Falha ao deletar item" };
  }
}

export async function adjustEstoqueQuantity(id: string, delta: number) {
  await checkAdmin();
  try {
    const item = await prisma.estoque.findUnique({ where: { id } });
    if (!item) return { success: false, error: "Item não encontrado" };

    const itemAtualizado = await prisma.estoque.update({
      where: { id },
      data: {
        quantidade: Math.max(0, item.quantidade + delta)
      }
    });
    revalidatePath("/admin/estoque");
    return { success: true, item: itemAtualizado };
  } catch (error) {
    console.error("Erro ao ajustar quantidade do estoque:", error);
    return { success: false, error: "Falha ao ajustar quantidade" };
  }
}
