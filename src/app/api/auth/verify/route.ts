import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token não fornecido' },
        { status: 400 }
      );
    }

    // Verificar token
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'starling_rpg_secret_key_2024'
    ) as any;

    return NextResponse.json({
      success: true,
      user: {
        userId: decoded.userId,
        nick: decoded.nick,
        admin: decoded.admin,
        vip: decoded.vip,
        socio: decoded.socio
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Token inválido' },
      { status: 401 }
    );
  }
}
