import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Testando conexão com o Supabase (PostgreSQL)...')
    const start = Date.now()
    // Tenta fazer uma query super rápida
    const result = await prisma.$queryRaw`SELECT 1 as result`
    const duration = Date.now() - start
    console.log('Conexão bem sucedida!', result)
    console.log(`Latência: ${duration}ms`)
  } catch (error) {
    console.error('Erro na conexão com o banco de dados:')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
