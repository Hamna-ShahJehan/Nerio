/**
 * Test MongoDB Connection
 * 
 * This script tests your MongoDB connection and provides helpful feedback
 * 
 * Usage:
 *   node scripts/test-connection.js
 */

const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function testConnection() {
  console.log('🔍 Testing MongoDB Connection...\n');

  // Check if MONGO_URI exists
  if (!MONGO_URI) {
    console.error('❌ MONGO_URI not found in .env file');
    console.log('💡 Add this to your .env file:');
    console.log('MONGO_URI=mongodb+srv://Mohsin:dragon260@cluster0.oiuve58.mongodb.net/Trendsposts?retryWrites=true&w=majority\n');
    process.exit(1);
  }

  console.log('✅ MONGO_URI found in .env');
  console.log(`🔗 Connection string: ${MONGO_URI.replace(/:[^:@]*@/, ':***@')}\n`);

  // Test connection
  try {
    console.log('🔌 Attempting to connect...');
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });
    
    console.log('✅ Successfully connected to MongoDB!\n');

    // Test database operations
    console.log('📊 Testing database operations...');
    
    // List collections
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`📁 Found ${collections.length} collections:`);
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });

    // Count documents in each collection
    if (collections.length > 0) {
      console.log('\n📈 Document counts:');
      for (const col of collections) {
        try {
          const count = await db.collection(col.name).countDocuments();
          console.log(`  - ${col.name}: ${count} documents`);
        } catch (e) {
          console.log(`  - ${col.name}: Error counting (${e.message})`);
        }
      }
    }

    console.log('\n🎉 Database connection test successful!');
    console.log('\n🚀 Next steps:');
    console.log('  1. If collections are empty, run: node scripts/import-data.js');
    console.log('  2. Start your dev server: npm run dev');
    console.log('  3. Visit: http://localhost:3000');

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting steps:');
    
    if (error.message.includes('IP')) {
      console.log('  1. 🌐 IP Whitelist Issue:');
      console.log('     - Go to MongoDB Atlas → Network Access');
      console.log('     - Click "Add IP Address"');
      console.log('     - Add your current IP or 0.0.0.0/0 for testing');
      console.log('     - Wait 1-2 minutes for changes to apply');
    }
    
    if (error.message.includes('authentication')) {
      console.log('  2. 🔐 Authentication Issue:');
      console.log('     - Check username/password in connection string');
      console.log('     - Go to MongoDB Atlas → Database Access');
      console.log('     - Verify user exists and has correct permissions');
    }
    
    if (error.message.includes('timeout') || error.message.includes('ENOTFOUND')) {
      console.log('  3. 🌍 Network Issue:');
      console.log('     - Check your internet connection');
      console.log('     - Try using mobile hotspot');
      console.log('     - Check if firewall is blocking MongoDB');
    }

    console.log('\n💡 Quick fix: Set USE_DATABASE=false in .env to use JSON files instead');
    
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run test
testConnection().catch(console.error);