import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileDown, Download } from 'lucide-react';
import { generatePeriods } from '../utils/periods';

const exportSchema = z.object({
  startPeriod: z.string().min(1, 'Başlangıç dönemi seçiniz'),
  endPeriod: z.string().min(1, 'Bitiş dönemi seçiniz'),
  employeeId: z.string().optional(),
});

type ExportFormData = z.infer<typeof exportSchema>;

export function ExportExcel() {
  const [exporting, setExporting] = useState(false);
  const periods = generatePeriods();

  const { register, handleSubmit, formState: { errors } } = useForm<ExportFormData>({
    resolver: zodResolver(exportSchema),
  });

  const onSubmit = async (data: ExportFormData) => {
    try {
      setExporting(true);
      await window.electron.invoke('excel:export', data);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Excel'e Veri Aktarma</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Başlangıç Dönemi
              <select
                {...register('startPeriod')}
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
            {errors.startPeriod && (
              <p className="text-red-500 text-sm mt-1">{errors.startPeriod.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bitiş Dönemi
              <select
                {...register('endPeriod')}
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
            {errors.endPeriod && (
              <p className="text-red-500 text-sm mt-1">{errors.endPeriod.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Sicil Numarası (Opsiyonel)
              <input
                type="text"
                maxLength={7}
                placeholder="Tüm personel için boş bırakın"
                {...register('employeeId')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </label>
            {errors.employeeId && (
              <p className="text-red-500 text-sm mt-1">{errors.employeeId.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={exporting}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <FileDown size={18} />
            {exporting ? 'Dışa Aktarılıyor...' : 'Excel\'e Aktar'}
          </button>

          <button
            type="button"
            onClick={() => window.electron.invoke('excel:downloadTemplate')}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <Download size={18} />
            Örnek Excel Şablonu İndir
          </button>
        </div>
      </form>
    </div>
  );
}