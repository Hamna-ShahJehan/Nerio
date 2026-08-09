require('dotenv').config();

// Test Cloudinary configuration
console.log('Testing Cloudinary configuration...');
console.log('CLOUDINARY_URL:', process.env.CLOUDINARY_URL ? 'Set' : 'Not set');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set');

// Parse URL
if (process.env.CLOUDINARY_URL) {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  const match = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
  
  if (match) {
    const [, api_key, api_secret, cloud_name] = match;
    console.log('\nParsed from CLOUDINARY_URL:');
    console.log('Cloud Name:', cloud_name);
    console.log('API Key:', api_key);
    console.log('API Secret:', api_secret ? 'Set' : 'Not set');
  } else {
    console.log('Failed to parse CLOUDINARY_URL');
  }
}