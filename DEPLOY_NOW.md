# 🎮 Discord Activity Setup - READY TO DEPLOY!

## ✅ COMPLETED SETUP

All code integration is done! Your app is ready to be deployed as a Discord Activity.

**Your Application ID:** `1438092411036237915`

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Get Discord Client Secret

1. Go to: https://discord.com/developers/applications/1438092411036237915/oauth2
2. Click **"Reset Secret"** button
3. **Copy the secret immediately** (you can only see it once!)
4. Edit `D:\taboo\frontend\.env.local`:
   - Replace `your_discord_client_secret_here` with the actual secret

### Step 2: Deploy Frontend to Vercel (Easiest Method)

```powershell
# Install Vercel CLI
npm install -g vercel

# Go to frontend folder
cd D:\taboo\frontend

# Deploy
vercel
```

**During deployment:**
- Choose "Link to existing project?" → **No**
- Project name: **taboo** (or your choice)
- Directory: **.** (current directory)
- Override settings? → **No**

**Add Environment Variables in Vercel:**

After first deployment, add these in Vercel dashboard:

```
NEXT_PUBLIC_DISCORD_CLIENT_ID=1438092411036237915
DISCORD_CLIENT_SECRET=your_actual_secret_here
NEXT_PUBLIC_IS_DISCORD_ACTIVITY=true
NEXT_PUBLIC_SERVER_URL=https://taboo-257s.onrender.com
```

Then redeploy: `vercel --prod`

**Copy your Vercel URL** (e.g., `https://taboo-abc123.vercel.app`)

---

### Step 3: Configure Discord Developer Portal

#### A. Enable Activities

1. Go to: https://discord.com/developers/applications/1438092411036237915/activities
2. Click **"Enable Activities"** button
3. Under **URL Mappings**, click **"Add URL Mapping"**:
   - **Root Path:** `/`
   - **Target:** `https://your-vercel-url.vercel.app` (from Step 2)
4. Click **Save Changes**

#### B. Add OAuth2 Redirect URL

1. Go to: https://discord.com/developers/applications/1438092411036237915/oauth2
2. Under **Redirects**, click **"Add Redirect"**
3. Add: `https://your-vercel-url.vercel.app/api/auth/discord/callback`
4. Click **Save Changes**

---

### Step 4: Test Your Activity!

**Method 1: Direct URL**
- Go to: `https://discord.com/activities/1438092411036237915`

**Method 2: In Voice Channel**
1. Join any voice channel in Discord
2. Click the **Activities** button (🚀 rocket icon)
3. Find "Taboo Game" in the list
4. Click to launch!

---

## 📋 ALTERNATIVE: Deploy to Render

If you prefer Render over Vercel:

### Deploy Backend (Already Done ✅)
- URL: https://taboo-257s.onrender.com

### Deploy Frontend to Render

1. Go to https://render.com/dashboard
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Settings:
   - **Name:** taboo-frontend
   - **Root Directory:** `frontend`
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Add Environment Variables (same as Vercel list above)
6. Click **Create Web Service**

Then use the Render URL in Discord Activity settings.

---

## 🧪 LOCAL TESTING (Optional)

Test locally before deploying:

```powershell
# Terminal 1: Start backend
cd D:\taboo
node server.js

# Terminal 2: Start frontend  
cd D:\taboo\frontend
npm run dev

# Terminal 3: Expose with ngrok
npm install -g ngrok
ngrok http 3001
```

Use ngrok HTTPS URL in Discord settings, then test.

---

## ✅ FINAL CHECKLIST

Before testing:

- [ ] Got Client Secret from Discord
- [ ] Added Client Secret to `.env.local`
- [ ] Deployed frontend to Vercel/Render
- [ ] Added environment variables to deployment
- [ ] Enabled Activities in Discord portal
- [ ] Added URL Mapping with your deployed URL
- [ ] Added OAuth2 redirect URL
- [ ] Saved all changes in Discord portal

---

## 🎉 YOUR ACTIVITY URL

After completing all steps, your game will be live at:

**`https://discord.com/activities/1438092411036237915`**

Share this URL with friends to play!

---

## 🔧 Files Modified

- ✅ `frontend/lib/discordSdk.ts` - Discord SDK integration
- ✅ `frontend/pages/api/discord/token.ts` - OAuth2 endpoint  
- ✅ `frontend/components/GameContext.tsx` - Auto-login with Discord
- ✅ `frontend/.env.local` - Environment variables
- ✅ `server.js` - CORS for Discord
- ✅ `frontend/package.json` - Added Discord SDK dependency

---

## 💡 Features Added

1. **Auto-login** - Players automatically logged in with Discord username
2. **Voice Channel Integration** - Can auto-create rooms per voice channel
3. **Discord-native UI** - Works seamlessly in Discord's embedded browser
4. **Cross-platform** - Also works standalone at your Vercel URL

---

## 🆘 Troubleshooting

**Build failed on Vercel/Render:**
- Check all environment variables are set
- Make sure `DISCORD_CLIENT_SECRET` is added

**Activity shows "Loading..." forever:**
- Verify Client Secret is correct in environment variables
- Check browser console for errors
- Ensure OAuth2 redirect URL matches exactly

**"Authentication failed":**
- Double-check Client Secret
- Make sure URL Mapping in Discord matches your deployed URL
- Clear browser cache and try again

**Game works standalone but not in Discord:**
- Verify Activities is enabled
- Check URL Mapping is correct
- Make sure app is deployed with HTTPS

---

## 📞 Need Help?

- Discord Developer Docs: https://discord.com/developers/docs/activities
- Your App Portal: https://discord.com/developers/applications/1438092411036237915
- Vercel Docs: https://vercel.com/docs

---

**Good luck! Your Discord Activity is ready to deploy! 🚀**
