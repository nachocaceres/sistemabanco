"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Search } from "lucide-react";

interface ValidationErrors {
  fechaInicio?: string;
  saldoMinimo?: string;
  diferencial?: string;
  promedioMinimo?: string;
  aumentoTasa?: string;
}

interface ParametrosDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cuenta: {
    nroCuenta: string;
    nombre: string;
  } | null;
}

interface CuentaRelacionada {
  id: string;
  nroCuenta: string;
  nombre: string;
  estado: string;
}

interface NuevaCuentaForm {
  tipoCuenta: string;
  numeroCuenta: string;
  cuit: string;
  denominacion: string;
}

interface NuevaCuentaErrors {
  numeroCuenta?: string;
  cuit?: string;
  general?: string;
}

const mockCuentasRelacionadas: CuentaRelacionada[] = [
  {
    id: "1",
    nroCuenta: "0720111222334",
    nombre: "Cuenta Relacionada 1",
    estado: "Activa"
  },
  {
    id: "2",
    nroCuenta: "0720111222335",
    nombre: "Cuenta Relacionada 2",
    estado: "Activa"
  },
  {
    id: "3",
    nroCuenta: "0720111222336",
    nombre: "Cuenta Relacionada 3",
    estado: "Activa"
  },
  {
    id: "4",
    nroCuenta: "0720111222337",
    nombre: "Cuenta Relacionada 4",
    estado: "Activa"
  },
  {
    id: "5",
    nroCuenta: "0720111222338",
    nombre: "Cuenta Relacionada 5",
    estado: "Activa"
  }
];

