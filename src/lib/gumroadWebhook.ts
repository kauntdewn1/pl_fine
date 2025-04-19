import { saveClient } from './supabase';

export async function handleGumroadWebhook(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { email, product_name } = body;

    if (!email || !product_name) {
      return new Response('Missing required fields', { status: 400 });
    }

    const plano = product_name.includes('VIP') ? 'vip' : 'basiquinha';

    await saveClient({
      email,
      plano
    });

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 