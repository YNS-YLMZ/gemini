import { ipcMain } from 'electron';
import * as XLSX from 'xlsx';
import path from 'path';
import { app } from 'electron';
import Employee from '../db/models/Employee.js';
import { calculateTotalAmount } from '../utils/calculations.js';

export function setupExcelHandlers() {
  ipcMain.handle('excel:import', async (event, filePath) => {
    try {
      const workbook = XLSX.readFile(filePath);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);

      let imported = 0;
      for (const row of data) {
        const totalAmount = calculateTotalAmount(row);
        await Employee.create({ ...row, totalAmount });
        imported++;
      }

      return { imported };
    } catch (error) {
      console.error('Import excel error:', error);
      throw error;
    }
  });

  ipcMain.handle('excel:export', async (event, params) => {
    try {
      const where = {};
      if (params.employeeId) where.employeeId = params.employeeId;
      if (params.startPeriod) where.period = { [Op.between]: [params.startPeriod, params.endPeriod] };

      const employees = await Employee.findAll({ where });
      const worksheet = XLSX.utils.json_to_sheet(employees);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

      const filePath = path.join(app.getPath('downloads'), `employees_${Date.now()}.xlsx`);
      XLSX.writeFile(workbook, filePath);

      return filePath;
    } catch (error) {
      console.error('Export excel error:', error);
      throw error;
    }
  });

  ipcMain.handle('excel:downloadTemplate', async () => {
    try {
      const template = [
        {
          employeeId: '1234567',
          period: 'Ocak 24',
          firstName: 'JOHN',
          lastName: 'DOE',
          salaryUSD: 1000,
          bonusUSD: 0,
          bonusRUB: 0,
          bankAdvanceRUB: 0,
          advancePaymentRUB: 0,
          bankSalaryRUB: 0,
          cashSalaryRUB: 0,
          exchangeRate: 92.5
        }
      ];

      const worksheet = XLSX.utils.json_to_sheet(template);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

      const filePath = path.join(app.getPath('downloads'), 'employee_template.xlsx');
      XLSX.writeFile(workbook, filePath);

      return filePath;
    } catch (error) {
      console.error('Download template error:', error);
      throw error;
    }
  });
}