const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function testSetup() {
  console.log('🧪 Testing Computer Mode Battle Setup...\n');

  // Test environment variables
  console.log('📋 Environment Variables:');
  console.log(`PORT: ${process.env.PORT || 'Not set'}`);
  console.log(`MONGODB_URI: ${process.env.MONGODB_URI ? 'Set' : 'Not set'}`);
  console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? 'Set' : 'Not set'}`);
  console.log(`EMAIL_USER: ${process.env.EMAIL_USER || 'Not set'}`);
  console.log(`CLIENT_URL: ${process.env.CLIENT_URL || 'Not set'}\n`);

  // Test MongoDB connection
  console.log('🗄️  Testing MongoDB connection...');
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connection successful!\n');
    await mongoose.disconnect();
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error.message);
    console.log('💡 Make sure MongoDB is running and MONGODB_URI is correct\n');
  }

  // Test required modules
  console.log('📦 Testing required modules...');
  const requiredModules = [
    'express', 'mongoose', 'bcryptjs', 'jsonwebtoken', 
    'nodemailer', 'cors', 'socket.io', 'express-validator'
  ];

  requiredModules.forEach(module => {
    try {
      require(module);
      console.log(`✅ ${module}`);
    } catch (error) {
      console.log(`❌ ${module} - Run: npm install ${module}`);
    }
  });

  console.log('\n🎯 Setup Test Complete!');
  console.log('If all tests pass, run: npm run dev');
}

testSetup().catch(console.error);