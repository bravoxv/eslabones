import type { Youtuber } from '../types';

export interface SocialStats {
    youtube?: number;
    twitch?: number;
    kick?: number;
    tiktok?: number;
    instagram?: number;
    twitter?: number;
}

// Cache interface
interface CachedStat {
    value: number;
    timestamp: number;
    fromAPI: boolean;
}

// Cache storage (5 minutes TTL)
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, CachedStat>();

// Real data verified from actual channels via screenshots
// Last updated: November 29, 2025
// Used as fallback when API calls fail
const MOCK_STATS: Record<string, SocialStats> = {
    'Bravoxv': {
        youtube: 1360,          // @Bravo-XV - 1.36K subs verified
        twitch: 420,            // @bravoxv_ - 420 followers verified
        kick: 0,                // No data available
        tiktok: 424,            // @elbravoxv - 424 followers verified
        instagram: 8,           // @bravoxv2025 - 8 followers verified
        twitter: 0              // No data available
    },
    'ICEGaming': {
        youtube: 938,           // @ICEGAMINGCOMUNITY - 938 subs verified
        twitch: 0,              // No data available
    },
    'kronoxtoxity': {
        youtube: 608,           // @Kronox_Toxity - 608 subs verified
        twitch: 0,              // No data available
    },
    'Leodann': {
        youtube: 0,             // No active YouTube channel
        twitch: 144,            // @leoodann - 144 followers verified
        instagram: 0,           // No data available
        twitter: 0              // No data available
    }
};

// Get value from cache if valid
const getFromCache = (key: string): number | null => {
    const cached = cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > CACHE_TTL;
    if (isExpired) {
        cache.delete(key);
        return null;
    }

    return cached.value;
};

// Store value in cache
const setCache = (key: string, value: number, fromAPI: boolean = true) => {
    cache.set(key, {
        value,
        timestamp: Date.now(),
        fromAPI
    });
};

// Extract channel ID from YouTube URL
const extractYouTubeChannelId = (url: string): string | null => {
    try {
        const urlObj = new URL(url);
        const handle = urlObj.pathname.replace('/', '').replace('@', '');
        return handle || null;
    } catch {
        return null;
    }
};

// Fetch YouTube stats from API
const fetchYouTubeStats = async (channelUrl: string): Promise<number | null> => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!apiKey) {
        console.warn('YouTube API key not configured');
        return null;
    }

    const handle = extractYouTubeChannelId(channelUrl);
    if (!handle) return null;

    const cacheKey = `youtube:${handle}`;
    const cached = getFromCache(cacheKey);
    if (cached !== null) return cached;

    try {
        // First, resolve handle to channel ID
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(handle)}&type=channel&maxResults=1&key=${apiKey}`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (!searchData.items || searchData.items.length === 0) {
            throw new Error('Channel not found');
        }

        const channelId = searchData.items[0].id.channelId;

        // Now fetch channel statistics
        const statsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
        const statsResponse = await fetch(statsUrl);
        const statsData = await statsResponse.json();

        if (statsData.items && statsData.items.length > 0) {
            const subscriberCount = parseInt(statsData.items[0].statistics.subscriberCount);
            setCache(cacheKey, subscriberCount, true);
            return subscriberCount;
        }

        return null;
    } catch (error) {
        console.error('YouTube API error:', error);
        return null;
    }
};

// Extract Twitch username from URL
const extractTwitchUsername = (url: string): string | null => {
    try {
        const urlObj = new URL(url);
        const username = urlObj.pathname.replace('/', '');
        return username || null;
    } catch {
        return null;
    }
};

// Fetch Twitch stats from API
const fetchTwitchStats = async (channelUrl: string): Promise<number | null> => {
    const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_TWITCH_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        console.warn('Twitch API credentials not configured');
        return null;
    }

    const username = extractTwitchUsername(channelUrl);
    if (!username) return null;

    const cacheKey = `twitch:${username}`;
    const cached = getFromCache(cacheKey);
    if (cached !== null) return cached;

    try {
        // Get app access token
        const tokenUrl = 'https://id.twitch.tv/oauth2/token';
        const tokenParams = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'client_credentials'
        });

        const tokenResponse = await fetch(tokenUrl, {
            method: 'POST',
            body: tokenParams
        });
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Get user ID
        const userUrl = `https://api.twitch.tv/helix/users?login=${username}`;
        const userResponse = await fetch(userUrl, {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const userData = await userResponse.json();

        if (!userData.data || userData.data.length === 0) {
            throw new Error('User not found');
        }

        const userId = userData.data[0].id;

        // Get follower count
        const followersUrl = `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${userId}`;
        const followersResponse = await fetch(followersUrl, {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const followersData = await followersResponse.json();

        const followerCount = followersData.total || 0;
        setCache(cacheKey, followerCount, true);
        return followerCount;
    } catch (error) {
        console.error('Twitch API error:', error);
        return null;
    }
};

// Main function to get social stats
export const getSocialStats = async (member: Youtuber): Promise<SocialStats> => {
    // Simulate API delay for UX (shorter since we have real APIs)
    await new Promise(resolve => setTimeout(resolve, 300));

    const stats: SocialStats = {};

    // Get YouTube stats (API or fallback)
    if (member.socials.youtube) {
        const youtubeStats = await fetchYouTubeStats(member.socials.youtube);
        stats.youtube = youtubeStats !== null ? youtubeStats : (MOCK_STATS[member.name]?.youtube || 0);
    }

    // Get Twitch stats (API or fallback)
    if (member.socials.twitch) {
        const twitchStats = await fetchTwitchStats(member.socials.twitch);
        stats.twitch = twitchStats !== null ? twitchStats : (MOCK_STATS[member.name]?.twitch || 0);
    }

    // For other platforms, use static data
    stats.kick = MOCK_STATS[member.name]?.kick || 0;
    stats.tiktok = MOCK_STATS[member.name]?.tiktok || 0;
    stats.instagram = MOCK_STATS[member.name]?.instagram || 0;
    stats.twitter = MOCK_STATS[member.name]?.twitter || 0;

    return stats;
};

export const getMainStat = (stats: SocialStats): { count: number; platform: string } => {
    if (stats.youtube && stats.youtube > 0) return { count: stats.youtube, platform: 'YouTube' };
    if (stats.twitch && stats.twitch > 0) return { count: stats.twitch, platform: 'Twitch' };
    if (stats.kick && stats.kick > 0) return { count: stats.kick, platform: 'Kick' };
    if (stats.tiktok && stats.tiktok > 0) return { count: stats.tiktok, platform: 'TikTok' };
    return { count: 0, platform: '' };
};
