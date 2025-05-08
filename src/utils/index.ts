import { VALIDATION } from '../constants';
import { logger } from './logger';

// Tipos
type StorageValue = string | number | boolean | object | null;
type FunctionType = (...args: unknown[]) => unknown;

// Funções de validação
export function isValidEmail(email: string): boolean {
  return VALIDATION.EMAIL.test(email);
}

export function isValidPassword(password: string): boolean {
  const { MIN_LENGTH, REQUIRE_NUMBER, REQUIRE_SPECIAL } = VALIDATION.PASSWORD;

  if (password.length < MIN_LENGTH) return false;
  if (REQUIRE_NUMBER && !/\d/.test(password)) return false;
  if (REQUIRE_SPECIAL && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

  return true;
}

// Funções de formatação
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

// Funções de storage
export function setLocalStorage(key: string, value: StorageValue): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    logger.error('Erro ao salvar no localStorage', { key, error });
  }
}

export function getLocalStorage<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    logger.error('Erro ao ler do localStorage', { key, error });
    return null;
  }
}

export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    logger.error('Erro ao remover do localStorage', { key, error });
  }
}

// Funções de segurança
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < e >
    .trim();
}

export function generateToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return token;
}

// Funções de performance
export function debounce<T extends FunctionType>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle<T extends FunctionType>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Funções de UI
export function getRandomColor(): string {
  const colors = [
    '#E91E63', // Rosa
    '#9C27B0', // Roxo
    '#673AB7', // Roxo escuro
    '#3F51B5', // Azul
    '#2196F3', // Azul claro
    '#03A9F4', // Azul mais claro
    '#00BCD4', // Ciano
    '#009688', // Verde água
    '#4CAF50', // Verde
    '#8BC34A', // Verde claro
    '#CDDC39', // Verde lima
    '#FFEB3B', // Amarelo
    '#FFC107', // Âmbar
    '#FF9800', // Laranja
    '#FF5722', // Laranja escuro
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

export function getContrastColor(hexColor: string): string {
  // Remove o # se existir
  const hex = hexColor.replace('#', '');

  // Converte para RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calcula o brilho
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Retorna preto ou branco baseado no brilho
  return brightness > 128 ? '#000000' : '#FFFFFF';
}
