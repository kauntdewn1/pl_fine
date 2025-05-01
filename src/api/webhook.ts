import { supabase } from '../lib/supabase';
import { checkRateLimit } from '../lib/rateLimit';

export async function POST(request: Request) {
  try {
    // Verificar rate limit
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Muitas requisições. Tente novamente mais tarde.' }), 
        { status: 429 }
      );
    }

    const payload = await request.json();
    
    // Validar payload
    if (!payload || typeof payload !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Payload inválido' }), 
        { status: 400 }
      );
    }
    
    // Verificar se é uma venda válida
    if (payload.event === 'sale' && payload.product_id) {
      const { email, product_id, price } = payload;
      
      // Validar campos obrigatórios
      if (!email || !product_id || !price) {
        return new Response(
          JSON.stringify({ error: 'Campos obrigatórios faltando' }), 
          { status: 400 }
        );
      }
      
      // Determinar o plano com base no product_id
      const plano = product_id === 'basiquinha' ? 'basico' : 'vip';
      
      // Registrar no Supabase
      const { error } = await supabase
        .from('clientes_vip')
        .insert([
          {
            email,
            plano,
            status: 'pago',
            preco: price,
            data_compra: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Erro ao registrar venda:', error);
        return new Response(
          JSON.stringify({ 
            error: 'Erro ao registrar venda',
            details: error.message 
          }), 
          { status: 500 }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true,
          message: 'Venda registrada com sucesso'
        }), 
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Evento inválido' }), 
      { status: 400 }
    );
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erro ao processar webhook',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      }), 
      { status: 500 }
    );
  }
} 