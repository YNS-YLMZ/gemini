import { format, addMonths } from 'date-fns';

export function generatePeriods() {
  const periods: string[] = [];
  const startDate = new Date(2024, 0, 1); // January 2024
  const endDate = new Date(2030, 11, 1); // December 2030

  let currentDate = startDate;
  while (currentDate <= endDate) {
    periods.push(format(currentDate, 'MMMM yy'));
    currentDate = addMonths(currentDate, 1);
  }

  return periods;
}

export function formatCurrency(value: number, currency: 'USD' | 'RUB'): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}