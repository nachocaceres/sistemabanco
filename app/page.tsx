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

export default function Home() {
  const menus = [
    {
      title: 'Cuenta Corriente',
      description: '',
      icon: '🏦',
      options: [
        {
          title: 'Gestión',
          description: 'Administración y gestión de cuentas',
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
          path: '/cuenta-corriente/saldos',
          icon: <Wallet className="h-4 w-4" />
        },
        {
          title: 'Cheques',
          description: 'Gestión de cheques',
          path: '/cuenta-corriente/cheques',
          icon: <FileText className="h-4 w-4" />
        },
        {
          title: 'Listados',
          description: 'Reportes y listados',
          path: '/cuenta-corriente/listados',
          icon: <ListChecks className="h-4 w-4" />
        },
        {
          title: 'Chequeras',
          description: 'Administración de chequeras',
          path: '/cuenta-corriente/chequeras',
          icon: <BookOpen className="h-4 w-4" />
        },
        {
          title: 'Acuerdos',
          description: 'Gestión de acuerdos',
          path: '/cuenta-corriente/acuerdos',
          icon: <BarChart3 className="h-4 w-4" />
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Bienvenido al Sistema Banco</h1>
        <p className="text-sm md:text-base text-muted-foreground">Seleccione un menú para ver sus opciones.</p>
      </div>
      
      <div className="grid gap-6">
        {menus.map((menu, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <span>{menu.icon}</span>
                {menu.title}
              </CardTitle>
              <CardDescription>{menu.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {menu.options.map((option, optionIndex) => (
                  <Card key={optionIndex} className="border-dashed">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base md:text-lg flex items-center gap-2">
                        {option.icon && option.icon}
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}