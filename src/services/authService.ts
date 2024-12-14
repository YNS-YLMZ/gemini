import { AUTH_CHANNELS } from '../config/constants';
import type { User } from '../types';

export async function login(username: string, password: string): Promise<{ user: User } | null> {
  try {
    const response = await window.electron.invoke(AUTH_CHANNELS.LOGIN, { username, password });
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
}

export async function logout(): Promise<void> {
  try {
    await window.electron.invoke(AUTH_CHANNELS.LOGOUT);
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
}

export async function checkSession(userData: User | null): Promise<User | null> {
  try {
    if (!userData) return null;
    return await window.electron.invoke(AUTH_CHANNELS.CHECK_SESSION, userData);
  } catch (error) {
    console.error('Session check failed:', error);
    return null;
  }
}