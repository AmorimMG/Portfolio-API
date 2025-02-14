import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SpotifyService {
  constructor(private configService: ConfigService) {}

  private readonly clientId =
    this.configService.get<string>('SPOTIFY_CLIENT_ID');
  private readonly clientSecret =
    this.configService.get<string>('SPOTIFY_SECRET');
  private readonly redirectUri = 'https://api.amorim.pro/callback';

  getAuthorizationUrl(): string {
    const scopes = [
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-modify-playback-state',
      'user-read-playback-state',
      'streaming',
      'user-read-private',
      'app-remote-control',
      'playlist-read-private',
      'playlist-modify-public',
      'playlist-modify-private',
    ].join(' ');

    return `https://accounts.spotify.com/authorize?response_type=code&client_id=${
      this.clientId
    }&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(
      this.redirectUri,
    )}`;
  }

  async exchangeCodeForToken(authCode: string): Promise<any> {
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        `grant_type=authorization_code&code=${authCode}&redirect_uri=${this.redirectUri}&client_id=${this.clientId}&client_secret=${this.clientSecret}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      if (response.data) {
        const { access_token, refresh_token } = response.data;
        return { accessToken: access_token, refreshToken: refresh_token };
      } else {
        throw new Error('Failed to exchange code for token');
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  }

  async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = this.configService.get<string>(
        'SPOTIFY_REFRESH_TOKEN',
      );

      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
        },
        data: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      };

      const response = await axios.post(authOptions.url, authOptions.data, {
        headers: authOptions.headers,
      });

      if (response.data && response.data.access_token) {
        return response.data.access_token;
      } else {
        console.error('Failed to refresh access token');
        return null;
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return null;
    }
  }
  async getCurrentTrack(): Promise<any | null> {
    try {
      const accessToken = await this.refreshAccessToken();
      if (!accessToken) return null;

      const response = await axios.get(
        'https://api.spotify.com/v1/me/player/currently-playing',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data && response.data.item) {
        return {
          name: response.data.item.name,
          artist: response.data.item.artists[0].name,
          album: response.data.item.album.name,
          images: response.data.item.album.images,
          href: response.data.item.external_urls.spotify,
        };
      } else {
        console.error('Failed to fetch current track from Spotify API');
        return null;
      }
    } catch (error) {
      console.error('Error fetching current track:', error);
      return null;
    }
  }

  async getLastTrack(): Promise<any | null> {
    try {
      const accessToken = await this.refreshAccessToken();
      if (!accessToken) return null;

      const response = await axios.get(
        'https://api.spotify.com/v1/me/player/recently-played',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            limit: 1,
          },
        },
      );

      if (
        response.data &&
        response.data.items &&
        response.data.items.length > 0
      ) {
        const lastItem = response.data.items[0].track;
        return {
          name: lastItem.name,
          artist: lastItem.artists[0].name,
          album: lastItem.album.name,
          images: lastItem.album.images,
          href: lastItem.external_urls.spotify,
        };
      } else {
        console.error('Failed to fetch last track from Spotify API');
        return null;
      }
    } catch (error) {
      console.error('Error fetching last track:', error);
      return null;
    }
  }

  async getCurrentAndLastTrack(): Promise<{
    currentTrack: any | null;
    lastTrack: any | null;
  }> {
    try {
      const currentTrack = await this.getCurrentTrack();
      const lastTrack = await this.getLastTrack();

      return { currentTrack, lastTrack };
    } catch (error) {
      console.error('Error fetching current and last tracks:', error);
      return { currentTrack: null, lastTrack: null };
    }
  }

  async play(contextUri: string = ''): Promise<boolean> {
    try {
      const accessToken = await this.refreshAccessToken();
      if (!accessToken) return false;

      // If contextUri is not provided, use an empty object or another fallback.
      const body = contextUri ? { context_uri: contextUri } : {};

      await axios.put(
        'https://api.spotify.com/v1/me/player/play',
        body, // Pass the body with contextUri if available
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return true;
    } catch (error) {
      console.error('Error playing track:', error);
      return false;
    }
  }

  async pause(): Promise<boolean> {
    try {
      const accessToken = await this.refreshAccessToken();
      if (!accessToken) {
        console.error('Failed to obtain access token');
        return false;
      }

      await axios.put(
        'https://api.spotify.com/v1/me/player/pause',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error pausing track:', {
          status: error.response?.status,
          message: error.response?.data?.error?.message,
          data: error.response?.data,
        });
      }
      return false;
    }
  }

  async skipToNext(): Promise<boolean> {
    try {
      const accessToken = await this.refreshAccessToken();
      if (!accessToken) return false;

      await axios.post(
        'https://api.spotify.com/v1/me/player/next',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return true;
    } catch (error) {
      console.error('Error skipping to next track:', error);
      return false;
    }
  }

  async skipToPrevious(): Promise<boolean> {
    try {
      const accessToken = await this.refreshAccessToken();
      if (!accessToken) return false;

      await axios.post(
        'https://api.spotify.com/v1/me/player/previous',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return true;
    } catch (error) {
      console.error('Error skipping to previous track:', error);
      return false;
    }
  }

  private async verifyToken(accessToken: string): Promise<boolean> {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return false;
    }
  }

  private async checkPermissions(): Promise<boolean> {
    try {
      const accessToken = await this.refreshAccessToken();
      if (!accessToken) return false;

      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.status === 200;
    } catch (error) {
      console.error('Permission check failed:', error.message);
      return false;
    }
  }
}
