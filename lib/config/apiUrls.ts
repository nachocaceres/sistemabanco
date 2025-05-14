/**
 * API URLs configuration
 * 
 * This file centralizes all API endpoints for the application.
 * When moving from mock to real backend, just update these URLs.
 */

// Base API URL - change this when connecting to the real backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

// API endpoints organized by resource/feature
export const apiUrls = {
  // Authentication endpoints
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    refresh: `${API_BASE_URL}/auth/refresh`,
  },
  
  // Savings accounts endpoints
  cuentasAhorro: {
    getAll: `${API_BASE_URL}/cuentas/ahorro`,
    getById: `${API_BASE_URL}/cuentas/ahorro`,
    getMovimientos: `${API_BASE_URL}/cuentas/ahorro/movimientos`,
  },
  
  // Interest-bearing accounts endpoints
  cuentasRemuneradas: {
    getAll: `${API_BASE_URL}/cuentas/remuneradas`,
    getById: `${API_BASE_URL}/cuentas/remuneradas`,
    getMovimientos: `${API_BASE_URL}/cuentas/remuneradas/movimientos`,
    getIntereses: `${API_BASE_URL}/cuentas/remuneradas/intereses`,
  },
  
  // Investments endpoints
  inversiones: {
    getAll: `${API_BASE_URL}/inversiones`,
    getById: `${API_BASE_URL}/inversiones`,
    getOpciones: `${API_BASE_URL}/inversiones/opciones`,
  },
  
  // Credit cards endpoints
  tarjetas: {
    getAll: `${API_BASE_URL}/tarjetas`,
    getById: `${API_BASE_URL}/tarjetas`,
    getMovimientos: `${API_BASE_URL}/tarjetas/movimientos`,
    getResumen: `${API_BASE_URL}/tarjetas/resumen`,
  },
  
  // Loans endpoints
  prestamos: {
    getAll: `${API_BASE_URL}/prestamos`,
    getById: `${API_BASE_URL}/prestamos`,
    simular: `${API_BASE_URL}/prestamos/simular`,
  },
  
  // User profile and settings
  perfil: {
    getInfo: `${API_BASE_URL}/perfil`,
    actualizarInfo: `${API_BASE_URL}/perfil`,
    cambiarPassword: `${API_BASE_URL}/perfil/password`,
  },
};