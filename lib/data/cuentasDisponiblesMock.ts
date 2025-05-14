// Types for available accounts
export interface CuentaDisponible {
  id: string;
  nombre: string;
  nroCuit: string;
  producto: string;
  tipoCuenta: string;
  nroCuenta: string;
  divisa: string;
}

// Mock data for available accounts
export const cuentasDisponibles: CuentaDisponible[] = [
  // Cuentas en Pesos (divisa: "0")
  {
    id: "1",
    nombre: "BIANCHI, ALFREDO EDUARDO",
    nroCuit: "20127416932",
    producto: "1",
    tipoCuenta: "CC",
    nroCuenta: "535702",
    divisa: "0"
  },
  {
    id: "2",
    nombre: "MOTTURA, JOSE LUIS",
    nroCuit: "20185150640",
    producto: "1",
    tipoCuenta: "CC",
    nroCuenta: "588900",
    divisa: "0"
  },
  {
    id: "3",
    nombre: "VILLA, CHRISTIAN LEONEL",
    nroCuit: "20236729614",
    producto: "1",
    tipoCuenta: "CC",
    nroCuenta: "598809",
    divisa: "0"
  },
  {
    id: "4",
    nombre: "CORDOBA, MARTA GUADALUPE",
    nroCuit: "27128715040",
    producto: "1",
    tipoCuenta: "CC",
    nroCuenta: "602901",
    divisa: "0"
  },
  {
    id: "5",
    nombre: "PECANTET, SUSANA BEATRIZ",
    nroCuit: "27060302575",
    producto: "1",
    tipoCuenta: "CC",
    nroCuenta: "608709",
    divisa: "0"
  },
  // Cuentas en Dólares (divisa: "2")
  {
    id: "6",
    nombre: "MARTINEZ, ROBERTO CARLOS",
    nroCuit: "20156789012",
    producto: "1",
    tipoCuenta: "CC",
    nroCuenta: "701234",
    divisa: "2"
  },
  {
    id: "7",
    nombre: "GONZALEZ, MARIA ELENA",
    nroCuit: "27234567890",
    producto: "1",
    tipoCuenta: "CC",
    nroCuenta: "702345",
    divisa: "2"
  },
  {
    id: "8",
    nombre: "RODRIGUEZ, JUAN PABLO",
    nroCuit: "20345678901",
    producto: "1",
    tipoCuenta: "CC",
    nroCuenta: "703456",
    divisa: "2"
  },
  // Cuentas Multimoneda (divisa: "999")
  {
    id: "9",
    nombre: "LOPEZ, CARLOS ALBERTO",
    nroCuit: "20456789012",
    producto: "1",
    tipoCuenta: "CC",
    nroCuenta: "801234",
    divisa: "999"
  },
  {
    id: "10",
    nombre: "FERNANDEZ, ANA MARIA",
    nroCuit: "27567890123",
    producto: "1",
    tipoCuenta: "CC",
    nroCuenta: "802345",
    divisa: "999"
  }
];

let registeredAccounts: Set<string> = new Set();

// Service functions
export async function buscarCuentasDisponibles(cuit: string = '', divisa: string = 'PESOS'): Promise<CuentaDisponible[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Filter accounts based on search criteria
  return cuentasDisponibles.filter(cuenta => {
    const matchesCuit = !cuit || cuenta.nroCuit.includes(cuit);
    
    // Filter by currency
    let matchesDivisa = false;
    if (divisa === 'PESOS') {
      // Para Pesos, mostrar cuentas en Pesos (0) y Multimoneda (999)
      matchesDivisa = cuenta.divisa === '0' || cuenta.divisa === '999';
    } else if (divisa === 'DOLARES') {
      // Para Dólares, mostrar cuentas en Dólares (2) y Multimoneda (999)
      matchesDivisa = cuenta.divisa === '2' || cuenta.divisa === '999';
    }
    
    // Filter out registered accounts
    const isNotRegistered = !registeredAccounts.has(cuenta.nroCuenta);
    
    return matchesCuit && matchesDivisa && isNotRegistered;
  });
}

export async function verificarCuentaRemunerada(nroCuenta: string): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Check if account is already registered
  return registeredAccounts.has(nroCuenta);
}

export function registrarCuenta(nroCuenta: string): void {
  registeredAccounts.add(nroCuenta);
}