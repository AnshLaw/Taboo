# ✅ Discord Activity Setup - COMPLETED

## Your Application ID: 1438092411036237915

## ✅ What's Been Done:

1. ✅ Installed `@discord/embedded-app-sdk`
2. ✅ Created Discord SDK integration (`frontend/lib/discordSdk.ts`)
3. ✅ Created OAuth token endpoint (`frontend/pages/api/discord/token.ts`)
4. ✅ Updated `.env.local` with your Application ID
5. ✅ Updated server CORS to allow Discord
6. ✅ Integrated Discord SDK in GameContext
7. ✅ Created Discord manifest file

## 🔐 NEXT STEPS - YOU NEED TO DO:

### Step 1: Get Your Client Secret

1. Go to: https://discord.com/developers/applications/1438092411036237915
2. Click **"Reset Secret"** under OAuth2 tab
3. Copy the Client Secret
4. Edit `frontend\.env.local` and replace `your_discord_client_secret_here` with your actual secret

### Step 2: Configure Discord Developer Portal

Go to: https://discord.com/developers/applications/1438092411036237915

#### A. Enable Activities:
1. Click **"Activities"** in left sidebar
2. Click **"Enable Activities"**
3. Under **"URL Mappings"**, click **"Add URL Mapping"**
4. Set:
   - **Root Path**: `/`
   - **Target**: Your deployed frontend URL (see below)

#### B. Set OAuth2 Redirect URLs:
1. Click **"OAuth2"** in left sidebar
2. Under **"Redirects"**, click **"Add Redirect"**
3. Add: `https://YOUR_FRONTEND_URL/api/auth/discord/callback`

### Step 3: Deploy Your App

You have two servers that need to be publicly accessible:

**Backend (server.js):**
- Already deployed: https://taboo-257s.onrender.com ✅

**Frontend (Next.js):**
- Needs deployment to Vercel/Render/Railway

#### Option A: Deploy to Vercel (Recommended)

```bash
cd frontend
npm install -g vercel
vercel
```

Follow prompts, then:
1. Copy your Vercel URL (e.g., `https://taboo-abc123.vercel.app`)
2. Update Discord Activity URL Mapping with this URL
3. Update OAuth2 redirect to: `https://taboo-abc123.vercel.app/api/auth/discord/callback`

#### Option B: Deploy to Render

1. Go to https://render.com
2. New → Web Service
3. Connect your GitHub repo
4. Root Directory: `frontend`
5. Build Command: `npm install && npm run build`
6. Start Command: `npm start`
7. Add environment variables from `.env.local`
8. Deploy!

### Step 4: Update Environment Variables

After deploying frontend, update `frontend/.env.local`:

```env
NEXT_PUBLIC_DISCORD_CLIENT_ID=1438092411036237915
DISCORD_CLIENT_SECRET=your_actual_client_secret
NEXT_PUBLIC_IS_DISCORD_ACTIVITY=true
NEXT_PUBLIC_SERVER_URL=https://taboo-257s.onrender.com
```

Also add these to your deployment platform (Vercel/Render).

### Step 5: Test Your Activity

1. Join any Discord voice channel
2. Click the **Activities** button (rocket icon)
3. Look for "Taboo Game" in the list
4. Or go directly to: `https://discord.com/activities/1438092411036237915`

---

## 🔧 For Local Testing (Optional)

If you want to test locally before deploying:

```bash
# Install ngrok
npm install -g ngrok

# Terminal 1: Start your servers
cd D:\taboo
node server.js

# Terminal 2: Start frontend
cd frontend
npm run dev

# Terminal 3: Expose via ngrok
ngrok http 3001
```

Then use the ngrok HTTPS URL in Discord Activity settings.

---

## 📝 Current Status:

- ✅ Code integration complete
- ✅ Backend deployed and configured
- ⏳ **YOU NEED TO**: Get Client Secret and add to `.env.local`
- ⏳ **YOU NEED TO**: Deploy frontend
- ⏳ **YOU NEED TO**: Configure Discord Developer Portal
- ⏳ **YOU NEED TO**: Test the activity

---

## 🆘 Troubleshooting:

**"Activity not loading"**
- Make sure you've added Client Secret to `.env.local`
- Check Discord URL mapping matches your deployed URL
- Verify OAuth2 redirect URL is correct

**"Authentication failed"**
- Double-check Client Secret is correct
- Make sure environment variables are set in your deployment

**"Cannot find module @discord/embedded-app-sdk"**
- Already installed! ✅
- If you redeploy, make sure `package.json` includes it

---

## 📋 Quick Checklist:

- [ ] Get Client Secret from Discord
- [ ] Update `.env.local` with Client Secret
- [ ] Deploy frontend to Vercel/Render
- [ ] Add URL Mapping in Discord Activities
- [ ] Add OAuth2 Redirect URL
- [ ] Add environment variables to deployment
- [ ] Test in Discord

---

**Your app will be available at:**
`https://discord.com/activities/1438092411036237915`
