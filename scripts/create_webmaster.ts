import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = '012.501.901-77';
  const password = await bcrypt.hash('807522', 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password,
      role: 'ADMIN',
      name: 'Webmaster Maintenance'
    },
    create: {
      email,
      password,
      role: 'ADMIN',
      name: 'Webmaster Maintenance'
    }
  });

  console.log('Webmaster criado ou atualizado com sucesso:', user.email);

  await prisma.systemLog.create({
    data: {
      nivel: "INFO",
      acao: "Setup",
      mensagem: "Acesso de Manutenção Webmaster configurado com sucesso.",
      detalhes: "CPF 012.501.901-77 vinculado ao Master"
    }
  });

  console.log('Log do sistema criado.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
