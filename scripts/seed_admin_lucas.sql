-- Inserir / atualizar usuário Lucas no PostgreSQL da Hetzner / Coolify / Supabase
-- Email: bsb.playtech@gmail.com
-- Senha: @@220022 (Hash Bcrypt gerado: $2b$10$tOh/TyyMG7zogaBvwsJ2PeBWPMFi1iTlnrtEiYr9VUT6ZqKw7/xbC)
-- Role: ADMIN

-- 1. Inserir na tabela "User"
INSERT INTO "User" ("id", "name", "email", "password", "role", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'Lucas Admin',
  'bsb.playtech@gmail.com',
  '$2b$10$tOh/TyyMG7zogaBvwsJ2PeBWPMFi1iTlnrtEiYr9VUT6ZqKw7/xbC',
  'ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT ("email") DO UPDATE SET
  "name" = 'Lucas Admin',
  "password" = '$2b$10$tOh/TyyMG7zogaBvwsJ2PeBWPMFi1iTlnrtEiYr9VUT6ZqKw7/xbC',
  "role" = 'ADMIN',
  "updatedAt" = NOW();

-- 2. Inserir ou atualizar na tabela "AdminProfile"
INSERT INTO "AdminProfile" ("id", "nome", "email", "cargo", "senha", "createdAt")
VALUES (
  gen_random_uuid(),
  'Lucas Admin',
  'bsb.playtech@gmail.com',
  'Administrador',
  '@@220022',
  NOW()
)
ON CONFLICT ("id") DO NOTHING;

-- Caso já exista perfil, atualizar também:
UPDATE "AdminProfile" 
SET "email" = 'bsb.playtech@gmail.com', 
    "nome" = 'Lucas Admin', 
    "senha" = '@@220022'
WHERE "email" = 'bsb.playtech@gmail.com' OR "email" = 'admin@evolution.com';

