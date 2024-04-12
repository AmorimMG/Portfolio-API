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

      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scope=user-read-recently-played`,
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

  async getCurrentTrack(accessToken: string): Promise<any | null> {
    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/me/player/currently-playing?market=BR',
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

  async getLastTrack(accessToken: string): Promise<any | null> {
    try {
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
}
