const mongoose = require('mongoose');
require('dotenv').config();

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\n📋 Collections in database:');
    collections.forEach(col => console.log(`  - ${col.name}`));

    // Check posts collection
    const postsCollection = db.collection('posts');
    const postCount = await postsCollection.countDocuments();
    console.log(`\n📊 Posts collection: ${postCount} documents`);
    
    if (postCount > 0) {
      const samplePost = await postsCollection.findOne();
      console.log('\n📄 Sample post structure:');
      console.log(JSON.stringify(samplePost, null, 2));
    }

    // Check categories collection
    const categoriesCollection = db.collection('categories');
    const categoryCount = await categoriesCollection.countDocuments();
    console.log(`\n📊 Categories collection: ${categoryCount} documents`);
    
    if (categoryCount > 0) {
      const sampleCategory = await categoriesCollection.findOne();
      console.log('\n📂 Sample category structure:');
      console.log(JSON.stringify(sampleCategory, null, 2));
    }

    // Check users collection
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log(`\n📊 Users collection: ${userCount} documents`);
    
    if (userCount > 0) {
      const sampleUser = await usersCollection.findOne();
      console.log('\n👤 Sample user structure:');
      console.log(JSON.stringify(sampleUser, null, 2));
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkDatabase();