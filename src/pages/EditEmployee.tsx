import React from 'react';
import { EmployeeSearch } from '../components/EmployeeSearch';
import { EmployeeForm } from '../components/EmployeeForm';
import { Employee } from '../types';

export function EditEmployee() {
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Personel Maaş Kaydı Güncelleme</h2>
      
      <EmployeeSearch onSelect={setSelectedEmployee} />
      
      {selectedEmployee && (
        <EmployeeForm 
          initialData={selectedEmployee}
          mode="update"
        />
      )}
    </div>
  );
}