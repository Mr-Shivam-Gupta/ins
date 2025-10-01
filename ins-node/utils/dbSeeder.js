const logger = require('./logger');

// Import models
const User = require('../models/User');
const Team = require('../models/Team');
const Portfolio = require('../models/Portfolio');
const Gallery = require('../models/Gallery');
const Contact = require('../models/Contact');
const Blog = require('../models/Blog');
const HeroSlider = require('../models/HeroSlider');
const Service = require('../models/Service');

/**
 * Seed development data
 * @returns {Promise<void>}
 */
async function seedData() {
  try {
    logger.info('🌱 Starting data seeding...');

    // Check if data already exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      logger.info('📊 Data already exists, skipping seeding');
      return;
    }

    // Create admin user
    await createAdminUser();
    
    // Create sample data
    await createSampleData();
    
    logger.info('✅ Data seeding completed');
  } catch (error) {
    logger.error(`❌ Error seeding data: ${error.message}`);
    throw error;
  }
}

/**
 * Create admin user
 * @returns {Promise<void>}
 */
async function createAdminUser() {
  try {
    const adminUser = {
      username: 'admin',
      email: 'admin@ins-portfolio.com',
      password: 'admin123',
      role: 'admin',
      isActive: true
    };

    await User.create(adminUser);
    logger.info('👤 Admin user created');
  } catch (error) {
    logger.error(`❌ Error creating admin user: ${error.message}`);
    throw error;
  }
}

/**
 * Create sample data
 * @returns {Promise<void>}
 */
async function createSampleData() {
  try {
    // Sample team members
    const teamMembers = [
      {
        name: 'John Doe',
        position: 'Senior Developer',
        email: 'john@ins-portfolio.com',
        bio: 'Experienced full-stack developer',
        skills: ['JavaScript', 'Node.js', 'React'],
        isActive: true
      },
      {
        name: 'Jane Smith',
        position: 'UI/UX Designer', 
        email: 'jane@ins-portfolio.com',
        bio: 'Creative designer focused on user experience',
        skills: ['UI Design', 'Figma', 'Adobe Creative Suite'],
        isActive: true
      }
    ];

    await Team.insertMany(teamMembers);
    logger.info('👥 Sample team created');

    // Sample blog posts
    const blogPosts = [
      {
        title: 'Getting Started with Node.js',
        content: 'A guide to building web applications with Node.js...',
        excerpt: 'Learn Node.js basics',
        author: 'John Doe',
        category: 'Development',
        tags: ['nodejs', 'javascript'],
        isPublished: true
      }
    ];

    await Blog.insertMany(blogPosts);
    logger.info('📝 Sample blogs created');

    // Sample services
    const services = [
      {
        title: 'Web Development',
        description: 'Full-stack web application development',
        features: ['Responsive Design', 'API Development'],
        price: 999,
        isActive: true
      }
    ];

    await Service.insertMany(services);
    logger.info('🛠️ Sample services created');

  } catch (error) {
    logger.error(`❌ Error creating sample data: ${error.message}`);
    throw error;
  }
}

/**
 * Clear all data
 * @returns {Promise<void>}
 */
async function clearAllData() {
  try {
    logger.warn('🗑️ Clearing all data...');
    
    await User.deleteMany({});
    await Team.deleteMany({});
    await Portfolio.deleteMany({});
    await Gallery.deleteMany({});
    await Contact.deleteMany({});
    await Blog.deleteMany({});
    await HeroSlider.deleteMany({});
    await Service.deleteMany({});
    
    logger.info('✅ All data cleared');
  } catch (error) {
    logger.error(`❌ Error clearing data: ${error.message}`);
    throw error;
  }
}

/**
 * Get database statistics
 * @returns {Promise<Object>}
 */
async function getStats() {
  try {
    const stats = {
      users: await User.countDocuments(),
      team: await Team.countDocuments(),
      portfolio: await Portfolio.countDocuments(),
      gallery: await Gallery.countDocuments(),
      contact: await Contact.countDocuments(),
      blog: await Blog.countDocuments(),
      heroSlider: await HeroSlider.countDocuments(),
      service: await Service.countDocuments()
    };
    
    const totalDocs = Object.values(stats).reduce((sum, count) => sum + count, 0);
    
    return {
      collections: stats,
      totalDocuments: totalDocs,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    logger.error(`❌ Error getting stats: ${error.message}`);
    throw error;
  }
}

module.exports = {
  seedData,
  clearAllData,
  getStats
};