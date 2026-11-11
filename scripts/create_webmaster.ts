import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.WEBMASTER_IDENTIFIER || '012.501.901-77';
  const rawPassword = process.env.WEBMASTER_PASSWORD;

  if (!rawPassword) {
    console.error("ERRO DE SEGURANÇA: Defina a variável de ambiente WEBMASTER_PASSWORD antes de executar este script.");
    console.error("Exemplo: WEBMASTER_PASSWORD='sua_senha_segura' npm run ... (ou passe no .env)");
    process.exit(1);
  }

  const password = await bcrypt.hash(rawPassword, 10);

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
