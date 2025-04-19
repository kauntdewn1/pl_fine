import { supabase } from '../lib/supabase';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Verificar se é uma venda válida
    if (payload.event === 'sale' && payload.product_id) {
      const { email, product_id, price } = payload;
      
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
        return new Response(JSON.stringify({ error: 'Erro ao registrar venda' }), { status: 500 });
      }

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: 'Evento inválido' }), { status: 400 });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return new Response(JSON.stringify({ error: 'Erro ao processar webhook' }), { status: 500 });
  }
} 