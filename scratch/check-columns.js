const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const columns = await prisma.$queryRawUnsafe(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Cliente';
    `);
    console.log("Columns in table 'Cliente':", columns);
  } catch (error) {
    console.error("Error checking columns:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
