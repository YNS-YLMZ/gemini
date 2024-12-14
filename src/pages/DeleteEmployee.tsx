import React, { useState } from 'react';
import { EmployeeSearch } from '../components/EmployeeSearch';
import { Employee } from '../types';
import { AlertDialog } from '../components/AlertDialog';
import { formatCurrency } from '../utils/periods';
import { Trash2 } from 'lucide-react';

export function DeleteEmployee() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedEmployee) return;

    try {
      setIsDeleting(true);
      await window.electron.invoke('employee:delete', {
        employeeId: selectedEmployee.employeeId,
        period: selectedEmployee.period,
      });
      setShowConfirmDialog(false);
      setSelectedEmployee(null);
      // Show success message
    } catch (error) {
      console.error('Delete failed:', error);
      // Show error message
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Personel Maaş Kaydı Silme</h2>
      
      <EmployeeSearch 
        onSelect={setSelectedEmployee}
        mode="delete"
      />
      
      {selectedEmployee && (
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Seçili Kayıt Detayları</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Sicil Numarası</p>
              <p className="font-medium">{selectedEmployee.employeeId}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Dönem</p>
              <p className="font-medium">{selectedEmployee.period}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Ad Soyad</p>
              <p className="font-medium">
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Maaş (USD)</p>
              <p className="font-medium">
                {formatCurrency(selectedEmployee.salaryUSD, 'USD')}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Toplam Tutar (RUB)</p>
              <p className="font-medium">
                {formatCurrency(selectedEmployee.totalAmount, 'RUB')}
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => setShowConfirmDialog(true)}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              disabled={isDeleting}
            >
              <Trash2 size={18} />
              {isDeleting ? 'Siliniyor...' : 'Kaydı Sil'}
            </button>
          </div>
        </div>
      )}

      <AlertDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleDelete}
        title="Kayıt Silme Onayı"
        message={`${selectedEmployee?.employeeId} sicil numaralı personelin ${selectedEmployee?.period} dönemine ait kaydını silmek istediğinizden emin misiniz?`}
        confirmLabel="Evet, Sil"
        cancelLabel="İptal"
      />
    </div>
  );
}