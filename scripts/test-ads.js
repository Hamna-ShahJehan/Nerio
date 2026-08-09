const mongoose = require('mongoose');
require('dotenv').config();

const adSnippetSchema = new mongoose.Schema({}, { strict: false, collection: 'adsnippets' });
const AdSnippet = mongoose.model('AdSnippet', adSnippetSchema);

async function testAds() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');
    
    // Check if there are any ads
    const ads = await AdSnippet.find({}).lean();
    console.log(`Found ${ads.length} ads in database`);
    
    if (ads.length > 0) {
      console.log('\nAds:');
      ads.forEach(ad => {
        console.log(`- ${ad.name} (${ad.pageType}/${ad.position}): ${ad.enabled ? 'Enabled' : 'Disabled'}`);
        console.log(`  Code: ${ad.code.substring(0, 100)}...`);
      });
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

testAds();