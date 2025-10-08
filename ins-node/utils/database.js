const mongoose = require("mongoose");
const logger = require("./logger");

// Simple database connection utilities
let isConnected = false;

/**
 * Connect to MongoDB database
 * @returns {Promise<void>}
 */
async function connectDB() {
  try {
    const mongoURI = process.env.MONGODB_URI;


    await mongoose.connect(mongoURI);
    isConnected = true;
    
    logger.info(`✅ MongoDB Connected: ${mongoose.connection.host}`);
    
    // Setup basic event listeners
    setupEventListeners();
    
  } catch (error) {
    isConnected = false;
    logger.error(`❌ Database connection error: ${error.message}`);
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 * @returns {Promise<void>}
 */
async function disconnectDB() {
  try {
    if (isConnected) {
      await mongoose.disconnect();
      isConnected = false;
      logger.info("🔌 MongoDB Disconnected");
    }
  } catch (error) {
    logger.error(`❌ Error disconnecting: ${error.message}`);
    throw error;
  }
}

/**
 * Check if database is connected
 * @returns {boolean}
 */
function isDBConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

/**
 * Get database connection info
 * @returns {Object|null}
 */
function getConnectionInfo() {
  if (!mongoose.connection) {
    return null;
  }

  const states = {
    0: 'disconnected',
    1: 'connected', 
    2: 'connecting',
    3: 'disconnecting'
  };

  return {
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name,
    readyState: mongoose.connection.readyState,
    status: states[mongoose.connection.readyState] || 'unknown'
  };
}

/**
 * Database health check
 * @returns {Promise<Object>}
 */
async function healthCheck() {
  try {
    if (!isDBConnected()) {
      return {
        status: 'error',
        message: 'Database not connected'
      };
    }

    await mongoose.connection.db.admin().ping();
    
    return {
      status: 'healthy',
      message: 'Database is working fine',
      connection: getConnectionInfo(),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Database health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Setup basic connection event listeners
 */
function setupEventListeners() {
  mongoose.connection.on('connected', () => {
    logger.info('� Mongoose connected');
    isConnected = true;
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`🔴 Mongoose error: ${err.message}`);
    isConnected = false;
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('🟡 Mongoose disconnected');
    isConnected = false;
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    logger.info('📤 SIGINT received. Closing database connection...');
    await disconnectDB();
    process.exit(0);
  });
}

module.exports = {
  connectDB,
  disconnectDB,
  isDBConnected,
  getConnectionInfo,
  healthCheck
};