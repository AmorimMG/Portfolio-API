import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class IgdbService {
  constructor(private configService: ConfigService) {
    // Add this debug logging
    this.logger.debug('IGDB Client ID:', this.clientId?.substring(0, 4) + '...');
    this.logger.debug('IGDB Secret exists:', !!this.clientSecret);
  }

  private readonly clientId = this.configService.get<string>('IGDB_CLIENT_ID');
  private readonly clientSecret = this.configService.get<string>('IGDB_SECRET');
  
  private accessToken: string | null = null;
  private tokenExpiration: number = 0;
  private readonly logger = new Logger(IgdbService.name);

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiration) {
      return this.accessToken;
    }

    if (!this.clientId || !this.clientSecret) {
      this.logger.error('Missing IGDB credentials');
      throw new Error('IGDB credentials not configured');
    }

    try {
      const formData = new URLSearchParams();
      formData.append('client_id', this.clientId);
      formData.append('client_secret', this.clientSecret);
      formData.append('grant_type', 'client_credentials');

      const response = await axios.post(
        'https://id.twitch.tv/oauth2/token',
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );

      this.logger.debug('Token response:', response.data);
      this.accessToken = response.data.access_token;
      this.tokenExpiration = Date.now() + (response.data.expires_in * 1000);
      return this.accessToken;
    } catch (error) {
      this.logger.error('Token error:', {
        clientIdExists: !!this.clientId,
        secretExists: !!this.clientSecret,
        error: error.response?.data || error.message
      });
      throw error;
    }
  }

  async getGameIcon(gameName: string): Promise<any> {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.post(
        'https://api.igdb.com/v4/games',
        `search "${gameName}"; fields name, cover.image_id;`,
        {
          headers: {
            'Client-ID': this.clientId,
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
          }
        }
      );

      if (response.data && response.data.length > 0) {
        const games = response.data.map(game => ({
          name: game.name,
          imageUrl: game.cover?.image_id 
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
            : null
        }));
        
        return games;
      }
      
      return [];
    } catch (error) {
      console.error('Game search error:', {
        message: error.message,
        response: error.response?.data
      });
      throw error;
    }
  }

  async getExactGameIcon(gameName: string): Promise<any> {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.post(
        'https://api.igdb.com/v4/games',
        `search "${gameName}"; fields name, cover.image_id; where name = "${gameName}";`,
        {
          headers: {
            'Client-ID': this.clientId,
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
          }
        }
      );

      if (response.data && response.data.length > 0) {
        const game = response.data[0];
        return {
          name: game.name,
          imageUrl: game.cover?.image_id 
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
            : null
        };
      }
      
      return null;
    } catch (error) {
      this.logger.error('Exact game search error:', {
        message: error.message,
        response: error.response?.data
      });
      throw error;
    }
  }
}
