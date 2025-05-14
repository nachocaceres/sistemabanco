import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Prestamos() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Préstamos</h1>
      <p className="text-muted-foreground">Consulte y gestione sus préstamos personales.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Módulo de Préstamos</CardTitle>
          <CardDescription>Esta sección estará disponible próximamente.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Aquí podrá consultar sus préstamos activos, simular nuevos préstamos y ver opciones disponibles.</p>
        </CardContent>
      </Card>
    </div>
  );
}