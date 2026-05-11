const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAllTables() {
  console.log("Criando todas as tabelas do schema...\n");
  
  const tables = [
    // Agenda
    {
      name: "Agenda",
      sql: `
        CREATE TABLE IF NOT EXISTS "Agenda" (
          "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          "data" TIMESTAMP(3) NOT NULL,
          "servico" TEXT NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'pendente',
          "pagamentoStatus" TEXT NOT NULL DEFAULT 'aguardando_sinal',
          "clienteId" TEXT NOT NULL,
          "valorTotal" DOUBLE PRECISION,
          "valorSinal" DOUBLE PRECISION,
          "asaasId" TEXT,
          "pixCopiaECola" TEXT,
          "pixQrCode" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "Agenda_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
        );
      `
    },
    // Medicao
    {
      name: "Medicao",
      sql: `
        CREATE TABLE IF NOT EXISTS "Medicao" (
          "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          "clienteId" TEXT NOT NULL,
          "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "ph" DOUBLE PRECISION,
          "cloro" DOUBLE PRECISION,
          "alcalinidade" DOUBLE PRECISION,
          "temperatura" DOUBLE PRECISION,
          "turbidez" TEXT,
          "observacoes" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "Medicao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
        );
      `
    },
    // Equipamento
    {
      name: "Equipamento",
      sql: `
        CREATE TABLE IF NOT EXISTS "Equipamento" (
          "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          "clienteId" TEXT NOT NULL,
          "nome" TEXT NOT NULL,
          "tipo" TEXT NOT NULL,
          "marca" TEXT,
          "modelo" TEXT,
          "dataInstalacao" TIMESTAMP(3),
          "status" TEXT NOT NULL DEFAULT 'ativo',
          "observacoes" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "Equipamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
        );
      `
    },
    // Manutencao
    {
      name: "Manutencao",
      sql: `
        CREATE TABLE IF NOT EXISTS "Manutencao" (
          "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          "clienteId" TEXT NOT NULL,
          "agendaId" TEXT,
          "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "tipo" TEXT NOT NULL,
          "descricao" TEXT,
          "tecnico" TEXT,
          "status" TEXT NOT NULL DEFAULT 'concluida',
          "custo" DOUBLE PRECISION,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "Manutencao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
        );
      `
    },
    // Estoque
    {
      name: "Estoque",
      sql: `
        CREATE TABLE IF NOT EXISTS "Estoque" (
          "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          "item" TEXT NOT NULL,
          "categoria" TEXT NOT NULL,
          "quantidade" DOUBLE PRECISION NOT NULL DEFAULT 0,
          "unidade" TEXT NOT NULL DEFAULT 'un',
          "minimo" DOUBLE PRECISION NOT NULL DEFAULT 0,
          "custo" DOUBLE PRECISION,
          "fornecedor" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `
    },
    // Patrimonio
    {
      name: "Patrimonio",
      sql: `
        CREATE TABLE IF NOT EXISTS "Patrimonio" (
          "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          "nome" TEXT NOT NULL,
          "tipo" TEXT NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'ativo',
          "aquisicao" TIMESTAMP(3),
          "valor" DOUBLE PRECISION,
          "responsavel" TEXT,
          "observacoes" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `
    },
    // Ticket
    {
      name: "Ticket",
      sql: `
        CREATE TABLE IF NOT EXISTS "Ticket" (
          "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          "clienteId" TEXT NOT NULL,
          "titulo" TEXT NOT NULL,
          "descricao" TEXT NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'aberto',
          "prioridade" TEXT NOT NULL DEFAULT 'media',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "Ticket_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
        );
      `
    },
    // MensagemChat
    {
      name: "MensagemChat",
      sql: `
        CREATE TABLE IF NOT EXISTS "MensagemChat" (
          "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          "ticketId" TEXT NOT NULL,
          "remetente" TEXT NOT NULL,
          "mensagem" TEXT NOT NULL,
          "lida" BOOLEAN NOT NULL DEFAULT false,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "MensagemChat_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `
    },
    // AdminProfile
    {
      name: "AdminProfile",
      sql: `
        CREATE TABLE IF NOT EXISTS "AdminProfile" (
          "id" TEXT PRIMARY KEY DEFAULT 'admin',
          "userId" TEXT UNIQUE NOT NULL,
          "nomeEmpresa" TEXT NOT NULL DEFAULT 'Piscinas Evolution',
          "cnpj" TEXT,
          "telefone" TEXT,
          "email" TEXT,
          "endereco" TEXT,
          "asaasKey" TEXT,
          "asaasEnv" TEXT NOT NULL DEFAULT 'sandbox',
          "pixChave" TEXT,
          "pixTipo" TEXT,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "AdminProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
        );
      `
    }
  ];

  for (const table of tables) {
    try {
      await prisma.$executeRawUnsafe(table.sql);
      console.log(`✅ ${table.name} - OK`);
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log(`⚠️  ${table.name} - já existe`);
      } else {
        console.error(`❌ ${table.name} - ERRO:`, err.message);
      }
    }
  }

  // Seed AdminProfile se não existir
  try {
    await prisma.$executeRawUnsafe(`
      INSERT INTO "AdminProfile" (id, "userId", "nomeEmpresa", "asaasEnv")
      VALUES ('admin', 'usr_admin', 'Piscinas Evolution', 'sandbox')
      ON CONFLICT (id) DO NOTHING;
    `);
    console.log("\n✅ AdminProfile seed - OK");
  } catch (err) {
    console.log("⚠️  AdminProfile seed:", err.message);
  }

  console.log("\n🎉 Todas as tabelas criadas com sucesso!");
}

createAllTables()
  .catch((e) => {
    console.error("Erro fatal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
