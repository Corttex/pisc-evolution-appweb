const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Adding column 'observacoes' to table 'Agenda'...");
    await prisma.$executeRawUnsafe(`ALTER TABLE "Agenda" ADD COLUMN IF NOT EXISTS "observacoes" TEXT;`);
    console.log("Column added successfully!");
  } catch (error) {
    console.error("Error updating database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
