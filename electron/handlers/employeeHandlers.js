import { ipcMain } from 'electron';
import Employee from '../db/models/Employee.js';
import { calculateTotalAmount } from '../utils/calculations.js';

export function setupEmployeeHandlers() {
  ipcMain.handle('employee:create', async (event, data) => {
    try {
      const totalAmount = calculateTotalAmount(data);
      const employee = await Employee.create({ ...data, totalAmount });
      return employee;
    } catch (error) {
      console.error('Create employee error:', error);
      throw error;
    }
  });

  ipcMain.handle('employee:search', async (event, params) => {
    try {
      const where = {};
      if (params.employeeId) where.employeeId = params.employeeId;
      if (params.period) where.period = params.period;

      const employees = await Employee.findAll({ where });
      return employees;
    } catch (error) {
      console.error('Search employees error:', error);
      throw error;
    }
  });

  ipcMain.handle('employee:update', async (event, { id, ...data }) => {
    try {
      const employee = await Employee.findByPk(id);
      if (!employee) throw new Error('Employee not found');

      const totalAmount = calculateTotalAmount(data);
      await employee.update({ ...data, totalAmount });
      return employee;
    } catch (error) {
      console.error('Update employee error:', error);
      throw error;
    }
  });

  ipcMain.handle('employee:delete', async (event, { id }) => {
    try {
      const employee = await Employee.findByPk(id);
      if (!employee) throw new Error('Employee not found');

      await employee.destroy();
      return true;
    } catch (error) {
      console.error('Delete employee error:', error);
      throw error;
    }
  });
}