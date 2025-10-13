# 🚀 Your Deployment Setup

## ✅ Backend Already Deployed!

Your backend is live at:
```
https://taboo-257s.onrender.com
```

**Status**: ✅ Running on Render

---

## 📝 Next Step: Deploy Frontend to Vercel

### Quick Deploy (5 minutes):

#### 1. Push Changes to GitHub
```bash
git add .
git commit -m "Configure production backend URL"
git push origin main
```

#### 2. Deploy to Vercel

**Option A: Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import your repository: **`ishpreet404/taboo`**
5. Configure:
   ```
   Framework Preset: Next.js ✅ (auto-detected)
   Root Directory: frontend
   Build Command: npm run build (auto)
   Output Directory: .next (auto)
   ```
6. **Add Environment Variable**:
   - Click **"Environment Variables"**
   - Name: `NEXT_PUBLIC_SERVER_URL`
   - Value: `https://taboo-257s.onrender.com`
   - Select: Production (and optionally Preview)
7. Click **"Deploy"**
8. Wait 2-3 minutes ⏱️
9. **Done!** 🎉

**Your game will be live at**: `https://your-project-name.vercel.app`

---

**Option B: Vercel CLI (For Developers)**

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: taboo-game (or your choice)
# - Directory: ./ (current directory is already frontend)
# - Override settings? No

# Add environment variable
vercel env add NEXT_PUBLIC_SERVER_URL production
# Paste: https://taboo-257s.onrender.com

# Deploy to production
vercel --prod
```

---

## ✅ Deployment Checklist

### Before Deploying:
- [x] Backend deployed to Render ✅
- [x] Backend URL: `https://taboo-257s.onrender.com` ✅
- [x] Frontend `.env.production` configured ✅
- [x] Build test passed ✅
- [ ] Changes pushed to GitHub
- [ ] Ready to deploy frontend!

### After Deploying:
- [ ] Vercel deployment complete
- [ ] Copy your Vercel URL
- [ ] Test the game:
  - [ ] Page loads
  - [ ] Shows "Connected" (green indicator)
  - [ ] Can create room
  - [ ] Can join room
  - [ ] Game works!

---

## 🧪 Test Your Backend

Your backend is already running! Test it:

```bash
# Check if backend is alive (should show "Cannot GET /")
curl https://taboo-257s.onrender.com

# Or visit in browser - you'll see a basic response
```

This is **normal** - the backend is a WebSocket server, not a regular website.

---

## 🎮 After Deployment

### Your URLs:
- **Backend**: https://taboo-257s.onrender.com ✅
- **Frontend**: https://your-app.vercel.app (after deploying)

### Share & Play:
1. Share your Vercel URL with friends
2. Everyone can play from anywhere!
3. Enjoy! 🎉

---

## 🔧 Environment Variables Reference

### Local Development (.env.local)
```bash
NEXT_PUBLIC_SERVER_URL=https://taboo-257s.onrender.com
```
✅ Already configured!

### Production (.env.production)
```bash
NEXT_PUBLIC_SERVER_URL=https://taboo-257s.onrender.com
```
✅ Already configured!

### Vercel Dashboard
```
NEXT_PUBLIC_SERVER_URL = https://taboo-257s.onrender.com
```
⚠️ **Must add this in Vercel dashboard!**

---

## 🆘 Troubleshooting

### If you see "Disconnected" after deploying:

1. **Check Environment Variable**:
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Verify `NEXT_PUBLIC_SERVER_URL` = `https://taboo-257s.onrender.com`
   - If missing or wrong, update it and redeploy

2. **Check Backend**:
   - Visit https://taboo-257s.onrender.com in browser
   - Should show "Cannot GET /" (this is good!)
   - Check Render dashboard - service should be "Live" (green)

3. **Redeploy Frontend**:
   - Vercel → Deployments → Click "..." → Redeploy
   - This ensures environment variables are loaded

4. **Clear Browser Cache**:
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or open in incognito/private mode

---

## 💡 Pro Tips

### Auto-Deploy
Once set up, both platforms auto-deploy when you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
# ✨ Automatic deployment!
```

### Custom Domain (Optional)
After deployment, you can add a custom domain:
- **Vercel**: Settings → Domains → Add `yourdomain.com`
- **Render**: Settings → Custom Domain → Add `api.yourdomain.com`

---

## 🎯 Quick Commands

```bash
# Local development (already running)
npm run dev

# Test build (already passed ✅)
cd frontend && npm run build

# Push to GitHub
git add .
git commit -m "Deploy to production"
git push origin main

# Deploy with Vercel CLI
cd frontend && vercel --prod
```

---

## 📊 What's Deployed

### Backend (Render) ✅
- **URL**: https://taboo-257s.onrender.com
- **Service**: Socket.IO WebSocket server
- **Status**: Live
- **Features**:
  - Room management
  - Real-time game sync
  - Player connections
  - Score tracking

### Frontend (Vercel) ⏳
- **URL**: (Will be generated after deployment)
- **Service**: Next.js web app
- **Features**:
  - Beautiful UI
  - Room creation/joining
  - Game screens
  - Real-time updates

---

## ✨ You're Almost There!

**Just one more step**: Deploy frontend to Vercel!

Then your game will be **fully functional** and accessible to anyone! 🌍🎮

**Ready?** Follow the steps above! 🚀