function NuevaCuentaDialog({ open, onOpenChange, onAccountAdded }: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  onAccountAdded: (account: CuentaRelacionada) => void;
}) {
  const [form, setForm] = useState<NuevaCuentaForm>({
    tipoCuenta: 'CC',
    numeroCuenta: '',
    cuit: '',
    denominacion: ''
  });
  const [errors, setErrors] = useState<{
    numeroCuenta?: string;
    cuit?: string;
    general?: string;
  }>({});

  const handleInputChange = (field: keyof NuevaCuentaForm, value: string) => {
    let processedValue = value;
    
    if (field === 'numeroCuenta') {
      processedValue = value.replace(/\D/g, '');
      const error = !processedValue ? '' : 
        !/^\d+$/.test(processedValue) ? 'El número de cuenta debe contener solo números' : '';
      setErrors(prev => ({ ...prev, numeroCuenta: error }));
    } 
    else if (field === 'cuit') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 11) {
        if (digits.length <= 2) {
          processedValue = digits;
        } else if (digits.length <= 10) {
          processedValue = `${digits.slice(0, 2)}-${digits.slice(2)}`;
        } else {
          processedValue = `${digits.slice(0, 2)}-${digits.slice(2, 10)}-${digits.slice(10)}`;
        }
      } else {
        return;
      }
      
      const error = !processedValue ? '' :
        !/^\d{2}-?\d{8}-?\d{1}$/.test(processedValue.replace(/-/g, '')) ? 
        'El CUIT debe tener el formato XX-XXXXXXXX-X' : '';
      setErrors(prev => ({ ...prev, cuit: error }));
    }

    setForm(prev => ({ ...prev, [field]: processedValue }));
  };

  const validateNumeroCuenta = (value: string): boolean => {
    return /^\d+$/.test(value);
  };

  const validateCUIT = (value: string): boolean => {
    const cleanCUIT = value.replace(/-/g, '');
    return /^\d{11}$/.test(cleanCUIT);
  };

  const handleSearch = () => {
    const newErrors: NuevaCuentaErrors = {};

    if (form.numeroCuenta && !validateNumeroCuenta(form.numeroCuenta)) {
      newErrors.numeroCuenta = 'El número de cuenta debe contener solo números';
    }

    if (form.cuit && !validateCUIT(form.cuit)) {
      newErrors.cuit = 'El CUIT debe contener 11 números';
    }

    if (!form.numeroCuenta && !form.cuit) {
      newErrors.general = 'Ingrese un número de cuenta o CUIT para buscar';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setForm({
      ...form,
      cuit: '30-64893514-2',
      numeroCuenta: form.numeroCuenta || '2035604',
      denominacion: 'A.M. DE ROMANG FC ROMANG'
    });
  };

  const handleAccept = () => {
    if (!form.numeroCuenta || !form.denominacion) {
      setErrors({ general: 'Por favor complete todos los campos requeridos' });
      return;
    }

    const newAccount: CuentaRelacionada = {
      id: Date.now().toString(),
      nroCuenta: form.numeroCuenta,
      nombre: form.denominacion,
      estado: "Activa"
    };

    onAccountAdded(newAccount);
    onOpenChange(false);
    setForm({
      tipoCuenta: 'CC',
      numeroCuenta: '',
      cuit: '',
      denominacion: ''
    });
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Cuenta Relacionada</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-[200px,1fr] gap-2 items-start">
            <Select 
              value={form.tipoCuenta}
              onValueChange={(value) => handleInputChange('tipoCuenta', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de cuenta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CC">Cuenta Corriente</SelectItem>
                <SelectItem value="CA">Caja de Ahorro</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <div className="flex-1 space-y-1">
                <Input
                  placeholder="Número de cuenta"
                  value={form.numeroCuenta}
                  onChange={(e) => handleInputChange('numeroCuenta', e.target.value)}
                  className={errors.numeroCuenta ? "border-destructive" : ""}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                {errors.numeroCuenta && (
                  <p className="text-sm text-destructive">{errors.numeroCuenta}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <div className="flex-1 space-y-1">
              <Input
                placeholder="CUIT/CUIL"
                value={form.cuit}
                onChange={(e) => handleInputChange('cuit', e.target.value)}
                className={errors.cuit ? "border-destructive" : ""}
                inputMode="numeric"
                pattern="[0-9-]*"
              />
              {errors.cuit && (
                <p className="text-sm text-destructive">{errors.cuit}</p>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleSearch}
              className="shrink-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {errors.general && (
            <p className="text-sm text-destructive">{errors.general}</p>
          )}

          {form.denominacion && (
            <div className="text-sm text-muted-foreground">
              {form.denominacion}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAccept}>
              Aceptar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ParametrosDialog({ open, onOpenChange, cuenta }: ParametrosDialogProps) {
  const [fechaInicio, setFechaInicio] = useState('08/09/2022');
  const [saldoMinimo, setSaldoMinimo] = useState('10000000.00');
  const [diferencial, setDiferencial] = useState('0.00');
  const [promedioMinimo, setPromedioMinimo] = useState('20500000.00');
  const [aumentoTasa, setAumentoTasa] = useState('2.00');
  const [showNewAccountDialog, setShowNewAccountDialog] = useState(false);
  const [cuentasRelacionadas, setCuentasRelacionadas] = useState(mockCuentasRelacionadas);
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const itemsPerPage = 3;
  const totalPages = Math.ceil(cuentasRelacionadas.length / itemsPerPage);
  const currentPageData = cuentasRelacionadas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const validateDate = (date: string) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    if (!regex.test(date)) {
      return false;
    }
    
    const [day, month, year] = date.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.getDate() === day && dateObj.getMonth() === month - 1 && dateObj.getFullYear() === year;
  };

  const validateDecimal = (value: string, maxValue?: number) => {
    const regex = /^\d+(\.\d{0,2})?$/;
    if (!regex.test(value)) {
      return false;
    }
    if (maxValue !== undefined) {
      return parseFloat(value) <= maxValue;
    }
    return true;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!validateDate(fechaInicio)) {
      newErrors.fechaInicio = 'La fecha debe tener el formato dd/mm/yyyy';
    }

    if (!validateDecimal(diferencial, 100)) {
      newErrors.diferencial = 'El diferencial debe ser un número con hasta 2 decimales y no mayor a 100%';
    }

    if (!validateDecimal(aumentoTasa, 100)) {
      newErrors.aumentoTasa = 'El aumento de tasa debe ser un número con hasta 2 decimales y no mayor a 100%';
    }

    const promedioMinimoNum = parseFloat(promedioMinimo);
    const aumentoTasaNum = parseFloat(aumentoTasa);

    if (promedioMinimoNum > 0 && aumentoTasaNum === 0) {
      newErrors.aumentoTasa = 'Si ingresa un promedio mínimo, el aumento de tasa no puede ser 0';
    }

    if (aumentoTasaNum > 0 && promedioMinimoNum === 0) {
      newErrors.promedioMinimo = 'Si ingresa un aumento de tasa, el promedio mínimo no puede ser 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    const parametros = {
      fechaInicio,
      saldoMinimo: parseFloat(saldoMinimo),
      diferencial: parseFloat(diferencial),
      promedioMinimo: parseFloat(promedioMinimo),
      aumentoTasa: parseFloat(aumentoTasa),
      cuentasRelacionadas: cuentasRelacionadas.map(cuenta => ({
        nroCuenta: cuenta.nroCuenta,
        estado: cuenta.estado
      }))
    };

    console.log('Saving parameters:', parametros);
    onOpenChange(false);
  };

  const handleDeleteRelatedAccount = (id: string) => {
    setCuentasRelacionadas(prev => prev.filter(cuenta => cuenta.id !== id));
  };

  const handleAddAccount = (newAccount: CuentaRelacionada) => {
    setCuentasRelacionadas(prev => [...prev, newAccount]);
  };

  if (!cuenta) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Parametrización Remuneración Cuentas a la Vista</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-lg font-medium text-primary">
              Cuenta Nro.: {cuenta.nroCuenta} - {cuenta.nombre}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha Inicio</label>
                <Input
                  value={fechaInicio}
                  onChange={(e) => {
                    setFechaInicio(e.target.value);
                    setErrors(prev => ({ ...prev, fechaInicio: undefined }));
                  }}
                  placeholder="dd/mm/yyyy"
                  className={errors.fechaInicio ? "border-destructive" : ""}
                />
                {errors.fechaInicio && (
                  <p className="text-sm text-destructive">{errors.fechaInicio}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Saldo mínimo</label>
                <Input
                  value={saldoMinimo}
                  onChange={(e) => {
                    setSaldoMinimo(e.target.value);
                    setErrors(prev => ({ ...prev, saldoMinimo: undefined }));
                  }}
                  type="number"
                  step="0.01"
                  className={errors.saldoMinimo ? "border-destructive" : ""}
                />
                {errors.saldoMinimo && (
                  <p className="text-sm text-destructive">{errors.saldoMinimo}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Diferencial sobre tasa genérica (%)</label>
                <Input
                  value={diferencial}
                  onChange={(e) => {
                    setDiferencial(e.target.value);
                    setErrors(prev => ({ ...prev, diferencial: undefined }));
                  }}
                  type="number"
                  step="0.01"
                  max="100"
                  className={errors.diferencial ? "border-destructive" : ""}
                />
                {errors.diferencial && (
                  <p className="text-sm text-destructive">{errors.diferencial}</p>
                )}
              </div>
            </div>

            <div className="space-y-4 border rounded-lg p-4 bg-muted/10">
              <h3 className="font-medium mb-4">Promedio Mensual</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">Prom. Min. P/ tasa</label>
                <Input
                  value={promedioMinimo}
                  onChange={(e) => {
                    setPromedioMinimo(e.target.value);
                    setErrors(prev => ({ ...prev, promedioMinimo: undefined }));
                  }}
                  type="number"
                  step="0.01"
                  className={errors.promedioMinimo ? "border-destructive" : ""}
                />
                {errors.promedioMinimo && (
                  <p className="text-sm text-destructive">{errors.promedioMinimo}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Aumento de tasa (%)</label>
                <Input
                  value={aumentoTasa}
                  onChange={(e) => {
                    setAumentoTasa(e.target.value);
                    setErrors(prev => ({ ...prev, aumentoTasa: undefined }));
                  }}
                  type="number"
                  step="0.01"
                  max="100"
                  className={errors.aumentoTasa ? "border-destructive" : ""}
                />
                {errors.aumentoTasa && (
                  <p className="text-sm text-destructive">{errors.aumentoTasa}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Cuentas Relacionadas</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNewAccountDialog(true)}
              >
                Nuevo
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cuenta</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPageData.map((cuenta) => (
                    <TableRow key={cuenta.id}>
                      <TableCell>{cuenta.nroCuenta}</TableCell>
                      <TableCell>{cuenta.nombre}</TableCell>
                      <TableCell>{cuenta.estado}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteRelatedAccount(cuenta.id)}
                          className="h-8 w-8 p-0 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">
              Baja
            </Button>
            <Button onClick={handleSave}>
              Aceptar
            </Button>
          </div>
        </div>

        <NuevaCuentaDialog
          open={showNewAccountDialog}
          onOpenChange={setShowNewAccountDialog}
          onAccountAdded={handleAddAccount}
        />
      </DialogContent>
    </Dialog>
  );
}