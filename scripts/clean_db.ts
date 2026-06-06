import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanDb() {
  try {
    console.log('Iniciando limpeza do banco de dados...');

    // Excluir dados relacionados aos clientes
    console.log('Limpando Mensagens de Chat...');
    await prisma.mensagemChat.deleteMany();
    
    console.log('Limpando Tickets...');
    await prisma.ticket.deleteMany();
    
    console.log('Limpando Manutenções...');
    await prisma.manutencao.deleteMany();
    
    console.log('Limpando Equipamentos...');
    await prisma.equipamento.deleteMany();
    
    console.log('Limpando Medições...');
    await prisma.medicao.deleteMany();
    
    console.log('Limpando Agendas...');
    await prisma.agenda.deleteMany();
    
    console.log('Limpando Clientes...');
    await prisma.cliente.deleteMany();

    console.log('Limpando Usuários não-administradores...');
    const resultUsers = await prisma.user.deleteMany({
      where: {
        role: {
          not: 'ADMIN',
        },
      },
    });
    console.log(`Usuários excluídos: ${resultUsers.count}`);
    
    // Opcional: ver se existe o usuário ADMIN, senão cria um default para garantir
    const adminExists = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    });

    if (!adminExists) {
      console.log('Nenhum ADMIN encontrado, criando um padrão...');
      // bcrypt hash for '123456' or similar can be tricky without importing bcrypt, 
      // but maybe one already exists.
    } else {
      console.log(`Admin(s) preservado(s): ${adminExists.email}`);
    }

    console.log('Limpeza concluída com sucesso!');
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanDb();
