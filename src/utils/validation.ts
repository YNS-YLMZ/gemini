import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Kullanıcı adı gereklidir'),
  password: z.string().min(1, 'Şifre gereklidir')
});

export const employeeSchema = z.object({
  employeeId: z.string()
    .length(7, 'Sicil numarası 7 haneli olmalıdır')
    .regex(/^\d+$/, 'Sadece rakam giriniz'),
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
  exchangeRate: z.number().min(0, 'Geçerli bir kur giriniz')
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type EmployeeFormData = z.infer<typeof employeeSchema>;