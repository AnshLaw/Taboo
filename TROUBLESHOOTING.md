## 🔍 Discord Activity Troubleshooting

### Quick Diagnostic Checklist

**Your Application ID:** `1438092411036237915`

---

## Step 1: Verify Your Frontend URL

What URL is your frontend deployed at? Open it in a browser:

- [ ] Frontend loads correctly in browser
- [ ] You can see the Taboo game homepage
- [ ] URL is HTTPS (not HTTP)

**Your frontend URL:** _________________________

---

## Step 2: Check Discord Developer Portal Settings

Go to: https://discord.com/developers/applications/1438092411036237915

### A. Activities Tab
https://discord.com/developers/applications/1438092411036237915/activities

- [ ] Activities is ENABLED (toggle should be ON)
- [ ] URL Mapping exists with:
  - Root Path: `/`
  - Target: (your frontend URL from Step 1)
  
**Screenshot this if you're not sure!**

### B. OAuth2 Tab  
https://discord.com/developers/applications/1438092411036237915/oauth2

- [ ] Redirect URL added: `YOUR_FRONTEND_URL/api/auth/discord/callback`

---

## Step 3: Check Environment Variables in Deployment

Your deployment platform (Vercel/Render) needs these environment variables:

```
NEXT_PUBLIC_DISCORD_CLIENT_ID=1438092411036237915
DISCORD_CLIENT_SECRET=(your secret)
NEXT_PUBLIC_IS_DISCORD_ACTIVITY=true
NEXT_PUBLIC_SERVER_URL=https://taboo-257s.onrender.com
```

- [ ] All 4 environment variables are set in your deployment platform
- [ ] You redeployed after adding the variables

---

## Step 4: Test the Activity

Try accessing: `https://discord.com/activities/1438092411036237915`

### Error Messages & Solutions:

**"Failed to load activity"**
→ URL Mapping is wrong or frontend URL doesn't match
→ Go to Activities tab and verify the Target URL is exact

**"Activity not found"**  
→ Activities not enabled in developer portal
→ Enable it in Activities tab

**White/blank screen**
→ Check browser console (F12) for errors
→ Environment variables missing in deployment

**"Authentication failed"**
→ Wrong Client Secret in environment variables
→ OAuth2 redirect URL doesn't match

---

## Step 5: Browser Console Check

1. Open Discord in web browser (not desktop app)
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Try loading the activity
5. Look for errors

**Common errors:**
- CORS error → Server CORS not configured
- 404 error → Wrong URL mapping
- Auth error → Client secret wrong

---

## Quick Fix Commands

### If you deployed to Vercel:
```powershell
cd frontend
vercel env add NEXT_PUBLIC_DISCORD_CLIENT_ID
vercel env add DISCORD_CLIENT_SECRET
vercel env add NEXT_PUBLIC_IS_DISCORD_ACTIVITY
vercel env add NEXT_PUBLIC_SERVER_URL
vercel --prod
```

### If you deployed to Render:
Go to your service → Environment → Add the 4 variables → Manual Deploy

---

## Still Not Working?

**Tell me:**
1. What URL is your frontend deployed at?
2. Does that URL open in your browser?
3. Is Activities enabled in Discord portal?
4. What does the URL Mapping "Target" field say?

---

## Test in Browser First (Bypass Discord)

Before testing in Discord, make sure your app works:

1. Open your frontend URL directly in browser
2. Should see: Taboo game interface
3. Try creating a room
4. If this works, then Discord configuration is the issue
5. If this doesn't work, deployment issue

---

**Most Common Issue:** URL Mapping Target doesn't match your actual deployed URL
**Fix:** Update the Target in Activities → URL Mappings to exact deployed URL
