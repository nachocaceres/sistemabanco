"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountManagementPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Administración de Cuenta Corriente</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Cuentas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Administre las cuentas corrientes y realice operaciones de gestión.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}