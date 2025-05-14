import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Inversiones() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Inversiones</h1>
      <p className="text-muted-foreground">Gestione su portfolio de inversiones.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Módulo de Inversiones</CardTitle>
          <CardDescription>Esta sección estará disponible próximamente.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Aquí podrá consultar, administrar y realizar nuevas inversiones.</p>
        </CardContent>
      </Card>
    </div>
  );
}