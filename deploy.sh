#!/bin/bash

# 🚀 Script de Deploy Automático - Starling RPG
# Execute: chmod +x deploy.sh && ./deploy.sh

echo "🚀 Iniciando deploy do Starling RPG..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Verificar se está na pasta correta
if [ ! -f "package.json" ]; then
    error "package.json não encontrado! Execute este script na raiz do projeto."
    exit 1
fi

# Verificar se .env existe
if [ ! -f ".env" ]; then
    warning ".env não encontrado! Criando arquivo de exemplo..."
    cp env.example .env
    warning "Configure as variáveis no arquivo .env antes de continuar!"
    exit 1
fi

log "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    error "Falha ao instalar dependências!"
    exit 1
fi

log "🔨 Executando build de produção..."
npm run build

if [ $? -ne 0 ]; then
    error "Falha no build!"
    exit 1
fi

log "✅ Build concluído com sucesso!"

# Verificar se PM2 está instalado
if command -v pm2 &> /dev/null; then
    log "🚀 Iniciando com PM2..."
    
    # Parar aplicação se estiver rodando
    pm2 stop starling-rpg 2>/dev/null
    pm2 delete starling-rpg 2>/dev/null
    
    # Iniciar nova instância
    pm2 start npm --name "starling-rpg" -- start
    
    # Salvar configuração
    pm2 save
    
    log "✅ Aplicação iniciada com PM2!"
    info "Comandos úteis:"
    info "  pm2 status          - Ver status"
    info "  pm2 logs starling-rpg - Ver logs"
    info "  pm2 restart starling-rpg - Reiniciar"
    
else
    warning "PM2 não encontrado. Iniciando com npm start..."
    log "🚀 Iniciando servidor..."
    npm start
fi

log "🎉 Deploy concluído com sucesso!"
info "🌐 Acesse: http://localhost:3000"
info "📊 Monitoramento: pm2 monit"
