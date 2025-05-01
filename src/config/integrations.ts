interface IntegrationConfig {
  supabase: {
    url: string;
    anonKey: string;
    serviceRole: string;
    jwtSecret: string;
  };
  gumroad: {
    productIds: {
      basic: string;
      vip: string;
    };
    webhookSecret: string;
  };
  telegram: {
    botToken: string;
    channelId: string;
  };
  whatsapp: {
    businessId: string;
    phoneNumberId: string;
    accessToken: string;
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPass: string;
    fromEmail: string;
  };
}

export const integrations: IntegrationConfig = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    serviceRole: import.meta.env.VITE_SUPABASE_SERVICE_ROLE,
    jwtSecret: import.meta.env.VITE_SUPABASE_JWT_SECRET,
  },
  gumroad: {
    productIds: {
      basic: 'basiquinha',
      vip: 'vip',
    },
    webhookSecret: import.meta.env.VITE_GUMROAD_WEBHOOK_SECRET,
  },
  telegram: {
    botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
    channelId: import.meta.env.VITE_TELEGRAM_CHANNEL_ID,
  },
  whatsapp: {
    businessId: import.meta.env.VITE_WHATSAPP_BUSINESS_ID,
    phoneNumberId: import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID,
    accessToken: import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN,
  },
  email: {
    smtpHost: import.meta.env.VITE_SMTP_HOST,
    smtpPort: Number(import.meta.env.VITE_SMTP_PORT),
    smtpUser: import.meta.env.VITE_SMTP_USER,
    smtpPass: import.meta.env.VITE_SMTP_PASS,
    fromEmail: import.meta.env.VITE_FROM_EMAIL,
  },
};

// Funções helper para verificar configurações
export function validateConfig() {
  const requiredEnvVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_GUMROAD_WEBHOOK_SECRET',
    'VITE_TELEGRAM_BOT_TOKEN',
    'VITE_WHATSAPP_BUSINESS_ID',
    'VITE_SMTP_HOST',
  ];

  const missingVars = requiredEnvVars.filter(
    (envVar) => !import.meta.env[envVar]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Variáveis de ambiente obrigatórias faltando: ${missingVars.join(', ')}`
    );
  }
}

// Funções para obter URLs de produtos
export function getProductUrl(productId: string): string {
  return `https://paulaazevedo.gumroad.com/l/${productId}?wanted=true`;
}

// Funções para obter URLs de canais
export function getChannelUrls(email: string) {
  return {
    telegram: `https://t.me/PaulaAzevedo_Bot?start=${email}`,
    whatsapp: `https://wa.me/+553131931679?text=Quero+acesso+VIP+confirmado+${email}`,
    email: `mailto:azevedomendespaula@gmail.com?subject=Acesso%20VIP&body=Confirmado%20${email}`,
  };
} 