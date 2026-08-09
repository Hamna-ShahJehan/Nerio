const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const articleSchema = new mongoose.Schema({}, { strict: false, collection: 'posts' });
const Article = mongoose.model('Article', articleSchema);

async function checkCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to database');

    // Get all unique category values
    const categories = await Article.distinct('category');
    console.log('\n📊 Unique category values in database:');
    console.log(categories);

    // Count articles per category
    console.log('\n📈 Article count per category:');
    for (const cat of categories) {
      const count = await Article.countDocuments({ category: cat });
      console.log(`  ${cat}: ${count} articles`);
    }

    // Sample a few articles to see their category values
    console.log('\n📄 Sample articles with their categories:');
    const samples = await Article.find({}).limit(10).select('title category categoryLabel slug');
    samples.forEach(article => {
      console.log(`  - "${article.title}"`);
      console.log(`    category: "${article.category}"`);
      console.log(`    categoryLabel: "${article.categoryLabel}"`);
      console.log(`    slug: "${article.slug}"`);
      console.log('');
    });

    await mongoose.disconnect();
    console.log('✅ Disconnected from database');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkCategories();
