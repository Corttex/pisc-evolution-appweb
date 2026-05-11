import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log("Iniciando limpeza do banco...");
  
  // Limpar dados existentes na ordem correta
  await prisma.configuracao.deleteMany()
  await prisma.agenda.deleteMany()
  await prisma.manutencao.deleteMany()
  await prisma.equipamento.deleteMany()
  await prisma.medicao.deleteMany()
  await prisma.mensagemChat.deleteMany()
  await prisma.ticket.deleteMany()
  await prisma.user.deleteMany()
  await prisma.cliente.deleteMany()
  await prisma.adminProfile.deleteMany()

  console.log("Criando Configuração Global...");
  await prisma.configuracao.create({
    data: {
      id: "global",
      site_titulo: "Piscinas Evolution",
      site_headline: "Engenharia de Elite em Aquecimento de Piscinas",
      site_subheadline: "Sua piscina na temperatura perfeita, o ano inteiro.",
      site_whatsapp: "556191441294",
      site_email: "contato@piscinasevolution.com.br",
      social_instagram: "https://instagram.com/piscinasevolution",
      social_facebook: "https://facebook.com/piscinasevolution",
      pixSinal: 50.0
    }
  })

  console.log("Criando Perfil do Administrador...");
  const hashedAdminPassword = await bcrypt.hash("PjHKIt9gF93WGcj0", 10);
  await prisma.user.create({
    data: {
      name: "Admin Master",
      email: "admin@evolution.com",
      password: hashedAdminPassword,
      role: "ADMIN"
    }
  })

  await prisma.adminProfile.create({
    data: {
      nome: "Admin Master",
      email: "admin@evolution.com",
      asaasKey: "",
      pixKey: "admin@evolution.com",
      pixTipo: "E-mail"
    }
  })

  console.log("Criando Clientes de Exemplo...");
  
  const pinCarlos = await bcrypt.hash("123456", 10);
  const cliente1 = await prisma.cliente.create({
    data: {
      nome: "Carlos Alberto de Souza",
      telefone: "(61) 98877-6655",
      documento: "12345678900",
      endereco: "Lago Sul, Quadra 10",
      tipoPiscina: "Alvenaria",
      volumePiscina: 45000,
      frequenciaManutencao: "Semanal",
      diaPreferencial: "Segunda-feira",
      equipamentos: {
        create: [
          { nome: "Filtro de Areia DFR-12", marca: "Dancor", status: "operacional", modelo: "DFR-12" },
          { nome: "Bomba Jacuzzi 1/2 CV", marca: "Jacuzzi", status: "operacional", modelo: "SJ-100" }
        ]
      },
      medicoes: {
        create: [
          { ph: 7.4, cloro: 2.5, alcalinidade: 110, temperatura: 29, data: new Date() },
          { ph: 7.2, cloro: 2.1, alcalinidade: 100, temperatura: 28.5, data: new Date(Date.now() - 86400000) }
        ]
      },
      agendas: {
        create: [
          { data: new Date(Date.now() + 172800000), servico: "Manutenção Preventiva Semanal", status: "pendente" }
        ]
      }
    }
  })

  await prisma.user.create({
    data: {
      name: cliente1.nome,
      email: "carlos@email.com",
      password: pinCarlos,
      role: "CLIENTE",
      clienteId: cliente1.id
    }
  })

  const pinMariana = await bcrypt.hash("654321", 10);
  const cliente2 = await prisma.cliente.create({
    data: {
      nome: "Mariana Oliveira",
      telefone: "(61) 91122-3344",
      documento: "00099988877",
      endereco: "Sudoeste, Bloco C",
      tipoPiscina: "Fibra",
      volumePiscina: 28000,
      frequenciaManutencao: "Quinzenal",
      diaPreferencial: "Quarta-feira",
      equipamentos: {
        create: [
          { nome: "Trocador de Calor Inverter", marca: "Evolution", status: "operacional", modelo: "EV-90" }
        ]
      },
      medicoes: {
        create: [
          { ph: 6.8, cloro: 1.5, alcalinidade: 80, temperatura: 26, data: new Date() }
        ]
      }
    }
  })

  await prisma.user.create({
    data: {
      name: cliente2.nome,
      email: "mariana@email.com",
      password: pinMariana,
      role: "CLIENTE",
      clienteId: cliente2.id
    }
  })

  console.log("Seed concluído com sucesso!")
  console.log("---------------------------")
  console.log("Acesso Admin: admin@evolution.com | PjHKIt9gF93WGcj0")
  console.log("Acesso Cliente Carlos: CPF 12345678900 | PIN 123456")
  console.log("Acesso Cliente Mariana: CPF 00099988877 | PIN 654321")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
