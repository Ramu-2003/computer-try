# 🚀 Deploy Backend to Render.com

## Why Render for Backend?

Render.com provides excellent support for:
- ✅ Socket.io WebSocket connections
- ✅ Free tier available
- ✅ Auto-deploy from GitHub
- ✅ Easy environment variable management
- ✅ Built-in SSL certificates

## Step-by-Step Deployment Guide

### Step 1: Create Render Account

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories

### Step 2: Create New Web Service

1. Click "New +" button (top right)
2. Select "Web Service"
3. Connect your GitHub repository:
   - Find "computer-try" in the list
   - Click "Connect"

### Step 3: Configure Web Service

Fill in the following settings:

**Basic Settings:**
- **Name**: `computer-mode-battle-api`
- **Region**: Choose closest to you (e.g., Oregon, Frankfurt)
- **Branch**: `main`
- **Root Directory**: Leave empty (or `.`)
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **Free** (or paid plan for better performance)

### Step 4: Add Environment Variables

Click "Advanced" → "Add Environment Variable" and add these:

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
CLIENT_URL=https://your-frontend-url.vercel.app
```

**Important**: You'll update `CLIENT_URL` after deploying the frontend.

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait 3-5 minutes for deployment
3. You'll get a URL like: `https://computer-mode-battle-api.onrender.com`

### Step 6: Test Backend

Once deployed, test these endpoints:

```bash
# Health check
curl https://computer-mode-battle-api.onrender.com/

# Get AI list
curl https://computer-mode-battle-api.onrender.com/api/ai
```

## Update Frontend to Use Render Backend

### Option 1: Environment Variables (Recommended)

Create `client/.env.production`:

```env
REACT_APP_API_URL=https://computer-mode-battle-api.onrender.com
REACT_APP_SOCKET_URL=https://computer-mode-battle-api.onrender.com
```

### Option 2: Update Code Directly

Update these files:

**1. client/src/context/AuthContext.js**

```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

axios.defaults.baseURL = API_URL;
```

**2. client/src/pages/Game.js**

```javascript
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

useEffect(() => {
  if (!user) return;
  
  const newSocket = io(SOCKET_URL, {
    transports: ['websocket', 'polling']
  });
  setSocket(newSocket);
  // ... rest of code
}, [user]);
```

**3. client/src/pages/Lobby.js**

```javascript
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

useEffect(() => {
  if (room && user) {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling']
    });
    setSocket(newSocket);
    // ... rest of code
  }
}, [room, user]);
```

## Update CORS Settings

Update `server/server.js` to allow your frontend URL:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app',
    'https://computer-try.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
```

## Commit and Push Changes

```bash
git add .
git commit -m "Configure for Render deployment"
git push origin main
```

Render will automatically redeploy!

## Monitor Your Backend

### Render Dashboard

- **Logs**: Real-time logs in dashboard
- **Metrics**: CPU, Memory usage
- **Events**: Deployment history

### Health Checks

Render automatically monitors your service health at `/`

## Troubleshooting

### Build Fails

**Check logs in Render dashboard**
- Look for missing dependencies
- Verify Node.js version
- Check build command

**Solution**: Ensure all dependencies are in `package.json`

### Socket.io Connection Issues

**Symptoms**: WebSocket connection fails

**Solution**: Add to `server/server.js`:

```javascript
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true
});
```

### Environment Variables Not Working

**Check**: Render Dashboard → Environment → Environment Variables
- Verify all variables are set
- No typos in variable names
- Redeploy after adding variables

### MongoDB Connection Issues

**Check**:
- MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Render)
- Connection string is correct
- Database user has proper permissions

**MongoDB Atlas Setup**:
1. Go to Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Save

### Cold Starts (Free Tier)

Free tier services sleep after 15 minutes of inactivity.

**Solutions**:
1. Upgrade to paid plan ($7/month)
2. Use a service like UptimeRobot to ping every 14 minutes
3. Accept 30-second cold start delay

## Performance Tips

### 1. Enable Persistent Disk (Optional)

For file uploads or caching:
- Dashboard → Settings → Disk
- Add persistent disk

### 2. Auto-Deploy

Render auto-deploys on every push to main branch.

To disable:
- Settings → Auto-Deploy → Off

### 3. Custom Domain

1. Settings → Custom Domain
2. Add your domain
3. Update DNS records
4. SSL certificate auto-generated

## Scaling (Paid Plans)

- **Starter**: $7/month - No sleep, better performance
- **Standard**: $25/month - More resources
- **Pro**: $85/month - High performance

## Complete Deployment Checklist

- [ ] Backend deployed to Render
- [ ] Environment variables configured
- [ ] Backend URL obtained
- [ ] CORS settings updated
- [ ] Frontend environment variables updated
- [ ] Code changes committed and pushed
- [ ] MongoDB IP whitelist configured
- [ ] Test API endpoints
- [ ] Test Socket.io connection
- [ ] Deploy frontend to Vercel
- [ ] Update CLIENT_URL on Render
- [ ] Test complete application flow

## Next Steps

1. ✅ Backend deployed to Render
2. ⏳ Deploy frontend to Vercel (see VERCEL_DEPLOY.md)
3. ⏳ Update environment variables
4. ⏳ Test complete application

## Useful Links

- **Render Dashboard**: https://dashboard.render.com
- **Render Docs**: https://render.com/docs
- **Your Backend**: https://computer-mode-battle-api.onrender.com
- **Support**: https://render.com/support

## Cost Estimate

**Free Tier**:
- 750 hours/month free
- Sleeps after 15 min inactivity
- Perfect for testing

**Paid Tier** ($7/month):
- Always on
- Better performance
- No cold starts

---

🎉 **Backend deployment complete!** Now deploy your frontend to Vercel.