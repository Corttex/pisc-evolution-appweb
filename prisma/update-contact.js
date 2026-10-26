const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log("Atualizando configurações de contato...");

  try {
    await prisma.configuracao.upsert({
      where: { id: 'global' },
      update: {
        site_whatsapp: '556191441294',
        social_instagram: 'https://instagram.com/piscinasevolution',
        updatedAt: new Date()
      },
      create: {
        id: 'global',
        site_titulo: 'Piscinas Evolution',
        site_whatsapp: '556191441294',
        social_instagram: 'https://instagram.com/piscinasevolution',
        updatedAt: new Date()
      }
    });

    console.log("Configurações atualizadas no banco.");
  } catch (err) {
    console.error("Erro ao atualizar configurações:", err);
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
