import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Saldos() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Saldos</h1>
      <p className="text-muted-foreground">Consulte los saldos de sus cuentas corrientes.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Consulta de Saldos</CardTitle>
          <CardDescription>Visualice los saldos actuales de sus cuentas</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Esta sección estará disponible próximamente.</p>
        </CardContent>
      </Card>
    </div>
  );
}