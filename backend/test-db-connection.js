const mongoose = require('mongoose');
require('dotenv').config();

// Get connection string from environment or use default
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/padho-likho';

// Parse the connection string to extract components
let connectionDetails = 'Could not parse connection string';
try {
  const url = new URL(MONGODB_URI);
  const username = url.username;
  const host = url.hostname;
  const dbName = url.pathname.replace(/^\/+/, '') || 'default';
  connectionDetails = `Connecting to: ${username}@${host}/${dbName}`;
} catch (e) {
  console.warn('Warning: Could not parse connection string');
}

console.log('=== MongoDB Connection Test ===');
console.log(connectionDetails);
console.log('If this fails, please verify:');
console.log('1. Your MongoDB Atlas username and password are correct');
console.log('2. Your IP is whitelisted in MongoDB Atlas Network Access');
console.log('3. The database user has the correct permissions\n');

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Increased to 10 seconds
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority'
};

console.log('Connection options:', JSON.stringify(connectionOptions, null, 2));

console.log('\nAttempting to connect...');

mongoose.connect(MONGODB_URI, connectionOptions)
.then(() => {
  console.log('✅ Successfully connected to MongoDB!');
  console.log('Databases in cluster:');
  return mongoose.connection.db.admin().listDatabases();
})
.then(dbs => {
  console.log(dbs.databases.map(db => `- ${db.name}`).join('\n'));
  process.exit(0);
})
.catch(err => {
  console.error('❌ Failed to connect to MongoDB');
  console.error('Error details:', err.message);
  console.error('Full error:', err);
  process.exit(1);
});
