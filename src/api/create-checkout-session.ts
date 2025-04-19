import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function POST(request: Request) {
  try {
    const { plan, email, userId } = await request.json();

    if (!plan || !email || !userId) {
      return new Response(
        JSON.stringify({ error: 'Dados inválidos' }),
        { status: 400 }
      );
    }

    // Preços dos planos
    const prices = {
      basico: 'price_123', // Substitua pelos IDs reais dos preços no Stripe
      premium: 'price_456',
      vip: 'price_789',
    };

    const priceId = prices[plan as keyof typeof prices];
    if (!priceId) {
      return new Response(
        JSON.stringify({ error: 'Plano inválido' }),
        { status: 400 }
      );
    }

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${import.meta.env.VITE_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${import.meta.env.VITE_APP_URL}/planos`,
      customer_email: email,
      metadata: {
        userId,
        plan,
      },
    });

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return new Response(
      JSON.stringify({ error: 'Erro ao processar pagamento' }),
      { status: 500 }
    );
  }
} 