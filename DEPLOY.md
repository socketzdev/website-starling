# 🚀 Guia de Deploy - Starling RPG Website

## 📋 Pré-requisitos

### 🔧 Servidor/Plataforma
- **Node.js** 18+ 
- **MySQL** 8.0+
- **Nginx** (opcional, para proxy reverso)
- **PM2** (para gerenciamento de processos)

### 📦 Dependências
```bash
npm install -g pm2
```

## 🔑 Configuração de Variáveis de Ambiente

### 📁 Criar arquivo `.env` na raiz do projeto:

```env
# ============================================
# CONFIGURAÇÕES DE PRODUÇÃO - STARLING RPG
# ============================================

# Database MySQL
DATABASE_URL="mysql://username:password@localhost:3306/starling_rpg"
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="starling_rpg"
DB_USER="your_username"
DB_PASSWORD="your_password"

# Next.js Configuration
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
NODE_ENV="production"

# API Configuration
API_BASE_URL="https://your-domain.com/api"
GEMINI_API_KEY="your-gemini-api-key-here"

# SA:MP Server Configuration
SAMP_SERVER_IP="your-samp-server-ip.com"
SAMP_SERVER_PORT="7777"
SAMP_SERVER_HOSTNAME="Starling RPG"

# Security
JWT_SECRET="your-jwt-secret-key-here"
ENCRYPTION_KEY="your-encryption-key-here"

# Payment Gateway (opcional)
STRIPE_PUBLIC_KEY="pk_live_your_stripe_public_key"
STRIPE_SECRET_KEY="sk_live_your_stripe_secret_key"

# Email Configuration (opcional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="noreply@your-domain.com"

# Discord Integration (opcional)
DISCORD_BOT_TOKEN="your-discord-bot-token"
DISCORD_GUILD_ID="your-discord-guild-id"
DISCORD_WEBHOOK_URL="your-discord-webhook-url"

# Analytics (opcional)
GOOGLE_ANALYTICS_ID="GA-XXXXXXXXX"
GOOGLE_TAG_MANAGER_ID="GTM-XXXXXXX"

# CDN/Storage (opcional)
CDN_URL="https://cdn.your-domain.com"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-s3-bucket"

# Cache Configuration
REDIS_URL="redis://localhost:6379"
CACHE_TTL="3600"

# Rate Limiting
RATE_LIMIT_WINDOW="900000"
RATE_LIMIT_MAX="100"

# Logging
LOG_LEVEL="info"
LOG_FILE="/var/log/starling-rpg.log"
```

## 🛠️ Comandos de Deploy

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Build do Projeto
```bash
npm run build
```

### 3️⃣ Iniciar em Produção
```bash
npm start
```

### 4️⃣ Com PM2 (Recomendado)
```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar aplicação com PM2
pm2 start npm --name "starling-rpg" -- start

# Salvar configuração do PM2
pm2 save

# Configurar PM2 para iniciar no boot
pm2 startup
```

## 🌐 Configuração de Domínio

### 📝 Configurações Importantes no `.env`:

#### 🔗 URLs de Produção
```env
NEXTAUTH_URL="https://your-domain.com"
API_BASE_URL="https://your-domain.com/api"
```

#### 🔐 Chaves de Segurança
```env
NEXTAUTH_SECRET="sua-chave-super-secreta-aqui"
JWT_SECRET="sua-chave-jwt-secreta-aqui"
```

#### 🗄️ Banco de Dados
```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/starling_rpg"
```

## 🐳 Deploy com Docker (Opcional)

### 📄 Criar `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 🚀 Comandos Docker:
```bash
# Build da imagem
docker build -t starling-rpg .

# Executar container
docker run -p 3000:3000 --env-file .env starling-rpg
```

## 🔧 Configuração do Nginx (Opcional)

### 📄 Configuração `/etc/nginx/sites-available/starling-rpg`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Monitoramento

### 📈 Comandos PM2:
```bash
# Ver status das aplicações
pm2 status

# Ver logs em tempo real
pm2 logs starling-rpg

# Reiniciar aplicação
pm2 restart starling-rpg

# Parar aplicação
pm2 stop starling-rpg

# Monitorar recursos
pm2 monit
```

## 🔍 Verificação de Deploy

### ✅ Checklist de Verificação:
- [ ] Variáveis de ambiente configuradas
- [ ] Build executado com sucesso
- [ ] Banco de dados conectado
- [ ] APIs funcionando
- [ ] Autenticação funcionando
- [ ] Loja funcionando
- [ ] Chat IA funcionando
- [ ] SSL/HTTPS configurado
- [ ] Domínio apontando corretamente

### 🌐 Testes de Funcionalidade:
1. **Home**: `https://your-domain.com`
2. **Loja**: `https://your-domain.com/loja`
3. **Notícias**: `https://your-domain.com/noticias`
4. **API Health**: `https://your-domain.com/api/health`

## 🚨 Troubleshooting

### ❌ Problemas Comuns:

#### Build Error:
```bash
# Limpar cache e reinstalar
rm -rf .next node_modules
npm install
npm run build
```

#### Database Connection Error:
- Verificar credenciais no `.env`
- Verificar se MySQL está rodando
- Verificar firewall/portas

#### PM2 Issues:
```bash
# Reiniciar PM2
pm2 kill
pm2 start npm --name "starling-rpg" -- start
```

## 📞 Suporte

Para problemas específicos, verificar:
1. **Logs da aplicação**: `pm2 logs starling-rpg`
2. **Logs do sistema**: `journalctl -u nginx`
3. **Status dos serviços**: `systemctl status mysql nginx`

---

**🎉 Parabéns! Seu website Starling RPG está online!**
