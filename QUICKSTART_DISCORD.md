# Quick Start: Discord Activity Setup

## 🚀 Fast Track Setup (5 minutes)

### 1. Install Discord SDK
```bash
cd frontend
npm install @discord/embedded-app-sdk
```

### 2. Set Up Environment Variables
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your Discord credentials
```

### 3. Register Your Discord Application

1. Visit: https://discord.com/developers/applications
2. Click "New Application"
3. Copy your Application ID
4. Go to OAuth2 → Copy Client Secret
5. Paste both into `frontend/.env.local`

### 4. Enable Discord Activity (Development)

For local testing, you need a public URL. Use ngrok:

```bash
# Install ngrok
npm install -g ngrok

# Start your app
npm run dev  # Terminal 1

# Start ngrok
ngrok http 3001  # Terminal 2
```

Copy the ngrok HTTPS URL (e.g., `https://abc123.ngrok.io`)

### 5. Configure Discord Developer Portal

1. Go to your app → **Activities** tab
2. Enable Activities
3. Add URL Mapping:
   - Root URL: `https://abc123.ngrok.io` → `/`
4. Go to **OAuth2** tab
5. Add Redirect URL: `https://abc123.ngrok.io/api/auth/discord/callback`

### 6. Update Your .env.local

```env
NEXT_PUBLIC_DISCORD_CLIENT_ID=123456789012345678
DISCORD_CLIENT_SECRET=your_secret_here
NEXT_PUBLIC_IS_DISCORD_ACTIVITY=true
NEXT_PUBLIC_SERVER_URL=https://abc123.ngrok.io
```

### 7. Test It!

1. Join a voice channel in Discord
2. Click Activities (rocket icon)
3. Go to: `https://discord.com/activities/YOUR_APP_ID`
4. Your Taboo game should load!

---

## 📦 Production Deployment

### Option 1: Vercel (Easiest)

```bash
cd frontend
npm install -g vercel
vercel
```

Then update Discord Activity URL to your Vercel URL.

### Option 2: Railway

1. Push to GitHub
2. Go to railway.app
3. New Project → Deploy from GitHub
4. Add environment variables
5. Deploy!

### Option 3: Your Own Server

```bash
# Build frontend
cd frontend
npm run build
npm start

# Keep server running
cd ..
node server.js
```

Use nginx for HTTPS and domain routing.

---

## 🔍 Troubleshooting

**"Activity not loading"**
- Check if URL mapping is correct
- Verify HTTPS is enabled
- Check browser console for errors

**"Authentication failed"**
- Verify Client Secret is correct
- Check if OAuth2 redirect URL matches

**"Can't install SDK"**
- Make sure you're in `frontend` directory
- Try: `npm install --legacy-peer-deps @discord/embedded-app-sdk`

---

## 📚 Full Documentation

See `DISCORD_ACTIVITY_SETUP.md` for complete details.
