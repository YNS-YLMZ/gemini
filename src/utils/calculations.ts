export function calculateTotalAmount(data: {
  salaryUSD: number;
  bonusUSD: number;
  bonusRUB: number;
  bankAdvanceRUB: number;
  advancePaymentRUB: number;
  bankSalaryRUB: number;
  cashSalaryRUB: number;
  exchangeRate: number;
}): number {
  const {
    salaryUSD,
    bonusUSD,
    bonusRUB,
    bankAdvanceRUB,
    advancePaymentRUB,
    bankSalaryRUB,
    cashSalaryRUB,
    exchangeRate,
  } = data;

  // Convert USD amounts to RUB
  const usdToRub = (salaryUSD + bonusUSD) * exchangeRate;
  
  // Add RUB bonus
  const totalIncome = usdToRub + bonusRUB;
  
  // Subtract all payments
  const totalPayments = bankAdvanceRUB + advancePaymentRUB + bankSalaryRUB + cashSalaryRUB;
  
  // Calculate final amount
  return Number((totalIncome - totalPayments).toFixed(2));
}