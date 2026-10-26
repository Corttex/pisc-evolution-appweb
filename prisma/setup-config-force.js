const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando criação da tabela Configuracao...");

  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Configuracao" (
        "id" TEXT PRIMARY KEY DEFAULT 'global',
        "asaasKey" TEXT,
        "asaasEnv" TEXT NOT NULL DEFAULT 'sandbox',
        "pixSinal" DOUBLE PRECISION NOT NULL DEFAULT 50.0,
        "site_titulo" TEXT NOT NULL DEFAULT 'Piscinas Evolution',
        "site_headline" TEXT NOT NULL DEFAULT 'Cuidamos da sua piscina, você aproveita o verão.',
        "site_subheadline" TEXT NOT NULL DEFAULT 'Tecnologia e engenharia para o seu lazer.',
        "site_whatsapp" TEXT NOT NULL DEFAULT '5561999999999',
        "site_email" TEXT NOT NULL DEFAULT 'contato@piscinasevolution.com.br',
        "social_instagram" TEXT,
        "social_facebook" TEXT,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Inserir configuração inicial
    await prisma.$executeRawUnsafe(`
      INSERT INTO "Configuracao" (id, site_titulo) 
      VALUES ('global', 'Piscinas Evolution')
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log("Tabela Configuracao criada/verificada.");
  } catch (err) {
    console.error("Erro ao criar tabela Configuracao:", err);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
