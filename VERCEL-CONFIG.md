# 🎯 Vercel Configuration Guide

## ✅ Fixed: Removed vercel.json

**Why?** The `vercel.json` was causing deployment issues. It's much simpler to configure everything in the Vercel dashboard!

---

## 🚀 Deploy to Vercel - Step by Step

### Step 1: Go to Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**

---

### Step 2: Import Your Repository

1. Find **`ishpreet404/taboo`** in the list
2. Click **"Import"**

---

### Step 3: Configure Build Settings ⚠️ **IMPORTANT**

You'll see a configuration screen. **Configure these settings**:

```
Framework Preset: Next.js ✅ (Should auto-detect)

Root Directory: frontend  ⚠️ IMPORTANT! Click "Edit" and set to "frontend"

Build Command: npm run build (leave as default)

Output Directory: .next (leave as default)

Install Command: npm install (leave as default)
```

**🔴 CRITICAL**: Make sure **Root Directory** is set to `frontend`!

---

### Step 4: Add Environment Variable

Before clicking Deploy, scroll down to **Environment Variables**:

1. Click **"Add Variable"** or the dropdown
2. Add:
   ```
   Name: NEXT_PUBLIC_SERVER_URL
   Value: https://taboo-257s.onrender.com
   ```
3. **Select Environments**: 
   - ✅ Production (required)
   - ✅ Preview (optional)
   - ✅ Development (optional)

---

### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes ⏱️
3. **Done!** 🎉

---

## 🎮 After Deployment

### You'll Get a URL Like:
```
https://taboo-[random].vercel.app
```

### Test Your Game:
1. ✅ Visit the URL
2. ✅ Check if it shows "Connected" (green indicator at top)
3. ✅ Click "Create Room"
4. ✅ Copy the room code
5. ✅ Open the URL in another browser/device
6. ✅ Click "Join Room" and enter the code
7. ✅ Play! 🎉

---

## 🔧 If Something Goes Wrong

### Issue: Shows "Disconnected"

**Fix 1**: Check Environment Variable
1. Go to Vercel → Your Project → **Settings** → **Environment Variables**
2. Make sure `NEXT_PUBLIC_SERVER_URL` = `https://taboo-257s.onrender.com`
3. If missing, add it
4. Go to **Deployments** → Click latest → **"Redeploy"**

**Fix 2**: Check Backend
1. Visit https://taboo-257s.onrender.com in browser
2. Should show "Cannot GET /" (this is good!)
3. Check Render dashboard - service should be "Live" ✅

**Fix 3**: Clear Cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or try incognito/private mode

---

### Issue: Build Failed

**Fix**: Check Root Directory
1. Go to Vercel → Your Project → **Settings** → **General**
2. Find **"Root Directory"**
3. Click **"Edit"**
4. Set to: `frontend`
5. Click **"Save"**
6. Go to **Deployments** → **"Redeploy"**

---

## 📸 Visual Guide

### What the Configuration Should Look Like:

```
┌─────────────────────────────────────────────┐
│ Configure Project                            │
├─────────────────────────────────────────────┤
│                                              │
│ Framework Preset                             │
│ ● Next.js                                    │
│                                              │
│ Root Directory                               │
│ frontend                      [Edit]         │
│   ⚠️ Make sure this says "frontend"!        │
│                                              │
│ Build and Output Settings                    │
│ Build Command:    npm run build              │
│ Output Directory: .next                      │
│ Install Command:  npm install                │
│                                              │
│ Environment Variables                        │
│ ┌─────────────────────────────────────────┐ │
│ │ Name: NEXT_PUBLIC_SERVER_URL            │ │
│ │ Value: https://taboo-257s.onrender.com  │ │
│ │ Environments: ✅ Production              │ │
│ └─────────────────────────────────────────┘ │
│                                              │
│                            [Deploy] ←────────┤
└─────────────────────────────────────────────┘
```

---

## 🎯 Quick Checklist

Before clicking Deploy:
- [ ] Root Directory = `frontend` ⚠️
- [ ] Framework = Next.js ✅
- [ ] Environment Variable added:
  - [ ] `NEXT_PUBLIC_SERVER_URL` = `https://taboo-257s.onrender.com`
  - [ ] Production environment selected ✅

After Deploy:
- [ ] Visit your Vercel URL
- [ ] Shows "Connected" at top
- [ ] Can create/join rooms
- [ ] Game works!

---

## 🆘 Still Having Issues?

### Check These:

1. **Root Directory**: Must be `frontend` (not empty, not `/frontend`, just `frontend`)
2. **Environment Variable**: Must be added in Vercel dashboard with exact URL
3. **Backend**: Must be running on Render (check at https://taboo-257s.onrender.com)
4. **Branch**: Make sure Vercel is deploying from `main` branch

### Need to Reconfigure?

1. Go to Vercel → Your Project → **Settings**
2. **General** → Edit Root Directory to `frontend`
3. **Environment Variables** → Add/Edit `NEXT_PUBLIC_SERVER_URL`
4. **Deployments** → Find latest → Click "..." → **Redeploy**

---

## ✨ You're All Set!

Just follow the steps above, and your game will be live! 🚀🎮

**Your Setup**:
- ✅ Backend: https://taboo-257s.onrender.com (Running on Render)
- ⏳ Frontend: (Will be deployed on Vercel)

**Once deployed, share your game URL with friends and play!** 🎉
