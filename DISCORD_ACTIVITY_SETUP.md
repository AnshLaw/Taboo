# Converting Taboo to a Discord Activity

## Prerequisites
- Discord Developer Account
- Your app hosted publicly (required for Discord Activities)

## Step-by-Step Setup Guide

### 1. Register Your Application on Discord

1. Go to https://discord.com/developers/applications
2. Click **"New Application"**
3. Name it "Taboo Game" (or your preferred name)
4. Save your **Application ID** and **Client Secret**

### 2. Configure Discord Activity Settings

In the Discord Developer Portal:

1. Navigate to your application
2. Go to **"Activities"** tab in the left sidebar
3. Click **"Enable Activities"**
4. Under **"URL Mappings"**, add:
   - **Root Mapping**: `/` → Your app URL
   - Example: `https://your-app.com` → `/`

### 3. Set Up OAuth2

1. Go to **"OAuth2"** tab
2. Add redirect URLs:
   - `https://your-app.com/api/auth/discord/callback`
   - For local testing: `http://localhost:3001/api/auth/discord/callback`
3. Under **"OAuth2 URL Generator"**:
   - Select scopes: `applications.commands`, `identify`
   - Copy the generated URL

### 4. Install Discord Embedded App SDK

```bash
cd frontend
npm install @discord/embedded-app-sdk
```

### 5. Create Discord Client Wrapper

Create `frontend/lib/discordSdk.ts`:

```typescript
import { DiscordSDK } from '@discord/embedded-app-sdk';

let discordSdk: DiscordSDK | null = null;

export async function setupDiscordSdk() {
  if (typeof window === 'undefined') return null;
  
  const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
  if (!clientId) {
    console.warn('Discord Client ID not found');
    return null;
  }

  try {
    discordSdk = new DiscordSDK(clientId);
    await discordSdk.ready();
    
    // Authenticate with Discord
    const { code } = await discordSdk.commands.authorize({
      client_id: clientId,
      response_type: 'code',
      state: '',
      prompt: 'none',
      scope: ['identify', 'guilds'],
    });

    // Exchange code for access token with your backend
    const response = await fetch('/api/discord/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const { access_token } = await response.json();
    
    // Authenticate with Discord SDK
    await discordSdk.commands.authenticate({ access_token });
    
    return discordSdk;
  } catch (error) {
    console.error('Discord SDK setup failed:', error);
    return null;
  }
}

export function getDiscordSdk() {
  return discordSdk;
}
```

### 6. Update Environment Variables

Create/update `frontend/.env.local`:

```env
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_discord_application_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
NEXT_PUBLIC_IS_DISCORD_ACTIVITY=true
```

### 7. Create Discord Auth API Route

Create `frontend/pages/api/discord/token.ts`:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;

  try {
    const response = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Token exchange failed:', error);
    res.status(500).json({ error: 'Failed to exchange token' });
  }
}
```

### 8. Update Your Main App Component

Modify `frontend/components/GameContext.tsx` to initialize Discord SDK:

```typescript
import { setupDiscordSdk, getDiscordSdk } from '@/lib/discordSdk';

// In your context provider, add:
useEffect(() => {
  const initDiscord = async () => {
    if (process.env.NEXT_PUBLIC_IS_DISCORD_ACTIVITY === 'true') {
      const sdk = await setupDiscordSdk();
      if (sdk) {
        console.log('Discord Activity initialized');
        // Get current user info
        const user = await sdk.commands.getUser();
        setPlayerName(user.username); // Auto-set player name from Discord
      }
    }
  };
  
  initDiscord();
}, []);
```

### 9. Update manifest.json

Create `frontend/public/.well-known/discord-app-manifest.json`:

```json
{
  "name": "Taboo Game",
  "description": "Play Taboo word-guessing game with friends!",
  "developer": {
    "name": "Your Name"
  },
  "bot_public": false,
  "bot_require_code_grant": false,
  "terms_of_service_url": "https://your-app.com/terms",
  "privacy_policy_url": "https://your-app.com/privacy",
  "verify_key": "your_verify_key_from_discord"
}
```

### 10. Deploy Your Application

Discord Activities must be hosted publicly with HTTPS:

**Option A - Vercel (Recommended for Next.js):**
```bash
npm install -g vercel
cd frontend
vercel
```

**Option B - Railway/Render:**
- Push to GitHub
- Connect your repo to Railway/Render
- Deploy both frontend (port 3001) and backend (port 3000)

**Option C - Custom Server:**
- Set up nginx with SSL certificate
- Point domain to your server
- Use PM2 or similar for process management

### 11. Update Discord Activity URL Mapping

Back in Discord Developer Portal:
1. Go to Activities → URL Mappings
2. Update the URL to your deployed app
3. Example: `https://your-app.vercel.app` → `/`

### 12. Test Your Activity

1. In Discord, create a test server
2. Enable Developer Mode (Settings → Advanced → Developer Mode)
3. Go to your test server's voice channel
4. Click the "Activities" icon (rocket ship)
5. Your app should appear if you're in the allowlist
6. Or use the activity URL directly: `https://discord.com/activities/{YOUR_APP_ID}`

### 13. Configure Socket.IO for Discord

Update `server.js` CORS settings:

```javascript
const io = socketIO(server, {
  cors: {
    origin: [
      "*",
      "https://discord.com",
      "https://*.discord.com"
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
});
```

## Important Notes

### Security Considerations
- Never expose Client Secret in frontend code
- Use environment variables for all sensitive data
- Validate Discord tokens on your backend

### Voice Channel Integration
To make players auto-join based on voice channel:

```typescript
const sdk = getDiscordSdk();
const channelId = sdk?.channelId;
const guildId = sdk?.guildId;

// Use channelId as room code to auto-group voice channel participants
const roomCode = channelId?.slice(-6).toUpperCase();
```

### Testing Locally with Discord
Discord Activities require HTTPS. Use ngrok for local testing:

```bash
npm install -g ngrok
ngrok http 3001
# Use the https URL in Discord Activity settings
```

## Troubleshooting

### "Activity not found"
- Check Application ID matches
- Verify URL mapping is correct
- Ensure app is deployed and accessible

### "Authentication failed"
- Check Client Secret is correct
- Verify OAuth2 redirect URLs
- Check environment variables

### "Cannot connect to server"
- Update Socket.IO CORS settings
- Check server is publicly accessible
- Verify both ports (3000 & 3001) are accessible

## Resources

- [Discord Activities Documentation](https://discord.com/developers/docs/activities/overview)
- [Embedded App SDK](https://github.com/discord/embedded-app-sdk)
- [Discord Developer Portal](https://discord.com/developers/applications)

## Support

If you encounter issues:
1. Check Discord Developer Portal logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Test with ngrok locally first
