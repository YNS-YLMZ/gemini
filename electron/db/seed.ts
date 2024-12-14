import User from './models/User';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  try {
    // Check if admin user exists
    const adminExists = await User.findOne({
      where: { username: 'admin' }
    });

    if (!adminExists) {
      // Create default admin user only if it doesn't exist
      await User.create({
        username: 'admin',
        password: '1234',
        role: 'admin',
        branch: 'Merkez',
        permissions: ['all']
      });
      console.log('Default admin user created successfully');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}