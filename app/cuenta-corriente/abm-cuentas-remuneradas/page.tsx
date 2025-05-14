"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Search, Settings, Download, Trash2 } from "lucide-react";
import { cuentasRemuneradasABM } from "@/lib/data/cuentasRemuneradasMock";
import { NuevaCuentaDialog } from "./nueva-cuenta-dialog";
import { ParametrosDialog } from "./parametros-dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { darDeBajaCuentaRemunerada } from "@/lib/services/cuentasService";

export default function ABMCuentasRemuneradas() {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyActive, setShowOnlyActive] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewAccountDialog, setShowNewAccountDialog] = useState(false);
  const [showParametersDialog, setShowParametersDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [accounts, setAccounts] = useState(cuentasRemuneradasABM);
  const { toast } = useToast();
  const itemsPerPage = 5;

  const selectedAccount = selectedRow 
    ? accounts.find(account => account.id === selectedRow)
    : null;

  const handleExportExcel = async () => {
    try {
      const response = await fetch('/api/export-excel');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CuentasRemuneradas.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting Excel:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo exportar el archivo Excel."
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedRow) return;

    try {
      const account = accounts.find(cuenta => cuenta.id === selectedRow);
      if (!account) return;

      await darDeBajaCuentaRemunerada(account.nroCuenta, account.nroCuit);

      setAccounts(prev => prev.map(cuenta => 
        cuenta.id === selectedRow 
          ? { 
              ...cuenta, 
              fechaBaja: new Date().toISOString().split('T')[0],
              usuarioBaja: 'admin'
            }
          : cuenta
      ));

      toast({
        title: "Éxito",
        description: "La cuenta remunerada ha sido dada de baja."
      });

      setSelectedRow(null);
      setShowDeleteDialog(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo dar de baja la cuenta seleccionada."
      });
    }
  };

  const handleAccountCreated = () => {
    setAccounts(cuentasRemuneradasABM);
  };

  const filteredCuentas = accounts.filter(cuenta => {
    const matchesSearch = 
      cuenta.nroCuenta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cuenta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cuenta.nroCuit.includes(searchTerm);
    
    if (showOnlyActive) {
      return matchesSearch && !cuenta.fechaBaja;
    }
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredCuentas.length / itemsPerPage);
  const currentPageData = filteredCuentas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-primary">Cuentas Remuneradas</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {selectedRow ? '1 cuenta seleccionada' : 'Ninguna cuenta seleccionada'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="destructive" 
            className="flex items-center gap-2"
            onClick={() => setShowDeleteDialog(true)}
            disabled={!selectedRow}
          >
            <Trash2 className="h-4 w-4" />
            Dar de Baja
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleExportExcel}
          >
            <Download className="h-4 w-4" />
            Exportar Excel
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowParametersDialog(true)}
            disabled={!selectedRow}
          >
            <Settings className="h-4 w-4" />
            Parámetros
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowNewAccountDialog(true)}
          >
            <PlusCircle className="h-4 w-4" />
            Nueva Cuenta
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cuenta, nombre o CUIT..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="activeOnly"
                  checked={showOnlyActive}
                  onCheckedChange={(checked) => {
                    setShowOnlyActive(checked as boolean);
                    setCurrentPage(1);
                  }}
                />
                <label
                  htmlFor="activeOnly"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Solo cuentas vigentes
                </label>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>CUIT</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Cuenta</TableHead>
                    <TableHead>Divisa</TableHead>
                    <TableHead>Sucursal</TableHead>
                    <TableHead>Alta</TableHead>
                    <TableHead>Usuario Alta</TableHead>
                    <TableHead>Baja</TableHead>
                    <TableHead>Usuario Baja</TableHead>
                    <TableHead>Inicio</TableHead>
                    <TableHead className="text-right">Mínimo Diario</TableHead>
                    <TableHead className="text-right">Var. Tasa</TableHead>
                    <TableHead className="text-right">Saldo Prom.</TableHead>
                    <TableHead className="text-right">Tasa Prom.</TableHead>
                    <TableHead>Cuenta Rel.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPageData.map((cuenta) => (
                    <TableRow 
                      key={cuenta.id}
                      className={`cursor-pointer hover:bg-accent/50 transition-colors ${selectedRow === cuenta.id ? "bg-primary/10" : ""}`}
                      onClick={() => setSelectedRow(selectedRow === cuenta.id ? null : cuenta.id)}
                    >
                      <TableCell className="font-medium">{cuenta.nombre}</TableCell>
                      <TableCell>{cuenta.nroCuit}</TableCell>
                      <TableCell>{cuenta.producto}</TableCell>
                      <TableCell>{cuenta.tipoCuenta}</TableCell>
                      <TableCell>{cuenta.nroCuenta}</TableCell>
                      <TableCell>{cuenta.divisa}</TableCell>
                      <TableCell>{cuenta.sucursal}</TableCell>
                      <TableCell>{cuenta.fechaAlta}</TableCell>
                      <TableCell>{cuenta.usuarioAlta}</TableCell>
                      <TableCell>{cuenta.fechaBaja || '-'}</TableCell>
                      <TableCell>{cuenta.usuarioBaja || '-'}</TableCell>
                      <TableCell>{cuenta.fechaInicio}</TableCell>
                      <TableCell className="text-right">${cuenta.minimoDiario.toLocaleString('es-AR')}</TableCell>
                      <TableCell className="text-right">{cuenta.variacionTasaGenerica}%</TableCell>
                      <TableCell className="text-right">${cuenta.saldoPromDiario.toLocaleString('es-AR')}</TableCell>
                      <TableCell className="text-right">{cuenta.saldoPromDiarioTasa}%</TableCell>
                      <TableCell>{cuenta.cuentaRelacionada}</TableCell>
                    </TableRow>
                  ))}
                  {currentPageData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={18} className="text-center py-4 text-muted-foreground">
                        No se encontraron cuentas
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Mostrando {currentPageData.length} de {filteredCuentas.length} registros
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <NuevaCuentaDialog 
        open={showNewAccountDialog} 
        onOpenChange={setShowNewAccountDialog} 
        onAccountCreated={handleAccountCreated}
      />

      <ParametrosDialog
        open={showParametersDialog}
        onOpenChange={setShowParametersDialog}
        cuenta={selectedAccount ? {
          nroCuenta: selectedAccount.nroCuenta,
          nombre: selectedAccount.nombre
        } : null}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción dará de baja la cuenta remunerada seleccionada.
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}