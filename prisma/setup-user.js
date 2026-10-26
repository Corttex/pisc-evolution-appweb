const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const documento = "01250190177";
  const pin = "807522";
  const hashedPin = await bcrypt.hash(pin, 10);
  const email = "inicial@evolution.com.br";

  // 1. Criar ou encontrar o Cliente
  const cliente = await prisma.cliente.upsert({
    where: { documento },
    update: {
      nome: "Cliente Inicial"
    },
    create: {
      nome: "Cliente Inicial",
      documento: documento,
      email: email,
      telefone: "61999999999",
      tipoPiscina: "Fibra",
      volumePiscina: 30000,
      frequenciaManutencao: "Semanal"
    }
  });

  // 2. Criar ou encontrar o User e vincular ao Cliente
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPin,
      clienteId: cliente.id,
      role: 'CLIENTE'
    },
    create: {
      name: "Cliente Inicial",
      email: email,
      password: hashedPin,
      role: 'CLIENTE',
      clienteId: cliente.id
    }
  });

  console.log(`Sucesso! Cliente vinculado ao usuário.`);
  console.log(`Documento (CPF): ${documento}`);
  console.log(`PIN: ${pin}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
