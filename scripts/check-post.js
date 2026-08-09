const mongoose = require('mongoose');
require('dotenv').config();

const articleSchema = new mongoose.Schema({}, { strict: false, collection: 'posts' });
const Article = mongoose.model('Article', articleSchema);

async function testSpecificArticle() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');
    
    const slug = 'how-my-phone-s-most-annoying-feature-saved-my-life';
    
    // Check if article exists
    const article = await Article.findOne({ slug }).lean();
    if (article) {
      console.log('Article found:');
      console.log({
        title: article.title,
        slug: article.slug,
        status: article.status,
        postBodyImage: article.postBodyImage,
        keyTakeawaysImage: article.keyTakeawaysImage
      });
    } else {
      console.log('Article not found with slug:', slug);
    }
    
    // Check with published status
    const publishedArticle = await Article.findOne({ 
      slug, 
      status: "published" 
    }).lean();
    
    if (publishedArticle) {
      console.log('\nPublished article found');
    } else {
      console.log('\nNo published article found with this slug');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

testSpecificArticle();