import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function CajaAhorro() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Caja de Ahorro</h1>
      <p className="text-muted-foreground">Visualice y administre sus cuentas de ahorro.</p>
      
      {/* Submenu Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/caja-ahorro/cuentas-remuneradas">
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Cuentas Remuneradas</CardTitle>
              <CardDescription>
                Administre sus cuentas con intereses preferenciales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Acceda a sus cuentas remuneradas y visualice los intereses generados.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}