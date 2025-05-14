import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Tarjetas() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Tarjetas</h1>
      <p className="text-muted-foreground">Administre sus tarjetas de crédito y débito.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Módulo de Tarjetas</CardTitle>
          <CardDescription>Esta sección estará disponible próximamente.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Aquí podrá consultar sus tarjetas, ver movimientos y gestionar opciones.</p>
        </CardContent>
      </Card>
    </div>
  );
}