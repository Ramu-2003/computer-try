# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Setup Environment
```bash
npm run setup
```
This creates a `.env` file. Update it with your credentials:

```env
# Required: MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/computer-mode-battle

# Required: JWT Secret (any random string)
JWT_SECRET=your_super_secret_key_here

# Required: Gmail SMTP for password reset
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 3. Test Setup (Optional)
```bash
npm run test-setup
```

### 4. Start Development
```bash
npm run dev
```

### 5. Open Application
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📧 Gmail Setup for Password Reset

1. Enable 2-Factor Authentication on Gmail
2. Go to Google Account → Security → 2-Step Verification → App passwords
3. Generate password for "Mail"
4. Use this password in `EMAIL_PASS`

## 🗄️ MongoDB Options

### Option A: Local MongoDB
```bash
# Install MongoDB locally and start service
mongod
```

### Option B: MongoDB Atlas (Free Cloud)
1. Sign up at https://www.mongodb.com/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 🎮 First Game

1. Register/Login at http://localhost:3000
2. Click "Enter or Join Room"
3. Configure game settings
4. Create room and start coding!

## 🆘 Need Help?

- Check the full README.md for detailed instructions
- Run `npm run test-setup` to diagnose issues
- Ensure MongoDB is running
- Verify Gmail credentials are correct

Happy coding! 🚀