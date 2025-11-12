# 🔧 Frontend-Backend Connection Fix

## Changes Made:

1. ✅ Updated server CORS to use wildcard (allows all origins)
2. ✅ Added explicit localhost support for local testing
3. ✅ Enhanced socket.io connection with retry logic
4. ✅ Added connection logging

## 🚀 Next Steps to Fix:

### Step 1: Redeploy Backend (Server.js)

Your backend needs to be redeployed with the new CORS settings.

If using Render:
1. Go to your backend service on Render
2. Click "Manual Deploy" → "Deploy latest commit"
3. Wait for deployment to complete

Or push to GitHub if auto-deploy is enabled:
```powershell
git add server.js
git commit -m "Fix CORS for frontend connection"
git push
```

### Step 2: Find Your Frontend URL

Where is your frontend deployed? You need to know this URL.

**Check these platforms:**

- **Vercel**: https://vercel.com/dashboard
- **Render**: https://dashboard.render.com
- **Netlify**: https://app.netlify.com

The URL should look like:
- `https://taboo-abc123.vercel.app`
- `https://taboo-frontend.onrender.com`

### Step 3: Update Discord Activity URL Mapping

Once you have your frontend URL:

1. Go to: https://discord.com/developers/applications/1438092411036237915/activities
2. Under **URL Mappings**, set:
   - Root Path: `/`
   - Target: `YOUR_FRONTEND_URL` (from Step 2)

### Step 4: Test Connection

Open browser console (F12) when loading your frontend:
- You should see: "Connecting to server: https://taboo-257s.onrender.com"
- Then: "Connected to server"

If you see connection errors, check:
- Backend is running
- NEXT_PUBLIC_SERVER_URL in .env matches backend URL
- Backend has been redeployed with new CORS settings

---

## For Local Testing:

If testing locally:

**Terminal 1 - Backend:**
```powershell
cd D:\taboo
node server.js
```

**Terminal 2 - Frontend:**
```powershell
cd D:\taboo\frontend
npm run dev
```

Frontend will connect to `http://localhost:3000` by default.

---

## Environment Variables Check:

Your `.env.local` should have:
```
NEXT_PUBLIC_SERVER_URL=https://taboo-257s.onrender.com
```

And in your deployment platform (Vercel/Render), make sure this environment variable is also set!

---

## Still Having Issues?

**Tell me:**
1. Where is your frontend deployed? (URL)
2. Can you access the frontend in browser?
3. What errors do you see in browser console (F12)?
