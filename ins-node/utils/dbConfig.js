// Simple database configuration
require('dotenv').config();

/**
 * Get database URI based on environment
 * @returns {string}
 */
function getDbURI() {
  const env = process.env.NODE_ENV || 'development';
  
  switch (env) {
    case 'production':
      return process.env.MONGODB_URI_PROD || process.env.MONGODB_URI;
    case 'test':
      return process.env.MONGODB_URI_TEST || 'mongodb://127.0.0.1:27017/ins-portfolio-test';
    default:
      return process.env.MONGODB_URI_DEV || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ins-portfolio';
  }
}

/**
 * Get database connection options
 * @returns {Object}
 */
function getDbOptions() {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
}

module.exports = {
  getDbURI,
  getDbOptions
};