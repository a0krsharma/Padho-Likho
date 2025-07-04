const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
  // Get the connection string from environment variables
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/padho-likho';
  
  // Parse the connection string to show details (without password)
  let connectionDetails = 'Could not parse connection string';
  try {
    const url = new URL(MONGODB_URI);
    const username = url.username;
    const host = url.hostname;
    const dbName = url.pathname.replace(/^\/+/, '') || 'admin'; // Default to admin if no db specified
    connectionDetails = `MongoDB Connection Details:\n- Username: ${username}\n- Host: ${host}\n- Database: ${dbName}`;
  } catch (e) {
    console.error('Error parsing connection string:', e.message);
  }

  console.log('=== MongoDB Connection Test ===');
  console.log(connectionDetails);
  console.log('\nTroubleshooting Steps:');
  console.log('1. Verify your MongoDB Atlas username and password are correct');
  console.log('2. Make sure your IP is whitelisted in MongoDB Atlas Network Access');
  console.log('3. Check if the database user has the correct permissions');
  console.log('4. Ensure your internet connection is stable');
  console.log('\nAttempting to connect...\n');

  const client = new MongoClient(MONGODB_URI, {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 10000,
    retryWrites: true,
    w: 'majority'
  });

  try {
    // Attempt to connect to the server
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    // List all databases
    const adminDb = client.db('admin');
    const result = await adminDb.admin().listDatabases();
    
    console.log('\nAvailable databases:');
    result.databases.forEach(db => console.log(`- ${db.name}`));
    
    // Test a simple command
    const pingResult = await adminDb.command({ ping: 1 });
    console.log('\nPing result:', pingResult);
    
    return 'Connection test completed successfully!';
  } catch (error) {
    console.error('❌ Connection failed with error:');
    console.error('Error name:', error.name);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.error('\nDNS resolution failed. Please check your internet connection and the hostname.');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('\nConnection timed out. Please check your network connection and firewall settings.');
    } else if (error.code === 'EAUTH') {
      console.error('\nAuthentication failed. Please check your username and password.');
    }
    
    throw error;
  } finally {
    // Close the connection
    await client.close();
  }
}

// Run the test
testConnection()
  .then(result => console.log('\n' + result))
  .catch(() => process.exit(1));
