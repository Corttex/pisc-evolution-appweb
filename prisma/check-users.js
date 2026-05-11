const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

p.user.findMany({
  select: { id: true, email: true, role: true, clienteId: true, password: true }
}).then(users => {
  console.log("=== USUÁRIOS NO BANCO ===");
  users.forEach(u => {
    console.log(`ID: ${u.id} | Email: ${u.email} | Role: ${u.role} | Hash: ${u.password?.slice(0,20)}...`);
  });
  if (users.length === 0) console.log("Nenhum usuário encontrado!");
}).catch(e => console.error("Erro:", e.message)).finally(() => p.$disconnect());
