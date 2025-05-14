import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { 
  Building2, 
  FileSpreadsheet, 
  ArrowLeftRight, 
  Upload, 
  RefreshCw
} from 'lucide-react';

export default function GestionCuentaCorriente() {
  const menuOptions = [
    { 
      title: 'Adm. de cuenta Corriente', 
      description: 'Administración de cuentas corrientes',
      path: '/cuenta-corriente/adm-cuenta-corriente',
      icon: <Building2 className="h-5 w-5" />
    },
    { 
      title: 'ABM de Cuentas Remuneradas', 
      description: 'Alta, baja y modificación de cuentas remuneradas',
      path: '/cuenta-corriente/abm-cuentas-remuneradas',
      icon: <FileSpreadsheet className="h-5 w-5" />
    },
    { 
      title: 'Reversas', 
      description: 'Gestión de reversas',
      path: '/cuenta-corriente/reversas',
      icon: <ArrowLeftRight className="h-5 w-5" />
    },
    { 
      title: 'Altas Masivas', 
      description: 'Procesamiento de altas masivas',
      path: '/cuenta-corriente/altas-masivas',
      icon: <Upload className="h-5 w-5" />
    },
    { 
      title: 'Cambio Sucursal', 
      description: 'Modificación de sucursal de origen',
      path: '/cuenta-corriente/cambio-sucursal',
      icon: <RefreshCw className="h-5 w-5" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Gestión de Cuenta Corriente</h1>
        <p className="text-sm md:text-base text-muted-foreground">Seleccione una opción para continuar.</p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {menuOptions.map((option, index) => (
          <Link key={index} href={option.path}>
            <Card className="hover:bg-accent/50 transition-colors h-full">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  {option.icon}
                  {option.title}
                </CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}