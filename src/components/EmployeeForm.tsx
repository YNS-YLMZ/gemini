import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generatePeriods } from '../utils/periods';
import { calculateTotalAmount } from '../utils/calculations';

const employeeSchema = z.object({
  employeeId: z.string().length(7, 'Sicil numarası 7 haneli olmalıdır').regex(/^\d+$/, 'Sadece rakam giriniz'),
  period: z.string().min(1, 'Dönem seçiniz'),
  firstName: z.string()
    .min(1, 'Ad giriniz')
    .regex(/^[A-Za-z\s]+$/, 'Sadece Latin harfleri kullanınız'),
  lastName: z.string()
    .min(1, 'Soyad giriniz')
    .regex(/^[A-Za-z\s]+$/, 'Sadece Latin harfleri kullanınız'),
  salaryUSD: z.number().min(0, 'Geçerli bir maaş giriniz'),
  bonusUSD: z.number().min(0, 'Geçerli bir tutar giriniz'),
  bonusRUB: z.number().min(0, 'Geçerli bir tutar giriniz'),
  bankAdvanceRUB: z.number().min(0, 'Geçerli bir tutar giriniz'),
  advancePaymentRUB: z.number().min(0, 'Geçerli bir tutar giriniz'),
  bankSalaryRUB: z.number().min(0, 'Geçerli bir tutar giriniz'),
  cashSalaryRUB: z.number().min(0, 'Geçerli bir tutar giriniz'),
  exchangeRate: z.number().min(0, 'Geçerli bir kur giriniz'),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

export function EmployeeForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      bonusUSD: 0,
      bonusRUB: 0,
      bankAdvanceRUB: 0,
      advancePaymentRUB: 0,
      bankSalaryRUB: 0,
      cashSalaryRUB: 0,
    },
  });

  const periods = generatePeriods();
  const watchAllFields = watch();

  useEffect(() => {
    const totalAmount = calculateTotalAmount(watchAllFields);
    setValue('totalAmount', totalAmount);
  }, [watchAllFields, setValue]);

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await window.electron.invoke('employee:create', data);
      // Handle success (show message, clear form, etc.)
    } catch (error) {
      // Handle error
      console.error('Failed to save employee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ad
            <input
              type="text"
              {...register('firstName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Soyad
            <input
              type="text"
              {...register('lastName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Maaş (USD)
            <input
              type="number"
              step="0.01"
              {...register('salaryUSD', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          {errors.salaryUSD && (
            <p className="text-red-500 text-sm mt-1">{errors.salaryUSD.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ek Ödeme (USD)
            <input
              type="number"
              step="0.01"
              {...register('bonusUSD', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          {errors.bonusUSD && (
            <p className="text-red-500 text-sm mt-1">{errors.bonusUSD.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ek Ödeme (RUB)
            <input
              type="number"
              step="0.01"
              {...register('bonusRUB', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          {errors.bonusRUB && (
            <p className="text-red-500 text-sm mt-1">{errors.bonusRUB.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Banka Avans %30 (RUB)
            <input
              type="number"
              step="0.01"
              {...register('bankAdvanceRUB', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          {errors.bankAdvanceRUB && (
            <p className="text-red-500 text-sm mt-1">{errors.bankAdvanceRUB.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Avans Ödemesi (RUB)
            <input
              type="number"
              step="0.01"
              {...register('advancePaymentRUB', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          {errors.advancePaymentRUB && (
            <p className="text-red-500 text-sm mt-1">{errors.advancePaymentRUB.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Banka Maaş Ödemesi (RUB)
            <input
              type="number"
              step="0.01"
              {...register('bankSalaryRUB', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          {errors.bankSalaryRUB && (
            <p className="text-red-500 text-sm mt-1">{errors.bankSalaryRUB.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Elden Maaş Ödemesi (RUB)
            <input
              type="number"
              step="0.01"
              {...register('cashSalaryRUB', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          {errors.cashSalaryRUB && (
            <p className="text-red-500 text-sm mt-1">{errors.cashSalaryRUB.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Döviz Kuru
            <input
              type="number"
              step="0.0001"
              {...register('exchangeRate', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          {errors.exchangeRate && (
            <p className="text-red-500 text-sm mt-1">{errors.exchangeRate.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}