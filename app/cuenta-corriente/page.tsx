import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { 
  Building2, 
  FileSpreadsheet, 
  ArrowLeftRight, 
  Upload, 
  RefreshCw,
  Wallet,
  FileText,
  ListChecks,
  BookOpen,
  BarChart3
} from 'lucide-react';

export default function CuentaCorriente() {
  const menuOptions = [
    {
      title: 'Gestión',
      description: 'Administración y gestión de cuentas',
      icon: <Building2 className="h-5 w-5" />,
      items: [
        { 
          title: 'Adm. de cuenta Corriente', 
          path: '/cuenta-corriente/adm-cuenta-corriente',
          icon: <Building2 className="h-4 w-4" />
        },
        { 
          title: 'ABM de Cuentas Remuneradas', 
          path: '/cuenta-corriente/abm-cuentas-remuneradas',
          icon: <FileSpreadsheet className="h-4 w-4" />
        },
        { 
          title: 'Reversas', 
          path: '/cuenta-corriente/reversas',
          icon: <ArrowLeftRight className="h-4 w-4" />
        },
        { 
          title: 'Altas Masivas', 
          path: '/cuenta-corriente/altas-masivas',
          icon: <Upload className="h-4 w-4" />
        },
        { 
          title: 'Cambio Sucursal', 
          path: '/cuenta-corriente/cambio-sucursal',
          icon: <RefreshCw className="h-4 w-4" />
        }
      ]
    },
    {
      title: 'Saldos',
      description: 'Consulta de saldos',
      icon: <Wallet className="h-5 w-5" />,
      path: '/cuenta-corriente/saldos'
    },
    {
      title: 'Cheques',
      description: 'Gestión de cheques',
      icon: <FileText className="h-5 w-5" />,
      path: '/cuenta-corriente/cheques'
    },
    {
      title: 'Listados',
      description: 'Reportes y listados',
      icon: <ListChecks className="h-5 w-5" />,
      path: '/cuenta-corriente/listados'
    },
    {
      title: 'Chequeras',
      description: 'Administración de chequeras',
      icon: <BookOpen className="h-5 w-5" />,
      path: '/cuenta-corriente/chequeras'
    },
    {
      title: 'Acuerdos',
      description: 'Gestión de acuerdos',
      icon: <BarChart3 className="h-5 w-5" />,
      path: '/cuenta-corriente/acuerdos'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Cuenta Corriente</h1>
        <p className="text-sm md:text-base text-muted-foreground">Seleccione una opción para continuar.</p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {menuOptions.map((option, index) => (
          <Card key={index} className="hover:bg-accent/50 transition-colors">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                {option.icon}
                {option.title}
              </CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {option.items ? (
                <div className="space-y-2">
                  {option.items.map((item, itemIndex) => (
                    <Link 
                      key={itemIndex}
                      href={item.path}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link 
                  href={option.path}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Acceder
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}