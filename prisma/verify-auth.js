const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const p = new PrismaClient();

async function main() {
  // Get the actual hash from DB and test it
  const admin = await p.user.findUnique({ where: { email: 'admin@evolution.com.br' } });
  if (!admin) { console.log("Admin not found!"); return; }
  
  console.log("Admin found:", admin.email, admin.role);
  console.log("Hash:", admin.password);
  
  const testCases = ["admin", "Admin", "ADMIN", "admin@evolution.com.br"];
  for (const pw of testCases) {
    const match = await bcrypt.compare(pw, admin.password);
    console.log(`  "${pw}" matches: ${match}`);
  }

  // Also test client
  const client = await p.user.findUnique({ where: { email: 'inicial@evolution.com.br' } });
  if (client) {
    console.log("\nClient found:", client.email, client.role);
    const pinMatch = await bcrypt.compare("807522", client.password);
    console.log(`  PIN "807522" matches: ${pinMatch}`);
  }
}

main().catch(console.error).finally(() => p.$disconnect());
