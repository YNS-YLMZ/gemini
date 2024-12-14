import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './db/config.js';
import { setupAuthHandlers } from './handlers/authHandlers.js';
import { setupEmployeeHandlers } from './handlers/employeeHandlers.js';
import { setupExcelHandlers } from './handlers/excelHandlers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;

async function createWindow() {
  try {
    await initializeDatabase();

    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      },
      title: "STELLAR - USD Maaş Hesaplama - © Yunus YILMAZ"
    });

    // In development, load from the dev server
    if (process.env.NODE_ENV === 'development') {
      await mainWindow.loadURL('http://localhost:5173');
      mainWindow.webContents.openDevTools();
    } else {
      // In production, load the built files
      await mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
  } catch (error) {
    console.error('Failed to initialize application:', error);
    app.quit();
  }
}

// Handle app ready
app.whenReady().then(() => {
  createWindow();
  setupAuthHandlers();
  setupEmployeeHandlers();
  setupExcelHandlers();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Handle window close
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});