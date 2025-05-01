interface IntegrationConfig {
  openpix: {
    productIds: {
      basic: {
        id: string;
        link: string;
        qrCode: string;
        qrCodeImage: string;
        price: number;
      };
      vip: {
        id: string;
        link: string;
        qrCode: string;
        qrCodeImage: string;
        price: number;
      };
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
  openpix: {
    productIds: {
      basic: {
        id: 'befab603-e772-4651-bb57-0926ebf166bc',
        link: 'https://openpix.com.br/pay/befab603-e772-4651-bb57-0926ebf166bc',
        qrCode: '00020126580014br.gov.bcb.pix01367ed52236-4b7d-418b-a64b-d5b344e0d000520400005303986540529.905802BR5907FLOWOFF6009Sao_Paulo6229052567b59eb4a9d24a27966a6f3c963048E33',
        qrCodeImage: 'https://res.cloudinary.com/dt9m3pkjv/image/upload/v1746119742/qrCode-BASICO_valffe.png',
        price: 29.90,
      },
      vip: {
        id: '773a3409-02cd-45e0-afe6-2758235c20a1',
        link: 'https://openpix.com.br/pay/773a3409-02cd-45e0-afe6-2758235c20a1',
        qrCode: '00020126580014br.gov.bcb.pix01367ed52236-4b7d-418b-a64b-d5b344e0d000520400005303986540559.905802BR5907FLOWOFF6009Sao_Paulo62290525f723ba94dd4d4c2e97f476e2c63044B8B',
        qrCodeImage: 'https://res.cloudinary.com/dt9m3pkjv/image/upload/v1746119742/qrCode_-_VIP_puevyk.png',
        price: 59.90,
      },
    },
    webhookSecret: import.meta.env.VITE_OPENPIX_WEBHOOK_SECRET,
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
    'VITE_OPENPIX_WEBHOOK_SECRET',
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
  const product = Object.values(integrations.openpix.productIds).find(
    (p) => p.id === productId
  );
  return product?.link || '';
}

// Funções para obter URLs de canais
export function getChannelUrls(email: string) {
  return {
    telegram: `https://t.me/PaulaAzevedo_Bot?start=${email}`,
    whatsapp: `https://wa.me/+553131931679?text=Quero+acesso+VIP+confirmado+${email}`,
    email: `mailto:azevedomendespaula@gmail.com?subject=Acesso%20VIP&body=Confirmado%20${email}`,
  };
} 