# 🚀 Deploy Frontend to Vercel - Step by Step

## Prerequisites

✅ Backend deployed to Render
✅ Backend URL: `https://computer-mode-battle-api.onrender.com`

## Step 1: Update Frontend Environment Variables

First, update the production environment file with your Render backend URL:

Edit `client/.env.production`:

```env
REACT_APP_API_URL=https://computer-mode-battle-api.onrender.com
REACT_APP_SOCKET_URL=https://computer-mode-battle-api.onrender.com
```

**Important**: Replace with your actual Render URL if different!

## Step 2: Commit Changes

```bash
git add .
git commit -m "Update frontend to use Render backend URL"
git push origin main
```

## Step 3: Sign Up / Login to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" (or "Login" if you have an account)
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

## Step 4: Import Your Project

1. Click "Add New..." button (top right)
2. Select "Project"
3. Find "computer-try" in your repository list
4. Click "Import"

## Step 5: Configure Project Settings

### Framework Preset
- Select: **Create React App**

### Root Directory
- Click "Edit" next to Root Directory
- Enter: `client`
- Click "Continue"

### Build and Output Settings
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `build` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Environment Variables

Click "Environment Variables" and add:

**Variable 1:**
- Name: `REACT_APP_API_URL`
- Value: `https://computer-mode-battle-api.onrender.com`

**Variable 2:**
- Name: `REACT_APP_SOCKET_URL`
- Value: `https://computer-mode-battle-api.onrender.com`

**Important**: Use your actual Render backend URL!

## Step 6: Deploy

1. Click "Deploy" button
2. Wait 2-3 minutes for build to complete
3. You'll see "Congratulations!" when done
4. Note your frontend URL: `https://computer-try.vercel.app`

## Step 7: Update Backend CORS

Now update your Render backend to allow requests from Vercel:

1. Go to Render Dashboard
2. Select your backend service
3. Go to Environment
4. Find `CLIENT_URL` variable
5. Update value to: `https://computer-try.vercel.app`
6. Save (will auto-redeploy)

## Step 8: Test Your Application

Visit your Vercel URL: `https://computer-try.vercel.app`

### Test Checklist:
- [ ] Page loads without errors
- [ ] Register new user
- [ ] Login works
- [ ] Can create a room
- [ ] Can start a game
- [ ] Code editor loads
- [ ] Socket.io connects (check browser console)
- [ ] Can submit code
- [ ] Results display correctly

## Troubleshooting

### Build Fails

**Check build logs in Vercel dashboard**

Common issues:
- Missing dependencies
- Environment variables not set
- Build command incorrect

**Solution**: Verify all dependencies are in `client/package.json`

### API Calls Fail (CORS Error)

**Symptoms**: 
- Console shows CORS errors
- API requests fail
- "Network Error" messages

**Solution**:
1. Verify `REACT_APP_API_URL` is correct
2. Check backend `CLIENT_URL` includes your Vercel URL
3. Check browser console for exact error

### Socket.io Not Connecting

**Symptoms**:
- Game doesn't start
- Real-time features don't work
- Console shows WebSocket errors

**Solution**:
1. Verify `REACT_APP_SOCKET_URL` is correct
2. Check Render backend is running
3. Test backend health: `https://your-backend.onrender.com/health`

### Page Shows "Cannot GET /"

**Solution**:
- Verify Root Directory is set to `client`
- Check Output Directory is `build`
- Redeploy

## Custom Domain (Optional)

### Add Custom Domain:

1. Go to Project Settings
2. Click "Domains"
3. Click "Add"
4. Enter your domain
5. Follow DNS configuration instructions
6. SSL certificate auto-generated

## Auto-Deploy

Vercel automatically deploys when you push to GitHub:
- Push to `main` branch → Production deploy
- Push to other branches → Preview deploy

## Vercel CLI (Alternative Method)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd computer-mode-battle/client
vercel

# Follow prompts
```

## Performance Tips

1. **Caching**: Vercel auto-caches static assets
2. **CDN**: Global CDN included
3. **Compression**: Automatic gzip/brotli
4. **Image Optimization**: Use Vercel Image component

## Monitoring

### Vercel Dashboard:
- Real-time analytics
- Build logs
- Deployment history
- Performance metrics

### Check Logs:
1. Go to your project
2. Click "Deployments"
3. Click on a deployment
4. View "Build Logs" or "Function Logs"

## Rollback

If something goes wrong:

1. Go to "Deployments"
2. Find previous working deployment
3. Click "..." menu
4. Select "Promote to Production"

## Environment Variables Management

### Update Variables:
1. Project Settings → Environment Variables
2. Edit or add variables
3. Redeploy for changes to take effect

### Different Environments:
- Production: Used for main branch
- Preview: Used for other branches
- Development: Local development

## Cost

**Free Tier Includes:**
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Global CDN
- Preview deployments

**Pro Plan ($20/month):**
- More bandwidth
- Team features
- Advanced analytics
- Priority support

## Final URLs

After deployment, you'll have:

- **Frontend**: `https://computer-try.vercel.app`
- **Backend**: `https://computer-mode-battle-api.onrender.com`
- **GitHub**: `https://github.com/Ramu-2003/computer-try`

## Success! 🎉

Your full-stack application is now live!

### Share Your App:
- Frontend URL: `https://computer-try.vercel.app`
- Test all features
- Share with friends
- Start coding battles!

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions

---

**Need help?** Check the troubleshooting section or refer to COMPLETE_DEPLOYMENT_GUIDE.md