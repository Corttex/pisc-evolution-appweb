import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany();
  console.log('Users:', users);
  
  const admins = await prisma.adminProfile.findMany();
  console.log('AdminProfiles:', admins);
}

check().finally(() => prisma.$disconnect());
