import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyService {
  constructor(private configService: ConfigService) {}

  async getAccessToken(): Promise<string | null> {
    try {
      const clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
      const clientSecret = this.configService.get<string>('SPOTIFY_SECRET');
      const redirect_uri = 'localhost:4000';

      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scope=user-read-currently-playing%20user-read-recently-played&redirect_uri=${redirect_uri}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      if (response.data && response.data.access_token) {
        return response.data.access_token;
      } else {
        console.error('Failed to fetch access token from Spotify API');
        return null;
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
  }

  async refreshAccessToken(): Promise<string | null> {
    try {
      const clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
      const clientSecret = this.configService.get<string>('SPOTIFY_SECRET');
      const refreshToken = this.configService.get<string>(
        'SPOTIFY_REFRESH_TOKEN',
      );

      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
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
}
