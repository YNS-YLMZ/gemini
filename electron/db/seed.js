const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function seedDatabase() {
  try {
    const adminExists = await User.findOne({
      where: { username: 'admin' }
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('1234', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword,
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

module.exports = {
  seedDatabase
};