import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FileUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Employee } from '../types';

export function ImportExcel() {
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    message: string;
    records?: number;
  } | null>(null);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: { file: FileList }) => {
    const file = data.file[0];
    if (!file) return;

    try {
      setImporting(true);
      const formData = new FormData();
      formData.append('file', file);

      const result = await window.electron.invoke('excel:import', file.path);
      
      setImportResult({
        success: true,
        message: 'Veriler başarıyla içe aktarıldı.',
        records: result.imported,
      });
    } catch (error) {
      setImportResult({
        success: false,
        message: 'Veri aktarımı sırasında bir hata oluştu.',
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Excel'den Veri İçe Aktarma</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Önemli Bilgiler</h3>
        <ul className="list-disc list-inside space-y-2 text-blue-700">
          <li>Excel dosyanız aşağıdaki sütunları içermelidir:</li>
          <li className="ml-6">
            Sicil No, Dönem, Ad, Soyad, Maaş (USD), Ek Ödeme (USD), Ek Ödeme (RUB),
            Banka Avans (RUB), Avans Ödemesi (RUB), Banka Maaş (RUB), Elden Maaş (RUB),
            Döviz Kuru
          </li>
          <li>Tüm sayısal değerler pozitif olmalıdır</li>
          <li>Sicil numarası 7 haneli olmalıdır</li>
          <li>Ad ve Soyad sadece Latin karakterler içermelidir</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Excel Dosyası Seçin
            <input
              type="file"
              accept=".xlsx,.xls"
              {...register('file')}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={importing}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          <FileUp size={18} />
          {importing ? 'İçe Aktarılıyor...' : 'İçe Aktar'}
        </button>
      </form>

      {importResult && (
        <div
          className={`mt-4 p-4 rounded-md ${
            importResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {importResult.success ? (
              <CheckCircle2 className="text-green-500" size={20} />
            ) : (
              <AlertTriangle className="text-red-500" size={20} />
            )}
            <p className="font-medium">{importResult.message}</p>
          </div>
          {importResult.records && (
            <p className="mt-2 text-sm">
              Toplam {importResult.records} kayıt içe aktarıldı.
            </p>
          )}
        </div>
      )}
    </div>
  );
}