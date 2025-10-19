import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, updateLastLogin } from '@/lib/database';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { nick, password } = await request.json();

    // Validação básica
    if (!nick || !password) {
      return NextResponse.json(
        { error: 'Nick e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar credenciais
    const user = await verifyPassword(nick, password);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Nick ou senha incorretos' },
        { status: 401 }
      );
    }

    // Atualizar último login
    await updateLastLogin(user.ID);

    // Criar token JWT
    const token = jwt.sign(
      { 
        userId: user.ID, 
        nick: user.Nick,
        admin: user.Admin || 0,
        vip: user.VIP || 0,
        socio: user.Socio || 0,
        skin: user.Skin || 0
      },
      process.env.JWT_SECRET || 'starling_rpg_secret_key_2024',
      { expiresIn: '24h' }
    );

    // Retornar dados do usuário (sem senha)
    const userData = {
      id: user.ID,
      nick: user.Nick,
      moedas: user.Moedas || 0,
      dinheiro: user.Dinheiro || 0,
      level: user.Level || 2,
      admin: user.Admin || 0,
      vip: user.VIP || 0,
      socio: user.Socio || 0,
      skin: user.Skin || 0,
      lastLogin: user.LastLogin || 0,
      since: user.Since || 0
    };

    console.log('🔍 Dados do usuário retornados:', userData);

    return NextResponse.json({
      success: true,
      user: userData,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
