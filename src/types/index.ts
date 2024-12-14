export interface User {
  id: number;
  username: string;
  role: 'admin' | 'user';
  branch: string;
  permissions: string[];
}

export interface Employee {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  salaryUSD: number;
  bonusUSD: number;
  bonusRUB: number;
  bankAdvanceRUB: number;
  advancePaymentRUB: number;
  bankSalaryRUB: number;
  cashSalaryRUB: number;
  exchangeRate: number;
  period: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeSearchParams {
  employeeId?: string;
  period?: string;
  startDate?: string;
  endDate?: string;
}

export interface ExcelExportParams {
  startPeriod: string;
  endPeriod: string;
  employeeId?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

declare global {
  interface Window {
    electron: {
      invoke: (channel: string, data?: any) => Promise<any>;
    };
  }
}