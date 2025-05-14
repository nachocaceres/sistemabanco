// Mock data for accounts
// This represents sample data until the real backend is connected

// Types for the accounts
export interface CuentaAhorro {
  id: string;
  tipo: string;
  numero: string;
  cbu: string;
  alias: string;
  saldo: number;
  moneda: string;
  ultimaActividad: string;
}

export interface CuentaRemunerada extends CuentaAhorro {
  tasaInteres: number;
  capitalizacion: string;
  proximoPagoInteres: string;
}

// Mock data for savings accounts
export const cuentasAhorro: CuentaAhorro[] = [
  {
    id: "ca-001",
    tipo: "Caja de Ahorro en Pesos",
    numero: "0720123456789",
    cbu: "0720000488000012345678",
    alias: "CASA.PERRO.LIBRO",
    saldo: 250000,
    moneda: "ARS",
    ultimaActividad: "2023-04-15"
  },
  {
    id: "ca-002",
    tipo: "Caja de Ahorro en Dólares",
    numero: "0720987654321",
    cbu: "0720000488000098765432",
    alias: "MESA.GATO.PLUMA",
    saldo: 5000,
    moneda: "USD",
    ultimaActividad: "2023-04-10"
  }
];

// Mock data for interest-bearing accounts
export const cuentasRemuneradas: CuentaRemunerada[] = [
  {
    id: "cr-001",
    tipo: "Cuenta Remunerada Premium",
    numero: "0720111222333",
    cbu: "0720000488000111222333",
    alias: "AGUA.CIELO.TIERRA",
    saldo: 500000,
    moneda: "ARS",
    ultimaActividad: "2023-04-14",
    tasaInteres: 97.5,
    capitalizacion: "Mensual",
    proximoPagoInteres: "2023-05-01"
  },
  {
    id: "cr-002",
    tipo: "Cuenta Remunerada Ahorro Plus",
    numero: "0720444555666",
    cbu: "0720000488000444555666",
    alias: "FUEGO.AIRE.SOL",
    saldo: 750000,
    moneda: "ARS",
    ultimaActividad: "2023-04-12",
    tasaInteres: 95.0,
    capitalizacion: "Mensual",
    proximoPagoInteres: "2023-05-01"
  }
];