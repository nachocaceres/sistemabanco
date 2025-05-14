import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCuentasRemuneradas } from '@/lib/services/cuentasService';

export default function CuentasRemuneradas() {
  // Getting mock data
  const cuentas = getCuentasRemuneradas();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Cuentas Remuneradas</h1>
      <p className="text-muted-foreground">Visualice y administre sus cuentas remuneradas con intereses preferenciales.</p>
      
      <div className="grid gap-6">
        {cuentas.map((cuenta) => (
          <Card key={cuenta.id}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>{cuenta.tipo}</span>
                <span className="text-primary">${cuenta.saldo.toLocaleString('es-AR')}</span>
              </CardTitle>
              <CardDescription>Cuenta N°: {cuenta.numero}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">CBU</p>
                    <p>{cuenta.cbu}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Alias</p>
                    <p>{cuenta.alias}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tasa de interés</span>
                    <span className="font-semibold">{cuenta.tasaInteres}% TNA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Interés mensual aprox.</span>
                    <span className="text-secondary font-semibold">
                      ${((cuenta.saldo * cuenta.tasaInteres / 100) / 12).toLocaleString('es-AR', {minimumFractionDigits: 2})}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capitalización</span>
                    <span>{cuenta.capitalizacion}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Próximo pago de intereses</span>
                    <span>{cuenta.proximoPagoInteres}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}