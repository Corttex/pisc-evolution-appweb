# Guia de Deploy CPanel — Piscinas Evolution

Este guia explica como colocar seu site e sistema de gestão no ar usando o CPanel.

## 1. Banco de Dados (Configuração)

Para este projeto Next.js, você tem duas opções principais:

### Opção A: Supabase (Recomendado)
1. Crie uma conta em [supabase.com](https://supabase.com).
2. Crie um novo projeto e copie a `DATABASE_URL` em **Project Settings > Database**.
3. Adicione esta URL ao seu arquivo `.env` no CPanel.
4. **Vantagem:** Conexão estável e rápida sem configurar drivers MySQL no servidor.

### Opção B: MySQL do CPanel
1. No CPanel, vá em **MySQL® Databases**.
2. Crie um banco (ex: `evolution_db`) e um usuário com todos os privilégios.
3. Copie as credenciais e use no seu código via `Prisma` ou `mysql2`.
4. No CPanel, certifique-se de que o IP do servidor está autorizado no **Remote MySQL** se for conectar localmente para testar.

---

## 2. Passo a Passo do Deploy

### Passo 1: Preparação Local
Antes de subir, gere o build de produção no seu computador:
```bash
npm run build
```

### Passo 2: Upload de Arquivos
Suba os seguintes arquivos para a pasta do seu domínio no CPanel (via Gerenciador de Arquivos ou FTP):
- `.next/` (Pasta oculta gerada pelo build)
- `public/`
- `package.json`
- `package-lock.json`
- `server.js` (O arquivo que criei para você)
- `next.config.ts`
- `.env` (Contendo suas chaves do Asaas e DB)

**⚠️ IMPORTANTE:** NÃO suba a pasta `node_modules`.

### Passo 3: Configuração no CPanel (Node.js Selector)
1. Vá em **Setup Node.js App** no CPanel.
2. Clique em **Create Application**.
3. **Node.js Version:** Selecione 20.x ou superior.
4. **Application Mode:** Production.
5. **Application Root:** Caminho onde subiu os arquivos (ex: `public_html/app`).
6. **Application URL:** Seu domínio (piscinasevolution.com.br).
7. **Application startup file:** Digite `server.js`.
8. Clique em **Save**.

### Passo 4: Instalação de Dependências
Após salvar, clique no botão **Run NPM Install** dentro do painel do Node.js no CPanel. Isso vai baixar as bibliotecas diretamente no servidor.

### Passo 5: Reiniciar
Clique em **Restart Application**. Seu site deve estar no ar!

---

## 3. Configurando a API do Asaas
1. Acesse o seu novo site em `/admin/financeiro/config`.
2. Insira a sua API Key do Asaas.
3. Salve e teste o agendamento no portal do cliente `/acompanhar`.
