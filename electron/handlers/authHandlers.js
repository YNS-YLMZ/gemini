import { ipcMain } from 'electron';
import bcrypt from 'bcryptjs';
import User from '../db/models/User.js';

export function setupAuthHandlers() {
  ipcMain.handle('auth:login', async (event, { username, password }) => {
    try {
      const user = await User.findOne({
        where: { username }
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Invalid credentials');
      }

      return {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          branch: user.branch,
          permissions: user.permissions
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  });

  ipcMain.handle('auth:check-session', async (event, userData) => {
    try {
      if (!userData) return null;

      const user = await User.findByPk(userData.id);
      if (!user) return null;

      return {
        id: user.id,
        username: user.username,
        role: user.role,
        branch: user.branch,
        permissions: user.permissions
      };
    } catch (error) {
      console.error('Session check error:', error);
      return null;
    }
  });

  ipcMain.handle('auth:logout', () => {
    return true;
  });
}