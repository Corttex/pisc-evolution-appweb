"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sanitizeObject } from "@/lib/sanitize";
import bcrypt from "bcryptjs";

async function checkAdmin() {
  try {
    const session = await getServerSession(authOptions);
    console.log("DEBUG AUTH: Sessão recuperada:", session ? "SIM" : "NÃO");

    if (!session) {
      console.log("checkAdmin: Nenhuma sessão encontrada no servidor.");
      throw new Error("Não autorizado - Sessão inexistente");
    }

    const user = session.user as any;
    if (user.role !== "ADMIN") {
      console.log("checkAdmin: BLOQUEIO - Role inadequada:", user.role);
      throw new Error("Não autorizado - Role insuficiente");
    }

    return session;
  } catch (error) {
    console.error("Erro na verificação de admin:", error);
    throw error;
  }
}

export async function getAdminProfile() {
  try {
    await checkAdmin();
    let profile = await prisma.adminProfile.findFirst();
    if (!profile) {
      profile = await prisma.adminProfile.create({
        data: {
          id: crypto.randomUUID(),
          nome: "Admin Evolution",
          email: "admin@evolution.com",
          asaasKey: "",
          pixKey: "",
          pixTipo: "E-mail",
          darkMode: false
        }
      });
    }
    return profile;
  } catch (error) {
    console.warn("getAdminProfile: Falha ou não autorizado. Usando mock.");
    return {
      id: "mock-admin",
      nome: "Admin Evolution",
      email: "admin@evolution.com.br",
      asaasKey: "",
      pixKey: "",
      pixTipo: "E-mail",
      darkMode: false
    };
  }
}

export async function updateAdminProfile(data: any) {
  try {
    await checkAdmin();
    const cleanData = sanitizeObject(data);

    // Busca o primeiro perfil ou cria um novo se não existir
    const existingProfile = await prisma.adminProfile.findFirst();
    const profileId = existingProfile?.id || crypto.randomUUID();

    const updated = await prisma.adminProfile.upsert({
      where: { id: profileId },
      update: {
        nome: cleanData.nome,
        email: cleanData.email,
        asaasKey: data.asaasKey,
        pixKey: data.pixKey,
        pixTipo: cleanData.pixTipo,
        darkMode: cleanData.darkMode,
        avatar: data.avatar
      },
      create: {
        id: profileId,
        nome: cleanData.nome,
        email: cleanData.email,
        asaasKey: data.asaasKey,
        pixKey: data.pixKey,
        pixTipo: cleanData.pixTipo,
        darkMode: cleanData.darkMode,
        avatar: data.avatar
      }
    });

    return { success: true, profile: updated };
  } catch (error: any) {
    console.error("Erro ao atualizar perfil:", error);
    return { success: false, error: error.message || "Falha ao salvar no banco de dados." };
  }
}

export async function createCliente(data: any) {
  try {
    console.log("Iniciando createCliente robusto...");
    await checkAdmin();

    const cleanData = sanitizeObject(data);
    const {
      nome,
      email,
      telefone,
      documento,
      endereco,
      pin,
      tipoPiscina,
      volumePiscina,
      frequenciaManutencao,
      diaPreferencial,
      observacoes,
      equipamentos
    } = cleanData;

    // 1. Criar o Cliente com todos os dados técnicos
    const cliente = await prisma.cliente.create({
      data: {
        nome: nome || "Novo Cliente",
        telefone: telefone || "",
        email: email || null,
        documento: documento && documento.trim() !== "" ? documento : null,
        endereco: endereco || null,
        // @ts-ignore
        tipoPiscina: tipoPiscina || null,
        // @ts-ignore
        volumePiscina: volumePiscina ? parseFloat(volumePiscina) : null,
        frequenciaManutencao: frequenciaManutencao || null,
        diaPreferencial: diaPreferencial || null,
        observacoes: observacoes || null,
      }
    });

    // 2. Criar os Equipamentos vinculados
    if (equipamentos && Array.isArray(equipamentos)) {
      for (const eq of equipamentos) {
        if (eq.nome && eq.nome.trim() !== "") {
          await prisma.equipamento.create({
            data: {
              nome: eq.nome,
              marca: eq.marca || null,
              modelo: eq.modelo || null,
              status: "operacional",
              clienteId: cliente.id
            }
          });
        }
      }
    }

    // 3. Criar o Usuário para login do Portal
    const userEmail = email || `${documento || Date.now()}@piscinasevolution.com.br`;
    const hashedPassword = pin ? await bcrypt.hash(pin, 10) : await bcrypt.hash("123456", 10);

    await prisma.user.create({
      data: {
        name: nome,
        email: userEmail,
        password: hashedPassword,
        role: "CLIENTE",
        clienteId: cliente.id
      }
    });

    return { success: true, cliente };
  } catch (error: any) {
    console.error("ERRO CRÍTICO em createCliente:", error);
    return { success: false, error: error.message || "Erro desconhecido." };
  }
}

