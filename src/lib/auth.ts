/**
 * 🔐 AUTENTICAÇÃO
 * Migrado de /client/admin/js/auth.js
 * MANTÉM: JWT, endpoints, estrutura exata
 */

import { getApiUrl } from './config';

// ⚠️ MANTÉM ENDPOINTS EXATOS DO BACKEND
const AUTH_ENDPOINTS = {
  ADMIN_LOGIN: '/auth/admin-login',           // Super Admin
  CLIENT_LOGIN: '/auth/client-login',         // Store Owner (mantém nome!)
  CUSTOMER_REGISTER: '/auth/customer-register', // Consumidor final (novo)
  CUSTOMER_LOGIN: '/auth/customer-login',     // Consumidor final (novo)
};

// Types
export interface AuthUser {
  id: string;
  email: string;
  role: 'super-admin' | 'client' | 'customer';
  name?: string;
}

// ============ SUPER ADMIN AUTH ============
export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
}

export function setAdminToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('adminToken', token);
}

export function getAdminData(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('adminData');
  return data ? JSON.parse(data) : null;
}

export function clearAdminSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminData');
}

// ============ STORE OWNER AUTH (Client) ============
// ⚠️ MANTÉM NOME "client" para compatibilidade com backend JWT!
export function getClientToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('clientToken');
}

export function setClientToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('clientToken', token);
}

export function getClientData(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('clientData');
  return data ? JSON.parse(data) : null;
}

export function clearClientSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('clientToken');
  localStorage.removeItem('clientData');
  localStorage.removeItem('clientId');
}

// ============ CUSTOMER AUTH (Consumidor) ============
export function getCustomerToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('customerToken');
}

export function setCustomerToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('customerToken', token);
}

export function clearCustomerSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('customerToken');
  localStorage.removeItem('customerData');
}

// ============ LOGIN FUNCTIONS ============

export async function loginAdmin(email: string, password: string) {
  try {
    const url = getApiUrl(AUTH_ENDPOINTS.ADMIN_LOGIN);
    console.log('🔍 [LOGIN DEBUG] URL:', url);
    console.log('🔍 [LOGIN DEBUG] Dados:', { email, password: '***' });
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log('🔍 [LOGIN DEBUG] Response status:', response.status);
    console.log('🔍 [LOGIN DEBUG] Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao fazer login');
    }

    // ⚠️ MANTÉM estrutura exata da resposta do backend
    setAdminToken(data.access_token);
    localStorage.setItem('adminData', JSON.stringify(data.admin));

    return { success: true, data };
  } catch (error: any) {
    console.error('❌ [LOGIN ERROR]:', error);
    return { success: false, error: error.message };
  }
}

export async function loginStoreOwner(email: string, password: string) {
  try {
    const response = await fetch(getApiUrl(AUTH_ENDPOINTS.CLIENT_LOGIN), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao fazer login');
    }

    // ⚠️ MANTÉM: clientToken, clientData, clientId (backend espera isso!)
    setClientToken(data.token);
    localStorage.setItem('clientData', JSON.stringify(data.client));
    if (data.client && data.client.id) {
      localStorage.setItem('clientId', data.client.id);
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ============ CHECK AUTH ============
export function checkAdminAuth(): boolean {
  const token = getAdminToken();
  if (!token) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    return false;
  }
  return true;
}

export function checkStoreAuth(): boolean {
  const token = getClientToken();
  if (!token) {
    if (typeof window !== 'undefined') {
      window.location.href = '/store-admin/login';
    }
    return false;
  }
  return true;
}
