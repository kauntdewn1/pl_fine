import { Bot } from 'grammy';

const bot = new Bot(import.meta.env.VITE_TELEGRAM_BOT_TOKEN);

// Comando /vip
bot.command('vip', async (ctx) => {
  await ctx.reply(
    `🎉 Bem-vindo ao Plano VIP!\n\n` +
    `Aqui você terá acesso a:\n` +
    `✨ Conteúdo exclusivo\n` +
    `📸 Fotos e vídeos premium\n` +
    `💝 Interação direta\n\n` +
    `Para assinar, acesse: https://paulaazevedo.site/planos`
  );
});

// Comando /packs
bot.command('packs', async (ctx) => {
  await ctx.reply(
    `📦 Nossos Packs Disponíveis:\n\n` +
    `1️⃣ Pack Básico - R$29,90/mês\n` +
    `2️⃣ Pack VIP - R$59,90/mês\n\n` +
    `Para mais informações, use /vip`
  );
});

// Comando /duvidas
bot.command('duvidas', async (ctx) => {
  await ctx.reply(
    `❓ Dúvidas Frequentes:\n\n` +
    `1️⃣ Como assinar?\n` +
    `- Acesse https://paulaazevedo.site/planos\n\n` +
    `2️⃣ Formas de pagamento?\n` +
    `- Cartão de crédito\n` +
    `- PIX\n\n` +
    `3️⃣ Como recebo o conteúdo?\n` +
    `- Telegram\n` +
    `- WhatsApp\n` +
    `- Email\n\n` +
    `Para mais informações, entre em contato: azevedomendespaula@gmail.com`
  );
});

// Mensagem de boas-vindas para novos membros
bot.on('chat_member', async (ctx) => {
  if (ctx.chatMember.new_chat_member.status === 'member') {
    await ctx.reply(
      `👋 Bem-vindo(a) ao grupo VIP!\n\n` +
      `Para começar, use os comandos:\n` +
      `/vip - Informações do plano\n` +
      `/packs - Nossos packs disponíveis\n` +
      `/duvidas - Dúvidas frequentes\n\n` +
      `Aproveite seu acesso! 💝`
    );
  }
});

// Iniciar o bot
bot.start(); 