export async function getAdminConfig() {
  try {
    await checkAdmin();
    let config = await prisma.configuracao.findFirst();
    if (!config) {
      config = await prisma.configuracao.create({
        data: { id: "global" }
      });
    }
    return config;
  } catch (error) {
    return null;
  }
}

export async function updateAdminConfig(data: any) {
  try {
    await checkAdmin();
    const cleanData = sanitizeObject(data);
    const updated = await prisma.configuracao.upsert({
      where: { id: "global" },
      update: cleanData,
      create: {
        id: "global",
        ...cleanData
      }
    });
    return { success: true, config: updated };
  } catch (error) {
    console.error("Erro ao atualizar config:", error);
    return { success: false, error: String(error) };
  }
}

export async function getDashboardStats() {
  try {
    await checkAdmin();
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const todayEnd = new Date(now.setHours(23, 59, 59, 999));

    const [activeClients, agendasToday, revenueMonth, pendingRevenue, openTickets, tickets, agendas, totalVolume] = await Promise.all([
      prisma.cliente.count(),
      prisma.agenda.count({ where: { data: { gte: todayStart, lte: todayEnd } } }),
      prisma.agenda.aggregate({ where: { pagamentoStatus: "pago" }, _sum: { valorTotal: true } }),
      prisma.agenda.aggregate({ where: { pagamentoStatus: "pendente" }, _sum: { valorTotal: true } }),
      prisma.ticket.count({ where: { status: "Aberto" } }),
      prisma.ticket.findMany({
        where: { status: "Aberto" },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { cliente: true }
      }),
      prisma.agenda.findMany({
        orderBy: { data: 'desc' },
        include: { cliente: true }
      }),
      // @ts-ignore
      prisma.cliente.aggregate({ _sum: { volumePiscina: true } })
    ]);

    return {
      activeClients,
      agendasToday,
      revenueMonth: Number(revenueMonth._sum.valorTotal || 0),
      pendingRevenue: Number(pendingRevenue._sum.valorTotal || 0),
      // @ts-ignore
      totalVolume: Number(totalVolume._sum.volumePiscina || 0),
      openTickets,
      tickets,
      agendas,
      chartData: [],
      dataVendas: [],
      dataDistribuicao: []
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return { activeClients: 0, agendasToday: 0, revenueMonth: 0, openTickets: 0, chartData: [], dataVendas: [], dataDistribuicao: [] };
  }
}

export async function getClientes() {
  try {
    await checkAdmin();
    return await prisma.cliente.findMany({
      orderBy: { createdAt: 'desc' },
      include: { agendas: { orderBy: { data: 'desc' }, take: 1 } }
    });
  } catch (error) {
    return [];
  }
}

export async function getAgendas() {
  try {
    await checkAdmin();
    return await prisma.agenda.findMany({ orderBy: { data: 'asc' }, include: { cliente: true } });
  } catch (error) {
    return [];
  }
}

export async function getPatrimonios() {
  try {
    await checkAdmin();
    return await prisma.patrimonio.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    return [];
  }
}

export async function createAgendamento(data: any) {
  try {
    await checkAdmin();
    const agendamento = await prisma.agenda.create({
      data: {
        clienteId: data.clienteId,
        servico: data.servico,
        data: new Date(data.data),
        valorTotal: data.valorTotal ? parseFloat(data.valorTotal) : 0,
        pagamentoStatus: data.pagamentoStatus || "pendente",
        status: "Pendente"
      }
    });
    return { success: true, agendamento };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateAgendamento(id: string, data: any) {
  try {
    await checkAdmin();
    const updated = await prisma.agenda.update({
      where: { id },
      data: {
        servico: data.servico,
        data: new Date(data.data),
        valorTotal: data.valorTotal ? parseFloat(data.valorTotal) : 0,
      }
    });
    return { success: true, agendamento: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateAgendaStatus(id: string, status: string, pagamentoStatus?: string) {
  try {
    await checkAdmin();
    const updated = await prisma.agenda.update({
      where: { id },
      data: {
        status,
        ...(pagamentoStatus && { pagamentoStatus })
      }
    });
    return { success: true, agenda: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getTickets() {
  try {
    await checkAdmin();
    return await prisma.ticket.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        cliente: true,
        _count: { select: { mensagens: true } }
      }
    });
  } catch (error) {
    return [];
  }
}

export async function getTicketDetails(ticketId: string) {
  try {
    await checkAdmin();
    return await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        cliente: true,
        mensagens: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });
  } catch (error) {
    return null;
  }
}

export async function sendAdminMessage(ticketId: string, texto: string) {
  try {
    await checkAdmin();
    const mensagem = await prisma.mensagemChat.create({
      data: {
        ticketId,
        texto,
        sender: "Admin"
      }
    });

    // Atualiza o timestamp do ticket para ele subir na lista
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { updatedAt: new Date() }
    });

    return { success: true, mensagem };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateTicketStatus(ticketId: string, status: string) {
  try {
    await checkAdmin();
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status }
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createMedicao(clienteId: string, data: any) {
  try {
    await checkAdmin();
    const medicao = await prisma.medicao.create({
      data: {
        clienteId,
        ph: parseFloat(data.ph),
        cloro: parseFloat(data.cloro),
        alcalinidade: parseFloat(data.alcalinidade),
        temperatura: parseFloat(data.temperatura),
        data: new Date()
      }
    });
    return { success: true, medicao };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCliente(id: string, data: any) {
  try {
    await checkAdmin();
    const cleanData = sanitizeObject(data);

    // Converte volumePiscina para número de forma segura
    let volumeParsed = undefined;
    if (cleanData.volumePiscina !== undefined && cleanData.volumePiscina !== "" && cleanData.volumePiscina !== null) {
      volumeParsed = parseFloat(cleanData.volumePiscina.toString().replace(',', '.'));
      if (isNaN(volumeParsed)) volumeParsed = undefined;
    }

    const updated = await prisma.cliente.update({
      where: { id },
      data: {
        nome: cleanData.nome,
        email: cleanData.email,
        telefone: cleanData.telefone,
        documento: cleanData.documento,
        endereco: cleanData.endereco,
        // @ts-ignore
        tipoPiscina: cleanData.tipoPiscina,
        // @ts-ignore
        volumePiscina: volumeParsed,
        frequenciaManutencao: cleanData.frequenciaManutencao,
        diaPreferencial: cleanData.diaPreferencial,
        observacoes: cleanData.observacoes,
      }
    });

    return { success: true, cliente: updated };
  } catch (error: any) {
    console.error("Erro ao atualizar cliente:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteCliente(id: string) {
  try {
    await checkAdmin();

    // Deleta em cascata manualmente se as relações não estiverem configuradas no schema
    // Mas aqui vamos assumir que o banco cuida disso ou que o usuário confirmou.
    // Primeiro deletamos o usuário vinculado para evitar órfãos
    await prisma.user.deleteMany({ where: { clienteId: id } });
    await prisma.agenda.deleteMany({ where: { clienteId: id } });
    await prisma.medicao.deleteMany({ where: { clienteId: id } });
    await prisma.equipamento.deleteMany({ where: { clienteId: id } });

    await prisma.cliente.delete({ where: { id } });

    return { success: true };
  } catch (error: any) {
    console.error("Erro ao deletar cliente:", error);
    return { success: false, error: error.message };
  }
}
