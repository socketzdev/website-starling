# Starling RPG - SA:MP Server Website

Website moderno para o servidor Starling RPG do San Andreas Multiplayer.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones modernos
- **ESLint** - Linting de código

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── layout/           # Componentes de layout
│   │   ├── Header.tsx    # Cabeçalho
│   │   └── Footer.tsx    # Rodapé
│   └── ui/               # Componentes de interface
│       ├── Button.tsx    # Botão customizado
│       └── Card.tsx      # Card customizado
├── types/                # Definições TypeScript
│   └── index.ts          # Tipos principais
└── utils/                # Utilitários
    └── cn.ts             # Utilitário para classes CSS
```

## 🎨 Tema

- **Cor Principal**: Vermelho (Starling)
- **Paleta de Cores**: 
  - Starling: 50-900 (tons de vermelho)
  - Dark: 50-900 (tons de cinza/escuro)
- **Tipografia**: Inter (sans-serif)

## 🛠️ Comandos

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start

# Linting
npm run lint
```

## 📝 Próximos Passos

- [ ] Implementar landing page completa
- [ ] Integrar sistema de loja
- [ ] Adicionar sistema de autenticação
- [ ] Implementar dashboard administrativo
- [ ] Adicionar sistema de notícias
- [ ] Integrar com API do servidor SA:MP

## 🎯 Funcionalidades Planejadas

### Landing Page
- Hero section com call-to-action
- Seção de recursos do servidor
- Informações do servidor (IP, porta, etc.)
- Galeria de imagens
- Seção de depoimentos

### Loja
- Catálogo de produtos
- Sistema de carrinho
- Processamento de pagamento
- Histórico de compras

### Área do Usuário
- Login/Registro
- Dashboard pessoal
- Estatísticas do jogador
- Histórico de atividades

## 📞 Contato

- **Discord**: [Link do Discord]
- **Instagram**: [@starlingrpg]
- **Website**: [starling-rpg.com]
