// Constantes de rotas
export const ROUTES = {
  HOME: '/',
  PLANS: '/planos',
  PAYMENT: '/pagamento',
  CONFIRMATION: '/confirmacao',
  AUTHENTICATE: '/autenticar',
  TERMS: '/termos',
  PRIVACITY: '/privacidade',
  ADMIN: {
    ROOT: '/admin',
    LOGIN: '/admin/login',
    REGISTER: '/admin/register',
  },
} as const;

// Constantes de planos
export const PLANS = {
  BASIC: {
    id: 'befab603-e772-4651-bb57-0926ebf166bc',
    name: 'Plano Básico',
    price: 29.90,
    features: [
      'Acesso ao conteúdo básico',
      'Atualizações semanais',
      'Suporte por email',
    ],
    openpixLink: 'https://openpix.com.br/pay/befab603-e772-4651-bb57-0926ebf166bc',
    qrCode: '00020126580014br.gov.bcb.pix01367ed52236-4b7d-418b-a64b-d5b344e0d000520400005303986540529.905802BR5907FLOWOFF6009Sao_Paulo6229052567b59eb4a9d24a27966a6f3c963048E33',
    qrCodeImage: 'https://res.cloudinary.com/dt9m3pkjv/image/upload/v1746119742/qrCode-BASICO_valffe.png',
  },
  VIP: {
    id: '773a3409-02cd-45e0-afe6-2758235c20a1',
    name: 'Plano VIP',
    price: 59.90,
    features: [
      'Acesso ao conteúdo VIP',
      'Atualizações diárias',
      'Suporte prioritário',
      'Conteúdo exclusivo',
    ],
    openpixLink: 'https://openpix.com.br/pay/773a3409-02cd-45e0-afe6-2758235c20a1',
    qrCode: '00020126580014br.gov.bcb.pix01367ed52236-4b7d-418b-a64b-d5b344e0d000520400005303986540559.905802BR5907FLOWOFF6009Sao_Paulo62290525f723ba94dd4d4c2e97f476e2c63044B8B',
    qrCodeImage: 'https://res.cloudinary.com/dt9m3pkjv/image/upload/v1746119742/qrCode_-_VIP_puevyk.png',
  },
} as const;

// Constantes de status
export const STATUS = {
  ACTIVE: 'ativo',
  INACTIVE: 'inativo',
  PAID: 'pago',
  PENDING: 'pendente',
  FAILED: 'falhou',
} as const;

// Constantes de canais
export const CHANNELS = {
  TELEGRAM: 'telegram',
  WHATSAPP: 'whatsapp',
  EMAIL: 'email',
} as const;

// Constantes de cores
export const COLORS = {
  PRIMARY: '#E91E63',
  BACKGROUND: '#000000',
  SURFACE: '#1a1a1a',
  TEXT: {
    PRIMARY: '#FFFFFF',
    SECONDARY: 'rgba(255, 255, 255, 0.8)',
    DISABLED: 'rgba(255, 255, 255, 0.6)',
  },
} as const;

// Constantes de mensagens
export const MESSAGES = {
  ERRORS: {
    AUTHENTICATION: 'Você precisa estar autenticado para acessar este conteúdo.',
    PAYMENT: 'Erro ao processar pagamento. Tente novamente.',
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    UNKNOWN: 'Ocorreu um erro inesperado. Tente novamente.',
  },
  SUCCESS: {
    PAYMENT: 'Pagamento realizado com sucesso!',
    AUTHENTICATION: 'Login realizado com sucesso!',
  },
} as const;

// Constantes de limites
export const LIMITS = {
  RATE_LIMIT: {
    MAX_REQUESTS: 100,
    WINDOW_MS: 15 * 60 * 1000, // 15 minutos
  },
  POSTS_PER_PAGE: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
} as const;

// Constantes de validação
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true,
  },
} as const; 