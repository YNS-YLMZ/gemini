import { EXCEL_CHANNELS } from '../config/constants';
import type { ExcelExportParams } from '../types';

export async function importExcel(filePath: string): Promise<{ imported: number }> {
  try {
    const result = await window.electron.invoke(EXCEL_CHANNELS.IMPORT, filePath);
    return result;
  } catch (error) {
    console.error('Import excel failed:', error);
    throw new Error('Excel dosyası içe aktarılırken bir hata oluştu');
  }
}

export async function exportExcel(params: ExcelExportParams): Promise<string> {
  try {
    const filePath = await window.electron.invoke(EXCEL_CHANNELS.EXPORT, params);
    return filePath;
  } catch (error) {
    console.error('Export excel failed:', error);
    throw new Error('Excel dosyası oluşturulurken bir hata oluştu');
  }
}

export async function downloadTemplate(): Promise<string> {
  try {
    const filePath = await window.electron.invoke(EXCEL_CHANNELS.DOWNLOAD_TEMPLATE);
    return filePath;
  } catch (error) {
    console.error('Download template failed:', error);
    throw new Error('Excel şablonu indirilirken bir hata oluştu');
  }
}