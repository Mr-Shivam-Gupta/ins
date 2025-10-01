// Simple database management script
const { connectDB, disconnectDB, healthCheck, getConnectionInfo } = require('../utils/database');
const { seedData, clearAllData, getStats } = require('../utils/dbSeeder');

/**
 * Show database status
 */
async function showStatus() {
  try {
    await connectDB();
    
    const connectionInfo = getConnectionInfo();
    const health = await healthCheck();
    const stats = await getStats();
    
    console.log('\n📊 Database Status:');
    console.log('==================');
    console.log(`Host: ${connectionInfo.host}:${connectionInfo.port}`);
    console.log(`Database: ${connectionInfo.name}`);
    console.log(`Status: ${connectionInfo.status}`);
    console.log(`Health: ${health.status}`);
    
    console.log('\n📈 Collections:');
    Object.entries(stats.collections).forEach(([collection, count]) => {
      console.log(`  ${collection}: ${count} documents`);
    });
    console.log(`\nTotal Documents: ${stats.totalDocuments}`);
    
  } catch (error) {
    console.error('❌ Status check failed:', error.message);
  } finally {
    await disconnectDB();
  }
}

/**
 * Seed database with sample data
 */
async function seedDatabase() {
  try {
    await connectDB();
    await seedData();
    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await disconnectDB();
  }
}

/**
 * Test database connection
 */
async function testConnection() {
  try {
    await connectDB();
    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await disconnectDB();
  }
}

/**
 * Clear all database data
 */
async function clearDatabase() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const answer = await new Promise(resolve => {
      rl.question('⚠️  Are you sure you want to clear ALL data? (yes/no): ', resolve);
    });

    if (answer.toLowerCase() === 'yes') {
      await connectDB();
      await clearAllData();
      console.log('✅ Database cleared successfully');
    } else {
      console.log('❌ Operation cancelled');
    }
  } catch (error) {
    console.error('❌ Clear operation failed:', error.message);
  } finally {
    rl.close();
    await disconnectDB();
  }
}

/**
 * Show help information
 */
function showHelp() {
  console.log(`
🗄️  Database Manager
==================

Usage: node scripts/db-manager.js [command]

Commands:
  connect     - Test database connection
  status      - Show database status and statistics  
  seed        - Seed database with sample data
  clear       - Clear all database data (⚠️  DANGEROUS)
  help        - Show this help message

Examples:
  node scripts/db-manager.js status
  node scripts/db-manager.js seed
  node scripts/db-manager.js connect
  `);
}

// Main function
async function main() {
  const command = process.argv[2];

  switch (command) {
    case 'connect':
      await testConnection();
      break;
    case 'status':
      await showStatus();
      break;
    case 'seed':
      await seedDatabase();
      break;
    case 'clear':
      await clearDatabase();
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
}

// Error handling
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  showStatus,
  seedDatabase,
  testConnection,
  clearDatabase
};