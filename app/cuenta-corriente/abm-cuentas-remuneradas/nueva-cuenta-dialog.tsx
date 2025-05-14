"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buscarCuentasDisponibles, verificarCuentaRemunerada, type CuentaDisponible } from '@/lib/data/cuentasDisponiblesMock';
import { crearCuentaRemunerada } from '@/lib/services/cuentasService';

interface NuevaCuentaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccountCreated?: () => void;
}

export function NuevaCuentaDialog({ open, onOpenChange, onAccountCreated }: NuevaCuentaDialogProps) {
  const [cuit, setCuit] = useState('');
  const [divisa, setDivisa] = useState('PESOS');
  const [cuentas, setCuentas] = useState<CuentaDisponible[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const itemsPerPage = 5;

  useEffect(() => {
    if (open) {
      handleSearch();
    } else {
      setCurrentPage(1);
    }
  }, [divisa, open]);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const results = await buscarCuentasDisponibles(cuit, divisa);
      setCuentas(results);
      setSelectedAccounts([]);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error al buscar cuentas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDivisaChange = (value: string) => {
    setDivisa(value);
  };

  const handleCuitChange = (value: string) => {
    setCuit(value);
    if (value.length >= 11) {
      handleSearch();
    }
  };

  const toggleAccount = (id: string) => {
    setSelectedAccounts(prev => 
      prev.includes(id) 
        ? prev.filter(accId => accId !== id)
        : [...prev, id]
    );
  };

  const getDivisaDisplay = (divisa: string) => {
    switch (divisa) {
      case '0': return '0';
      case '2': return '2';
      case '999': return '999';
      default: return divisa;
    }
  };

  const handleSave = async () => {
    if (selectedAccounts.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debe seleccionar al menos una cuenta."
      });
      return;
    }

    try {
      setIsLoading(true);
      
      for (const accountId of selectedAccounts) {
        const account = cuentas.find(c => c.id === accountId);
        if (!account) continue;

        const isAlreadyRemunerada = await verificarCuentaRemunerada(account.nroCuenta);
        if (isAlreadyRemunerada) {
          toast({
            variant: "destructive",
            title: "Error",
            description: `La cuenta ${account.nroCuenta} ya está registrada como remunerada.`
          });
          return;
        }

        await crearCuentaRemunerada({
          nombre: account.nombre,
          nroCuit: account.nroCuit,
          producto: account.producto,
          tipoCuenta: account.tipoCuenta,
          nroCuenta: account.nroCuenta,
          divisa: account.divisa,
          sucursal: 'Casa Central'
        });
      }

      toast({
        title: "Éxito",
        description: `Se han registrado ${selectedAccounts.length} cuentas como remuneradas.`
      });
      
      onAccountCreated?.();
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron guardar las cuentas remuneradas."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Pagination
  const totalPages = Math.ceil(cuentas.length / itemsPerPage);
  const currentPageData = cuentas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Nueva Cuenta Remunerada</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-[1fr,200px,auto]">
            <div className="relative">
              <Input
                placeholder="Ingrese CUIT..."
                value={cuit}
                onChange={(e) => handleCuitChange(e.target.value)}
              />
            </div>
            
            <Select value={divisa} onValueChange={handleDivisaChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione divisa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PESOS">Pesos</SelectItem>
                <SelectItem value="DOLARES">Dólares</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Buscar
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>CUIT</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Cuenta</TableHead>
                  <TableHead>Divisa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.map((cuenta) => (
                  <TableRow key={cuenta.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedAccounts.includes(cuenta.id)}
                        onCheckedChange={() => toggleAccount(cuenta.id)}
                      />
                    </TableCell>
                    <TableCell>{cuenta.nombre}</TableCell>
                    <TableCell>{cuenta.nroCuit}</TableCell>
                    <TableCell>{cuenta.producto}</TableCell>
                    <TableCell>{cuenta.tipoCuenta}</TableCell>
                    <TableCell>{cuenta.nroCuenta}</TableCell>
                    <TableCell>{getDivisaDisplay(cuenta.divisa)}</TableCell>
                  </TableRow>
                ))}
                {cuentas.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      {isLoading ? 'Cargando...' : 'No se encontraron cuentas disponibles'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {cuentas.length > 0 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Mostrando {currentPageData.length} de {cuentas.length} registros
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
          )}

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={selectedAccounts.length === 0 || isLoading}
            >
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}