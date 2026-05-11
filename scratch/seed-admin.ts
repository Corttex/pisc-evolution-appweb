import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "fmdigitalagency.job@gmail.com";
  const password = await bcrypt.hash("Admin123!", 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { 
      password,
      role: "ADMIN"
    },
    create: {
      email,
      name: "Admin Evolution",
      password,
      role: "ADMIN",
    },
  });

  console.log("Admin criado/atualizado com sucesso:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
