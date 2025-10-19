import mysql from 'mysql2/promise';

// Configuração da database
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'starling_rpg',
  port: parseInt(process.env.DB_PORT || '3306'),
  charset: 'utf8mb4',
  timezone: '+00:00'
};

// Pool de conexões
let pool: mysql.Pool | null = null;

export function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

// Função para executar queries
export async function executeQuery(query: string, params: any[] = []) {
  const connection = getConnection();
  try {
    const [rows] = await connection.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

// Função para buscar usuário por nick
export async function getUserByNick(nick: string) {
  const query = 'SELECT * FROM players WHERE Nick = ? LIMIT 1';
  const results = await executeQuery(query, [nick]) as any[];
  return results[0] || null;
}

// Função para verificar senha com bcrypt
export async function verifyPassword(nick: string, password: string) {
  const user = await getUserByNick(nick);
  if (!user) return null;
  
  // Verificar se a senha está em bcrypt
  const bcrypt = require('bcryptjs');
  
  try {
    const isValid = await bcrypt.compare(password, user.Senha);
    if (isValid) {
      return user;
    }
  } catch (error) {
    console.error('Erro ao verificar senha bcrypt:', error);
  }
  
  // Fallback: verificar se é texto simples (para testes)
  if (user.Senha === password) {
    return user;
  }
  
  return null;
}

// Função para atualizar último login
export async function updateLastLogin(userId: number) {
  const query = 'UPDATE players SET LastLogin = ? WHERE ID = ?';
  await executeQuery(query, [Math.floor(Date.now() / 1000), userId]);
}

export default getConnection;
