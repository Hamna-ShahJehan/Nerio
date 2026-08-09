const mongoose = require('mongoose');
require('dotenv').config();

async function listAllPostIds() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    const postsCollection = db.collection('posts');
    
    // Get all posts with just ID and title
    const posts = await postsCollection.find({}, { 
      projection: { _id: 1, title: 1, slug: 1 } 
    }).toArray();
    
    console.log(`\n📄 All ${posts.length} posts in database:`);
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ID: ${post._id}`);
      console.log(`   Title: ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

listAllPostIds();