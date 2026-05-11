const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando criação manual de tabelas...");

  // Criar tabelas se não existirem (SQL básico para Cliente e User)
  try {
    // Tentar criar o enum Role (pode falhar se já existir)
    try {
      await prisma.$executeRawUnsafe(`CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENTE');`);
      console.log("Enum Role criado.");
    } catch (e) {
      console.log("Enum Role já existe ou erro ignorado.");
    }

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Cliente" (
        "id" TEXT PRIMARY KEY,
        "nome" TEXT NOT NULL,
        "email" TEXT,
        "telefone" TEXT NOT NULL,
        "documento" TEXT UNIQUE,
        "endereco" TEXT,
        "tipoPiscina" TEXT,
        "volumePiscina" DOUBLE PRECISION,
        "frequenciaManutencao" TEXT,
        "diaPreferencial" TEXT,
        "observacoes" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT,
        "email" TEXT UNIQUE,
        "password" TEXT,
        "role" "Role" NOT NULL DEFAULT 'CLIENTE',
        "clienteId" TEXT UNIQUE,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "User_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE SET NULL ON UPDATE CASCADE
      );
    `);
    
    console.log("Tabelas verificadas/criadas.");
  } catch (err) {
    console.error("Erro ao criar tabelas:", err);
  }

  const documento = "01250190177";
  const pin = "807522";
  const hashedPin = await bcrypt.hash(pin, 10);
  const email = "inicial@evolution.com.br";

  try {
    // 1. Criar ou encontrar o Cliente
    const cliente = await prisma.cliente.upsert({
      where: { documento },
      update: {
        nome: "Cliente Inicial",
        updatedAt: new Date()
      },
      create: {
        id: "cli_inicial",
        nome: "Cliente Inicial",
        documento: documento,
        email: email,
        telefone: "61999999999",
        tipoPiscina: "Fibra",
        volumePiscina: 30000,
        frequenciaManutencao: "Semanal",
        updatedAt: new Date()
      }
    });

    // 2. Criar ou encontrar o User e vincular ao Cliente
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPin,
        clienteId: cliente.id,
        role: 'CLIENTE',
        updatedAt: new Date()
      },
      create: {
        id: "usr_inicial",
        name: "Cliente Inicial",
        email: email,
        password: hashedPin,
        role: 'CLIENTE',
        clienteId: cliente.id,
        updatedAt: new Date()
      }
    });

    console.log(`Sucesso! Cliente vinculado ao usuário.`);
    console.log(`CPF: ${documento}`);
    console.log(`PIN: ${pin}`);
  } catch (err) {
    console.error("Erro ao criar dados:", err);
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
