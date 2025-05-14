import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Configuracion() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Configuración</h1>
      <p className="text-muted-foreground">Administre sus preferencias y configuración de seguridad.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Cuenta</CardTitle>
          <CardDescription>Esta sección estará disponible próximamente.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Aquí podrá gestionar sus preferencias, ajustes de seguridad y notificaciones.</p>
        </CardContent>
      </Card>
    </div>
  );
}