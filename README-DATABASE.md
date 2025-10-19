# Configuração da Database - Starling RPG

## Configuração Necessária

Para usar o sistema de login UCP, você precisa configurar as variáveis de ambiente.

### 1. Criar arquivo .env.local

Crie um arquivo `.env.local` na raiz do projeto com as seguintes configurações:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=starling_rpg
DB_PORT=3306

# JWT Secret
JWT_SECRET=starling_rpg_secret_key_2024

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=starling_rpg_nextauth_secret_2024
```

### 2. Configurar Database MySQL

1. Importe o arquivo `database - 15.10.sql` no seu MySQL
2. Certifique-se de que a database está rodando na porta 3306
3. Verifique se as credenciais estão corretas

### 3. Estrutura da Tabela Players

O sistema utiliza a tabela `players` com os seguintes campos principais:

- `ID` - ID único do jogador
- `Nick` - Nome do jogador
- `Senha` - Senha criptografada (MD5)
- `Moedas` - Moedas VIP do jogador
- `Dinheiro` - Dinheiro em mãos
- `Admin` - Nível de admin
- `VIP` - Status VIP
- `Socio` - Status de sócio

### 4. Sistema de Autenticação

- **Login**: Verifica nick e senha contra a database
- **Sessão**: Utiliza JWT para manter sessão ativa
- **Validação**: Senhas são verificadas em MD5
- **Segurança**: Tokens expiram em 24 horas

### 5. Funcionalidades

✅ **Login UCP** - Sistema completo de autenticação
✅ **Verificação de Senha** - Compatível com MD5 da database
✅ **Sessão Persistente** - Login mantido entre páginas
✅ **Dados do Usuário** - Exibe informações do jogador
✅ **Proteção de Compras** - Apenas usuários logados podem comprar
✅ **Logout Seguro** - Limpeza completa da sessão

### 6. Como Usar

1. Configure as variáveis de ambiente
2. Inicie o servidor: `npm run dev`
3. Acesse a loja: `http://localhost:3000/loja`
4. Clique em "Entrar" no header
5. Use suas credenciais do servidor SA:MP
6. Faça suas compras!

### 7. Troubleshooting

**Erro de Conexão:**
- Verifique se o MySQL está rodando
- Confirme as credenciais no .env.local
- Teste a conexão manualmente

**Erro de Login:**
- Verifique se o nick existe na database
- Confirme se a senha está correta
- Verifique se a senha está em MD5

**Erro de Token:**
- Verifique se JWT_SECRET está configurado
- Limpe o localStorage do navegador
- Reinicie o servidor
