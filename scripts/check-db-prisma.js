const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log('Conexão Prisma bem sucedida:', result);
  } catch (err) {
    console.error('Erro de conexão Prisma:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
