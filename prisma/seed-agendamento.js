const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log("Criando agendamento de teste...");

  // Busca o cliente pelo CPF
  const cliente = await prisma.cliente.findFirst({
    where: { documento: "01250190177" }
  });

  if (!cliente) {
    console.error("Cliente não encontrado! Verifique se o cliente inicial foi criado.");
    return;
  }

  console.log(`Cliente encontrado: ${cliente.nome} (${cliente.id})`);

  // Cria agendamento para hoje + 2 dias
  const dataAgendamento = new Date();
  dataAgendamento.setDate(dataAgendamento.getDate() + 2);
  dataAgendamento.setHours(10, 0, 0, 0);

  const agenda = await prisma.agenda.create({
    data: {
      id: `agenda_teste_${Date.now()}`,
      data: dataAgendamento,
      servico: "Manutenção Preventiva",
      status: "confirmado",
      pagamentoStatus: "aguardando_sinal",
      clienteId: cliente.id,
      valorTotal: 280.00,
      valorSinal: 140.00,
      updatedAt: new Date()
    }
  });

  // Cria mais um agendamento para hoje
  const hoje = new Date();
  hoje.setHours(14, 30, 0, 0);

  const agenda2 = await prisma.agenda.create({
    data: {
      id: `agenda_hoje_${Date.now()}`,
      data: hoje,
      servico: "Análise de Água",
      status: "pendente",
      pagamentoStatus: "aguardando_sinal",
      clienteId: cliente.id,
      valorTotal: 120.00,
      valorSinal: 60.00,
      updatedAt: new Date()
    }
  });

  console.log(`✅ Agendamento 1 criado: ${agenda.id} - ${agenda.servico} em ${dataAgendamento.toLocaleDateString('pt-BR')}`);
  console.log(`✅ Agendamento 2 criado: ${agenda2.id} - ${agenda2.servico} para HOJE`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
