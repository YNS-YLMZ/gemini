import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Employee } from '../types';
import { generatePeriods } from '../utils/periods';
import { Search } from 'lucide-react';

const searchSchema = z.object({
  employeeId: z.string().length(7, 'Sicil numarası 7 haneli olmalıdır').regex(/^\d+$/, 'Sadece rakam giriniz'),
  period: z.string().min(1, 'Dönem seçiniz'),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface EmployeeSearchProps {
  onSelect: (employee: Employee) => void;
}

export function EmployeeSearch({ onSelect }: EmployeeSearchProps) {
  const [searchResults, setSearchResults] = useState<Employee[]>([]);
  const periods = generatePeriods();

  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSearch = async (data: SearchFormData) => {
    try {
      const results = await window.electron.invoke('employee:search', data);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSearch)} className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sicil Numarası
            <input
              type="text"
              maxLength={7}
              {...register('employeeId')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          {errors.employeeId && (
            <p className="text-red-500 text-sm mt-1">{errors.employeeId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dönem
            <select
              {...register('period')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="">Seçiniz</option>
              {periods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </label>
          {errors.period && (
            <p className="text-red-500 text-sm mt-1">{errors.period.message}</p>
          )}
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Search size={18} />
            Ara
          </button>
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Arama Sonuçları</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sicil No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ad Soyad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dönem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Maaş (USD)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlem
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.map((employee) => (
                  <tr key={`${employee.employeeId}-${employee.period}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.employeeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.firstName} {employee.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${employee.salaryUSD}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => onSelect(employee)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Düzenle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}