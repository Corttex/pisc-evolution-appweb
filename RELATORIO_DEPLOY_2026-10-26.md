# Resumo Completo das Atividades — 26/10/2026

**Projeto:** Piscinas Evolution — Web App  
**Repositório:** [Corttex/pisc-evolution-appweb](https://github.com/Corttex/pisc-evolution-appweb)  
**Ambiente de Produção:** VPS Hetzner (`2.28.26.9`) gerenciado via **Coolify**  

---

## 1. Inicialização e Ajuste do Servidor Local
- O servidor de desenvolvimento Next.js (com Turbopack) foi inicializado com sucesso na porta **3010**:
  - `http://localhost:3010`
- Configurado tratamento para contornar lentidão de disco no ambiente de desenvolvimento local.

---

## 2. Limpeza e Reset do Repositório GitHub
- **Ajuste de Permissões:** Corrigido o erro de `dubious ownership` do Git no Windows adicionando a pasta do projeto ao `safe.directory`.
- **Reset do Histórico:** Criada uma branch limpa (`orphan`), compactando todo o projeto em um commit inicial único e seguro:
  - Commit: `95a59a3` (`Initial commit: Piscinas Evolution Web App`).
- **Sincronização de Branches:**
  - Branch principal consolidada e sincronizada como **`main`** (com cópia espelho em `master`).
  - O Coolify agora clona diretamente da branch **`main`** sem erros de branch inexistente.

---

## 3. Desacoplamento Supabase / AWS e Migração para PostgreSQL na Hetzner
- **Remoção de Legados:**
  - Excluídas do `.env` todas as chaves e URLs que apontavam para Supabase / AWS Pooler.
- **Ajuste no Prisma:**
  - Atualizado o `prisma/schema.prisma` removendo `directUrl = env("DIRECT_URL")`, padronizando para PostgreSQL direto.
  - Prisma Client regenerado com sucesso (`npx prisma generate`).
- **Configuração para Hetzner / Coolify:**
  - No Coolify, a aplicação comunica-se com o container do banco pela rede interna:
    ```env
    DATABASE_URL="postgres://postgres:GO8d33DSvIn51i8CSLzvHRoL1SshJA0vBMT8AKqOd43b6Pt0nQTE0gVEBllth4PM@vs4hipzgtxdwfu1n5fqtg46x:5432/postgres"
    ```

---

## 4. Otimizações de Performance e Core Web Vitals
1. **Resiliência de Banco de Dados no SSR:**
   - Adicionado mecanismo de corrida com *timeout* de 2.5s nas funções `getConfig()` e `getSections()`.
   - Caso o banco de dados esteja offline, demore para responder ou em fase de migração, o site entrega imediatamente o conteúdo padrão pré-renderizado sem travar a tela do usuário.
2. **Fontes Nativas com `next/font/google`:**
   - Removido o `@import url(...)` bloqueante do Google Fonts em `src/app/globals.css`.
   - Integrado `next/font/google` com as fontes `Work Sans` e `Manrope` diretamente em `src/app/layout.tsx`, com auto-hospedagem e `display: swap`.
3. **Imagens Responsivas e Compressão:**
   - Adicionado atributo `sizes` adequado em todas as imagens que utilizavam `fill` (Hero, Services, BeforeAfter, SmartMaintenance, Sustainability).
   - Habilitados formatos modernos **AVIF** e **WebP** e compressão Gzip/Brotli em `next.config.ts`.
4. **Validação de Build:**
   - Testado e aprovado com sucesso `npm run build` gerando todas as 38 rotas de forma limpa.

---

## 5. Criação da Arquitetura Docker Standalone
- Criado `Dockerfile` multi-stage baseado em Alpine Linux com 3 estágios (`deps` -> `builder` -> `runner`):
  - Habilitado `output: "standalone"` em `next.config.ts`.
  - Execução sob usuário seguro não-root (`nextjs:nodejs`).
  - Porta de exposição: **3000**.
  - Redução de pegada de memória e disco: imagem final com ~**150MB** e consumo de ~**80MB de RAM**.
- Criado `.dockerignore` para envio ultrarrápido do contexto no Coolify.

---

## 6. Limpeza e Otimização do Servidor Hetzner (VPS `2.28.26.9`)
- Acesso remoto executado via SSH para manutenção de disco:
  - **Espaço liberado:** **9.86 GB** de imagens órfãs, containers e caches acumulados do Docker.
  - **Uso de disco do servidor (`/dev/sda1`):**
    - **Antes da limpeza:** 34 GB usados (96% ocupado, restavam 1.7 GB).
    - **Após a limpeza:** 26 GB usados (**71% ocupado**, com **11 GB livres**).

---

## 7. Diagnóstico do Certificado SSL
- Identificado o motivo do alerta exibido no navegador (`Emitido por: FortiGate CA`):
  - A conexão local passa por um firewall empresarial **Fortinet FortiGate** que realiza inspeção profunda de pacotes SSL (*Deep Packet Inspection*).
  - O domínio público `piscinasevolution.com.br` já está apontando para os servidores da Cloudflare.
  - O SSL funciona normalmente para usuários finais e redes móveis externas (4G/5G) assim que configurado como **Full** na Cloudflare e com o domínio `https://piscinasevolution.com.br` cadastrado no Coolify.
