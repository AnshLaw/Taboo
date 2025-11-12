# ✅ FINAL SETUP STEPS - Almost Done!

## Your URLs:
- **Frontend:** https://taboo-inferno.vercel.app/
- **Backend:** https://taboo-257s.onrender.com
- **Application ID:** 1438092411036237915

---

## 🚀 Step-by-Step to Complete Setup:

### Step 1: Redeploy Backend ⚠️ CRITICAL

Your backend (server.js) has been updated to allow your Vercel frontend. You MUST redeploy:

**Option A - If you have Git auto-deploy:**
```powershell
git add server.js
git commit -m "Allow Vercel frontend in CORS"
git push
```

**Option B - Manual deploy on Render:**
1. Go to: https://dashboard.render.com/
2. Find your `taboo-257s` service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Wait 2-3 minutes for deployment

---

### Step 2: Update Vercel Environment Variables

Make sure your Vercel deployment has these environment variables:

1. Go to: https://vercel.com/dashboard
2. Find your `taboo-inferno` project
3. Go to **Settings** → **Environment Variables**
4. Add these if not already there:

```
NEXT_PUBLIC_DISCORD_CLIENT_ID=1438092411036237915
DISCORD_CLIENT_SECRET=26b9bc16bc8cc882736c4db4e5bc217a4d8c3e124c476ad13269bbec2ecfb8af
NEXT_PUBLIC_IS_DISCORD_ACTIVITY=true
NEXT_PUBLIC_SERVER_URL=https://taboo-257s.onrender.com
```

5. Click **Redeploy** after adding variables

---

### Step 3: Configure Discord Developer Portal

#### A. Enable Activities
1. Go to: https://discord.com/developers/applications/1438092411036237915/activities
2. Make sure **"Enable Activities"** toggle is **ON**
3. Under **"URL Mappings"**, click **"Add URL Mapping"** (or edit existing):
   - **Root Path:** `/`
   - **Target:** `https://taboo-inferno.vercel.app`
4. Click **Save Changes**

#### B. Add OAuth2 Redirect URL
1. Go to: https://discord.com/developers/applications/1438092411036237915/oauth2
2. Under **"Redirects"**, click **"Add Redirect"**
3. Enter: `https://taboo-inferno.vercel.app/api/auth/discord/callback`
4. Click **Save Changes**

---

### Step 4: Test Your Setup

#### Test 1: Frontend Works
Open in browser: https://taboo-inferno.vercel.app/
- ✅ Should load the Taboo game
- ✅ Open browser console (F12), should see: "Connecting to server: https://taboo-257s.onrender.com"
- ✅ Should see: "Connected to server"

#### Test 2: Create a Room
- Try creating a room on your Vercel site
- If it works, backend connection is good!

#### Test 3: Discord Activity
Go to: `https://discord.com/activities/1438092411036237915`
- Should load your game in Discord
- Or join a voice channel and click Activities → Find "Taboo Game"

---

## 🔍 Troubleshooting

### "Failed to load activity" in Discord
→ Check URL Mapping Target is exactly: `https://taboo-inferno.vercel.app`
→ No trailing slash, no http, must be https

### "Cannot connect to server" / Socket errors
→ Backend not redeployed yet (Step 1)
→ Wait 2-3 minutes after deploying backend

### Frontend loads but can't create rooms
→ NEXT_PUBLIC_SERVER_URL not set in Vercel
→ Backend CORS not updated (redeploy backend)

### Check Browser Console
Press F12 on https://taboo-inferno.vercel.app/ and look for:
- ✅ "Connecting to server: https://taboo-257s.onrender.com"
- ✅ "Connected to server"
- ❌ "WebSocket connection failed" = backend not allowing CORS
- ❌ "404 error" = wrong server URL

---

## 📋 Quick Checklist

- [ ] Redeployed backend with new CORS settings
- [ ] Added 4 environment variables in Vercel
- [ ] Redeployed Vercel if added new env variables
- [ ] Enabled Activities in Discord Portal
- [ ] Added URL Mapping: `https://taboo-inferno.vercel.app`
- [ ] Added OAuth2 Redirect URL
- [ ] Tested frontend at https://taboo-inferno.vercel.app/
- [ ] Verified "Connected to server" in console
- [ ] Tested creating a room
- [ ] Tested Discord Activity URL

---

## 🎉 Your Activity URL

Once everything is configured:

**`https://discord.com/activities/1438092411036237915`**

Share this with friends to play!

---

**Most Important:** REDEPLOY YOUR BACKEND NOW! 
The server.js file has been updated to allow your Vercel frontend.
