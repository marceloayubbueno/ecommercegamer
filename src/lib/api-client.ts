/**
 * 🔌 API CLIENT
 * Migrado de /client/js/modules/api-client.js
 * MANTÉM: Estrutura, headers JWT, tudo igual
 */

import { getApiUrl } from './config';
import { getAdminToken, getClientToken, getCustomerToken } from './auth';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ⚠️ MANTÉM: Estrutura exata de headers com JWT
function getHeaders(userType: 'admin' | 'client' | 'customer', customHeaders: HeadersInit = {}): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  
  // ⚠️ MANTÉM: Authorization Bearer exatamente como backend espera
  let token: string | null = null;
  
  if (userType === 'admin') {
    token = getAdminToken();
  } else if (userType === 'client') {
    token = getClientToken();
  } else if (userType === 'customer') {
    token = getCustomerToken();
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

// Base fetch (MANTÉM lógica exata)
async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {},
  userType: 'admin' | 'client' | 'customer' = 'client'
): Promise<ApiResponse<T>> {
  try {
    const url = getApiUrl(endpoint);
    const config: RequestInit = {
      ...options,
      headers: getHeaders(userType, options.headers),
    };
    
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw {
        message: data.message || 'Erro na requisição',
        statusCode: response.status,
        error: data.error,
      };
    }
    
    return {
      success: true,
      data,
      message: data.message,
    };
  } catch (error: any) {
    console.error('[API Error]', error);
    
    return {
      success: false,
      error: error.message || 'Erro na requisição',
    };
  }
}

// ============ ADMIN API ============
export const adminApi = {
  get: <T = any>(endpoint: string) => fetchApi<T>(endpoint, { method: 'GET' }, 'admin'),
  post: <T = any>(endpoint: string, body: any) => fetchApi<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }, 'admin'),
  put: <T = any>(endpoint: string, body: any) => fetchApi<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }, 'admin'),
  delete: <T = any>(endpoint: string) => fetchApi<T>(endpoint, { method: 'DELETE' }, 'admin'),
};

// ============ STORE OWNER API (Client) ============
// ⚠️ MANTÉM nome "clientApi" - backend espera JWT com role "client"
export const clientApi = {
  get: <T = any>(endpoint: string) => fetchApi<T>(endpoint, { method: 'GET' }, 'client'),
  post: <T = any>(endpoint: string, body: any) => fetchApi<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }, 'client'),
  put: <T = any>(endpoint: string, body: any) => fetchApi<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }, 'client'),
  patch: <T = any>(endpoint: string, body: any) => fetchApi<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }, 'client'),
  delete: <T = any>(endpoint: string) => fetchApi<T>(endpoint, { method: 'DELETE' }, 'client'),
};

// ============ CUSTOMER API (Consumidor) ============
export const customerApi = {
  get: <T = any>(endpoint: string) => fetchApi<T>(endpoint, { method: 'GET' }, 'customer'),
  post: <T = any>(endpoint: string, body: any) => fetchApi<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }, 'customer'),
  put: <T = any>(endpoint: string, body: any) => fetchApi<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }, 'customer'),
  delete: <T = any>(endpoint: string) => fetchApi<T>(endpoint, { method: 'DELETE' }, 'customer'),
};

// ============ PUBLIC API (Sem auth) ============
export const publicApi = {
  get: <T = any>(endpoint: string) => fetchApi<T>(endpoint, { method: 'GET' }, 'customer'),
  post: <T = any>(endpoint: string, body: any) => fetchApi<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }, 'customer'),
};

export default clientApi;
