import { handleWebhook } from './webhook';
import { checkRateLimit } from '../lib/rateLimit';

export const routes = {
  '/api/webhook': {
    POST: async (request: Request) => {
      try {
        // Verificar rate limit
        const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
        if (!checkRateLimit(clientIP)) {
          return new Response(
            JSON.stringify({ error: 'Muitas requisições. Tente novamente mais tarde.' }),
            { status: 429 },
          );
        }

        // Verificar assinatura do webhook
        const signature = request.headers.get('x-openpix-signature');
        if (!signature || signature !== process.env.VITE_OPENPIX_WEBHOOK_SECRET) {
          return new Response(JSON.stringify({ error: 'Assinatura inválida' }), { status: 401 });
        }

        const payload = await request.json();

        // Validar payload
        if (!payload || typeof payload !== 'object') {
          return new Response(JSON.stringify({ error: 'Payload inválido' }), { status: 400 });
        }

        const result = await handleWebhook(payload);

        return new Response(JSON.stringify(result), { status: result.success ? 200 : 400 });
      } catch (error) {
        console.error('Erro ao processar webhook:', error);
        return new Response(
          JSON.stringify({
            error: 'Erro ao processar webhook',
            details: error instanceof Error ? error.message : 'Erro desconhecido',
          }),
          { status: 500 },
        );
      }
    },
  },
};
