/**
 * 🔧 CONFIGURAÇÃO CENTRALIZADA
 * Migrado de /client/admin/js/config.js
 * MANTÉM: Mesma estrutura, mesmos conceitos
 */

// 🌍 Configuração de ambiente
interface EnvConfig {
  API_URL: string;
  CLIENT_URL: string;
}

const ENV: Record<'development' | 'production', EnvConfig> = {
  development: {
    API_URL: 'http://localhost:3000',
    CLIENT_URL: 'http://localhost:3001',
  },
  production: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://programa-indicacao-multicliente-production.up.railway.app',
    CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL || 'https://app.virallead.com.br',
  }
};

// Detectar ambiente
export function detectEnvironment(): 'development' | 'production' {
  if (typeof window === 'undefined') {
    return process.env.NODE_ENV === 'production' ? 'production' : 'development';
  }
  
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  }
  
  return 'production';
}

const CURRENT_ENV = detectEnvironment();
const config = ENV[CURRENT_ENV];

// Configuração global
export const APP_CONFIG = {
  API_URL: config.API_URL,
  CLIENT_URL: config.CLIENT_URL,
  ENVIRONMENT: CURRENT_ENV,
  VERSION: '1.0.0',
  DEBUG_MODE: CURRENT_ENV === 'development',
};

// Helper para obter URL da API (MANTÉM exatamente como estava)
export function getApiUrl(endpoint: string = ''): string {
  const baseUrl = APP_CONFIG.API_URL;
  if (!endpoint) return baseUrl;
  
  if (endpoint.startsWith('/')) {
    return baseUrl + endpoint;
  } else {
    return baseUrl + '/' + endpoint;
  }
}

// Helper para formatar preço
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export default APP_CONFIG;
