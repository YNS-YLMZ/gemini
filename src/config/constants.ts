export const APP_TITLE = "STELLAR - USD Maaş Hesaplama - © Yunus YILMAZ";

export const AUTH_CHANNELS = {
  LOGIN: 'auth:login',
  LOGOUT: 'auth:logout',
  CHECK_SESSION: 'auth:check-session'
} as const;

export const EMPLOYEE_CHANNELS = {
  CREATE: 'employee:create',
  SEARCH: 'employee:search',
  UPDATE: 'employee:update',
  DELETE: 'employee:delete'
} as const;

export const EXCEL_CHANNELS = {
  IMPORT: 'excel:import',
  EXPORT: 'excel:export',
  DOWNLOAD_TEMPLATE: 'excel:downloadTemplate'
} as const;

export const DEFAULT_BRANCH = 'Merkez';