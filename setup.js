const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Computer Mode Battle...\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from template...');
  const envExample = fs.readFileSync(path.join(__dirname, '.env.example'), 'utf8');
  fs.writeFileSync(envPath, envExample);
  console.log('✅ .env file created! Please update with your credentials.\n');
} else {
  console.log('✅ .env file already exists.\n');
}

console.log('📋 Setup Instructions:');
console.log('1. Update .env file with your MongoDB URI and Gmail credentials');
console.log('2. Install dependencies: npm run install-all');
console.log('3. Start development: npm run dev');
console.log('4. Access application at http://localhost:3000\n');

console.log('🔧 Required Setup:');
console.log('- MongoDB (local or Atlas)');
console.log('- Gmail App Password for SMTP');
console.log('- Node.js v14+\n');

console.log('🎮 Ready to battle! Good luck coding against AI!');