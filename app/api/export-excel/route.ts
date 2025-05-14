import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { cuentasRemuneradasABM } from '@/lib/data/cuentasRemuneradasMock';

export async function GET() {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Cuentas Remuneradas');

    worksheet.columns = [
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'CUIT', key: 'nroCuit', width: 15 },
      { header: 'Producto', key: 'producto', width: 25 },
      { header: 'Tipo Cuenta', key: 'tipoCuenta', width: 15 },
      { header: 'Nro. Cuenta', key: 'nroCuenta', width: 15 },
      { header: 'Divisa', key: 'divisa', width: 10 },
      { header: 'Sucursal', key: 'sucursal', width: 20 },
      { header: 'Fecha Alta', key: 'fechaAlta', width: 12 },
      { header: 'Usuario Alta', key: 'usuarioAlta', width: 15 },
      { header: 'Fecha Baja', key: 'fechaBaja', width: 12 },
      { header: 'Usuario Baja', key: 'usuarioBaja', width: 15 },
      { header: 'Fecha Inicio', key: 'fechaInicio', width: 12 },
      { header: 'Mínimo Diario', key: 'minimoDiario', width: 15 },
      { header: 'Variación Tasa', key: 'variacionTasaGenerica', width: 15 },
      { header: 'Saldo Prom. Diario', key: 'saldoPromDiario', width: 18 },
      { header: 'Tasa Prom. Diaria', key: 'saldoPromDiarioTasa', width: 18 },
      { header: 'Cuenta Relacionada', key: 'cuentaRelacionada', width: 20 }
    ];

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE2F0D9' }
    };

    cuentasRemuneradasABM.forEach(cuenta => {
      worksheet.addRow({
        ...cuenta,
        minimoDiario: cuenta.minimoDiario,
        saldoPromDiario: cuenta.saldoPromDiario,
        variacionTasaGenerica: `${cuenta.variacionTasaGenerica}%`,
        saldoPromDiarioTasa: `${cuenta.saldoPromDiarioTasa}%`
      });
    });

    worksheet.getColumn('minimoDiario').numFmt = '"$"#,##0.00';
    worksheet.getColumn('saldoPromDiario').numFmt = '"$"#,##0.00';

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=CuentasRemuneradas.xlsx'
      }
    });
  } catch (error) {
    console.error('Error generating Excel:', error);
    return NextResponse.json({ error: 'Error generating Excel file' }, { status: 500 });
  }
}