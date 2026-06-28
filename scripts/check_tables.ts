import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  try {
    const tables: any[] = await prisma.$queryRaw`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';`;
    console.log("=== TABELAS NO BANCO DE DADOS ===");
    tables.forEach(t => console.log("- " + t.tablename));
    console.log(`\nTotal: ${tables.length} tabelas encontradas.`);
  } catch (error) {
    console.error("Erro ao verificar tabelas:", error);
  } finally {
    await prisma.$disconnect();
  }
}

check();
