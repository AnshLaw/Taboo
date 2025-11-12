import { DiscordSDK } from '@discord/embedded-app-sdk';

let discordSdk: DiscordSDK | null = null;
let isInitialized = false;

export async function setupDiscordSdk() {
  if (typeof window === 'undefined') return null;
  
  // Return existing instance if already initialized
  if (isInitialized && discordSdk) {
    return discordSdk;
  }
  
  const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
  if (!clientId) {
    console.warn('Discord Client ID not found - running in standalone mode');
    return null;
  }

  try {
    discordSdk = new DiscordSDK(clientId);
    await discordSdk.ready();
    
    console.log('Discord SDK ready');
    
    // Authenticate with Discord
    const { code } = await discordSdk.commands.authorize({
      client_id: clientId,
      response_type: 'code',
      state: '',
      prompt: 'none',
      scope: ['identify', 'guilds'],
    });

    console.log('Got authorization code');

    // Exchange code for access token with your backend
    const response = await fetch('/api/discord/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange token');
    }

    const { access_token } = await response.json();
    
    // Authenticate with Discord SDK
    const auth = await discordSdk.commands.authenticate({ access_token });
    
    console.log('Discord authenticated:', auth.user.username);
    
    isInitialized = true;
    return discordSdk;
  } catch (error) {
    console.error('Discord SDK setup failed:', error);
    return null;
  }
}

export function getDiscordSdk() {
  return discordSdk;
}

export function isDiscordActivity() {
  return typeof window !== 'undefined' && 
         process.env.NEXT_PUBLIC_IS_DISCORD_ACTIVITY === 'true';
}

export async function getDiscordUser() {
  if (!discordSdk) return null;
  
  try {
    // @ts-ignore - Discord SDK types may not be fully updated
    const user = await discordSdk.commands.getUser();
    if (!user) return null;
    
    return {
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
    };
  } catch (error) {
    console.error('Failed to get Discord user:', error);
    return null;
  }
}

export function getVoiceChannelId() {
  return discordSdk?.channelId || null;
}

export function getGuildId() {
  return discordSdk?.guildId || null;
}

// Generate room code from voice channel ID
export function getChannelBasedRoomCode() {
  const channelId = getVoiceChannelId();
  if (!channelId) return null;
  
  // Use last 6 characters of channel ID as room code
  return channelId.slice(-6).toUpperCase();
}
