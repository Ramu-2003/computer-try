# Deployment Guide - Computer Mode Battle

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account (already configured)

## Step 1: Push to GitHub

```bash
cd computer-mode-battle

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Computer Mode Battle"

# Set main branch
git branch -M main

# Add remote origin
git remote add origin https://github.com/Ramu-2003/computer-try.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy Backend to Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? Your account
   - Link to existing project? No
   - Project name? computer-mode-battle
   - Directory? ./
   - Override settings? No

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: `npm install && cd client && npm install && npm run build`
   - Output Directory: client/build
   - Install Command: `npm install`

## Step 3: Configure Environment Variables on Vercel

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```
PORT=5000
MONGODB_URI=mongodb+srv://ramu4012y_db_user:ramu4012y@cluster0.wnnejy9.mongodb.net/?appName=Cluster0
JWT_SECRET=computer_mode_battle_secret_key_2026_secure
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=techinmystyle@gmail.com
EMAIL_PASS=higb nasn esde wguj
EMAIL_FROM=techinmystyle@gmail.com
CLIENT_URL=https://your-app-name.vercel.app
```

**Important**: Update `CLIENT_URL` with your actual Vercel deployment URL after first deployment.

## Step 4: Alternative Deployment - Separate Frontend & Backend

Since Vercel has limitations with Socket.io, consider this approach:

### Backend: Deploy to Render.com

1. Go to https://render.com
2. Sign up/Login
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - Name: computer-mode-battle-api
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add Environment Variables (same as above)

### Frontend: Deploy to Vercel

1. Create a new Vercel project
2. Set Root Directory to: `client`
3. Build Command: `npm run build`
4. Output Directory: `build`
5. Add Environment Variable:
   - `REACT_APP_API_URL`: Your Render backend URL

## Step 5: Update Frontend API URLs

Update `client/src/context/AuthContext.js` and socket connections:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
```

## Step 6: Alternative - Deploy to Railway

Railway is great for full-stack apps with Socket.io:

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables
6. Railway will auto-detect and deploy both frontend and backend

## Step 7: Update CORS Settings

Update `server/server.js` to allow your deployment URL:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-vercel-app.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

## Recommended Deployment Strategy

For this Socket.io application, I recommend:

1. **Backend**: Railway or Render (better Socket.io support)
2. **Frontend**: Vercel or Netlify
3. **Database**: MongoDB Atlas (already configured)

## Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test login functionality
- [ ] Test password reset email
- [ ] Test room creation
- [ ] Test game functionality
- [ ] Test Socket.io real-time features
- [ ] Test with multiple users
- [ ] Check browser console for errors
- [ ] Verify all API endpoints work
- [ ] Test on mobile devices

## Troubleshooting

### Socket.io Connection Issues
- Ensure WebSocket support is enabled
- Check CORS configuration
- Verify Socket.io URL is correct

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check build logs for specific errors

### Environment Variables
- Ensure all required variables are set
- Check for typos in variable names
- Verify MongoDB connection string

## Custom Domain (Optional)

1. Purchase domain from Namecheap, GoDaddy, etc.
2. In Vercel: Settings → Domains → Add Domain
3. Follow DNS configuration instructions
4. Update CLIENT_URL environment variable

## Monitoring

- Vercel Analytics: Automatic
- Error Tracking: Consider Sentry
- Uptime Monitoring: UptimeRobot

## Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs

Good luck with your deployment! 🚀