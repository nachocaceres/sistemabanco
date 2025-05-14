// Mock service for accounts data
// This file simulates data fetching from a backend
// In production, this would be replaced with real API calls

import { cuentasAhorro, cuentasRemuneradas } from '@/lib/data/cuentasMock';
import { cuentasRemuneradasABM } from '@/lib/data/cuentasRemuneradasMock';
import { apiUrls } from '../config/apiUrls';

/**
 * Get all savings accounts
 * @returns Array of savings accounts
 */
export function getCuentasAhorro() {
  // In a real implementation, this would fetch data from the API
  // Example:
  // const response = await fetch(apiUrls.cuentasAhorro.getAll);
  // const data = await response.json();
  // return data;
  
  // For now, return mock data
  return cuentasAhorro;
}

/**
 * Get a specific savings account by id
 * @param id Account ID
 * @returns Savings account data
 */
export function getCuentaAhorroPorId(id: string) {
  // In a real implementation:
  // const response = await fetch(`${apiUrls.cuentasAhorro.getById}/${id}`);
  // const data = await response.json();
  // return data;
  
  return cuentasAhorro.find(cuenta => cuenta.id === id);
}

/**
 * Get all interest-bearing accounts
 * @returns Array of interest-bearing accounts
 */
export function getCuentasRemuneradas() {
  // In a real implementation:
  // const response = await fetch(apiUrls.cuentasRemuneradas.getAll);
  // const data = await response.json();
  // return data;
  
  return cuentasRemuneradas;
}

/**
 * Get a specific interest-bearing account by id
 * @param id Account ID
 * @returns Interest-bearing account data
 */
export function getCuentaRemuneradaPorId(id: string) {
  // In a real implementation:
  // const response = await fetch(`${apiUrls.cuentasRemuneradas.getById}/${id}`);
  // const data = await response.json();
  // return data;
  
  return cuentasRemuneradas.find(cuenta => cuenta.id === id);
}

/**
 * Deactivate an interest-bearing account
 * @param nroCuenta Account number
 * @param nroCuit CUIT number
 * @returns Promise with the deactivation result
 */
export async function darDeBajaCuentaRemunerada(nroCuenta: string, nroCuit: string) {
  try {
    // In a real implementation, this would be an API call:
    // const response = await fetch(`${apiUrls.cuentasRemuneradas.darDeBaja}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ nroCuenta, nroCuit })
    // });
    // return response.json();
    
    // Mock implementation
    const now = new Date().toISOString().split('T')[0];
    const accountIndex = cuentasRemuneradasABM.findIndex(cuenta => 
      cuenta.nroCuenta === nroCuenta && cuenta.nroCuit === nroCuit
    );

    if (accountIndex === -1) {
      throw new Error('Cuenta no encontrada');
    }

    cuentasRemuneradasABM[accountIndex] = {
      ...cuentasRemuneradasABM[accountIndex],
      fechaBaja: now,
      usuarioBaja: 'admin'
    };

    return Promise.resolve({ success: true, message: 'Cuenta dada de baja exitosamente' });
  } catch (error) {
    console.error('Error al dar de baja la cuenta:', error);
    throw new Error('No se pudo dar de baja la cuenta');
  }
}

/**
 * Create a new interest-bearing account
 * @param accountData Account data
 * @returns Promise with the creation result
 */
export async function crearCuentaRemunerada(accountData: any) {
  try {
    // In a real implementation, this would be an API call:
    // const response = await fetch(`${apiUrls.cuentasRemuneradas.crear}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(accountData)
    // });
    // return response.json();
    
    // Mock implementation
    const now = new Date().toISOString().split('T')[0];
    const newAccount = {
      id: String(cuentasRemuneradasABM.length + 1),
      ...accountData,
      fechaAlta: now,
      usuarioAlta: 'admin',
      fechaBaja: null,
      usuarioBaja: null,
      fechaInicio: now,
      minimoDiario: 100000,
      variacionTasaGenerica: 0.5,
      saldoPromDiario: 250000,
      saldoPromDiarioTasa: 97.5,
      cuentaRelacionada: accountData.nroCuenta
    };

    cuentasRemuneradasABM.push(newAccount);

    return Promise.resolve({ success: true, message: 'Cuenta creada exitosamente', account: newAccount });
  } catch (error) {
    console.error('Error al crear la cuenta:', error);
    throw new Error('No se pudo crear la cuenta');
  }
}