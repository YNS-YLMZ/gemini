import { contextBridge, ipcRenderer } from 'electron';

// List of valid channels for security
const validChannels = [
  'auth:login',
  'auth:logout',
  'auth:check-session',
  'employee:create',
  'employee:search',
  'employee:update',
  'employee:delete',
  'excel:import',
  'excel:export',
  'excel:downloadTemplate'
];

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  invoke: async (channel, data) => {
    if (validChannels.includes(channel)) {
      try {
        return await ipcRenderer.invoke(channel, data);
      } catch (error) {
        console.error(`Channel ${channel} failed:`, error);
        throw error;
      }
    }
    throw new Error(`Invalid channel: ${channel}`);
  }
});