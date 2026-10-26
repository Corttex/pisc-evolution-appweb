const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando criação de usuário ADMIN...");

  const email = "admin@evolution.com.br";
  const password = "admin";
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: 'ADMIN',
        updatedAt: new Date()
      },
      create: {
        id: "usr_admin",
        name: "Administrador Evolution",
        email: email,
        password: hashedPassword,
        role: 'ADMIN',
        updatedAt: new Date()
      }
    });

    console.log(`Sucesso! Usuário ADMIN criado/atualizado.`);
    console.log(`Email: ${email}`);
    console.log(`Senha: ${password}`);
  } catch (err) {
    console.error("Erro ao criar ADMIN:", err);
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
