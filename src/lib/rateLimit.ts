interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const defaultConfig: RateLimitConfig = {
  maxRequests: 100,
  windowMs: 15 * 60 * 1000, // 15 minutos
};

export class RateLimiter {
  private static instance: RateLimiter;
  private config: RateLimitConfig;
  private requests: Map<string, number[]>;

  private constructor(config: RateLimitConfig = defaultConfig) {
    this.config = config;
    this.requests = new Map();
  }

  public static getInstance(config?: RateLimitConfig): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter(config);
    }
    return RateLimiter.instance;
  }

  public checkLimit(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    // Limpar requisições antigas
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }

    const userRequests = this.requests.get(key)!;
    const recentRequests = userRequests.filter(time => time > windowStart);
    this.requests.set(key, recentRequests);

    // Verificar limite
    if (recentRequests.length >= this.config.maxRequests) {
      return false;
    }

    // Adicionar nova requisição
    recentRequests.push(now);
    return true;
  }

  public resetLimit(key: string): void {
    this.requests.delete(key);
  }
}

// Função helper para verificar rate limit
export function checkRateLimit(key: string): boolean {
  const limiter = RateLimiter.getInstance();
  return limiter.checkLimit(key);
} 