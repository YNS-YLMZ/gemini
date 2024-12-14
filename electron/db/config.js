import { Sequelize } from 'sequelize';
import { app } from 'electron';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(app.getPath('userData'), 'database.sqlite');

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
});

export async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    
    // Import models
    const User = (await import('./models/User.js')).default;
    
    // Sync database
    await sequelize.sync();
    
    // Check if admin exists
    const adminExists = await User.findOne({
      where: { username: 'admin' }
    });

    // Create default admin if not exists
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
        branch: 'Merkez',
        permissions: ['all']
      });
      console.log('Default admin user created successfully');
    }

    console.log('Database connection established and initialized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}