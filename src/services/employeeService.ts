import { EMPLOYEE_CHANNELS } from '../config/constants';
import type { Employee, EmployeeSearchParams } from '../types';

export async function createEmployee(data: Partial<Employee>): Promise<Employee> {
  try {
    const employee = await window.electron.invoke(EMPLOYEE_CHANNELS.CREATE, data);
    return employee;
  } catch (error) {
    console.error('Create employee failed:', error);
    throw new Error('Personel kaydı oluşturulurken bir hata oluştu');
  }
}

export async function searchEmployees(params: EmployeeSearchParams): Promise<Employee[]> {
  try {
    const employees = await window.electron.invoke(EMPLOYEE_CHANNELS.SEARCH, params);
    return employees;
  } catch (error) {
    console.error('Search employees failed:', error);
    throw new Error('Personel araması yapılırken bir hata oluştu');
  }
}

export async function updateEmployee(id: number, data: Partial<Employee>): Promise<Employee> {
  try {
    const employee = await window.electron.invoke(EMPLOYEE_CHANNELS.UPDATE, { id, ...data });
    return employee;
  } catch (error) {
    console.error('Update employee failed:', error);
    throw new Error('Personel kaydı güncellenirken bir hata oluştu');
  }
}

export async function deleteEmployee(id: number): Promise<void> {
  try {
    await window.electron.invoke(EMPLOYEE_CHANNELS.DELETE, { id });
  } catch (error) {
    console.error('Delete employee failed:', error);
    throw new Error('Personel kaydı silinirken bir hata oluştu');
  }
}