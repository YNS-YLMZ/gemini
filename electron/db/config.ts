import { Sequelize } from 'sequelize';
import path from 'path';
import { app } from 'electron';
import { seedDatabase } from './seed';

const dbPath = path.join(app.getPath('userData'), 'database.sqlite');

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
});

export async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await seedDatabase();
    console.log('Database connection established and seeded successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}