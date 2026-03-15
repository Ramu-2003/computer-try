# 🚀 Complete Deployment Guide - Computer Mode Battle

## Overview

This guide will help you deploy:
- **Backend** → Render.com (Socket.io support)
- **Frontend** → Vercel (Fast CDN)
- **Database** → MongoDB Atlas (Already configured)

## Prerequisites

✅ GitHub repository: https://github.com/Ramu-2003/computer-try
✅ MongoDB Atlas configured
✅ Gmail SMTP configured

## Part 1: Deploy Backend to Render (15 minutes)

### Step 1: Create Render Account

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render

### Step 2: Create Web Service

1. Click "New +" → "Web Service"
2. Connect "computer-try" repository
3. Configure:
   - **Name**: `computer-mode-battle-api`
   - **Region**: Oregon (or closest)
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Add Environment Variables

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://ramu4012y_db_user:ramu4012y@cluster0.wnnejy9.mongodb.net/?appName=Cluster0
JWT_SECRET=computer_mode_battle_secret_key_2026_secure
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=techinmystyle@gmail.com
EMAIL_PASS=higb nasn esde wguj
EMAIL_FROM=techinmystyle@gmail.com
CLIENT_URL=https://computer-try.vercel.app
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait 3-5 minutes
3. Note your backend URL: `https://computer-mode-battle-api.onrender.com`

### Step 5: Test Backend

```bash
curl https://computer-mode-battle-api.onrender.com/health
```

## Part 2: Update Frontend Configuration

### Update Environment Variables

Edit `client/.env.production`:

```env
REACT_APP_API_URL=https://computer-mode-battle-api.onrender.com
REACT_APP_SOCKET_URL=https://computer-mode-battle-api.onrender.com
```

### Commit Changes

```bash
git add .
git commit -m "Configure for production deployment"
git push origin main
```

## Part 3: Deploy Frontend to Vercel (10 minutes)

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### Step 2: Import Project

1. Click "Add New..." → "Project"
2. Find "computer-try"
3. Click "Import"

### Step 3: Configure Project

- **Framework Preset**: Create React App
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### Step 4: Add Environment Variables

```
REACT_APP_API_URL=https://computer-mode-battle-api.onrender.com
REACT_APP_SOCKET_URL=https://computer-mode-battle-api.onrender.com
```

### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Note your frontend URL: `https://computer-try.vercel.app`

## Part 4: Final Configuration

### Update Backend CLIENT_URL

1. Go to Render Dashboard
2. Select your web service
3. Environment → Edit `CLIENT_URL`
4. Set to: `https://computer-try.vercel.app`
5. Save (auto-redeploys)

### Configure MongoDB Atlas

1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Save

## Part 5: Testing

### Test Checklist

- [ ] Visit frontend URL
- [ ] Register new user
- [ ] Login
- [ ] Test password reset email
- [ ] Create game room
- [ ] Start game
- [ ] Test code editor
- [ ] Submit code
- [ ] Check results
- [ ] Test with multiple browser tabs

### Test URLs

- **Frontend**: https://computer-try.vercel.app
- **Backend**: https://computer-mode-battle-api.onrender.com
- **API Health**: https://computer-mode-battle-api.onrender.com/health
- **AI List**: https://computer-mode-battle-api.onrender.com/api/ai

## Troubleshooting

### Backend Issues

**Problem**: Build fails on Render
**Solution**: Check logs, verify package.json dependencies

**Problem**: Socket.io not connecting
**Solution**: Check CORS settings, verify CLIENT_URL

**Problem**: MongoDB connection fails
**Solution**: Check IP whitelist, verify connection string

### Frontend Issues

**Problem**: API calls fail
**Solution**: Verify REACT_APP_API_URL is correct

**Problem**: Socket.io not connecting
**Solution**: Check REACT_APP_SOCKET_URL, verify backend is running

**Problem**: Build fails on Vercel
**Solution**: Check build logs, verify all dependencies

### Common Issues

**Cold Starts (Render Free Tier)**
- Service sleeps after 15 min inactivity
- First request takes 30-60 seconds
- Solution: Upgrade to paid plan or use UptimeRobot

**CORS Errors**
- Check CLIENT_URL on backend
- Verify CORS settings in server.js
- Check browser console for details

## Monitoring

### Render Dashboard
- Real-time logs
- Metrics (CPU, Memory)
- Deployment history

### Vercel Dashboard
- Analytics
- Build logs
- Deployment history

### MongoDB Atlas
- Database metrics
- Connection monitoring
- Query performance

## Costs

### Free Tier
- **Render**: 750 hours/month (sleeps after 15 min)
- **Vercel**: Unlimited deployments
- **MongoDB Atlas**: 512MB storage

### Paid Options
- **Render Starter**: $7/month (always on)
- **Vercel Pro**: $20/month (team features)
- **MongoDB**: $9/month (2GB storage)

## Custom Domain (Optional)

### Add to Vercel
1. Settings → Domains
2. Add your domain
3. Update DNS records
4. SSL auto-configured

### Add to Render
1. Settings → Custom Domain
2. Add domain
3. Update DNS
4. SSL auto-configured

## Auto-Deploy

Both platforms auto-deploy on push to main branch:
- Push to GitHub → Auto-deploy to Render & Vercel

## Rollback

### Render
- Deployments → Select previous version → Redeploy

### Vercel
- Deployments → Select previous → Promote to Production

## Performance Tips

1. **Enable Caching**: Vercel auto-caches static assets
2. **Optimize Images**: Use WebP format
3. **Code Splitting**: React lazy loading
4. **CDN**: Vercel provides global CDN
5. **Database Indexing**: Add indexes in MongoDB

## Security Checklist

- [ ] Environment variables secured
- [ ] JWT secret is strong
- [ ] MongoDB IP whitelist configured
- [ ] HTTPS enabled (automatic)
- [ ] CORS properly configured
- [ ] Rate limiting (consider adding)
- [ ] Input validation enabled

## Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **GitHub Repo**: https://github.com/Ramu-2003/computer-try

## Success! 🎉

Your application is now live:
- **Frontend**: https://computer-try.vercel.app
- **Backend**: https://computer-mode-battle-api.onrender.com

Share your app and start coding battles! 🚀