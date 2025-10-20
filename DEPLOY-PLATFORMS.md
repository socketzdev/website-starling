# 🌐 Deploy em Diferentes Plataformas

## 🚀 Vercel (Recomendado para Next.js)

### 📋 Configuração:
1. **Instalar Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel --prod
```

### 🔧 Variáveis de Ambiente no Vercel:
- Acesse o dashboard do Vercel
- Vá em Settings > Environment Variables
- Adicione todas as variáveis do `.env`

### ✅ Vantagens:
- Deploy automático com Git
- CDN global
- SSL automático
- Preview deployments

---

## 🐳 Docker + VPS

### 📄 Dockerfile:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Expor porta
EXPOSE 3000

# Comando de start
CMD ["npm", "start"]
```

### 🚀 Comandos:
```bash
# Build da imagem
docker build -t starling-rpg .

# Executar container
docker run -d \
  --name starling-rpg \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  starling-rpg
```

---

## ☁️ DigitalOcean App Platform

### 📋 Configuração:
1. **Criar app no DigitalOcean**
2. **Conectar repositório GitHub**
3. **Configurar variáveis de ambiente**
4. **Deploy automático**

### 🔧 Configuração do App Spec:
```yaml
name: starling-rpg
services:
- name: web
  source_dir: /
  github:
    repo: socketzdev/website-starling
    branch: master
  run_command: npm start
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URL
    value: ${db.DATABASE_URL}
databases:
- name: db
  engine: MYSQL
  version: "8"
```

---

## 🔥 Firebase Hosting

### 📋 Configuração:
1. **Instalar Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Login**:
```bash
firebase login
```

3. **Inicializar**:
```bash
firebase init hosting
```

4. **Deploy**:
```bash
npm run build
firebase deploy
```

---

## 🌊 Railway

### 📋 Configuração:
1. **Conectar GitHub** ao Railway
2. **Configurar variáveis de ambiente**
3. **Deploy automático**

### 🔧 Railway.toml:
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm start"
healthcheckPath = "/api/health"
healthcheckTimeout = 300
restartPolicyType = "on_failure"
```

---

## 🐙 Heroku

### 📋 Configuração:
1. **Instalar Heroku CLI**
2. **Login**:
```bash
heroku login
```

3. **Criar app**:
```bash
heroku create starling-rpg
```

4. **Configurar variáveis**:
```bash
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=your_database_url
```

5. **Deploy**:
```bash
git push heroku master
```

### 📄 Procfile:
```
web: npm start
```

---

## 🏗️ AWS EC2 + PM2

### 📋 Configuração Manual:

1. **Conectar ao servidor**:
```bash
ssh -i your-key.pem ubuntu@your-server-ip
```

2. **Instalar dependências**:
```bash
sudo apt update
sudo apt install nodejs npm nginx mysql-server
```

3. **Clonar repositório**:
```bash
git clone https://github.com/socketzdev/website-starling.git
cd website-starling
```

4. **Configurar banco**:
```bash
sudo mysql -u root -p
CREATE DATABASE starling_rpg;
CREATE USER 'starling_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON starling_rpg.* TO 'starling_user'@'localhost';
```

5. **Deploy**:
```bash
npm install
npm run build
pm2 start ecosystem.config.js
```

---

## 🔧 Configurações Específicas por Plataforma

### 🌐 Domínio Personalizado:
```env
NEXTAUTH_URL="https://your-domain.com"
API_BASE_URL="https://your-domain.com/api"
```

### 🔐 SSL/HTTPS:
- **Vercel**: Automático
- **DigitalOcean**: Automático
- **Railway**: Automático
- **Heroku**: Automático
- **VPS**: Configurar Nginx + Let's Encrypt

### 📊 Monitoramento:
- **PM2**: `pm2 monit`
- **Vercel**: Dashboard
- **DigitalOcean**: Metrics
- **Railway**: Logs
- **Heroku**: Heroku logs

---

## 🎯 Recomendações por Uso

### 🚀 Para Desenvolvimento/Teste:
- **Vercel** (gratuito, fácil)
- **Railway** (gratuito, simples)

### 💼 Para Produção Pequena:
- **DigitalOcean App Platform**
- **Vercel Pro**

### 🏢 Para Produção Grande:
- **AWS EC2 + PM2**
- **DigitalOcean Droplets**
- **Google Cloud Run**

### 💰 Para Orçamento Limitado:
- **Vercel** (plano gratuito)
- **Railway** (plano gratuito)
- **Heroku** (plano gratuito)

---

## 🔍 Checklist de Deploy

### ✅ Pré-Deploy:
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados preparado
- [ ] Build local funcionando
- [ ] Testes passando

### ✅ Pós-Deploy:
- [ ] Site carregando corretamente
- [ ] Autenticação funcionando
- [ ] Loja funcionando
- [ ] Chat IA funcionando
- [ ] APIs respondendo
- [ ] SSL ativo
- [ ] Monitoramento configurado

---

**🎉 Escolha a plataforma que melhor se adapta às suas necessidades!**
