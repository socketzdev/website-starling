import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = 'AIzaSyCQa1D-qjlnYosB4ggdbn2uKG4CGTgFrBY';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent';

export async function POST(request: NextRequest) {
  try {
    const { message, products, userData } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Mensagem é obrigatória' }, { status: 400 });
    }

    // Criar prompt especializado para assistência de compras
    const systemPrompt = `Você é um assistente virtual especializado da Starling Store, um servidor de RPG online. Sua função é ajudar os usuários com compras, recomendações de produtos e dúvidas sobre o servidor.

INFORMAÇÕES SOBRE OS PRODUTOS DISPONÍVEIS:
${JSON.stringify(products, null, 2)}

${userData ? `
DADOS COMPLETOS DO USUÁRIO LOGADO:
- Nome: ${userData.nick}
- ID: ${userData.id}
- Level: ${userData.level}
- Moedas: ${userData.moedas.toLocaleString()}
- Dinheiro: $${userData.dinheiro.toLocaleString()}
- VIP: ${userData.vip > 0 ? 'SIM (Level ' + userData.vip + ')' : 'NÃO'}
- Sócio: ${userData.socio > 0 ? 'SIM (Level ' + userData.socio + ')' : 'NÃO'}
- Admin: ${userData.admin > 0 ? 'SIM (Level ' + userData.admin + ')' : 'NÃO'}
- Skin ID: ${userData.skin}
- Último Login: ${new Date(userData.lastLogin * 1000).toLocaleDateString('pt-BR')}
- Membro desde: ${new Date(userData.since * 1000).toLocaleDateString('pt-BR')}
- Dias no servidor: ${Math.floor((Date.now() - userData.since * 1000) / (1000 * 60 * 60 * 24))}

Use essas informações para personalizar suas respostas e recomendações!
` : 'Usuário não está logado. Recomende fazer login para uma experiência personalizada.'}

EQUIPE STARLING RPG - GESTÃO:
- Responsável Geral: WeskerSTG (Fundador/Diretor)
- Programador Principal: BenuSTG (Desenvolvedor do Servidor)
- Programador Web: Kernel (Desenvolvedor do Website)
- Responsável Administração: PowdSTG (Administrador Geral)
- Responsável Helper: VexySTG (Diretor de Suporte)
- Responsável Eventos: [A definir]

INFORMAÇÕES IMPORTANTES:
- BenuSTG é o programador principal do servidor
- Kernel é responsável pelo desenvolvimento do website
- VexySTG é diretor e responsável pela área de helpers/suporte
- WeskerSTG é o fundador e responsável geral do projeto

DIRETRIZES CRÍTICAS:
1. MANTENHA RESPOSTAS MUITO CURTAS - máximo 100 palavras
2. Seja direto, objetivo e útil
3. Use linguagem gamer casual mas respeitosa
4. SEMPRE inclua preços quando mencionar produtos
5. PERSONALIZE baseado nos dados do usuário
6. Para equipe: mencione cargos corretos (BenuSTG = programador, VexySTG = diretor)
7. Use 1-2 emojis máximo por resposta
8. Seja específico sobre benefícios de VIP/Sócio
9. Para dúvidas técnicas, direcione para a equipe apropriada
10. SEMPRE termine com uma pergunta ou oferta de ajuda

EXEMPLOS DE RESPOSTAS CURTAS:
- "VIP Premium: R$ 15,00. Comandos exclusivos + prioridade! Quer saber mais? 🎮"
- "Com suas ${userData?.moedas || 'X'} moedas, recomendo 25KM por R$ 12,50! 💰"
- "Como VIP Level ${userData?.vip || 'X'}, o Sócio Starling te daria ainda mais benefícios! ⭐"
- "Para bugs, contate BenuSTG (programador). Para suporte, VexySTG (diretor)! 🔧"
- "Você tem ${userData?.moedas || 'X'} moedas há ${userData?.since ? Math.floor((Date.now() - userData.since * 1000) / (1000 * 60 * 60 * 24)) : 'X'} dias! Que tal investir? 💎"

Responda à pergunta do usuário de forma útil e envolvente:`;

    const requestBody = {
      contents: [{
        parts: [{
          text: `${systemPrompt}\n\nUsuário: ${message}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 300,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    console.log('Enviando requisição para Gemini API:', GEMINI_API_URL);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Resposta da API Gemini:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na API do Gemini:', response.status, response.statusText, errorText);
      return NextResponse.json({ 
        error: `Erro ao processar sua mensagem (${response.status}). Tente novamente.` 
      }, { status: 500 });
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Resposta inválida do Gemini:', data);
      return NextResponse.json({ 
        error: 'Resposta inválida do assistente. Tente novamente.' 
      }, { status: 500 });
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ 
      response: aiResponse,
      success: true 
    });

  } catch (error) {
    console.error('Erro no chat Gemini:', error);
    return NextResponse.json({ 
      error: 'Erro interno do servidor. Tente novamente.' 
    }, { status: 500 });
  }
}
