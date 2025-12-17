// app/api/chat/route.ts
import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt específico para RETESP
const SYSTEM_PROMPT = `Você é o assistente especializado da plataforma RETESP - Smart Seal Platform.
Seu papel é ajudar usuários com:

**TÓPICOS DA RETESP:**
1. Monitoramento de selos industriais (retentores)
2. Análise de vibração, temperatura e pressão
3. Configuração de alertas e notificações
4. Geração de relatórios e análises preditivas
5. Operação da dashboard e configurações do sistema
6. Solução de problemas técnicos com sensores IoT

**INFORMAÇÕES DA PLATAFORMA:**
- Nome: RETESP Smart Seal Platform
- Versão: 2.5.1
- Funcionalidades: Dashboard, Monitoramento, Selos, Alertas, Analytics, Configurações
- Suporte: suporte@retesp.com

**DIRETRIZES:**
- Seja profissional e técnico, mas acessível
- Forneça respostas específicas e práticas
- Se não souber algo sobre RETESP, sugira contatar o suporte
- Mantenha respostas concisas mas completas
- Use exemplos quando apropriado

**NÃO responda sobre:**
- Outros sistemas que não sejam RETESP
- Temas não relacionados a monitoramento industrial
- Configurações específicas de outros produtos`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, temperature = 0.7 } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Format messages for OpenAI
    const formattedMessages: ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      } as ChatCompletionMessageParam)),
    ];

    const completion = await openai.chat.completions.create({
      model: process.env.NEXT_PUBLIC_OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: formattedMessages,
      temperature,
      max_tokens: 1000,
      stream: false,
    });

    const response = completion.choices[0]?.message?.content || 'Desculpe, não consegui gerar uma resposta.';

    return NextResponse.json({ response });

  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    
    // Error handling específico
    if (error?.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'Cota da API excedida. Por favor, verifique seu plano OpenAI.' },
        { status: 429 }
      );
    }
    
    if (error?.code === 'invalid_api_key') {
      return NextResponse.json(
        { error: 'Chave de API inválida. Configure OPENAI_API_KEY no .env.local' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao processar sua solicitação' },
      { status: 500 }
    );
  }
}