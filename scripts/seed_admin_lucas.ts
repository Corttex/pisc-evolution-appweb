import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'bsb.playtech@gmail.com';
  const rawPassword = process.env.ADMIN_PASSWORD || '@@220022';
  const name = process.env.ADMIN_NAME || 'Lucas Admin';

  const password = await bcrypt.hash(rawPassword, 10);

  // 1. Cria ou atualiza usuário na tabela User
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password,
      role: 'ADMIN',
      name
    },
    create: {
      email,
      password,
      role: 'ADMIN',
      name
    }
  });

  console.log('Usuário Admin criado/atualizado no PostgreSQL com sucesso:');
  console.log(`- ID: ${user.id}`);
  console.log(`- Email: ${user.email}`);
  console.log(`- Role: ${user.role}`);

  // 2. Cria ou atualiza AdminProfile
  const profile = await prisma.adminProfile.findFirst();
  if (profile) {
    await prisma.adminProfile.update({
      where: { id: profile.id },
      data: {
        nome: name,
        email,
        senha: rawPassword
      }
    });
    console.log('AdminProfile atualizado com sucesso.');
  } else {
    await prisma.adminProfile.create({
      data: {
        id: crypto.randomUUID(),
        nome: name,
        email,
        cargo: 'Administrador',
        senha: rawPassword
      }
    });
    console.log('AdminProfile criado com sucesso.');
  }
}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

