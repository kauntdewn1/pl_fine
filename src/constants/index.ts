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
    id: 'basico',
    name: 'Plano Básico',
    price: 29.90,
    features: [
      'Acesso ao conteúdo básico',
      'Atualizações semanais',
      'Suporte por email',
    ],
  },
  VIP: {
    id: 'vip',
    name: 'Plano VIP',
    price: 59.90,
    features: [
      'Acesso ao conteúdo VIP',
      'Atualizações diárias',
      'Suporte prioritário',
      'Conteúdo exclusivo',
    ],
  },
} as const;

// Constantes de status
export const STATUS = {
  ACTIVE: 'ativo',
  INACTIVE: 'inativo',
  PAID: 'pago',
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
    AGE_VERIFICATION: 'Você precisa ter 18 anos ou mais para acessar este conteúdo.',
    AUTHENTICATION: 'Você precisa estar autenticado para acessar este conteúdo.',
    PAYMENT: 'Erro ao processar pagamento. Tente novamente.',
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    UNKNOWN: 'Ocorreu um erro inesperado. Tente novamente.',
  },
  SUCCESS: {
    PAYMENT: 'Pagamento realizado com sucesso!',
    AUTHENTICATION: 'Login realizado com sucesso!',
    AGE_VERIFICATION: 'Verificação de idade concluída!',
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