import React from 'react';
import { EmployeeForm } from '../components/EmployeeForm';

export function NewEmployee() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Yeni Personel Maaş Kaydı</h2>
      <EmployeeForm />
    </div>
  );
}