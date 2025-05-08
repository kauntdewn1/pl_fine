type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogOptions {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isTest = process.env.NODE_ENV === 'test';

  private formatMessage(level: LogLevel, message: string, options?: LogOptions): string {
    const timestamp = new Date().toISOString();
    const optionsString = options ? JSON.stringify(options, null, 2) : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${
      optionsString ? '\n' + optionsString : ''
    }`;
  }

  private shouldLog(): boolean {
    return this.isDevelopment || this.isTest;
  }

  // eslint-disable-next-line no-console
  info(message: string, options?: LogOptions): void {
    if (this.shouldLog()) {
      console.info(this.formatMessage('info', message, options));
    }
  }

  // eslint-disable-next-line no-console
  warn(message: string, options?: LogOptions): void {
    if (this.shouldLog()) {
      console.warn(this.formatMessage('warn', message, options));
    }
  }

  // eslint-disable-next-line no-console
  error(message: string, options?: LogOptions): void {
    // Sempre loga erros, independente do ambiente
    console.error(this.formatMessage('error', message, options));
  }

  // eslint-disable-next-line no-console
  debug(message: string, options?: LogOptions): void {
    if (this.shouldLog()) {
      console.debug(this.formatMessage('debug', message, options));
    }
  }

  // Método utilitário para logs de performance
  // eslint-disable-next-line no-console
  time(label: string): void {
    if (this.shouldLog()) {
      console.time(label);
    }
  }

  // eslint-disable-next-line no-console
  timeEnd(label: string): void {
    if (this.shouldLog()) {
      console.timeEnd(label);
    }
  }

  // Método para logs de grupo
  // eslint-disable-next-line no-console
  group(label: string): void {
    if (this.shouldLog()) {
      console.group(label);
    }
  }

  // eslint-disable-next-line no-console
  groupEnd(): void {
    if (this.shouldLog()) {
      console.groupEnd();
    }
  }

  // Método para logs de tabela
  // eslint-disable-next-line no-console
  table(data: unknown[]): void {
    if (this.shouldLog()) {
      console.table(data);
    }
  }
}

export const logger = new Logger();
